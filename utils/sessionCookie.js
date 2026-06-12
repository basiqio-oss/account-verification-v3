import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { requireSessionSecret } from './env';

/**
 * Server-side session cookie utilities with HMAC-SHA256 signing.
 *
 * TOKEN FORMAT
 * ============
 * The session cookie value uses a custom two-part format (payload.signature),
 * not RFC 7519 JWT (header.payload.signature). This is intentional:
 *  - No header means the algorithm cannot be read from the token
 *  - Algorithm is hardcoded to HMAC-SHA256 server-side
 *  - Prevents algorithm confusion attacks (e.g., alg:none)
 *
 * SECURITY PROPERTIES
 * ===================
 * OBS-001 Remediation Checklist:
 *  ✓ Algorithm enforcement: HMAC-SHA256 hardcoded, not token-derived
 *  ✓ Constant-time comparison: Uses crypto.timingSafeEqual() to prevent timing attacks
 *  ✓ Key strength: SESSION_SECRET must be ≥64 hex chars (32 bytes) enforced in env.js
 *  ✓ Structure validation: Token must have exactly one dot (payload.signature)
 *  ✓ Sub claim validation: Server-side verification ensures sub is a non-empty string
 *
 * Cookie attributes:
 *  - HttpOnly: JS in the browser cannot read or forge the cookie
 *  - SameSite=Strict: Cross-site requests cannot carry the cookie (CSRF mitigated)
 *  - Secure: Only sent over HTTPS in production
 *  - HMAC: Ensures the userId inside the cookie cannot be tampered with
 *
 * Required environment variable:
 *  - SESSION_SECRET: Must be a random 64+ character hex string (e.g., generated via: openssl rand -hex 32)
 */

const COOKIE_NAME = 'av_session';
const COOKIE_MAX_AGE = 60 * 60 * 2; // 2 hours, in seconds
const CONSENT_STATE_COOKIE_NAME = 'av_consent_state';
const CONSENT_STATE_MAX_AGE = 60 * 15; // 15 minutes, in seconds

function encodeBase64Url(value) {
  return Buffer.from(value, 'utf8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const paddingLength = (4 - (normalized.length % 4)) % 4;
  const padded = normalized + '='.repeat(paddingLength);
  return Buffer.from(padded, 'base64').toString('utf8');
}

function getSecret() {
  return requireSessionSecret();
}

/**
 * Signs a value using HMAC-SHA256.
 * The algorithm is hardcoded here (not token-derived) to prevent algorithm confusion attacks.
 */
function signString(value) {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

function signPayload(payload) {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = signString(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies a two-part signed payload (payload.signature) using constant-time HMAC comparison.
 * Rejects any token with an unexpected structure (e.g., JWT three-part format).
 */
function verifySignedPayload(value) {
  if (!value || typeof value !== 'string') return null;

  // Enforce two-part format (payload.signature), not three-part JWT format
  const lastDot = value.lastIndexOf('.');
  if (lastDot === -1 || value.indexOf('.') !== lastDot) return null; // Reject if more or fewer than 1 dot

  const encodedPayload = value.substring(0, lastDot);
  const hmacPart = value.substring(lastDot + 1);
  if (!encodedPayload || !hmacPart) return null;

  let expected;
  try {
    // Algorithm is hardcoded to HMAC-SHA256 (cannot be overridden by token content)
    expected = signString(encodedPayload);
  } catch {
    return null;
  }

  try {
    const expectedBuf = Buffer.from(expected, 'hex');
    const actualBuf = Buffer.from(hmacPart, 'hex');
    // Length check prevents subtle timing differences in timingSafeEqual
    if (expectedBuf.length !== actualBuf.length) return null;
    // Use constant-time comparison to prevent timing-based forgery attacks
    if (!timingSafeEqual(expectedBuf, actualBuf)) return null;
  } catch {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeBase64Url(encodedPayload));
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.exp !== 'number') return null;
    if (Date.now() > parsed.exp) return null;
    return parsed;
  } catch {
    return null;
  }
}

function sign(userId) {
  const now = Date.now();
  return signPayload({
    sub: userId,
    iat: now,
    exp: now + COOKIE_MAX_AGE * 1000,
  });
}

/**
 * Verifies the session cookie and extracts the user ID.
 * All validation is performed server-side; the sub claim is never trusted from the token.
 */
function verify(value) {
  const payload = verifySignedPayload(value);
  if (!payload) return null;
  // Validate sub claim: must be a non-empty string representing the basiq user ID
  if (typeof payload.sub !== 'string' || !payload.sub) return null;
  // Sub is server-side validated before use (never directly decoded and acted upon client-side)
  return payload.sub;
}

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(';').flatMap(pair => {
      const idx = pair.indexOf('=');
      if (idx === -1) return [];
      const key = pair.substring(0, idx).trim();
      const val = pair.substring(idx + 1).trim();
      return [[key, decodeURIComponent(val)]];
    })
  );
}

export function getSessionUserId(req) {
  const cookies = parseCookies(req.headers.cookie);
  return verify(cookies[COOKIE_NAME] ?? null);
}

function setCookie(res, name, value, maxAge) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${name}=${encodeURIComponent(value)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`
  );
}

export function setSessionCookie(res, userId) {
  const value = sign(userId);
  setCookie(res, COOKIE_NAME, value, COOKIE_MAX_AGE);
}

export function clearSessionCookie(res) {
  setCookie(res, COOKIE_NAME, '', 0);
}

function timingSafeStringEqual(a, b) {
  const aBuf = Buffer.from(a, 'utf8');
  const bBuf = Buffer.from(b, 'utf8');
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export function createConsentState(res, userId) {
  const state = randomBytes(24).toString('hex');
  const now = Date.now();
  const value = signPayload({
    sub: userId,
    state,
    iat: now,
    exp: now + CONSENT_STATE_MAX_AGE * 1000,
  });
  setCookie(res, CONSENT_STATE_COOKIE_NAME, value, CONSENT_STATE_MAX_AGE);
  return state;
}

export function consumeConsentState(req, res, { userId, state }) {
  const cookies = parseCookies(req.headers.cookie);
  const cookieValue = cookies[CONSENT_STATE_COOKIE_NAME] ?? null;
  const payload = verifySignedPayload(cookieValue);
  // Single-use token, clear whether valid or invalid.
  setCookie(res, CONSENT_STATE_COOKIE_NAME, '', 0);
  if (!payload) return false;
  if (typeof payload.sub !== 'string' || typeof payload.state !== 'string') return false;
  if (!timingSafeStringEqual(payload.sub, userId)) return false;
  return timingSafeStringEqual(payload.state, state);
}

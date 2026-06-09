import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { requireSessionSecret } from './env';

/**
 * Server-side session cookie utilities.
 *
 * The session cookie value is a signed payload with user id + expiry.
 *
 * Using an HttpOnly, SameSite=Strict, Secure (prod) cookie means:
 *  - JS in the browser cannot read or forge the cookie
 *  - Cross-site requests cannot carry the cookie (CSRF mitigated)
 *  - The HMAC ensures the userId inside the cookie cannot be tampered with
 *
 * Required environment variable: SESSION_SECRET (a long, random string)
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

function signString(value) {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

function signPayload(payload) {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = signString(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

function verifySignedPayload(value) {
  if (!value || typeof value !== 'string') return null;

  const lastDot = value.lastIndexOf('.');
  if (lastDot === -1) return null;

  const encodedPayload = value.substring(0, lastDot);
  const hmacPart = value.substring(lastDot + 1);
  if (!encodedPayload || !hmacPart) return null;

  let expected;
  try {
    expected = signString(encodedPayload);
  } catch {
    return null;
  }

  try {
    const expectedBuf = Buffer.from(expected, 'hex');
    const actualBuf = Buffer.from(hmacPart, 'hex');
    // Lengths must match before timingSafeEqual
    if (expectedBuf.length !== actualBuf.length) return null;
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

function verify(value) {
  const payload = verifySignedPayload(value);
  if (!payload) return null;
  if (typeof payload.sub !== 'string' || !payload.sub) return null;
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

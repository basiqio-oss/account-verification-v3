import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Server-side session cookie utilities.
 *
 * The cookie value is: `<userId>.<HMAC-SHA256(userId, SESSION_SECRET)>`
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

function sign(userId) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET environment variable is not set');
  return `${userId}.${createHmac('sha256', secret).update(userId).digest('hex')}`;
}

function verify(value) {
  if (!value || typeof value !== 'string') return null;

  const lastDot = value.lastIndexOf('.');
  if (lastDot === -1) return null;

  const userId = value.substring(0, lastDot);
  const hmacPart = value.substring(lastDot + 1);
  if (!userId || !hmacPart) return null;

  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;

  const expected = createHmac('sha256', secret).update(userId).digest('hex');

  try {
    const expectedBuf = Buffer.from(expected, 'hex');
    const actualBuf = Buffer.from(hmacPart, 'hex');
    // Lengths must match before timingSafeEqual
    if (expectedBuf.length !== actualBuf.length) return null;
    if (!timingSafeEqual(expectedBuf, actualBuf)) return null;
  } catch {
    return null;
  }

  return userId;
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

export function setSessionCookie(res, userId) {
  const value = sign(userId);
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${encodeURIComponent(value)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${COOKIE_MAX_AGE}${secure}`
  );
}

export function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`);
}

const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');
const { validateEmail } = require('../../utils/validation');
const { setSessionCookie } = require('../../utils/sessionCookie');
const { consumeRateLimit } = require('../../utils/rateLimit');

/**
 * Validates that the request originates from the same application.
 * This prevents cross-origin abuse of the user creation endpoint.
 */
function validateOrigin(req) {
  const referer = req.headers.referer || req.headers.origin || '';
  const host = req.headers.host || '';
  
  // Check that Referer/Origin matches the request host
  try {
    const refererUrl = new URL(referer);
    return refererUrl.host === host;
  } catch {
    return false;
  }
}

/**
 * Sets rate limit headers in the response for visibility.
 */
function setRateLimitHeaders(res, limit) {
  res.setHeader('X-RateLimit-Limit', String(limit.maxRequests));
  res.setHeader('X-RateLimit-Remaining', String(limit.remaining));
  res.setHeader('X-RateLimit-Reset', new Date(limit.resetAt).toISOString());
}

/**
 * This API endpoint creates a user, which gives you a "bucket" to store all your financial data.
 *
 * https://api.basiq.io/reference/create-a-user
 */

const createUser = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return res.status(415).json({ message: 'Unsupported media type' });
  }

  // Check rate limiting first (before authentication) to protect against abuse
  const limit = consumeRateLimit(req, {
    keyPrefix: 'create-user',
    maxRequests: 5,
    windowMs: 10 * 60 * 1000,
  });
  
  if (!limit.allowed) {
    setRateLimitHeaders(res, limit);
    return res.status(429).json({ message: 'Too many requests' });
  }

  // Validate request origin to prevent cross-origin user creation (FND-002d)
  if (!validateOrigin(req)) {
    setRateLimitHeaders(res, limit);
    return res.status(403).json({ message: 'Forbidden: Invalid origin' });
  }

  const { email } = req.body;
  // Validate the request body fields
  if (!validateEmail(email)) {
    setRateLimitHeaders(res, limit);
    res.status(400).json({ message: 'Invalid email' });
    return;
  }
  try {
    const { data } = await axios({
      method: 'post',
      url: 'https://au-api.basiq.io/users',
      headers: {
        Authorization: await getBasiqAuthorizationHeader(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: req.body,
    });
    // Bind this browser session to the newly created user so that downstream
    // BFF routes (/api/accounts, /api/client-token) can only be called by
    // someone who went through this creation step — the cookie is HttpOnly,
    // SameSite=Strict, and HMAC-signed, so it cannot be read or forged by JS.
    setSessionCookie(res, data.id);
    setRateLimitHeaders(res, limit);
    res.status(200).json(data);
  } catch (error) {
    const status = error.response?.status;
    console.error('[create-user] Upstream error', {
      status: status ?? null,
      message: error.message,
      data: error.response?.data ?? null,
    });
    setRateLimitHeaders(res, limit);
    res.status(status && status >= 400 && status < 500 ? status : 502).json({ message: 'Request failed' });
  }
};

export default createUser;
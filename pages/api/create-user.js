const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');
const { validateEmail } = require('../../utils/validation');
const { setSessionCookie } = require('../../utils/sessionCookie');
const { consumeRateLimit } = require('../../utils/rateLimit');


/**
 * This API endpoint creates a user, which gives you a "bucket" to store all your financial data.
 *
 * https://api.basiq.io/reference/create-a-user
 */

const createUser = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const limit = consumeRateLimit(req, {
    keyPrefix: 'create-user',
    maxRequests: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!limit.allowed) {
    return res.status(429).json({ message: 'Too many requests' });
  }

  const { email } = req.body;
  // Validate the request body fields
  if (!validateEmail(email)) {
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
    res.status(200).json(data);
  } catch (error) {
    const basiqError = error.response?.data;
    console.error('[create-user] Basiq error:', JSON.stringify(basiqError ?? error.message));
    res.status(error.response?.status ?? 400).json(basiqError ?? { message: error.message });
  }
};

export default createUser;
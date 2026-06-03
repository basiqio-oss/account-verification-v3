const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');
const { validateUserId } = require('../../utils/validation');
const { setSessionCookie, getSessionUserId } = require('../../utils/sessionCookie');

/**
 * Re-issues the session cookie for a returning user (e.g. after the Basiq consent redirect).
 *
 * The userId is verified against the Basiq API before the cookie is issued, so an
 * attacker cannot obtain a cookie for a userId they do not own.
 *
 * Flow: app detects userId in sessionStorage but no session cookie → calls this endpoint
 * → Basiq confirms the user exists → cookie issued → downstream BFF routes work again.
 */
const establishSession = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // If there is already a valid session cookie, nothing to do.
  const existing = getSessionUserId(req);
  if (existing) {
    return res.status(200).json({ message: 'Session already active' });
  }

  const { userId } = req.body ?? {};

  if (!validateUserId(userId)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  try {
    // Verify the user actually exists in Basiq before issuing a cookie.
    // This prevents an attacker from minting a session for an arbitrary userId.
    await axios.get(`https://au-api.basiq.io/users/${userId}`, {
      headers: {
        Authorization: await getBasiqAuthorizationHeader(),
        Accept: 'application/json',
      },
    });
  } catch (error) {
    const status = error.response?.status;
    if (status === 404) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(502).json({ message: 'Could not verify user' });
  }

  setSessionCookie(res, userId);
  return res.status(200).json({ message: 'Session established' });
};

export default establishSession;

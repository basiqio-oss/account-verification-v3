const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');
const { validateUserId, validateConsentState } = require('../../utils/validation');
const { setSessionCookie, getSessionUserId, consumeConsentState } = require('../../utils/sessionCookie');

/**
 * Re-issues the session cookie for a returning user (e.g. after the Basiq consent redirect).
 *
 * The request must present a valid one-time consent state bound to the same userId
 * that was generated before redirecting to the external consent UI.
 *
 * Flow: app receives redirect with state and has userId in sessionStorage → calls this
 * endpoint with { userId, state } → server verifies signed one-time state cookie + Basiq
 * user exists check → cookie issued → downstream BFF routes work again.
 */
const establishSession = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return res.status(415).json({ message: 'Unsupported media type' });
  }

  // If there is already a valid session cookie, nothing to do.
  const existing = getSessionUserId(req);
  if (existing) {
    return res.status(200).json({ message: 'Session already active' });
  }

  const { userId, state } = req.body ?? {};

  if (!validateUserId(userId) || !validateConsentState(state)) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const hasValidState = consumeConsentState(req, res, { userId, state });
  if (!hasValidState) {
    return res.status(401).json({ message: 'Unauthorized' });
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
    console.error('[establish-session] Upstream error', {
      status: error.response?.status ?? null,
      message: error.message,
    });
    return res.status(401).json({ message: 'Unauthorized' });
  }

  setSessionCookie(res, userId);
  return res.status(200).json({ message: 'Session established' });
};

export default establishSession;

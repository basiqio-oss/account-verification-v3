const { getNewClientToken } = require('../../serverAuthentication');
const { getSessionUserId } = require('../../utils/sessionCookie');

/**
 * This API endpoint retrieves a Basiq API token with the scope of `CLIENT_ACCESS`
 *
 * https://api.basiq.io/reference/authentication
 */

const clientToken = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Require a valid session cookie — userId is never accepted from query params
  // to prevent an unauthenticated caller from minting tokens for arbitrary users.
  const userId = getSessionUserId(req);
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    const token = await getNewClientToken(userId);
    res.status(200).json(token);
  } catch (error) {
    const status = error.response?.status;
    console.error('[client-token] Upstream error', {
      status: status ?? null,
      message: error.message,
      data: error.response?.data ?? null,
    });
    res.status(status && status >= 400 && status < 500 ? status : 502).json({ message: 'Request failed' });
  }
};

export default clientToken;
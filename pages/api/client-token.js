const { getNewClientToken } = require('../../serverAuthentication');
const { getSessionUserId } = require('../../utils/sessionCookie');

/**
 * This API endpoint retrieves a Basiq API token with the scope of `CLIENT_ACCESS`
 *
 * https://api.basiq.io/reference/authentication
 */

const clientToken = async (req, res) => {
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
    const basiqError = error.response?.data;
    res.status(error.response?.status ?? 400).json(basiqError ?? { message: error.message });
  }
};

export default clientToken;
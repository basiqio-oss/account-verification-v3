const { getNewClientToken } = require('../../serverAuthentication');
const { validateUserId } = require('../../utils/validation');

/**
 * This API endpoint retrieves a Basiq API token with the scope of `CLIENT_ACCESS`
 *
 * https://api.basiq.io/reference/authentication
 */

const clientToken = async (req, res) => {
  const { userId } = req.query;
    
  // Validate the userId query parameter
  if (!validateUserId(userId)) {
    res.status(400).json({ message: 'Invalid userId' });
    return;
  }
  try {
    const clientToken = await getNewClientToken(userId);
    res.status(200).json(clientToken);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = clientToken;

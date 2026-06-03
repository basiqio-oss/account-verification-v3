const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');
const { getSessionUserId } = require('../../utils/sessionCookie');

/**
 * This API endpoint retrieves a list of accounts. Each entry in the array is a separate account object.
 *
 * https://api.basiq.io/reference/list-all-accounts
 */

const accounts = async (req, res) => {

  // Require a valid session cookie — userId is never accepted from query params
  // to prevent cross-user account enumeration via the server-side token.
  const userId = getSessionUserId(req);
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  
  try {
    const { data } = await axios.get(`https://au-api.basiq.io/users/${userId}/accounts`, {
      headers: {
        Authorization: await getBasiqAuthorizationHeader(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const sortedAccounts = data.data
      .map(account => {
        const isAvailable = account.status === 'available';
        const isTransactionAccount = account.class.type === 'transaction';
        const disabled = !isAvailable || !isTransactionAccount;
        return {
          ...account,
          disabled,
        };
      })
      // Make sure disabled accounts appear last
      .sort((a, b) => a.disabled - b.disabled);

    res.status(200).json(sortedAccounts);
  } catch (error) {
    const basiqError = error.response?.data;
    res.status(error.response?.status ?? 400).json(basiqError ?? { message: error.message });
  }
};

export default accounts;

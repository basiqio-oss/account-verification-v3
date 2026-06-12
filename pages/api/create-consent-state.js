const { getSessionUserId, createConsentState } = require('../../utils/sessionCookie');

const createConsentStateHandler = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = getSessionUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const state = createConsentState(res, userId);
  return res.status(200).json({ state });
};

export default createConsentStateHandler;

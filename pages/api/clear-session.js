const { clearSessionCookie } = require('../../utils/sessionCookie');

/**
 * Invalidates the session cookie so that downstream BFF routes
 * (/api/accounts, /api/client-token) can no longer be called
 * after the user cancels or finishes the verification flow.
 */
const clearSession = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  clearSessionCookie(res);
  res.status(200).json({ message: 'Session cleared' });
};

export default clearSession;

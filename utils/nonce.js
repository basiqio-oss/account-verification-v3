/**
 * Generates a cryptographically secure random nonce for CSP.
 * Must be called server-side only (Node.js runtime, not Edge).
 * Returns a base64-encoded string suitable for CSP nonce attributes.
 */
export function generateNonce() {
  if (typeof window !== 'undefined') {
    throw new Error('generateNonce() must be called server-side only');
  }

  try {
    const crypto = require('crypto');
    return crypto.randomBytes(16).toString('base64');
  } catch (error) {
    console.error('Failed to generate nonce:', error);
    throw new Error('Nonce generation failed - crypto module unavailable');
  }
}

import { createContext, useContext } from 'react';

/**
 * NonceContext provides the CSP nonce to all components.
 * The nonce is generated on the server for each request and used in the CSP header.
 */
const NonceContext = createContext(undefined);

export function NonceProvider({ nonce, children }) {
  return (
    <NonceContext.Provider value={nonce}>
      {children}
    </NonceContext.Provider>
  );
}

/**
 * Hook to access the CSP nonce in components.
 * Returns the nonce string or undefined if not available.
 * 
 * Usage: const nonce = useNonce();
 */
export function useNonce() {
  return useContext(NonceContext);
}

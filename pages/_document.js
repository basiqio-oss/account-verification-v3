import { Html, Head, Main, NextScript } from 'next/document';
import { generateNonce } from '../utils/nonce';

export default function Document(props) {
  const nonce = props.__NONCE__;
  
  return (
    <Html>
      <Head nonce={nonce} />
      <body>
        <Main />
        <NextScript nonce={nonce} />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);
  
  // Generate nonce server-side for this request
  const nonce = generateNonce();
  
  // Store nonce on ctx for access by _app
  ctx.__NONCE__ = nonce;
  
  // Set CSP header with nonce
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  if (nodeEnv === 'production' && ctx.res) {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "object-src 'none'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      `style-src 'self' 'nonce-${nonce}'`,
      `script-src 'nonce-${nonce}' 'strict-dynamic' https:`,
      "connect-src 'self' https://au-api.basiq.io https://consent.basiq.io",
      'upgrade-insecure-requests',
    ].join('; ');
    
    ctx.res.setHeader('Content-Security-Policy', csp);
  }
  
  return {
    ...initialProps,
    __NONCE__: nonce,
  };
};

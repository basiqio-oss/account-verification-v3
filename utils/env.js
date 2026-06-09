const HEX_SECRET_REGEX = /^[a-f0-9]{64,}$/i;

export function requireEnv(name) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`${name} environment variable is not set`);
  }
  return value;
}

export function requireSessionSecret() {
  const secret = requireEnv('SESSION_SECRET');
  if (!HEX_SECRET_REGEX.test(secret)) {
    throw new Error('SESSION_SECRET must be a random hex string of at least 64 chars (32 bytes)');
  }
  return secret;
}

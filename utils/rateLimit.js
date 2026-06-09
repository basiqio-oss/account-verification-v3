const windows = new Map();

function prune(now) {
  for (const [key, entry] of windows.entries()) {
    if (entry.resetAt <= now) windows.delete(key);
  }
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }
  return req.socket?.remoteAddress ?? 'unknown';
}

// Best-effort in-memory limiter for abuse control.
export function consumeRateLimit(req, { keyPrefix, maxRequests, windowMs }) {
  const now = Date.now();
  prune(now);

  const clientIp = getClientIp(req);
  const key = `${keyPrefix}:${clientIp}`;

  let entry = windows.get(key);
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + windowMs };
  }

  entry.count += 1;
  windows.set(key, entry);

  return {
    allowed: entry.count <= maxRequests,
    remaining: Math.max(0, maxRequests - entry.count),
    resetAt: entry.resetAt,
  };
}

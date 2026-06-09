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

function consumeInMemoryRateLimit(req, { keyPrefix, maxRequests, windowMs }) {
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

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

async function consumeUpstashRateLimit(req, options) {
  const { keyPrefix, maxRequests, windowMs } = options;
  const config = getUpstashConfig();
  if (!config) return null;

  const key = `${keyPrefix}:${getClientIp(req)}`;

  // INCR then set TTL once on first key creation.
  const response = await fetch(`${config.url}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      ['INCR', key],
      ['PEXPIRE', key, String(windowMs), 'NX'],
      ['PTTL', key],
    ]),
  });

  if (!response.ok) {
    throw new Error(`Upstash rate-limit request failed with ${response.status}`);
  }

  const results = await response.json();
  const count = Number(results?.[0]?.result ?? 0);
  const ttlMs = Number(results?.[2]?.result ?? windowMs);
  const resetAt = Date.now() + Math.max(0, ttlMs);

  return {
    allowed: count <= maxRequests,
    remaining: Math.max(0, maxRequests - count),
    resetAt,
  };
}

// Prefer distributed limiter in production, fallback to in-memory for local/dev.
export async function consumeRateLimit(req, options) {
  try {
    const distributed = await consumeUpstashRateLimit(req, options);
    if (distributed) return distributed;
  } catch (error) {
    // Keep service available if the rate-limit backend is unavailable.
    console.error('[rate-limit] falling back to in-memory limiter:', error.message);
  }

  return consumeInMemoryRateLimit(req, options);
}

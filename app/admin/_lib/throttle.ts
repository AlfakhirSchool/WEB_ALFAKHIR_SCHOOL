import "server-only";

/**
 * Basic in-memory login throttling (per server instance). Keys are "ip|username" (5 fails / 10 min)
 * and "ip" alone (20 fails / 10 min, stops spraying many usernames from one address).
 */
const WINDOW_MS = 10 * 60_000;
const LIMITS = { user: 5, ip: 20 } as const;
const fails = new Map<string, number[]>();

type Kind = keyof typeof LIMITS;
const recent = (key: string, now: number) => (fails.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

function sweep(now: number) {
  if (fails.size < 5000) return;
  for (const [key, times] of fails) if (!times.some((t) => now - t < WINDOW_MS)) fails.delete(key);
}

/** Milliseconds until another attempt is allowed for any of the keys; 0 = allowed. */
export function retryAfter(keys: [Kind, string][]): number {
  const now = Date.now();
  let wait = 0;
  for (const [kind, key] of keys) {
    const times = recent(key, now);
    if (times.length >= LIMITS[kind]) wait = Math.max(wait, times[times.length - LIMITS[kind]] + WINDOW_MS - now);
  }
  return wait;
}

export function recordFailure(keys: [Kind, string][]) {
  const now = Date.now();
  sweep(now);
  for (const [, key] of keys) fails.set(key, [...recent(key, now), now]);
}

export function clearFailures(key: string) {
  fails.delete(key);
}

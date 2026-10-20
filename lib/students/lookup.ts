import "server-only";
import { db } from "@/lib/db";
import { NIS_RE } from "./types";

const WINDOW_MS = 10 * 60_000;
/** Failed NIS guesses allowed per IP per window. */
const MAX_MISSES = 10;
/** Successful requests (each may build a PDF) allowed per IP per window. */
const MAX_HITS = 40;
const MAX_TRACKED = 5_000;

type Entry = { misses: number[]; hits: number[] };
// On globalThis so every route bundle (and dev hot reload) shares one table instead of each getting its own.
const g = globalThis as unknown as { __dokumenAttempts?: Map<string, Entry> };
const seen = (g.__dokumenAttempts ??= new Map<string, Entry>());

export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function entryFor(ip: string, now: number): Entry {
  const e = seen.get(ip) ?? { misses: [], hits: [] };
  e.misses = e.misses.filter((t) => now - t < WINDOW_MS);
  e.hits = e.hits.filter((t) => now - t < WINDOW_MS);
  seen.set(ip, e);
  if (seen.size > MAX_TRACKED) {
    for (const [k, v] of seen) if (v.misses.every((t) => now - t >= WINDOW_MS) && v.hits.every((t) => now - t >= WINDOW_MS)) seen.delete(k);
  }
  return e;
}

/** True when this IP has used up its attempts. Per server instance (in-memory), like the lead form limiter. */
export function blocked(ip: string): boolean {
  const e = entryFor(ip, Date.now());
  return e.misses.length >= MAX_MISSES || e.hits.length >= MAX_HITS;
}

export function record(ip: string, found: boolean) {
  const now = Date.now();
  entryFor(ip, now)[found ? "hits" : "misses"].push(now);
}

/** Misses take at least this long, so a miss cannot be told from a hit by response time. */
export const MIN_MISS_MS = 300;
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** The student for a public NIS lookup: null unless the NIS is well-formed, exists and downloads are enabled. */
export async function findPublicStudent(nis: unknown) {
  if (typeof nis !== "string") return null;
  const v = nis.trim();
  if (!NIS_RE.test(v)) return null;
  const s = await db.studentRecord.findUnique({ where: { nis: v } });
  return s && s.enabled ? s : null;
}

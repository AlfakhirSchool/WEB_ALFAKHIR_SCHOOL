import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_SOURCE = 60;
const MAX_FIELDS = 20;
const MAX_VALUE = 2000;
const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;
const MAX_TRACKED_IPS = 5_000;

const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > MAX_TRACKED_IPS) {
    for (const [k, ts] of hits) {
      if (ts.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return false;
}

const bad = () => NextResponse.json({ error: "Invalid payload" }, { status: 400 });

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    if (rateLimited(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    let data: unknown;
    try {
      data = await req.json();
    } catch {
      return bad();
    }
    if (!data || typeof data !== "object" || Array.isArray(data)) return bad();
    const { source, fields, website } = data as { source?: unknown; fields?: unknown; website?: unknown };

    if (typeof website === "string" && website.trim() !== "") return new NextResponse(null, { status: 204 });

    if (typeof source !== "string" || source.length === 0 || source.length > MAX_SOURCE) return bad();
    if (!fields || typeof fields !== "object" || Array.isArray(fields)) return bad();
    const entries = Object.entries(fields as Record<string, unknown>);
    if (entries.length > MAX_FIELDS) return bad();
    const clean: Record<string, string> = {};
    for (const [k, val] of entries) {
      if (typeof val !== "string" || val.length > MAX_VALUE || k.length > MAX_SOURCE) return bad();
      if (k === "website") {
        if (val.trim() !== "") return new NextResponse(null, { status: 204 });
        continue;
      }
      clean[k] = val;
    }

    const url = process.env.LEAD_WEBHOOK_URL;
    if (!url) {
      console.info(`[lead] source=${source}`);
      return new NextResponse(null, { status: 204 });
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, fields: clean, receivedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) return NextResponse.json({ error: "Upstream failure" }, { status: 502 });
    } catch {
      return NextResponse.json({ error: "Upstream failure" }, { status: 502 });
    }
    console.info(`[lead] source=${source}`);
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

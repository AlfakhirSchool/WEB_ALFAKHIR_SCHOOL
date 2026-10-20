import { NextResponse } from "next/server";
import { blocked, clientIp, findPublicStudent, MIN_MISS_MS, record, sleep } from "@/lib/students/lookup";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADERS = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
const NOT_FOUND = "NIS tidak ditemukan atau dokumen belum tersedia.";

/** Step 1: `{ nis }` → the student's first name, jenjang and available documents. Nothing else is revealed. */
export async function POST(req: Request) {
  const ip = clientIp(req);
  if (blocked(ip)) return NextResponse.json({ error: "Terlalu banyak percobaan. Coba lagi beberapa menit lagi." }, { status: 429, headers: { ...HEADERS, "Retry-After": "600" } });
  const body: unknown = await req.json().catch(() => null);
  const nis = body && typeof body === "object" && "nis" in body ? body.nis : null;
  const started = Date.now();
  const s = await findPublicStudent(nis);
  record(ip, !!s);
  if (!s) {
    await sleep(Math.max(0, MIN_MISS_MS - (Date.now() - started)));
    return NextResponse.json({ error: NOT_FOUND }, { status: 404, headers: HEADERS });
  }
  const firstName = s.name.trim().split(/\s+/)[0] ?? "";
  const docs = ["profil", ...(s.ppdbYear && s.ppdbStatus ? ["ppdb"] : [])];
  return NextResponse.json({ firstName, jenjang: s.jenjang, docs }, { headers: HEADERS });
}

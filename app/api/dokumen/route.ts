import { NextResponse } from "next/server";
import { blocked, clientIp, findPublicStudent, MIN_MISS_MS, record, sleep } from "@/lib/students/lookup";
import { buildStudentPdf } from "@/lib/students/pdf";
import { docFileName } from "@/lib/students/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADERS = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
const NOT_FOUND = "NIS tidak ditemukan atau dokumen belum tersedia.";

/** Step 2: `{ nis, type: "profil" | "ppdb" }` → the PDF, encrypted with the NIS as open-password. */
export async function POST(req: Request) {
  const ip = clientIp(req);
  if (blocked(ip)) return NextResponse.json({ error: "Terlalu banyak percobaan. Coba lagi beberapa menit lagi." }, { status: 429, headers: { ...HEADERS, "Retry-After": "600" } });
  const body: unknown = await req.json().catch(() => null);
  const nis = body && typeof body === "object" && "nis" in body ? body.nis : null;
  const type = body && typeof body === "object" && "type" in body ? body.type : null;
  const started = Date.now();
  const s = type === "profil" || type === "ppdb" ? await findPublicStudent(nis) : null;
  record(ip, !!s);
  if (!s || (type === "ppdb" && !(s.ppdbYear && s.ppdbStatus))) {
    await sleep(Math.max(0, MIN_MISS_MS - (Date.now() - started)));
    return NextResponse.json({ error: NOT_FOUND }, { status: 404, headers: HEADERS });
  }
  const pdf = await buildStudentPdf(type === "profil" ? "profil" : "ppdb", s);
  const name = docFileName(type === "profil" ? "Profil" : "PPDB", s.name, s.nis);
  return new Response(new Uint8Array(pdf), {
    headers: { ...HEADERS, "Content-Type": "application/pdf", "Content-Length": String(pdf.length), "Content-Disposition": `attachment; filename="${name}"` },
  });
}

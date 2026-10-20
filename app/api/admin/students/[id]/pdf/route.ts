import { db } from "@/lib/db";
import { adminOr401, jsonError } from "@/lib/content/journals";
import { buildStudentPdf } from "@/lib/students/pdf";
import { docFileName } from "@/lib/students/store";
import { DOC_TYPES, type StudentDocType } from "@/lib/students/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Dashboard download of a student's NIS-encrypted PDF (`?type=profil|ppdb`). Works for disabled records too. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await adminOr401();
  if (denied) return denied;
  const type = new URL(req.url).searchParams.get("type");
  const kind = DOC_TYPES.find((t): t is StudentDocType => t === type);
  if (!kind) return jsonError("Jenis dokumen harus profil atau ppdb.", 400);
  const s = await db.studentRecord.findUnique({ where: { id: (await params).id } });
  if (!s) return jsonError("Data siswa tidak ditemukan.", 404);
  const pdf = await buildStudentPdf(kind, s);
  const name = docFileName(kind === "profil" ? "Profil" : "PPDB", s.name, s.nis);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(pdf.length),
      "Content-Disposition": `attachment; filename="${name}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, Unauthorized } from "@/lib/auth/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_PDF_BYTES = 4 * 1024 * 1024;

/** Real file type from the file's first bytes (the browser-declared type is not trusted). */
function sniff(b: Uint8Array, allowPdf: boolean): string | null {
  if (b.length >= 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 && b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a) return "image/png";
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  const ascii = (from: number, to: number) => String.fromCharCode(...b.subarray(from, to));
  if (b.length >= 6 && (ascii(0, 6) === "GIF87a" || ascii(0, 6) === "GIF89a")) return "image/gif";
  if (b.length >= 12 && ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  if (allowPdf && b.length >= 5 && ascii(0, 5) === "%PDF-") return "application/pdf";
  return null;
}

/** Upload one image (PNG, JPEG, WebP, GIF ≤ 2 MB) or brochure (image/PDF ≤ 4 MB when `allowPdf=1`). Returns its public URL. */
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (e) {
    if (e instanceof Unauthorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    throw e;
  }
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const allowPdf = form?.get("allowPdf") === "1";
  const maxBytes = allowPdf ? MAX_PDF_BYTES : MAX_IMAGE_BYTES;
  if (!(file instanceof File)) return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
  if (file.size === 0) return NextResponse.json({ error: "File kosong." }, { status: 400 });
  if (file.size > maxBytes) {
    return NextResponse.json({ error: `Ukuran file maksimal ${allowPdf ? "4 MB" : "2 MB"}.` }, { status: 413 });
  }
  const data = new Uint8Array(await file.arrayBuffer());
  const mime = sniff(data, allowPdf);
  if (!mime) {
    return NextResponse.json(
      { error: allowPdf ? "Format harus PDF, PNG, JPG, atau WebP." : "Format harus PNG, JPG, WebP, atau GIF." },
      { status: 415 },
    );
  }
  const name = (file.name || (mime === "application/pdf" ? "brosur.pdf" : "gambar")).replace(/[^\w.\-() ]+/g, "_").slice(0, 120);
  const media = await db.media.create({ data: { name, mime, data }, select: { id: true } });
  return NextResponse.json(
    { url: `/api/media/${media.id}`, mime, name, kind: mime === "application/pdf" ? "pdf" : "image" },
    { status: 201 },
  );
}

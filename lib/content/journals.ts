import "server-only";
import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, Unauthorized } from "@/lib/auth/server";
import { CONTENT_TAG } from "./store";
import { JOURNAL_JENJANG, JOURNAL_LIMITS, JOURNAL_MAX_BYTES, type JournalItem, type JournalJenjang } from "./journal-types";

/** Everything except the PDF bytes: list queries must never load the `file` column. */
export const journalListSelect = {
  id: true, title: true, author: true, className: true, jenjang: true, year: true, abstract: true,
  fileName: true, fileSize: true, published: true, createdAt: true,
} as const;

type Row = { id: string; title: string; author: string; className: string; jenjang: string; year: string; abstract: string; fileName: string; fileSize: number; published: boolean; createdAt: Date };

export function toJournalItem(r: Row): JournalItem {
  return { ...r, jenjang: r.jenjang === "SMP" ? "SMP" : "SD", createdAt: r.createdAt.toISOString() };
}

/** Dashboard list: all journals, newest first. Uncached. */
export async function listAllJournals(): Promise<JournalItem[]> {
  const rows = await db.journal.findMany({ select: journalListSelect, orderBy: { createdAt: "desc" } });
  return rows.map(toJournalItem);
}

/** Public list: published journals only, newest first. Cached until a dashboard write calls `contentChanged()`. */
export const getPublishedJournals = unstable_cache(
  async (): Promise<JournalItem[]> => {
    try {
      const rows = await db.journal.findMany({ where: { published: true }, select: journalListSelect, orderBy: { createdAt: "desc" } });
      return rows.map(toJournalItem);
    } catch (err) {
      console.error("[journals] unavailable:", err instanceof Error ? err.message : err);
      return [];
    }
  },
  ["journals-published"],
  { tags: [CONTENT_TAG], revalidate: 300 },
);

/** 401 response when the caller is not a logged-in admin, otherwise null. */
export async function adminOr401(): Promise<NextResponse | null> {
  try {
    await requireAdmin();
    return null;
  } catch (e) {
    if (e instanceof Unauthorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    throw e;
  }
}

export const jsonError = (error: string, status: number) => NextResponse.json({ error }, { status });

/** A PDF starts with the bytes `%PDF-`. The browser-declared type and file name are not trusted. */
export function isPdf(b: Uint8Array): boolean {
  return b.length >= 5 && b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 && b[4] === 0x2d;
}

/** Rejects early on an oversized body so a huge upload is never buffered (multipart adds a little overhead). */
export function tooLargeBody(req: Request): boolean {
  const len = Number(req.headers.get("content-length"));
  return Number.isFinite(len) && len > JOURNAL_MAX_BYTES + 512 * 1024;
}

export type PdfUpload = { data: Uint8Array<ArrayBuffer>; fileName: string };

/** Reads and validates the uploaded PDF (`file` field). `null` when no file was sent. */
export async function readPdf(form: FormData): Promise<PdfUpload | null | NextResponse> {
  const file = form.get("file");
  if (!(file instanceof File) || (file.size === 0 && !file.name)) return null;
  if (file.size === 0) return jsonError("File PDF kosong.", 400);
  if (file.size > JOURNAL_MAX_BYTES) return jsonError("Ukuran file maksimal 4 MB.", 413);
  const data = new Uint8Array(await file.arrayBuffer());
  if (!isPdf(data)) return jsonError("File harus berformat PDF.", 415);
  const base = (file.name || "jurnal.pdf").replace(/[\r\n"\\/]+/g, "_").replace(/[^\w.\-() ]+/g, "_").slice(0, 120).trim() || "jurnal.pdf";
  return { data, fileName: /\.pdf$/i.test(base) ? base : `${base}.pdf` };
}

export type JournalFields = { title?: string; author?: string; className?: string; jenjang?: JournalJenjang; year?: string; abstract?: string; published?: boolean };

/** Reads the metadata fields present in `form`. With `requireAll`, title, author and jenjang must be present and valid. */
export function readFields(form: FormData, requireAll: boolean): JournalFields | NextResponse {
  const out: JournalFields = {};
  const text = (name: keyof typeof JOURNAL_LIMITS, label: string, required: boolean): NextResponse | undefined => {
    const raw = form.get(name);
    if (raw === null) {
      if (required && requireAll) return jsonError(`${label} wajib diisi.`, 400);
      return;
    }
    if (typeof raw !== "string") return jsonError(`${label} tidak valid.`, 400);
    const v = name === "abstract" ? raw.replace(/\r\n/g, "\n").trim() : raw.replace(/\s+/g, " ").trim();
    if (required && !v) return jsonError(`${label} wajib diisi.`, 400);
    if (v.length > JOURNAL_LIMITS[name]) return jsonError(`${label} maksimal ${JOURNAL_LIMITS[name]} karakter.`, 400);
    out[name] = v;
  };
  const err = text("title", "Judul", true) ?? text("author", "Nama siswa", true) ?? text("className", "Kelas", false) ?? text("year", "Tahun ajaran", false) ?? text("abstract", "Abstrak", false);
  if (err) return err;
  const jenjang = form.get("jenjang");
  if (jenjang === null) {
    if (requireAll) return jsonError("Jenjang wajib dipilih.", 400);
  } else if (typeof jenjang === "string" && (JOURNAL_JENJANG as readonly string[]).includes(jenjang)) {
    out.jenjang = jenjang as JournalJenjang;
  } else return jsonError("Jenjang harus SD atau SMP.", 400);
  const published = form.get("published");
  if (published !== null) out.published = published === "true";
  return out;
}

/** Streams a stored PDF. `publishedOnly` is the public rule; the dashboard preview may open hidden journals. */
export async function servePdf(req: Request, id: string, opts: { publishedOnly: boolean }): Promise<Response> {
  const notFound = () => new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
  const meta = await db.journal.findUnique({ where: { id }, select: { published: true, updatedAt: true, fileName: true, fileSize: true } });
  if (!meta || (opts.publishedOnly && !meta.published)) return notFound();

  // Revalidated on every request (`no-cache`), so hiding or deleting a journal takes effect immediately.
  const etag = `"${meta.updatedAt.getTime().toString(36)}-${meta.fileSize.toString(36)}"`;
  const cache = opts.publishedOnly ? "public, no-cache" : "private, no-cache";
  if (req.headers.get("if-none-match") === etag) return new Response(null, { status: 304, headers: { ETag: etag, "Cache-Control": cache } });

  const row = await db.journal.findUnique({ where: { id }, select: { file: true } });
  if (!row) return notFound();

  const attachment = new URL(req.url).searchParams.get("download") === "1";
  const ascii = meta.fileName.replace(/[^\x20-\x7e]+/g, "_").replace(/["\\]/g, "_");
  const disposition = `${attachment ? "attachment" : "inline"}; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(meta.fileName)}`;
  return new Response(row.file as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(row.file.byteLength),
      "Content-Disposition": disposition,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": cache,
      ETag: etag,
    },
  });
}

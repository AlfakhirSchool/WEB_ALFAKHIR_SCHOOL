import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { contentChanged } from "@/lib/content/store";
import { adminOr401, jsonError, journalListSelect, readFields, readPdf, servePdf, toJournalItem, tooLargeBody } from "@/lib/content/journals";
import { JOURNAL_MAX_BYTES } from "@/lib/content/journal-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

const isMissing = (e: unknown) => e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025";

/** Dashboard preview of a journal's PDF, hidden ones included. */
export async function GET(req: Request, { params }: Ctx) {
  const denied = await adminOr401();
  if (denied) return denied;
  return servePdf(req, (await params).id, { publishedOnly: false });
}

/** Partial update (multipart): any metadata field present is changed; a `file` field replaces the PDF. */
export async function PUT(req: Request, { params }: Ctx) {
  const denied = await adminOr401();
  if (denied) return denied;
  if (tooLargeBody(req)) return jsonError(`Ukuran file maksimal ${JOURNAL_MAX_BYTES / 1024 / 1024} MB.`, 413);
  const form = await req.formData().catch(() => null);
  if (!form) return jsonError("Permintaan tidak valid.", 400);

  const fields = readFields(form, false);
  if (fields instanceof NextResponse) return fields;
  const pdf = await readPdf(form);
  if (pdf instanceof NextResponse) return pdf;

  try {
    const row = await db.journal.update({
      where: { id: (await params).id },
      data: { ...fields, ...(pdf ? { fileName: pdf.fileName, fileSize: pdf.data.byteLength, file: pdf.data } : {}) },
      select: journalListSelect,
    });
    await contentChanged();
    return NextResponse.json({ journal: toJournalItem(row) });
  } catch (e) {
    if (isMissing(e)) return jsonError("Jurnal tidak ditemukan.", 404);
    throw e;
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const denied = await adminOr401();
  if (denied) return denied;
  try {
    await db.journal.delete({ where: { id: (await params).id }, select: { id: true } });
  } catch (e) {
    if (isMissing(e)) return jsonError("Jurnal tidak ditemukan.", 404);
    throw e;
  }
  await contentChanged();
  return NextResponse.json({ ok: true });
}

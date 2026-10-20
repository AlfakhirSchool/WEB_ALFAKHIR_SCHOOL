import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contentChanged } from "@/lib/content/store";
import { adminOr401, jsonError, journalListSelect, readFields, readPdf, toJournalItem, tooLargeBody } from "@/lib/content/journals";
import { JOURNAL_MAX_BYTES, currentSchoolYear } from "@/lib/content/journal-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Create a journal (multipart): title, author, className, jenjang, year, abstract, published and the PDF `file` (≤ 4 MB). */
export async function POST(req: Request) {
  const denied = await adminOr401();
  if (denied) return denied;
  if (tooLargeBody(req)) return jsonError(`Ukuran file maksimal ${JOURNAL_MAX_BYTES / 1024 / 1024} MB.`, 413);
  const form = await req.formData().catch(() => null);
  if (!form) return jsonError("Permintaan tidak valid.", 400);

  const fields = readFields(form, true);
  if (fields instanceof NextResponse) return fields;
  const pdf = await readPdf(form);
  if (pdf instanceof NextResponse) return pdf;
  if (!pdf) return jsonError("File PDF wajib diunggah.", 400);

  const row = await db.journal.create({
    data: {
      title: fields.title!, author: fields.author!, jenjang: fields.jenjang!,
      className: fields.className ?? "", year: fields.year ?? currentSchoolYear(), abstract: fields.abstract ?? "",
      published: fields.published ?? true,
      fileName: pdf.fileName, fileSize: pdf.data.byteLength, file: pdf.data,
    },
    select: journalListSelect,
  });
  await contentChanged();
  return NextResponse.json({ journal: toJournalItem(row) }, { status: 201 });
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminOr401, jsonError } from "@/lib/content/journals";
import { isDuplicateNis, isMissing, parseStudentInput, toStudentItem } from "@/lib/students/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** Full update of a student record (JSON body, see StudentInput). */
export async function PUT(req: Request, { params }: Ctx) {
  const denied = await adminOr401();
  if (denied) return denied;
  const body: unknown = await req.json().catch(() => null);
  const parsed = parseStudentInput(body);
  if (!parsed.ok) return jsonError(parsed.error, 400);
  try {
    const row = await db.studentRecord.update({ where: { id: (await params).id }, data: parsed.data });
    return NextResponse.json({ student: toStudentItem(row) });
  } catch (e) {
    if (isDuplicateNis(e)) return jsonError(`NIS ${parsed.data.nis} sudah terdaftar pada siswa lain.`, 409);
    if (isMissing(e)) return jsonError("Data siswa tidak ditemukan.", 404);
    throw e;
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const denied = await adminOr401();
  if (denied) return denied;
  try {
    await db.studentRecord.delete({ where: { id: (await params).id }, select: { id: true } });
  } catch (e) {
    if (isMissing(e)) return jsonError("Data siswa tidak ditemukan.", 404);
    throw e;
  }
  return NextResponse.json({ ok: true });
}

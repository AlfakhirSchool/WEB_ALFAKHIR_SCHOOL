import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminOr401, jsonError } from "@/lib/content/journals";
import { isDuplicateNis, parseStudentInput, toStudentItem } from "@/lib/students/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Create a student record (JSON body, see StudentInput). */
export async function POST(req: Request) {
  const denied = await adminOr401();
  if (denied) return denied;
  const body: unknown = await req.json().catch(() => null);
  const parsed = parseStudentInput(body);
  if (!parsed.ok) return jsonError(parsed.error, 400);
  try {
    const row = await db.studentRecord.create({ data: parsed.data });
    return NextResponse.json({ student: toStudentItem(row) }, { status: 201 });
  } catch (e) {
    if (isDuplicateNis(e)) return jsonError(`NIS ${parsed.data.nis} sudah terdaftar pada siswa lain.`, 409);
    throw e;
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, Unauthorized } from "@/lib/auth/server";
import { contentChanged } from "@/lib/content/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_ITEMS = 200;
const MAX_LEN = 5000;

type Item = { scope: string; source: string; value: string };

function parse(body: unknown): Item[] | null {
  const items = (body as { items?: unknown } | null)?.items;
  if (!Array.isArray(items) || items.length === 0 || items.length > MAX_ITEMS) return null;
  const out: Item[] = [];
  for (const it of items) {
    const { scope, source, value } = (it ?? {}) as Record<string, unknown>;
    if (typeof scope !== "string" || typeof source !== "string" || typeof value !== "string") return null;
    if (!scope || scope.length > 100 || !source || source.length > MAX_LEN || value.length > MAX_LEN) return null;
    out.push({ scope, source, value: value.trim() });
  }
  return out;
}

/** Save in-page text edits. `value` equal to `source` (or empty) removes the override, restoring the original text. */
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (e) {
    if (e instanceof Unauthorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    throw e;
  }
  const items = parse(await req.json().catch(() => null));
  if (!items) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  await db.$transaction(
    items.map(({ scope, source, value }) =>
      !value || value === source
        ? db.textOverride.deleteMany({ where: { scope, source } })
        : db.textOverride.upsert({ where: { scope_source: { scope, source } }, create: { scope, source, value }, update: { value } }),
    ),
  );
  await contentChanged();
  return NextResponse.json({ ok: true, saved: items.length });
}

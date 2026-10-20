import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, Unauthorized } from "@/lib/auth/server";
import { contentChanged } from "@/lib/content/store";
import { pruneMedia } from "@/lib/content/media";
import { parseSetting } from "@/content/settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Change site photos. Body: `{ set?: { "<original src>": "<new url>" }, clear?: ["<original src>"] }`.
 * The changes are merged into the saved `images` setting (so concurrent editors never overwrite each other's photos);
 * `clear` restores the original photo. Returns the full saved map.
 */
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (e) {
    if (e instanceof Unauthorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    throw e;
  }
  const body = (await req.json().catch(() => null)) as { set?: unknown; clear?: unknown } | null;
  const set = body?.set ?? {};
  const clear = body?.clear ?? [];
  if (!set || typeof set !== "object" || Array.isArray(set) || !Array.isArray(clear) || clear.some((c) => typeof c !== "string")) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const row = await db.setting.findUnique({ where: { key: "images" } });
  const next: Record<string, unknown> = { ...(row ? parseSetting("images", row.value) : null) };
  for (const c of clear as string[]) delete next[c];
  Object.assign(next, set);

  const parsed = parseSetting("images", next);
  if (!parsed) return NextResponse.json({ error: "Daftar foto tidak valid." }, { status: 400 });

  await db.setting.upsert({ where: { key: "images" }, create: { key: "images", value: parsed }, update: { value: parsed } });
  await contentChanged();
  await pruneMedia();
  return NextResponse.json({ ok: true, images: parsed });
}

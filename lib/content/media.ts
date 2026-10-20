import "server-only";
import { db } from "@/lib/db";

const MEDIA_RE = /\/api\/media\/([a-z0-9]+)/gi;

/** Uploaded images that no setting references any more (older than a day, so unsaved fresh uploads survive). */
export async function pruneMedia() {
  const rows = await db.setting.findMany({ select: { value: true } });
  const used = new Set<string>();
  for (const r of rows) for (const m of JSON.stringify(r.value).matchAll(MEDIA_RE)) used.add(m[1]);
  // Student photos live in StudentRecord rows, not in settings.
  for (const r of await db.studentRecord.findMany({ where: { photo: { not: "" } }, select: { photo: true } })) {
    for (const m of r.photo.matchAll(MEDIA_RE)) used.add(m[1]);
  }
  await db.media.deleteMany({ where: { id: { notIn: [...used] }, createdAt: { lt: new Date(Date.now() - 86_400_000) } } });
}

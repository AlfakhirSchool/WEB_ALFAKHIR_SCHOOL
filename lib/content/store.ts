import "server-only";
import { unstable_cache, revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { SETTING_KEYS, defaultSettings, parseSetting, type SettingKey, type Settings } from "@/content/settings";
import { overrideKey, type OverrideMap } from "./keys";

/** Cache tag for everything editable from the dashboard. Saving anything calls `contentChanged()`. */
export const CONTENT_TAG = "content";

/**
 * Page-text overrides. Cached across requests; invalidated by `contentChanged()`.
 * Database unreachable (e.g. build without DATABASE_URL) → no overrides, the code's text is shown.
 */
export const getOverrides = unstable_cache(
  async (): Promise<OverrideMap> => {
    try {
      const rows = await db.textOverride.findMany({ select: { scope: true, source: true, value: true } });
      const map: OverrideMap = {};
      for (const r of rows) map[overrideKey(r.scope, r.source)] = r.value;
      return map;
    } catch (err) {
      console.error("[content] overrides unavailable, using code defaults:", err instanceof Error ? err.message : err);
      return {};
    }
  },
  ["content-overrides"],
  { tags: [CONTENT_TAG], revalidate: 300 },
);

/** Dashboard settings merged over defaults. Invalid or missing stored values fall back to defaults per key. */
export const getSettings = unstable_cache(
  async (): Promise<Settings> => {
    const settings: Settings = structuredClone(defaultSettings);
    try {
      const rows = await db.setting.findMany();
      for (const row of rows) {
        const key = SETTING_KEYS.find((k) => k === row.key);
        if (!key) continue;
        const parsed = parseSetting(key, row.value);
        if (parsed) (settings as Record<SettingKey, unknown>)[key] = parsed;
        else console.error(`[content] stored setting "${row.key}" is invalid, using default`);
      }
    } catch (err) {
      console.error("[content] settings unavailable, using defaults:", err instanceof Error ? err.message : err);
    }
    return settings;
  },
  ["content-settings"],
  { tags: [CONTENT_TAG], revalidate: 300 },
);

/**
 * Call (and await) after any dashboard write so cached pages pick up the change. The tag is invalidated and the
 * caches are refilled inside the same request: invalidating alone is not seen by other requests on a dev server.
 */
export async function contentChanged() {
  revalidateTag(CONTENT_TAG);
  await Promise.all([getSettings(), getOverrides()]);
}

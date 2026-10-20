import "server-only";
import { db } from "@/lib/db";
import { defaultSettings, parseSetting, type SettingKey } from "@/content/settings";
import type { LoadedSetting } from "@/components/admin/types";

/** Uncached read for the dashboard forms: the saved value if valid, else the default. */
export async function loadSetting<K extends SettingKey>(key: K): Promise<LoadedSetting<K>> {
  const row = await db.setting.findUnique({ where: { key } });
  const parsed = row ? parseSetting(key, row.value) : null;
  return { value: parsed ?? structuredClone(defaultSettings[key]), custom: parsed !== null, updatedAt: parsed && row ? row.updatedAt.toISOString() : null };
}

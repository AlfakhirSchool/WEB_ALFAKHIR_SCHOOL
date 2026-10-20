import type { SettingKey, Settings } from "@/content/settings";

/** Dashboard form props: the current value and whether it is a saved (non-default) value. */
export type LoadedSetting<K extends SettingKey> = { value: Settings[K]; custom: boolean; updatedAt: string | null };

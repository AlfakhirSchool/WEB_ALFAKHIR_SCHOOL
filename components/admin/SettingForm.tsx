"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { defaultSettings, type SettingKey, type Settings } from "@/content/settings";
import { resetSetting, saveSetting } from "@/app/admin/actions";
import { EmptyState, Icon, StatusMessage, TimeAgo, btnPrimary, btnSecondary, iconBtn, useUnsavedGuard, type Status } from "./ui";

/** Form state for one dashboard setting: edit locally, save (validated server-side) or restore the default. */
export function useSetting<K extends SettingKey>(key: K, initial: Settings[K]) {
  const router = useRouter();
  const [value, setValue] = useState<Settings[K]>(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [status, setStatus] = useState<Status>(null);
  const [pending, start] = useTransition();
  const dirty = JSON.stringify(value) !== saved;
  useUnsavedGuard(dirty);

  const update = (next: Settings[K]) => { setValue(next); setStatus(null); };

  const save = (clientError?: string | null) => {
    if (clientError) { setStatus({ kind: "error", text: clientError }); return; }
    start(async () => {
      const res = await saveSetting(key, value);
      if (!res.ok) { setStatus({ kind: "error", text: res.error }); return; }
      setSaved(JSON.stringify(value));
      setStatus({ kind: "ok", text: res.message });
      router.refresh();
    });
  };

  const reset = () => {
    if (!confirm("Kembalikan ke isi bawaan? Semua perubahan pada bagian ini akan dihapus.")) return;
    start(async () => {
      const res = await resetSetting(key);
      if (!res.ok) { setStatus({ kind: "error", text: res.error }); return; }
      const def = structuredClone(defaultSettings[key]);
      setValue(def);
      setSaved(JSON.stringify(def));
      setStatus({ kind: "ok", text: res.message });
      router.refresh();
    });
  };

  return { value, update, save, reset, dirty, pending, status };
}

/** Sticky footer with save / restore-default buttons and the result message. */
export function SaveBar({ form, custom, updatedAt, onSave, inline = false }: {
  form: { dirty: boolean; pending: boolean; status: Status; reset: () => void };
  custom: boolean;
  updatedAt: string | null;
  onSave: () => void;
  /** Plain row inside a card instead of the sticky page footer. */
  inline?: boolean;
}) {
  return (
    <div className={inline ? "mt-5 border-t border-slate-100 pt-4" : "sticky bottom-0 z-20 -mx-4 mt-6 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"}>
      <div className="mx-auto flex max-w-5xl flex-col gap-3">
        <StatusMessage status={form.status} />
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={onSave} disabled={form.pending || !form.dirty} className={`${btnPrimary} flex-1 whitespace-nowrap sm:flex-none`}>
            <Icon name={form.pending ? "progress_activity" : "save"} className={`text-[20px] ${form.pending ? "animate-spin" : ""}`} />
            {form.pending ? "Menyimpan…" : "Simpan perubahan"}
          </button>
          <button type="button" onClick={form.reset} disabled={form.pending || !custom} className={btnSecondary} title="Hapus perubahan tersimpan dan pakai isi bawaan">
            <Icon name="restart_alt" className="text-[20px]" />
            <span className="hidden sm:inline">Kembalikan ke awal</span>
            <span className="sm:hidden">Ke awal</span>
          </button>
          <p className="w-full text-xs text-slate-500 sm:ml-auto sm:w-auto">
            {form.dirty ? <span className="font-medium text-[#E86116]">Ada perubahan yang belum disimpan</span>
              : custom && updatedAt ? <>Terakhir disimpan <TimeAgo iso={updatedAt} /></>
              : "Memakai isi bawaan"}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Editable list with add, remove and reorder controls. */
export function ListEditor<T>({ items, onChange, render, create, addLabel, max, addAt = "end", titleOf, empty }: {
  items: T[];
  onChange: (items: T[]) => void;
  render: (item: T, update: (item: T) => void, index: number) => React.ReactNode;
  create: () => T;
  addLabel: string;
  max: number;
  addAt?: "start" | "end";
  titleOf?: (item: T, index: number) => string;
  empty?: string;
}) {
  const set = (i: number, item: T) => onChange(items.map((x, j) => (j === i ? item : x)));
  const move = (i: number, d: -1 | 1) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  const remove = (i: number) => {
    if (!confirm(`Hapus item #${i + 1}?`)) return;
    onChange(items.filter((_, j) => j !== i));
  };
  const add = (
    <button type="button" disabled={items.length >= max} onClick={() => onChange(addAt === "start" ? [create(), ...items] : [...items, create()])} className={`${btnSecondary} w-full border-dashed sm:w-auto`}>
      <Icon name="add" className="text-[20px]" /> {addLabel}
    </button>
  );
  return (
    <div className="space-y-3">
      {addAt === "start" && add}
      {items.length === 0 && empty && <EmptyState title={empty} />}
      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 sm:p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="grid h-7 min-w-7 place-items-center rounded-lg bg-[#0E6A71]/10 px-1.5 text-xs font-bold text-[#0E6A71]">{i + 1}</span>
              <p className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700">{titleOf?.(item, i) ?? ""}</p>
              <button type="button" className={iconBtn} disabled={i === 0} onClick={() => move(i, -1)} aria-label={`Pindahkan item ${i + 1} ke atas`} title="Naik">
                <Icon name="arrow_upward" className="text-[20px]" />
              </button>
              <button type="button" className={iconBtn} disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label={`Pindahkan item ${i + 1} ke bawah`} title="Turun">
                <Icon name="arrow_downward" className="text-[20px]" />
              </button>
              <button type="button" className={`${iconBtn} hover:bg-red-50 hover:text-red-600`} onClick={() => remove(i)} aria-label={`Hapus item ${i + 1}`} title="Hapus">
                <Icon name="delete" className="text-[20px]" />
              </button>
            </div>
            {render(item, (x) => set(i, x), i)}
          </li>
        ))}
      </ol>
      {addAt === "end" && add}
      {items.length >= max && <p className="text-xs text-slate-500">Maksimal {max} item.</p>}
    </div>
  );
}

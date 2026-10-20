"use client";
import { usePathname } from "next/navigation";

/** Floating admin bar on the public site: toggle edit mode, save/discard staged text and photo edits, open the dashboard. */
export function EditToolbar({ editing, onToggle, changes, onDiscard, onSave, saving, error }: {
  editing: boolean;
  onToggle: (on: boolean) => void;
  /** Number of staged text + photo changes. */
  changes: number;
  onDiscard: () => void;
  onSave: () => void;
  saving: boolean;
  error: string;
}) {
  const pathname = usePathname();
  if (!editing || pathname.startsWith("/admin")) return null;

  const n = changes;
  return (
    <div className="alf-edit-bar fixed bottom-4 left-1/2 z-[95] flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-2xl bg-[#0f2a2c]/95 px-3 py-2 text-[13px] font-medium text-white shadow-2xl ring-1 ring-white/10 backdrop-blur" role="toolbar" aria-label="Alat edit admin">
      <span className="hidden px-2 text-white/70 sm:inline">{n ? `${n} perubahan belum disimpan` : "Mode Edit: klik teks atau “Ganti foto”"}</span>
      <button type="button" disabled={!n || saving} onClick={onSave} className="rounded-xl bg-[#F9AE2E] px-3 py-1.5 font-semibold text-[#1e1b16] disabled:opacity-40">
        {saving ? "Menyimpan…" : `Simpan${n ? ` (${n})` : ""}`}
      </button>
      {n > 0 && <button type="button" onClick={onDiscard} className="rounded-xl px-3 py-1.5 hover:bg-white/10">Batal</button>}
      <button type="button" onClick={() => onToggle(false)} className="rounded-xl px-3 py-1.5 hover:bg-white/10">Selesai Edit</button>
      <a href="/admin" className="rounded-xl px-3 py-1.5 hover:bg-white/10">Dashboard</a>
      {error && <span className="w-full text-center text-[12px] text-red-300" role="alert">{error}</span>}
    </div>
  );
}

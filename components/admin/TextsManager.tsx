"use client";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { resetText, saveText } from "@/app/admin/actions";
import { EmptyState, Icon, StatusMessage, TimeAgo, btnDanger, btnPrimary, inputCls, useUnsavedGuard, type Status } from "./ui";

export type TextRow = { id: string; scope: string; source: string; value: string; updatedAt: string };

/** Human names for <Scope id> areas, and the page each one lives on. */
const SCOPES: Record<string, { label: string; path?: string }> = {
  "portal/home": { label: "Portal · Beranda", path: "/" },
  "portal/yayasan": { label: "Portal · Tentang Kami", path: "/yayasan" },
  "portal/berita": { label: "Portal · Berita", path: "/berita" },
  "portal/jurnal": { label: "Portal · Jurnal Siswa", path: "/jurnal" },
  "portal/dokumen": { label: "Portal · Unduh Dokumen Siswa", path: "/dokumen" },
  "portal/kontak": { label: "Portal · Kontak", path: "/kontak" },
  "portal/ppdb": { label: "Portal · PPDB", path: "/ppdb" },
  "portal/404": { label: "Halaman tidak ditemukan (404)" },
  "sd/home": { label: "SD · Beranda", path: "/sd" },
  "sd/profil": { label: "SD · Profil", path: "/sd/profil" },
  "sd/program": { label: "SD · Program", path: "/sd/program" },
  "sd/kegiatan": { label: "SD · Kegiatan", path: "/sd/kegiatan" },
  "sd/ppdb": { label: "SD · PPDB", path: "/sd/ppdb" },
  "sd/kontak": { label: "SD · Kontak", path: "/sd/kontak" },
  "smp/home": { label: "SMP · Beranda", path: "/smp" },
  "smp/profil": { label: "SMP · Profil", path: "/smp/profil" },
  "smp/akademik": { label: "SMP · Akademik", path: "/smp/akademik" },
  "smp/kesiswaan": { label: "SMP · Kesiswaan", path: "/smp/kesiswaan" },
  "smp/ppdb": { label: "SMP · PPDB", path: "/smp/ppdb" },
  "smp/kontak": { label: "SMP · Kontak", path: "/smp/kontak" },
  "shell/portal": { label: "Header & footer Portal", path: "/" },
  "shell/sd": { label: "Header & footer SD", path: "/sd" },
  "shell/smp": { label: "Header & footer SMP", path: "/smp" },
  "shell/menu": { label: "Menu navigasi", path: "/" },
  "shell/common": { label: "Elemen umum (semua halaman)", path: "/" },
};

export function TextsManager({ rows, onOpenPage }: { rows: TextRow[]; onOpenPage?: (path: string) => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<Status>(null);
  const [, start] = useTransition();
  useUnsavedGuard(rows.some((r) => drafts[r.id] !== undefined && drafts[r.id] !== r.value));

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = new Map<string, TextRow[]>();
    for (const r of rows) {
      const label = SCOPES[r.scope]?.label ?? r.scope;
      if (q && ![r.source, r.value, label, r.scope].some((s) => s.toLowerCase().includes(q))) continue;
      out.set(r.scope, [...(out.get(r.scope) ?? []), r]);
    }
    return [...out];
  }, [rows, query]);

  const run = (id: string, fn: () => Promise<{ ok: true; message: string } | { ok: false; error: string }>) => {
    setBusy(id);
    start(async () => {
      const res = await fn();
      setBusy(null);
      setStatus((s) => ({ ...s, [id]: res.ok ? null : { kind: "error", text: res.error } }));
      setNotice(res.ok ? { kind: "ok", text: res.message } : null);
      if (res.ok) {
        setDrafts(({ [id]: _, ...rest }) => rest);
        router.refresh();
      }
    });
  };

  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#0E6A71]/10 text-[#0E6A71]"><Icon name="edit_note" className="text-[30px]" /></span>
        <p className="mt-4 font-semibold text-slate-800">Belum ada teks yang diubah</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">Pakai tab Editor Visual: pilih halaman, klik teks, ubah, lalu Simpan. Teks yang diubah akan muncul di sini.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative mb-5">
        <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-slate-400" />
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari teks atau halaman…" aria-label="Cari teks"
          className={`${inputCls} h-12 pl-11`} />
      </div>
      <p className="mb-4 text-sm text-slate-500">{rows.length} teks diubah{query && ` · ${groups.reduce((n, [, r]) => n + r.length, 0)} cocok`}</p>
      {notice && <div className="mb-4"><StatusMessage status={notice} /></div>}
      {groups.length === 0 && <p className="rounded-2xl bg-white px-4 py-10 text-center text-sm text-slate-500">Tidak ada teks yang cocok dengan pencarian.</p>}
      <div className="space-y-6">
        {groups.map(([scope, items]) => {
          const meta = SCOPES[scope];
          return (
            <section key={scope} className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <header className="flex flex-wrap items-center gap-2 border-b border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-5">
                <h2 className="text-sm font-semibold text-slate-800">{meta?.label ?? scope}</h2>
                <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{items.length}</span>
                {meta?.path && (
                  onOpenPage ? (
                    <button type="button" onClick={() => onOpenPage(meta.path!)} className="ml-auto inline-flex min-h-9 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-[#0E6A71] hover:bg-[#0E6A71]/10">
                      <Icon name="ads_click" className="text-[16px]" /> Edit di halaman
                    </button>
                  ) : (
                    <a href={`${meta.path}?edit=1`} target="_blank" rel="noopener" className="ml-auto inline-flex min-h-9 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-[#0E6A71] hover:bg-[#0E6A71]/10">
                      <Icon name="open_in_new" className="text-[16px]" /> Buka halaman
                    </a>
                  )
                )}
              </header>
              <ul className="divide-y divide-slate-100">
                {items.map((r) => {
                  const draft = drafts[r.id] ?? r.value;
                  const changed = draft !== r.value;
                  const isBusy = busy === r.id;
                  return (
                    <li key={r.id} className="px-4 py-4 sm:px-5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Teks asli</p>
                      <p className="mt-1 whitespace-pre-line break-words text-sm text-slate-500 line-through decoration-slate-300">{r.source}</p>
                      <label htmlFor={`t-${r.id}`} className="mt-3 block text-[11px] font-semibold uppercase tracking-wider text-[#0E6A71]">Teks di website</label>
                      <textarea id={`t-${r.id}`} value={draft} rows={Math.min(8, Math.max(2, Math.ceil(draft.length / 70)))} maxLength={5000}
                        onChange={(e) => { const v = e.target.value; setDrafts((d) => ({ ...d, [r.id]: v })); setStatus((s) => ({ ...s, [r.id]: null })); }}
                        className={`${inputCls} mt-1 resize-y`} />
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <button type="button" disabled={!changed || isBusy} onClick={() => run(r.id, () => saveText(r.id, draft))} className={`${btnPrimary} min-h-10`}>
                          <Icon name="save" className="text-[18px]" /> Simpan
                        </button>
                        <button type="button" disabled={isBusy} onClick={() => confirm("Kembalikan teks ini ke teks aslinya?") && run(r.id, () => resetText(r.id))} className={`${btnDanger} min-h-10`}>
                          <Icon name="undo" className="text-[18px]" /> Kembalikan ke teks asli
                        </button>
                        <span className="text-xs text-slate-400 sm:ml-auto">Diubah <TimeAgo iso={r.updatedAt} /></span>
                      </div>
                      {status[r.id] && <div className="mt-2"><StatusMessage status={status[r.id]} /></div>}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

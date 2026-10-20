"use client";
import { useMemo, useRef, useState } from "react";
import { Card, EmptyState, Field, Icon, StatusMessage, Switch, TimeAgo, btnDanger, btnPrimary, btnSecondary, inputCls, type Status } from "./ui";
import {
  JOURNAL_JENJANG, JOURNAL_LIMITS, JOURNAL_MAX_BYTES, currentSchoolYear, formatBytes,
  type JournalItem, type JournalJenjang,
} from "@/lib/content/journal-types";

type Draft = { title: string; author: string; className: string; jenjang: JournalJenjang; year: string; abstract: string; published: boolean };

const blank = (): Draft => ({ title: "", author: "", className: "", jenjang: "SMP", year: currentSchoolYear(), abstract: "", published: true });
const toDraft = (j: JournalItem): Draft => ({ title: j.title, author: j.author, className: j.className, jenjang: j.jenjang, year: j.year, abstract: j.abstract, published: j.published });

/** Returns an error message when the file cannot be a valid upload, checked in the browser before sending. */
async function checkPdf(file: File): Promise<string | null> {
  if (file.size === 0) return "File PDF kosong.";
  if (file.size > JOURNAL_MAX_BYTES) return `Ukuran file ${formatBytes(file.size)} melebihi batas 4 MB. Kecilkan PDF lalu coba lagi.`;
  const head = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  if (String.fromCharCode(...head) !== "%PDF-") return "File harus berformat PDF.";
  return null;
}

async function send(url: string, method: "POST" | "PUT" | "DELETE", body?: FormData): Promise<{ journal?: JournalItem }> {
  let res: Response;
  try {
    res = await fetch(url, { method, body });
  } catch {
    throw new Error("Tidak dapat terhubung ke server. Periksa koneksi lalu coba lagi.");
  }
  const data = (await res.json().catch(() => ({}))) as { journal?: JournalItem; error?: string };
  if (res.status === 401) throw new Error("Sesi login habis. Muat ulang halaman dan login kembali.");
  if (!res.ok) throw new Error(data.error ?? (res.status === 413 ? "Ukuran file maksimal 4 MB." : "Terjadi kesalahan. Coba lagi."));
  return data;
}

function FileDrop({ file, current, onPick, error }: { file: File | null; current?: JournalItem; onPick: (f: File | null) => void; error: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  return (
    <div>
      <input ref={input} id="journal-file" type="file" accept="application/pdf,.pdf" className="sr-only"
        onChange={(e) => { onPick(e.target.files?.[0] ?? null); e.target.value = ""; }} />
      <div
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); const f = e.dataTransfer.files?.[0]; if (f) onPick(f); }}
        className={`rounded-xl border-2 border-dashed px-4 py-5 text-center transition ${over ? "border-[#0E6A71] bg-[#0E6A71]/5" : error ? "border-red-300 bg-red-50/40" : "border-slate-300 bg-white"}`}>
        {file ? (
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <Icon name="picture_as_pdf" className="text-[28px] text-red-600" />
            <div className="min-w-0 text-left">
              <p className="break-all font-semibold text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-500">{formatBytes(file.size)}{current ? " · akan menggantikan file saat ini" : ""}</p>
            </div>
            <button type="button" onClick={() => onPick(null)} className={btnDanger}><Icon name="close" className="text-[18px]" /> Batal</button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-sm text-slate-500">
            <Icon name="upload_file" className="text-[30px] text-slate-400" />
            {current && <p className="break-all text-xs text-slate-600">File saat ini: <span className="font-semibold">{current.fileName}</span> ({formatBytes(current.fileSize)})</p>}
            <p>Tarik file PDF ke sini, atau</p>
            <button type="button" onClick={() => input.current?.click()} className={btnSecondary}>
              <Icon name="folder_open" className="text-[18px]" /> {current ? "Pilih file pengganti" : "Pilih file PDF"}
            </button>
            <p className="text-xs text-slate-400">Hanya PDF · maks. 4 MB</p>
          </div>
        )}
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function JournalForm({ editing, onDone, onCancel }: { editing: JournalItem | null; onDone: (j: JournalItem) => void; onCancel: () => void }) {
  const [draft, setDraft] = useState<Draft>(editing ? toDraft(editing) : blank());
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  async function pick(f: File | null) {
    setFileError("");
    if (!f) { setFile(null); return; }
    const err = await checkPdf(f);
    if (err) { setFile(null); setFileError(err); return; }
    setFile(f);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    if (!draft.title.trim()) return setStatus({ kind: "error", text: "Judul wajib diisi." });
    if (!draft.author.trim()) return setStatus({ kind: "error", text: "Nama siswa wajib diisi." });
    if (!editing && !file) { setFileError("Pilih file PDF jurnal terlebih dahulu."); return; }
    const body = new FormData();
    for (const [k, v] of Object.entries(draft)) body.append(k, String(v));
    if (file) body.append("file", file);
    setBusy(true);
    try {
      const { journal } = await (editing ? send(`/api/admin/journal/${editing.id}`, "PUT", body) : send("/api/admin/journal", "POST", body));
      if (!journal) throw new Error("Respons server tidak valid.");
      onDone(journal);
    } catch (err) {
      setStatus({ kind: "error", text: err instanceof Error ? err.message : "Gagal menyimpan." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card title={editing ? "Ubah jurnal" : "Tambah jurnal"} description={editing ? "Ubah keterangan atau ganti file PDF-nya." : "Isi keterangan jurnal lalu unggah file PDF."}>
      <form onSubmit={submit} className="space-y-4">
        <Field label="Judul jurnal" htmlFor="j-title">
          <input id="j-title" value={draft.title} maxLength={JOURNAL_LIMITS.title} onChange={(e) => set("title", e.target.value)} className={inputCls} required />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nama siswa (penulis)" htmlFor="j-author">
            <input id="j-author" value={draft.author} maxLength={JOURNAL_LIMITS.author} onChange={(e) => set("author", e.target.value)} className={inputCls} required />
          </Field>
          <Field label="Kelas" htmlFor="j-class" hint="Contoh: VIII-A">
            <input id="j-class" value={draft.className} maxLength={JOURNAL_LIMITS.className} onChange={(e) => set("className", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Jenjang" htmlFor="j-jenjang">
            <select id="j-jenjang" value={draft.jenjang} onChange={(e) => set("jenjang", e.target.value as JournalJenjang)} className={inputCls}>
              {JOURNAL_JENJANG.map((j) => <option key={j} value={j}>{j}</option>)}
            </select>
          </Field>
          <Field label="Tahun ajaran" htmlFor="j-year" hint="Contoh: 2026/2027">
            <input id="j-year" value={draft.year} maxLength={JOURNAL_LIMITS.year} onChange={(e) => set("year", e.target.value)} className={inputCls} />
          </Field>
        </div>
        <Field label="Abstrak / ringkasan" htmlFor="j-abstract" hint={`${draft.abstract.length}/${JOURNAL_LIMITS.abstract} karakter. Tampil sebagai ringkasan di halaman Jurnal.`}>
          <textarea id="j-abstract" rows={4} value={draft.abstract} maxLength={JOURNAL_LIMITS.abstract} onChange={(e) => set("abstract", e.target.value)} className={inputCls} />
        </Field>
        <Field label="File PDF" htmlFor="journal-file">
          <FileDrop file={file} current={editing ?? undefined} onPick={pick} error={fileError} />
        </Field>
        <div className="flex items-center gap-3">
          <Switch id="j-published" checked={draft.published} onChange={(v) => set("published", v)} label="Tampilkan di situs" />
          <label htmlFor="j-published" className="text-sm text-slate-700">{draft.published ? "Tampil di halaman Jurnal" : "Disembunyikan (belum tampil di situs)"}</label>
        </div>
        <StatusMessage status={status} />
        <div className="flex flex-wrap gap-2">
          <button type="submit" disabled={busy} className={btnPrimary}>
            <Icon name={busy ? "progress_activity" : "save"} className={`text-[18px] ${busy ? "animate-spin" : ""}`} />
            {busy ? "Menyimpan…" : editing ? "Simpan perubahan" : "Unggah jurnal"}
          </button>
          <button type="button" disabled={busy} onClick={onCancel} className={btnSecondary}>Batal</button>
        </div>
      </form>
    </Card>
  );
}

function Row({ j, busy, confirming, onEdit, onToggle, onAskDelete, onDelete, onCancelDelete }: {
  j: JournalItem; busy: boolean; confirming: boolean;
  onEdit: () => void; onToggle: (v: boolean) => void; onAskDelete: () => void; onDelete: () => void; onCancelDelete: () => void;
}) {
  return (
    <li className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${j.jenjang === "SD" ? "bg-amber-100 text-amber-800" : "bg-teal-100 text-teal-800"}`}>{j.jenjang}</span>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${j.published ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>{j.published ? "Tampil" : "Disembunyikan"}</span>
        {j.year && <span className="text-xs text-slate-500">TA {j.year}</span>}
      </div>
      <h3 className="mt-2 text-[15px] font-semibold leading-snug text-slate-900 [overflow-wrap:anywhere]">{j.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{j.author}{j.className ? ` · Kelas ${j.className}` : ""}</p>
      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1 break-all"><Icon name="picture_as_pdf" className="text-[15px] text-red-500" />{j.fileName} · {formatBytes(j.fileSize)}</span>
        <span>Diunggah <TimeAgo iso={j.createdAt} /></span>
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
        <a href={`/api/admin/journal/${j.id}`} target="_blank" rel="noopener noreferrer" className={btnSecondary}><Icon name="visibility" className="text-[18px]" /> Lihat PDF</a>
        <button type="button" onClick={onEdit} disabled={busy} className={btnSecondary}><Icon name="edit" className="text-[18px]" /> Ubah</button>
        <div className="flex min-h-11 items-center gap-2 px-1">
          <Switch checked={j.published} onChange={onToggle} label={j.published ? "Sembunyikan jurnal" : "Tampilkan jurnal"} />
          <span className="text-xs text-slate-500">{j.published ? "Tampil" : "Sembunyi"}</span>
        </div>
        {confirming ? (
          <span className="ml-auto flex flex-wrap items-center gap-2">
            <span className="text-sm text-red-700">Hapus permanen?</span>
            <button type="button" onClick={onDelete} disabled={busy} className={`${btnPrimary} !bg-red-600 hover:!bg-red-700`}>Ya, hapus</button>
            <button type="button" onClick={onCancelDelete} disabled={busy} className={btnSecondary}>Batal</button>
          </span>
        ) : (
          <button type="button" onClick={onAskDelete} disabled={busy} className={`${btnDanger} ml-auto`}><Icon name="delete" className="text-[18px]" /> Hapus</button>
        )}
      </div>
    </li>
  );
}

export function JournalManager({ initial }: { initial: JournalItem[] }) {
  const [items, setItems] = useState(initial);
  const [form, setForm] = useState<"new" | JournalItem | null>(null);
  const [q, setQ] = useState("");
  const [jenjang, setJenjang] = useState<"" | JournalJenjang>("");
  const [state, setState] = useState<"" | "on" | "off">("");
  const [busyId, setBusyId] = useState("");
  const [confirmId, setConfirmId] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const formTop = useRef<HTMLDivElement>(null);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((j) =>
      (!jenjang || j.jenjang === jenjang) &&
      (!state || j.published === (state === "on")) &&
      (!needle || `${j.title} ${j.author} ${j.className} ${j.year}`.toLowerCase().includes(needle)));
  }, [items, q, jenjang, state]);

  const open = (f: "new" | JournalItem) => { setForm(f); setStatus(null); requestAnimationFrame(() => formTop.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const upsert = (j: JournalItem) => setItems((cur) => (cur.some((x) => x.id === j.id) ? cur.map((x) => (x.id === j.id ? j : x)) : [j, ...cur]));

  async function toggle(j: JournalItem, published: boolean) {
    setBusyId(j.id); setStatus(null);
    const body = new FormData();
    body.append("published", String(published));
    try {
      const { journal } = await send(`/api/admin/journal/${j.id}`, "PUT", body);
      if (journal) upsert(journal);
    } catch (e) {
      setStatus({ kind: "error", text: e instanceof Error ? e.message : "Gagal mengubah status." });
    } finally { setBusyId(""); }
  }

  async function remove(j: JournalItem) {
    setBusyId(j.id); setStatus(null);
    try {
      await send(`/api/admin/journal/${j.id}`, "DELETE");
      setItems((cur) => cur.filter((x) => x.id !== j.id));
      setConfirmId("");
      setStatus({ kind: "ok", text: `Jurnal "${j.title}" dihapus.` });
    } catch (e) {
      setStatus({ kind: "error", text: e instanceof Error ? e.message : "Gagal menghapus." });
    } finally { setBusyId(""); }
  }

  return (
    <div className="space-y-5">
      <div ref={formTop} className="scroll-mt-24" />
      {form ? (
        <JournalForm key={form === "new" ? "new" : form.id} editing={form === "new" ? null : form}
          onCancel={() => setForm(null)}
          onDone={(j) => { upsert(j); setForm(null); setStatus({ kind: "ok", text: `Jurnal "${j.title}" tersimpan.` }); }} />
      ) : (
        <button type="button" onClick={() => open("new")} className={`${btnPrimary} w-full sm:w-auto`}><Icon name="add" className="text-[20px]" /> Tambah jurnal</button>
      )}

      <StatusMessage status={status} />

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_9rem_11rem]">
        <div className="relative">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari judul, penulis, kelas…" aria-label="Cari jurnal" className={`${inputCls} pl-10`} />
        </div>
        <select value={jenjang} onChange={(e) => setJenjang(e.target.value as "" | JournalJenjang)} aria-label="Filter jenjang" className={inputCls}>
          <option value="">Semua jenjang</option>
          {JOURNAL_JENJANG.map((j) => <option key={j} value={j}>{j}</option>)}
        </select>
        <select value={state} onChange={(e) => setState(e.target.value as "" | "on" | "off")} aria-label="Filter status" className={inputCls}>
          <option value="">Semua status</option>
          <option value="on">Tampil</option>
          <option value="off">Disembunyikan</option>
        </select>
      </div>

      <p className="text-sm text-slate-500" aria-live="polite">{shown.length} dari {items.length} jurnal</p>

      {shown.length === 0 ? (
        <EmptyState icon="menu_book" title={items.length === 0 ? "Belum ada jurnal siswa" : "Tidak ada jurnal yang cocok"}>
          {items.length === 0 ? "Klik “Tambah jurnal” di atas untuk mengunggah karya tulis PDF pertama." : "Ubah kata kunci pencarian atau filter di atas."}
        </EmptyState>
      ) : (
        <ul className="space-y-3">
          {shown.map((j) => (
            <Row key={j.id} j={j} busy={busyId === j.id} confirming={confirmId === j.id}
              onEdit={() => open(j)} onToggle={(v) => toggle(j, v)}
              onAskDelete={() => setConfirmId(j.id)} onCancelDelete={() => setConfirmId("")} onDelete={() => remove(j)} />
          ))}
        </ul>
      )}
    </div>
  );
}

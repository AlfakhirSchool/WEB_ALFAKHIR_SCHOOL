"use client";
import { useMemo, useRef, useState } from "react";
import { Card, EmptyState, Field, Icon, StatusMessage, Switch, btnDanger, btnPrimary, btnSecondary, inputCls, type Status } from "./ui";
import { ImageField } from "./ImageField";
import {
  PPDB_STATUSES, STUDENT_GENDERS, STUDENT_JENJANG, STUDENT_LIMITS,
  type StudentInput, type StudentItem, type StudentJenjang,
} from "@/lib/students/types";

/** The school year people are being enrolled for, e.g. "2027/2028" while the current one is 2026/2027. */
function nextSchoolYear(now = new Date()): string {
  const y = now.getFullYear();
  const start = (now.getMonth() >= 6 ? y : y - 1) + 1;
  return `${start}/${start + 1}`;
}

const blank = (): StudentInput => ({
  nis: "", name: "", jenjang: "SD", className: "", gender: "", birthPlace: "", birthDate: "", address: "", religion: "Islam", photo: "",
  parentName: "", parentPhone: "", parentJob: "", previousSchool: "", ppdbYear: nextSchoolYear(), ppdbWave: "Gelombang 1", ppdbStatus: "Terdaftar",
  ppdbNotes: "", achievement: "", enabled: true,
});

const toDraft = ({ id: _id, updatedAt: _u, ...rest }: StudentItem): StudentInput => rest;

async function send(url: string, method: "POST" | "PUT" | "DELETE", body?: StudentInput): Promise<{ student?: StudentItem }> {
  let res: Response;
  try {
    res = await fetch(url, { method, headers: body ? { "Content-Type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined });
  } catch {
    throw new Error("Tidak dapat terhubung ke server. Periksa koneksi lalu coba lagi.");
  }
  const data = (await res.json().catch(() => ({}))) as { student?: StudentItem; error?: string };
  if (res.status === 401) throw new Error("Sesi login habis. Muat ulang halaman dan login kembali.");
  if (!res.ok) throw new Error(data.error ?? "Terjadi kesalahan. Coba lagi.");
  return data;
}

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
      <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-[#0E6A71]"><Icon name={icon} className="text-[19px]" />{title}</legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function StudentForm({ editing, onDone, onCancel }: { editing: StudentItem | null; onDone: (s: StudentItem) => void; onCancel: () => void }) {
  const [d, setD] = useState<StudentInput>(editing ? toDraft(editing) : blank());
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const set = <K extends keyof StudentInput>(k: K, v: StudentInput[K]) => setD((cur) => ({ ...cur, [k]: v }));
  const text = (k: keyof typeof STUDENT_LIMITS) => ({ value: d[k], maxLength: STUDENT_LIMITS[k], onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(k, e.target.value) });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setBusy(true);
    try {
      const { student } = await (editing ? send(`/api/admin/students/${editing.id}`, "PUT", d) : send("/api/admin/students", "POST", d));
      if (!student) throw new Error("Respons server tidak valid.");
      onDone(student);
    } catch (err) {
      setStatus({ kind: "error", text: err instanceof Error ? err.message : "Gagal menyimpan." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card title={editing ? "Ubah data siswa" : "Tambah siswa"} description="Kolom bertanda * wajib diisi. NIS menjadi kunci pencarian di halaman Dokumen sekaligus password file PDF.">
      <form onSubmit={submit} className="space-y-5">
        <Section icon="badge" title="Identitas">
          <Field label="NIS *" htmlFor="s-nis" hint="3–20 huruf/angka, tanpa spasi. Unik per siswa.">
            <input id="s-nis" inputMode="text" autoComplete="off" pattern="[A-Za-z0-9]{3,20}" title="3–20 huruf atau angka" value={d.nis} maxLength={20} onChange={(e) => set("nis", e.target.value.trim())} className={inputCls} required />
          </Field>
          <Field label="Nama lengkap *" htmlFor="s-name"><input id="s-name" {...text("name")} className={inputCls} required /></Field>
          <Field label="Jenjang *" htmlFor="s-jenjang">
            <select id="s-jenjang" value={d.jenjang} onChange={(e) => set("jenjang", e.target.value as StudentJenjang)} className={inputCls}>
              {STUDENT_JENJANG.map((j) => <option key={j} value={j}>{j}</option>)}
            </select>
          </Field>
          <Field label="Kelas *" htmlFor="s-class" hint="Contoh: 1-A atau VII-B"><input id="s-class" {...text("className")} className={inputCls} required /></Field>
          <Field label="Jenis kelamin *" htmlFor="s-gender">
            <select id="s-gender" value={d.gender} onChange={(e) => set("gender", e.target.value)} className={inputCls} required>
              <option value="">Pilih…</option>
              {STUDENT_GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Agama" htmlFor="s-religion"><input id="s-religion" {...text("religion")} className={inputCls} /></Field>
          <Field label="Tempat lahir *" htmlFor="s-bplace"><input id="s-bplace" {...text("birthPlace")} className={inputCls} required /></Field>
          <Field label="Tanggal lahir *" htmlFor="s-bdate">
            <input id="s-bdate" type="date" min="1990-01-01" max={new Date().toISOString().slice(0, 10)} value={d.birthDate} onChange={(e) => set("birthDate", e.target.value)} className={inputCls} required />
          </Field>
          <Field label="Alamat *" htmlFor="s-address" className="sm:col-span-2">
            <textarea id="s-address" rows={3} {...text("address")} className={inputCls} required />
          </Field>
          <Field label="Pas foto" htmlFor="s-photo" hint="Opsional. Tampil di PDF Profil dan Formulir PPDB (rasio 3:4, dipotong otomatis)." className="sm:col-span-2">
            <ImageField id="s-photo" value={d.photo} onChange={(u) => set("photo", u)} aspect="aspect-[3/4]" />
          </Field>
        </Section>

        <Section icon="family_restroom" title="Orang tua / wali">
          <Field label="Nama orang tua / wali *" htmlFor="s-pname"><input id="s-pname" {...text("parentName")} className={inputCls} required /></Field>
          <Field label="No. HP / WhatsApp *" htmlFor="s-pphone"><input id="s-pphone" type="tel" inputMode="tel" {...text("parentPhone")} className={inputCls} required /></Field>
          <Field label="Pekerjaan" htmlFor="s-pjob"><input id="s-pjob" {...text("parentJob")} className={inputCls} /></Field>
        </Section>

        <Section icon="school" title="PPDB">
          <Field label="Tahun ajaran *" htmlFor="s-pyear" hint="Contoh: 2027/2028"><input id="s-pyear" pattern="\d{4}/\d{4}" title="Format 2027/2028" {...text("ppdbYear")} className={inputCls} required /></Field>
          <Field label="Gelombang *" htmlFor="s-pwave" hint="Contoh: Gelombang 1"><input id="s-pwave" {...text("ppdbWave")} className={inputCls} required /></Field>
          <Field label="Status PPDB *" htmlFor="s-pstatus">
            <select id="s-pstatus" value={d.ppdbStatus} onChange={(e) => set("ppdbStatus", e.target.value)} className={inputCls}>
              {PPDB_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Asal sekolah" htmlFor="s-prev"><input id="s-prev" {...text("previousSchool")} className={inputCls} /></Field>
          <Field label="Catatan PPDB" htmlFor="s-pnotes" hint={`${d.ppdbNotes.length}/${STUDENT_LIMITS.ppdbNotes} karakter`} className="sm:col-span-2">
            <textarea id="s-pnotes" rows={3} {...text("ppdbNotes")} className={inputCls} />
          </Field>
        </Section>

        <Section icon="emoji_events" title="Profil">
          <Field label="Prestasi / catatan profil" htmlFor="s-ach" hint={`${d.achievement.length}/${STUDENT_LIMITS.achievement} karakter. Tampil di PDF Profil Siswa.`} className="sm:col-span-2">
            <textarea id="s-ach" rows={4} {...text("achievement")} className={inputCls} />
          </Field>
        </Section>

        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <Switch id="s-enabled" checked={d.enabled} onChange={(v) => set("enabled", v)} label="Aktifkan unduhan" />
          <label htmlFor="s-enabled" className="text-sm text-slate-700">
            <span className="font-semibold">Aktifkan unduhan</span><br />
            <span className="text-slate-500">{d.enabled ? "Siswa/orang tua dapat mengunduh dokumen di halaman Dokumen dengan NIS." : "Dimatikan: halaman Dokumen menolak NIS ini. Anda tetap bisa mengunduh dari dashboard."}</span>
          </label>
        </div>

        <StatusMessage status={status} />
        <div className="flex flex-wrap gap-2">
          <button type="submit" disabled={busy} className={btnPrimary}>
            <Icon name={busy ? "progress_activity" : "save"} className={`text-[18px] ${busy ? "animate-spin" : ""}`} />
            {busy ? "Menyimpan…" : editing ? "Simpan perubahan" : "Simpan siswa"}
          </button>
          <button type="button" disabled={busy} onClick={onCancel} className={btnSecondary}>Batal</button>
        </div>
      </form>
    </Card>
  );
}

const STATUS_CLS: Record<string, string> = {
  Diterima: "bg-emerald-100 text-emerald-800", Terdaftar: "bg-sky-100 text-sky-800", Cadangan: "bg-amber-100 text-amber-800", Ditolak: "bg-red-100 text-red-700",
};

function Row({ s, busy, confirming, onEdit, onAskDelete, onDelete, onCancelDelete }: {
  s: StudentItem; busy: boolean; confirming: boolean; onEdit: () => void; onAskDelete: () => void; onDelete: () => void; onCancelDelete: () => void;
}) {
  return (
    <li className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-5">
      <div className="flex gap-3">
        {s.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.photo} alt="" className="h-16 w-12 shrink-0 rounded-lg border border-slate-200 bg-slate-100 object-cover" />
        ) : (
          <div className="grid h-16 w-12 shrink-0 place-items-center rounded-lg bg-[#0E6A71] text-lg font-bold text-white">{s.name.charAt(0).toUpperCase()}</div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${s.jenjang === "SD" ? "bg-amber-100 text-amber-800" : "bg-teal-100 text-teal-800"}`}>{s.jenjang}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_CLS[s.ppdbStatus] ?? "bg-slate-100 text-slate-700"}`}>PPDB {s.ppdbStatus}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.enabled ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>{s.enabled ? "Unduhan aktif" : "Unduhan nonaktif"}</span>
          </div>
          <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-slate-900 [overflow-wrap:anywhere]">{s.name}</h3>
          <p className="mt-0.5 text-sm text-slate-600">NIS <span className="font-mono font-semibold">{s.nis}</span> · Kelas {s.className} · PPDB {s.ppdbYear}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
        <a href={`/api/admin/students/${s.id}/pdf?type=profil`} download className={btnSecondary}><Icon name="picture_as_pdf" className="text-[18px] text-red-600" /> PDF Profil</a>
        <a href={`/api/admin/students/${s.id}/pdf?type=ppdb`} download className={btnSecondary}><Icon name="picture_as_pdf" className="text-[18px] text-red-600" /> PDF PPDB</a>
        <button type="button" onClick={onEdit} disabled={busy} className={btnSecondary}><Icon name="edit" className="text-[18px]" /> Ubah</button>
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

export function StudentManager({ initial }: { initial: StudentItem[] }) {
  const [items, setItems] = useState(initial);
  const [form, setForm] = useState<"new" | StudentItem | null>(null);
  const [q, setQ] = useState("");
  const [jenjang, setJenjang] = useState<"" | StudentJenjang>("");
  const [busyId, setBusyId] = useState("");
  const [confirmId, setConfirmId] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const formTop = useRef<HTMLDivElement>(null);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((s) => (!jenjang || s.jenjang === jenjang) && (!needle || `${s.name} ${s.nis}`.toLowerCase().includes(needle)));
  }, [items, q, jenjang]);

  const open = (f: "new" | StudentItem) => { setForm(f); setStatus(null); requestAnimationFrame(() => formTop.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const upsert = (s: StudentItem) => setItems((cur) => {
    const next = cur.some((x) => x.id === s.id) ? cur.map((x) => (x.id === s.id ? s : x)) : [...cur, s];
    return next.sort((a, b) => a.jenjang.localeCompare(b.jenjang) || a.name.localeCompare(b.name));
  });

  async function remove(s: StudentItem) {
    setBusyId(s.id); setStatus(null);
    try {
      await send(`/api/admin/students/${s.id}`, "DELETE");
      setItems((cur) => cur.filter((x) => x.id !== s.id));
      setConfirmId("");
      setStatus({ kind: "ok", text: `Data "${s.name}" dihapus.` });
    } catch (e) {
      setStatus({ kind: "error", text: e instanceof Error ? e.message : "Gagal menghapus." });
    } finally { setBusyId(""); }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 rounded-xl border border-[#0E6A71]/20 bg-[#0E6A71]/5 p-4 text-sm text-slate-700">
        <Icon name="lock" className="mt-0.5 text-[20px] text-[#0E6A71]" />
        <p><span className="font-semibold text-[#0E6A71]">Password PDF = NIS siswa.</span> File PDF dienkripsi dengan NIS sebagai password pembuka, dan halaman publik <span className="font-medium">/dokumen</span> juga meminta NIS sebelum file diberikan.</p>
      </div>

      <div ref={formTop} className="scroll-mt-24" />
      {form ? (
        <StudentForm key={form === "new" ? "new" : form.id} editing={form === "new" ? null : form} onCancel={() => setForm(null)}
          onDone={(s) => { upsert(s); setForm(null); setStatus({ kind: "ok", text: `Data "${s.name}" tersimpan.` }); }} />
      ) : (
        <button type="button" onClick={() => open("new")} className={`${btnPrimary} w-full sm:w-auto`}><Icon name="add" className="text-[20px]" /> Tambah siswa</button>
      )}

      <StatusMessage status={status} />

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_11rem]">
        <div className="relative">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama atau NIS…" aria-label="Cari siswa" className={`${inputCls} pl-10`} />
        </div>
        <select value={jenjang} onChange={(e) => setJenjang(e.target.value as "" | StudentJenjang)} aria-label="Filter jenjang" className={inputCls}>
          <option value="">Semua jenjang</option>
          {STUDENT_JENJANG.map((j) => <option key={j} value={j}>{j}</option>)}
        </select>
      </div>

      <p className="text-sm text-slate-500" aria-live="polite">{shown.length} dari {items.length} siswa</p>

      {shown.length === 0 ? (
        <EmptyState icon="badge" title={items.length === 0 ? "Belum ada data siswa" : "Tidak ada siswa yang cocok"}>
          {items.length === 0 ? "Klik “Tambah siswa” di atas untuk mengisi data siswa pertama." : "Ubah kata kunci pencarian atau filter di atas."}
        </EmptyState>
      ) : (
        <ul className="space-y-3">
          {shown.map((s) => (
            <Row key={s.id} s={s} busy={busyId === s.id} confirming={confirmId === s.id}
              onEdit={() => open(s)} onAskDelete={() => setConfirmId(s.id)} onCancelDelete={() => setConfirmId("")} onDelete={() => remove(s)} />
          ))}
        </ul>
      )}
    </div>
  );
}

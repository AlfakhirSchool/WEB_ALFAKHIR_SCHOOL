"use client";
import { useRef, useState } from "react";
import type { FeeSd, FeeSmp, Ppdb, PpdbBrochure } from "@/content/settings";
import type { LoadedSetting } from "./types";
import { ListEditor, SaveBar, useSetting } from "./SettingForm";
import { Card, Field, Icon, btnDanger, btnSecondary, inputCls } from "./ui";

type BrochureSlotKey = "brochurePortal" | "brochureSd" | "brochureSmp";

const BROCHURE_SLOTS: { key: BrochureSlotKey; label: string; defaultTitle: string; pageHint: string }[] = [
  {
    key: "brochureSd",
    label: "Brosur / Pamflet PPDB SD",
    defaultTitle: "Brosur & Rincian Biaya PPDB SD 2027/2028",
    pageHint: "Tampil di halaman PPDB SD (/sd/ppdb), PPDB Portal (/ppdb), dan tombol Unduh Brosur di Profil SD (/sd/profil).",
  },
  {
    key: "brochureSmp",
    label: "Brosur / Panduan PPDB SMP",
    defaultTitle: "Panduan & Brosur Biaya PPDB SMP 2027/2028",
    pageHint: "Tampil di halaman PPDB SMP (/smp/ppdb), PPDB Portal (/ppdb), dan tombol Unduh Panduan & Brosur Biaya.",
  },
  {
    key: "brochurePortal",
    label: "Poster / Pamflet Umum PPDB (Opsional)",
    defaultTitle: "Pamflet Informasi PPDB Al Fakhir School 2027/2028",
    pageHint: "Tampil sebagai informasi umum di halaman utama PPDB (/ppdb).",
  },
];

function BrochureField({
  slot,
  value,
  onChange,
}: {
  slot: (typeof BROCHURE_SLOTS)[number];
  value: PpdbBrochure | undefined;
  onChange: (next: PpdbBrochure | undefined) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setError("");
    if (file.size === 0) {
      setError("File kosong.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError("Ukuran file maksimal 4 MB.");
      return;
    }
    setBusy(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("allowPdf", "1");
      const res = await fetch("/api/admin/media", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { url?: string; name?: string; kind?: "pdf" | "image"; error?: string };
      if (res.status === 401) throw new Error("Sesi login habis. Muat ulang halaman dan login kembali.");
      if (!res.ok || !data.url) throw new Error(data.error ?? "Gagal mengunggah brosur.");
      onChange({
        title: value?.title?.trim() || slot.defaultTitle,
        url: data.url,
        kind: data.kind ?? (file.type === "application/pdf" ? "pdf" : "image"),
        fileName: data.name || file.name,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal mengunggah brosur.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  const isPdf = value?.kind === "pdf" || /\.pdf$/i.test(value?.fileName ?? "");

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-900">{slot.label}</h3>
        <p className="mt-0.5 text-xs text-slate-500">{slot.pageHint}</p>
      </div>
      <input
        ref={input}
        id={`file-${slot.key}`}
        type="file"
        accept="application/pdf,.pdf,image/png,image/jpeg,image/webp"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
        }}
      />
      {value?.url ? (
        <div className="space-y-3">
          <Field label="Judul / Keterangan Brosur" htmlFor={`title-${slot.key}`}>
            <input
              id={`title-${slot.key}`}
              value={value.title}
              maxLength={200}
              placeholder={slot.defaultTitle}
              onChange={(e) => onChange({ ...value, title: e.target.value })}
              className={inputCls}
            />
          </Field>
          {isPdf ? (
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-red-50 text-red-600">
                <Icon name="picture_as_pdf" className="text-[24px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{value.fileName || "Brosur-PPDB.pdf"}</p>
                <p className="text-xs text-slate-500">Dokumen PDF · Siap dilihat & diunduh pengunjung</p>
              </div>
              <a href={value.url} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                <Icon name="visibility" className="text-[18px]" /> Lihat PDF
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value.url}
                alt={value.title || slot.label}
                className="h-40 w-auto max-w-[14rem] rounded-xl border border-slate-200 bg-white object-contain p-1"
              />
              <div className="space-y-1 text-xs text-slate-500">
                <p className="font-semibold text-slate-700">{value.fileName || "Pamflet Gambar"}</p>
                <p>Gambar pamflet/brosur tampil langsung di halaman PPDB dan dapat diunduh pengunjung.</p>
                <a href={value.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-[#0E6A71] hover:underline">
                  <Icon name="open_in_new" className="text-[15px]" /> Buka gambar ukuran penuh
                </a>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={busy} onClick={() => input.current?.click()} className={btnSecondary}>
              <Icon name={busy ? "progress_activity" : "upload"} className={`text-[18px] ${busy ? "animate-spin" : ""}`} />
              {busy ? "Mengunggah…" : "Ganti file (PDF / Gambar)"}
            </button>
            <button type="button" disabled={busy} onClick={() => onChange(undefined)} className={btnDanger}>
              <Icon name="delete" className="text-[18px]" /> Hapus brosur
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => input.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-300 bg-white px-4 py-5 text-sm text-slate-600 transition hover:border-[#0E6A71] hover:bg-[#0E6A71]/5 hover:text-[#0E6A71] disabled:opacity-60"
        >
          <Icon name={busy ? "progress_activity" : "upload_file"} className={`text-[28px] ${busy ? "animate-spin" : ""}`} />
          <span className="font-semibold">{busy ? "Mengunggah…" : "Unggah Brosur / Pamflet (PDF atau Gambar)"}</span>
          <span className="text-xs text-slate-400">PDF, PNG, JPG, atau WebP · maks. 4 MB</span>
        </button>
      )}
      {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function PpdbForm({ ppdb, fees }: { ppdb: LoadedSetting<"ppdb">; fees: LoadedSetting<"fees"> }) {
  const ppdbForm = useSetting("ppdb", ppdb.value);
  const feeForm = useSetting("fees", fees.value);
  const f = feeForm.value;
  const p = ppdbForm.value;
  const d = p.deadline;
  const label = d ? new Date(`${d}T00:00:00`).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "";

  const setBrochure = (key: BrochureSlotKey, next: PpdbBrochure | undefined) => {
    const copy: Ppdb = { ...p };
    if (next) copy[key] = next;
    else delete copy[key];
    ppdbForm.update(copy);
  };

  const feeError =
    f.sd.some((r) => !r.item.trim()) ? "Setiap baris biaya SD wajib memiliki nama item."
    : f.smp.some((r) => !r.wave.trim()) ? "Setiap baris biaya SMP wajib memiliki nama gelombang."
    : null;

  return (
    <div className="space-y-6">
      <form onSubmit={(e) => { e.preventDefault(); ppdbForm.save(); }} className="space-y-6">
        <Card title="Upload Brosur & Pamflet PPDB" description="Unggah brosur, pamflet, atau panduan biaya PPDB dalam bentuk gambar (JPG/PNG/WebP) atau dokumen PDF agar dapat dilihat dan diunduh calon orang tua.">
          <div className="space-y-4">
            {BROCHURE_SLOTS.map((slot) => (
              <BrochureField
                key={slot.key}
                slot={slot}
                value={p[slot.key]}
                onChange={(next) => setBrochure(slot.key, next)}
              />
            ))}
          </div>
        </Card>

        <Card title="Penutupan Gelombang PPDB" description="Tanggal ini menggerakkan hitung mundur dan informasi batas pendaftaran pada halaman PPDB. Kosongkan bila belum ditentukan.">
          <Field label="Tanggal penutupan" htmlFor="deadline" hint={d ? <>Hitung mundur berakhir <strong>{label}</strong>.</> : "Belum ada tanggal — hitung mundur tidak ditampilkan."}>
            <div className="flex max-w-md gap-2">
              <input id="deadline" type="date" value={d} onChange={(e) => ppdbForm.update({ ...p, deadline: e.target.value })} className={inputCls} />
              {d && (
                <button type="button" onClick={() => ppdbForm.update({ ...p, deadline: "" })} className={`${btnSecondary} shrink-0 px-3`} aria-label="Kosongkan tanggal" title="Kosongkan">
                  <Icon name="close" className="text-[20px]" />
                </button>
              )}
            </div>
          </Field>
          <SaveBar inline form={ppdbForm} custom={ppdb.custom} updatedAt={ppdb.updatedAt} onSave={() => ppdbForm.save()} />
        </Card>
      </form>

      <form onSubmit={(e) => { e.preventDefault(); feeForm.save(feeError); }} className="space-y-6">
        <Card title="Rincian biaya SD" description="Tabel biaya pada halaman PPDB SD.">
          <ListEditor<FeeSd>
            items={f.sd}
            onChange={(sd) => feeForm.update({ ...f, sd })}
            create={() => ({ item: "", value: "" })}
            addLabel="Tambah baris biaya SD"
            max={30}
            titleOf={(r) => r.item || "Baris baru"}
            empty="Belum ada rincian biaya SD."
            render={(r, set, i) => (
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Item" htmlFor={`sd-item-${i}`}>
                  <input id={`sd-item-${i}`} value={r.item} maxLength={200} onChange={(e) => set({ ...r, item: e.target.value })} placeholder="mis. Uang pangkal" className={inputCls} />
                </Field>
                <Field label="Nominal" htmlFor={`sd-value-${i}`}>
                  <input id={`sd-value-${i}`} value={r.value} maxLength={200} onChange={(e) => set({ ...r, value: e.target.value })} placeholder="mis. Rp 14.500.000" className={inputCls} />
                </Field>
              </div>
            )}
          />
        </Card>

        <Card title="Gelombang & biaya SMP" description="Tabel gelombang pendaftaran pada halaman PPDB SMP.">
          <ListEditor<FeeSmp>
            items={f.smp}
            onChange={(smp) => feeForm.update({ ...f, smp })}
            create={() => ({ wave: "", period: "", fee: "" })}
            addLabel="Tambah gelombang SMP"
            max={30}
            titleOf={(r) => r.wave || "Gelombang baru"}
            empty="Belum ada gelombang SMP."
            render={(r, set, i) => (
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Gelombang" htmlFor={`smp-wave-${i}`}>
                  <input id={`smp-wave-${i}`} value={r.wave} maxLength={200} onChange={(e) => set({ ...r, wave: e.target.value })} placeholder="mis. Gelombang 1" className={inputCls} />
                </Field>
                <Field label="Periode" htmlFor={`smp-period-${i}`}>
                  <input id={`smp-period-${i}`} value={r.period} maxLength={200} onChange={(e) => set({ ...r, period: e.target.value })} placeholder="mis. 1 Okt – 30 Nov 2026" className={inputCls} />
                </Field>
                <Field label="Biaya" htmlFor={`smp-fee-${i}`}>
                  <input id={`smp-fee-${i}`} value={r.fee} maxLength={200} onChange={(e) => set({ ...r, fee: e.target.value })} placeholder="mis. Rp 19.500.000" className={inputCls} />
                </Field>
              </div>
            )}
          />
        </Card>
        <SaveBar form={feeForm} custom={fees.custom} updatedAt={fees.updatedAt} onSave={() => feeForm.save(feeError)} />
      </form>
    </div>
  );
}

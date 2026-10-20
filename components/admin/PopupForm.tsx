"use client";
import { useState } from "react";
import type { SiteKey } from "@/content/site";
import type { Popup, PopupFrequency } from "@/content/settings";
import { PopupCard, todayIso } from "@/components/AdPopup";
import type { LoadedSetting } from "./types";
import { ImageField } from "./ImageField";
import { SaveBar, useSetting } from "./SettingForm";
import { Card, Field, Icon, Switch, inputCls } from "./ui";

const SITES: { key: SiteKey; label: string; sub: string }[] = [
  { key: "portal", label: "Portal Al Fakhir School", sub: "Beranda, Tentang Kami, Berita…" },
  { key: "sd", label: "Website SD", sub: "/sd" },
  { key: "smp", label: "Website SMP", sub: "/smp" },
];
const FREQUENCIES: { value: PopupFrequency; label: string }[] = [
  { value: "session", label: "Sekali per sesi" },
  { value: "daily", label: "Sekali per hari" },
  { value: "always", label: "Setiap kunjungan" },
];
const LINKS = ["/ppdb", "/sd/ppdb", "/smp/ppdb", "/berita", "/kontak", "/sd", "/smp", "/yayasan"];

const fmt = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

function validate(p: Popup): string | null {
  if (p.ctaHref && !/^(\/|https?:\/\/)/.test(p.ctaHref)) return "Tautan tombol harus diawali / (halaman website) atau https://.";
  if (p.ctaLabel && !p.ctaHref) return "Isi tautan tombol, atau kosongkan label tombol.";
  if (p.startDate && p.endDate && p.endDate < p.startDate) return "Tanggal selesai tidak boleh sebelum tanggal mulai.";
  if (p.enabled && !p.sites.length) return "Pilih minimal satu website untuk menampilkan popup.";
  if (p.enabled && !p.title && !p.body && !p.image) return "Popup aktif harus memiliki judul, isi, atau gambar.";
  return null;
}

export function PopupForm({ value: initial, custom, updatedAt }: LoadedSetting<"popup">) {
  const form = useSetting("popup", initial);
  const p = form.value;
  const set = (patch: Partial<Popup>) => form.update({ ...p, ...patch });
  const [previewSite, setPreviewSite] = useState<SiteKey>(p.sites[0] ?? "portal");
  const error = validate(p);

  const today = todayIso();
  const state = !p.enabled ? { label: "Nonaktif", cls: "bg-slate-100 text-slate-600", icon: "visibility_off" }
    : p.startDate && p.startDate > today ? { label: `Terjadwal mulai ${fmt(p.startDate)}`, cls: "bg-amber-100 text-amber-800", icon: "schedule" }
    : p.endDate && p.endDate < today ? { label: `Berakhir ${fmt(p.endDate)}`, cls: "bg-red-100 text-red-700", icon: "event_busy" }
    : { label: "Sedang tayang", cls: "bg-emerald-100 text-emerald-800", icon: "visibility" };

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.save(error); }}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="min-w-0 space-y-6">
          <Card>
            <div className="flex items-center gap-4">
              <Switch id="popup-enabled" checked={p.enabled} onChange={(enabled) => set({ enabled })} label="Tampilkan popup" />
              <label htmlFor="popup-enabled" className="min-w-0 flex-1 cursor-pointer">
                <span className="block text-base font-semibold text-slate-900">Tampilkan popup</span>
                <span className="block text-sm text-slate-500">Aktifkan untuk menampilkan popup kepada pengunjung.</span>
              </label>
            </div>
            <p className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${state.cls}`}>
              <Icon name={state.icon} className="text-[16px]" /> {state.label}{form.dirty && " (setelah disimpan)"}
            </p>
          </Card>

          <Card title="Isi popup">
            <div className="space-y-4">
              <Field label="Judul" htmlFor="popup-title">
                <input id="popup-title" value={p.title} maxLength={200} onChange={(e) => set({ title: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Isi / keterangan" htmlFor="popup-body" hint="Baris baru akan ditampilkan apa adanya.">
                <textarea id="popup-body" value={p.body} maxLength={2000} rows={4} onChange={(e) => set({ body: e.target.value })} className={`${inputCls} resize-y`} />
              </Field>
              <Field label="Gambar / poster (opsional)" htmlFor="popup-image" hint="Poster tegak maupun mendatar akan ditampilkan utuh. Tanpa gambar, popup memakai latar logo sekolah.">
                <ImageField id="popup-image" value={p.image} onChange={(image) => set({ image })} aspect="aspect-[4/3]" />
              </Field>
            </div>
          </Card>

          <Card title="Tombol" description="Kosongkan label untuk popup tanpa tombol.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Label tombol" htmlFor="popup-cta-label">
                <input id="popup-cta-label" value={p.ctaLabel} maxLength={80} onChange={(e) => set({ ctaLabel: e.target.value })} placeholder="mis. Daftar Sekarang" className={inputCls} />
              </Field>
              <Field label="Tautan tombol" htmlFor="popup-cta-href" hint="Halaman website (mis. /sd/ppdb) atau alamat lengkap https://…">
                <input id="popup-cta-href" value={p.ctaHref} maxLength={500} list="popup-links" spellCheck={false} onChange={(e) => set({ ctaHref: e.target.value.trim() })} className={inputCls} />
                <datalist id="popup-links">{LINKS.map((l) => <option key={l} value={l} />)}</datalist>
              </Field>
            </div>
          </Card>

          <Card title="Penayangan">
            <fieldset>
              <legend className="mb-2 text-sm font-medium text-slate-700">Tampilkan di</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {SITES.map((s) => {
                  const on = p.sites.includes(s.key);
                  return (
                    <label key={s.key} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 transition ${on ? "border-[#0E6A71] bg-[#0E6A71]/5" : "border-slate-200 hover:bg-slate-50"}`}>
                      <input type="checkbox" checked={on} className="h-5 w-5 shrink-0 accent-[#0E6A71]"
                        onChange={(e) => set({ sites: e.target.checked ? SITES.map((x) => x.key).filter((k) => k === s.key || p.sites.includes(k)) : p.sites.filter((k) => k !== s.key) })} />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-slate-800">{s.label}</span>
                        <span className="block truncate text-xs text-slate-500">{s.sub}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Frekuensi" htmlFor="popup-frequency" hint="Per pengunjung. Popup yang isinya diubah akan tampil lagi.">
                <select id="popup-frequency" value={p.frequency} onChange={(e) => set({ frequency: e.target.value as PopupFrequency })} className={inputCls}>
                  {FREQUENCIES.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
              </Field>
              <Field label="Muncul setelah (detik)" htmlFor="popup-delay" hint="Dihitung setelah halaman selesai dimuat (0–60).">
                <input id="popup-delay" type="number" inputMode="numeric" min={0} max={60} step={1} value={p.delay}
                  onChange={(e) => set({ delay: Math.min(60, Math.max(0, Math.round(Number(e.target.value) || 0))) })} className={inputCls} />
              </Field>
              <Field label="Mulai tanggal (opsional)" htmlFor="popup-start">
                <input id="popup-start" type="date" value={p.startDate} onChange={(e) => set({ startDate: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Sampai tanggal (opsional)" htmlFor="popup-end" hint="Kosongkan bila tanpa batas waktu.">
                <input id="popup-end" type="date" value={p.endDate} min={p.startDate || undefined} onChange={(e) => set({ endDate: e.target.value })} className={inputCls} />
              </Field>
            </div>
          </Card>
        </div>

        <aside className="min-w-0 lg:sticky lg:top-6 lg:self-start" aria-label="Pratinjau popup">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-800">Pratinjau</h2>
            <div className="flex rounded-xl bg-slate-200/70 p-1" role="group" aria-label="Pratinjau untuk website">
              {SITES.map((s) => (
                <button key={s.key} type="button" onClick={() => setPreviewSite(s.key)} aria-pressed={previewSite === s.key}
                  className={`min-h-11 rounded-lg px-3.5 text-xs font-semibold transition ${previewSite === s.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>
                  {s.key === "portal" ? "Portal" : s.key.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_top,#2b6f73_0%,#0b3b3e_55%,#052224_100%)] p-4 sm:p-6">
            <div className="pointer-events-none mx-auto max-w-[440px]">
              <PopupCard popup={p} site={previewSite} onClose={() => {}} preview />
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500">Tampilan dapat sedikit berbeda menurut ukuran layar pengunjung.</p>
        </aside>
      </div>
      <SaveBar form={form} custom={custom} updatedAt={updatedAt} onSave={() => form.save(error)} />
    </form>
  );
}

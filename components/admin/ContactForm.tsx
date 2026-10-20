"use client";
import { mapsLink, type SchoolContact } from "@/content/settings";
import type { LoadedSetting } from "./types";
import { SaveBar, useSetting } from "./SettingForm";
import { Card, Field, Icon, btnSecondary, inputCls } from "./ui";

/** "0852-8175 2123" / "+62 852…" → "6285281752123" */
const normalizeNumber = (raw: string) => raw.replace(/\D/g, "").replace(/^0/, "62");

/** "6285281752123" → "+62 852-8175-2123" */
function displayFor(num: string) {
  const m = /^62(\d{3})(\d{4})(\d+)$/.exec(num);
  return m ? `+62 ${m[1]}-${m[2]}-${m[3]}` : `+${num}`;
}

type Part = Omit<SchoolContact, "mapQuery"> & { mapQuery?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isUrl = (v: string | undefined) => !v?.trim() || /^https:\/\/\S+$/.test(v.trim());
const bad = "border-red-400 focus:border-red-500 focus:ring-red-500/15";

/** First problem in one section (Indonesian message) or null. */
function problem(label: string, p: Part, needsMap: boolean): string | null {
  if (!/^\d{8,15}$/.test(p.waNumber)) return `${label}: nomor WhatsApp harus 8–15 digit angka, diawali kode negara 62.`;
  if (!p.waDisplay.trim()) return `${label}: nomor yang ditampilkan wajib diisi.`;
  if (!EMAIL.test(p.email.trim())) return `${label}: format email belum benar (contoh: nama@gmail.com).`;
  if (!p.address.trim()) return `${label}: alamat wajib diisi.`;
  if (needsMap && !p.mapQuery?.trim()) return `${label}: teks pencarian peta wajib diisi.`;
  for (const [name, url] of [["Instagram", p.instagram], ["Facebook", p.facebook], ["YouTube", p.youtube]] as const) {
    if (!isUrl(url)) return `${label}: tautan ${name} harus diawali https:// (atau dikosongkan).`;
  }
  return null;
}

function Section({ id, label, part, onChange, hasMap }: {
  id: string; label: string; part: Part; onChange: (patch: Partial<Part>) => void; hasMap: boolean;
}) {
  const numberOk = /^\d{8,15}$/.test(part.waNumber);
  const emailOk = EMAIL.test(part.email.trim());
  const urlCls = (v: string | undefined) => `${inputCls} ${isUrl(v) ? "" : bad}`;
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nomor WhatsApp" htmlFor={`${id}-wa`} hint={<>Format internasional tanpa + dan spasi, mis. <code>6285281752123</code>. Awalan 0 otomatis diubah ke 62.</>}>
          <input id={`${id}-wa`} inputMode="numeric" autoComplete="off" value={part.waNumber} maxLength={20}
            onChange={(e) => onChange({ waNumber: normalizeNumber(e.target.value) })}
            aria-invalid={!numberOk} className={`${inputCls} ${numberOk ? "" : bad}`} />
        </Field>
        <Field label="Nomor yang ditampilkan" htmlFor={`${id}-disp`} hint="Cara nomor ditulis di website.">
          <div className="flex gap-2">
            <input id={`${id}-disp`} value={part.waDisplay} maxLength={40} onChange={(e) => onChange({ waDisplay: e.target.value })} className={inputCls} />
            <button type="button" onClick={() => onChange({ waDisplay: displayFor(part.waNumber) })} disabled={!numberOk} className={`${btnSecondary} shrink-0 px-3`} title="Isi otomatis dari nomor WhatsApp">
              <Icon name="auto_fix_high" className="text-[20px]" /><span className="sr-only">Isi otomatis</span>
            </button>
          </div>
        </Field>
        <Field label="Email" htmlFor={`${id}-email`} hint="Alamat email resmi yang tampil di halaman Kontak dan footer.">
          <input id={`${id}-email`} type="email" inputMode="email" autoComplete="off" value={part.email} maxLength={120}
            onChange={(e) => onChange({ email: e.target.value })} aria-invalid={!emailOk} className={`${inputCls} ${emailOk ? "" : bad}`} />
        </Field>
        <Field label="Alamat" htmlFor={`${id}-addr`} hint="Ditulis lengkap, satu baris." className="sm:col-span-2">
          <textarea id={`${id}-addr`} rows={2} value={part.address} maxLength={300} onChange={(e) => onChange({ address: e.target.value })} className={inputCls} />
        </Field>
        {hasMap && (
          <Field label="Teks pencarian peta" htmlFor={`${id}-map`} className="sm:col-span-2"
            hint="Dipakai untuk peta, tombol “Buka di Google Maps”, dan Waze. Paling akurat: nama sekolah + alamat.">
            <div className="flex gap-2">
              <input id={`${id}-map`} value={part.mapQuery ?? ""} maxLength={300} onChange={(e) => onChange({ mapQuery: e.target.value })} className={inputCls} />
              <a href={mapsLink(part.mapQuery ?? "")} target="_blank" rel="noopener noreferrer" className={`${btnSecondary} shrink-0 px-3`} title="Uji di Google Maps">
                <Icon name="map" className="text-[20px]" /><span className="sr-only">Uji di Google Maps</span>
              </a>
            </div>
          </Field>
        )}
        <Field label="Instagram" htmlFor={`${id}-ig`} hint="Tautan profil, mis. https://www.instagram.com/akun/ — kosongkan untuk menyembunyikan.">
          <input id={`${id}-ig`} type="url" inputMode="url" value={part.instagram} maxLength={300} placeholder="https://www.instagram.com/…"
            onChange={(e) => onChange({ instagram: e.target.value })} aria-invalid={!isUrl(part.instagram)} className={urlCls(part.instagram)} />
        </Field>
        <Field label="Facebook" htmlFor={`${id}-fb`} hint="Kosongkan bila tidak ada.">
          <input id={`${id}-fb`} type="url" inputMode="url" value={part.facebook ?? ""} maxLength={300} placeholder="https://www.facebook.com/…"
            onChange={(e) => onChange({ facebook: e.target.value })} aria-invalid={!isUrl(part.facebook)} className={urlCls(part.facebook)} />
        </Field>
        <Field label="YouTube" htmlFor={`${id}-yt`} hint="Kosongkan bila tidak ada.">
          <input id={`${id}-yt`} type="url" inputMode="url" value={part.youtube ?? ""} maxLength={300} placeholder="https://www.youtube.com/…"
            onChange={(e) => onChange({ youtube: e.target.value })} aria-invalid={!isUrl(part.youtube)} className={urlCls(part.youtube)} />
        </Field>
      </div>
      <div className="flex flex-col gap-3 rounded-xl bg-[#25D366]/10 p-4 sm:flex-row sm:items-center">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#25D366] text-white"><Icon name="chat" className="text-[22px]" /></span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-800">{label}: {part.waDisplay || "—"}</p>
          <p className="truncate text-xs text-slate-500">{numberOk ? `https://wa.me/${part.waNumber}` : "Nomor belum valid"}</p>
        </div>
        {numberOk && (
          <a href={`https://wa.me/${part.waNumber}?text=${encodeURIComponent("Assalamu'alaikum, tes tautan dari dashboard.")}`} target="_blank" rel="noopener" className={btnSecondary}>
            <Icon name="open_in_new" className="text-[18px]" /> Uji tautan
          </a>
        )}
      </div>
    </div>
  );
}

export function ContactForm({ value: initial, custom, updatedAt }: LoadedSetting<"contact">) {
  const form = useSetting("contact", initial);
  const c = form.value;
  const { sd, smp, ...portal } = c;
  const error =
    problem("Portal", portal, false) ?? problem("SD", sd, true) ?? problem("SMP", smp, true);

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.save(error); }} className="space-y-6">
      <Card title="Portal (AL FAKHIR SCHOOL)" description="Dipakai di website utama: halaman Kontak, PPDB, Tentang, tombol WhatsApp melayang, dan footer portal.">
        <Section id="portal" label="Portal" hasMap={false} part={portal} onChange={(p) => form.update({ ...c, ...p })} />
      </Card>
      <Card title="SD Islam Modern Al Fakhir" description="Dipakai di semua halaman /sd: tombol WhatsApp, Kontak, PPDB, footer, dan peta lokasi SD.">
        <Section id="sd" label="SD" hasMap part={sd} onChange={(p) => form.update({ ...c, sd: { ...sd, ...p } })} />
      </Card>
      <Card title="SMP Islam Modern Al Fakhir" description="Dipakai di semua halaman /smp: tombol WhatsApp, Kontak, PPDB, footer, dan peta lokasi SMP.">
        <Section id="smp" label="SMP" hasMap part={smp} onChange={(p) => form.update({ ...c, smp: { ...smp, ...p } })} />
      </Card>
      <SaveBar form={form} custom={custom} updatedAt={updatedAt} onSave={() => form.save(error)} />
    </form>
  );
}

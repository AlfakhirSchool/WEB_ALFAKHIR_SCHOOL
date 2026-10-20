"use client";
import { useState } from "react";
import { waLinkFor } from "@/content/settings";
import { T } from "@/components/content/T";
import { useSettings } from "@/components/content/ContentProvider";
import { sendLead } from "@/lib/lead";
import { StarGlyph } from "@/components/pages/portal-shared/Ornaments";

type Campus = "SD" | "SMP";
const campuses: { k: Campus; label: string; dot: string; on: string }[] = [
  { k: "SD", label: "Jenjang SD", dot: "bg-secondary-container", on: "bg-secondary-container text-on-primary shadow-md" },
  { k: "SMP", label: "Jenjang SMP", dot: "bg-primary-container", on: "bg-primary text-on-primary shadow-md" },
];
const purposes = ["Kunjungan sekolah (school tour)", "Konsultasi PPDB", "Pertanyaan umum"];

const input = "w-full bg-surface-container-low px-4 py-3 rounded-xl border-[1.5px] border-primary-container/20 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container focus:bg-surface-container-lowest focus:ring-[3px] focus:ring-primary-container/10 transition-all";

/** No backend: composes the form into a WhatsApp message to the chosen school's number. */
export function KontakForm() {
  const { contact } = useSettings();
  const [campus, setCampus] = useState<Campus>("SMP");
  const [v, setV] = useState<Record<string, string>>({ purpose: purposes[0] });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        const body = [
          `Assalamu'alaikum, saya ingin menghubungi ${campus === "SD" ? "SD" : "SMP"} Islam Modern Al Fakhir.`,
          `Jenjang: ${campus}`,
          `Keperluan: ${v.purpose}`,
          `Nama orang tua/wali: ${v.name ?? "-"}`,
          `No. WhatsApp: ${v.wa ?? "-"}`,
          `Nama calon peserta didik: ${v.student ?? "-"}`,
          `Rencana tanggal kunjungan: ${v.date || "-"}`,
          `Pesan: ${v.msg || "-"}`,
        ].join("\n");
        sendLead("portal-kontak", { campus, purpose: v.purpose ?? "", name: v.name ?? "", wa: v.wa ?? "", student: v.student ?? "", date: v.date ?? "", msg: v.msg ?? "" });
        window.open(waLinkFor(contact, body, campus === "SD" ? "sd" : "smp"), "_blank", "noopener,noreferrer");
      }}
    >
      <fieldset className="flex flex-col gap-1.5 border-0 p-0 m-0">
        <legend className="font-label-lg text-label-lg text-on-surface mb-1.5"><T>Jenjang tujuan</T></legend>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Jenjang tujuan">
          {campuses.map((c) => (
            <button key={c.k} type="button" role="radio" aria-checked={campus === c.k} onClick={() => setCampus(c.k)}
              className={`inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 min-h-11 rounded-full font-label-lg text-label-lg uppercase tracking-wider whitespace-nowrap transition-all ${campus === c.k ? c.on : "bg-primary-container/10 text-primary hover:bg-primary-container/20"}`}>
              {campus === c.k ? <StarGlyph className="w-2.5 h-2.5 text-tertiary-fixed" /> : <span className={`w-2 h-2 rounded-full ${c.dot}`} />}
              <T>{c.label}</T>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="k-purpose" className="font-label-lg text-label-lg text-on-surface"><T>Keperluan</T> <span className="text-error">*</span></label>
        <div className="relative flex items-center">
          <select id="k-purpose" required value={v.purpose} onChange={set("purpose")} className={`${input} appearance-none pr-10`}>
            {purposes.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <span className="material-symbols-outlined absolute right-3 text-outline pointer-events-none text-[20px]">expand_more</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="k-name" className="font-label-lg text-label-lg text-on-surface"><T>Nama orang tua / wali</T> <span className="text-error">*</span></label>
          <input id="k-name" required className={input} placeholder="Nama lengkap" value={v.name ?? ""} onChange={set("name")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="k-wa" className="font-label-lg text-label-lg text-on-surface"><T>No. WhatsApp</T> <span className="text-error">*</span></label>
          <input id="k-wa" required type="tel" className={input} placeholder="Contoh: 081234567890" value={v.wa ?? ""} onChange={set("wa")} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="k-student" className="font-label-lg text-label-lg text-on-surface"><T>Nama calon peserta didik</T></label>
          <input id="k-student" className={input} placeholder="Nama ananda" value={v.student ?? ""} onChange={set("student")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="k-date" className="font-label-lg text-label-lg text-on-surface"><T>Rencana tanggal kunjungan</T></label>
          <input id="k-date" type="date" className={input} value={v.date ?? ""} onChange={set("date")} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="k-msg" className="font-label-lg text-label-lg text-on-surface"><T>Pesan</T> <span className="text-error">*</span></label>
        <textarea id="k-msg" required rows={4} className={`${input} resize-y`} placeholder="Tulis pertanyaan atau kebutuhan Ayah/Bunda" value={v.msg ?? ""} onChange={set("msg")} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
        <button type="submit" className="inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap px-7 py-3.5 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all">
          <span className="material-symbols-outlined text-[18px]">send</span><T>Kirim via WhatsApp</T>
        </button>
        <span className="font-caption text-caption text-outline text-pretty"><T>Pesan akan dibuka di WhatsApp dan dikirim ke nomor resmi sekolah.</T></span>
      </div>
    </form>
  );
}

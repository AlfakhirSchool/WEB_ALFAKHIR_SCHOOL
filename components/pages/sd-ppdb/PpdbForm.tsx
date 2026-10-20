"use client";
import { useState } from "react";
import { T } from "@/components/content/T";
import { useSettings } from "@/components/content/ContentProvider";
import { waLinkFor } from "@/content/settings";
import { sendLead } from "@/lib/lead";

const FIELDS = [
  { name: "anak", label: "Nama anak", type: "text", placeholder: "Nama lengkap calon siswa" },
  { name: "lahir", label: "Tanggal lahir", type: "date", placeholder: "" },
  { name: "tk", label: "Asal TK / RA", type: "text", placeholder: "Contoh: TK Al Fakhir" },
  { name: "ortu", label: "Nama orang tua / wali", type: "text", placeholder: "Nama Ayah / Bunda" },
  { name: "wa", label: "Nomor WhatsApp aktif", type: "tel", placeholder: "0812xxxxxxx" },
] as const;

/** No backend yet: composes the form into a WhatsApp message to the school number. */
export function PpdbForm() {
  const { contact } = useSettings();
  const [v, setV] = useState<Record<string, string>>({});
  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 gap-space-md"
      onSubmit={(e) => {
        e.preventDefault();
        const body = "Pendaftaran SD Kelas 1 (PPDB 2027/2028):\n" + FIELDS.map((f) => `${f.label}: ${v[f.name] ?? "-"}`).join("\n");
        sendLead("sd-ppdb", Object.fromEntries(FIELDS.map((f) => [f.name, v[f.name] ?? ""])));
        window.open(waLinkFor(contact, body, "sd"), "_blank", "noopener,noreferrer");
      }}
    >
      {FIELDS.map((f, i) => (
        <label key={f.name} className={`block ${i === FIELDS.length - 1 ? "sm:col-span-2" : ""}`}>
          <span className="font-label-md text-label-md text-on-surface font-bold block mb-1.5"><T>{f.label}</T></span>
          <input
            required
            type={f.type}
            placeholder={f.placeholder}
            value={v[f.name] ?? ""}
            onChange={(e) => setV({ ...v, [f.name]: e.target.value })}
            className="w-full min-h-[48px] px-space-md py-3 rounded-2xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline border border-transparent focus:outline-none focus:border-primary-container focus:bg-surface focus:ring-2 focus:ring-primary-fixed transition-colors"
          />
        </label>
      ))}
      <button
        type="submit"
        className="sm:col-span-2 mt-space-xs inline-flex items-center justify-center gap-space-xs px-space-lg py-4 min-h-[48px] bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-full shadow-[0_12px_28px_-6px_rgba(184,71,11,0.25)] active:translate-y-0.5 transition-all text-center"
      >
        <span className="material-symbols-outlined text-[20px]">chat</span>
        <span><T>Kirim pendaftaran via WhatsApp</T></span>
      </button>
    </form>
  );
}

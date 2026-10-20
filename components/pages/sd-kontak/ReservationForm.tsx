"use client";
import { useRef, useState } from "react";
import { T } from "@/components/content/T";
import { useSettings } from "@/components/content/ContentProvider";
import { waLinkFor } from "@/content/settings";
import { sendLead } from "@/lib/lead";

const FIELDS: [string, string][] = [
  ["wali", "Nama Orang Tua / Wali"],
  ["wa", "Nomor WhatsApp"],
  ["ananda", "Nama Ananda (Calon Siswa)"],
  ["usia", "Usia Ananda"],
  ["jenjang", "Rencana Jenjang Pendaftaran"],
  ["asal", "Asal TK / RA / PAUD"],
  ["tanggal", "Rencana Tanggal Kunjungan"],
  ["sesi", "Pilihan Waktu / Sesi Tour"],
  ["catatan", "Topik Minat & Catatan Khusus"],
];

/** No backend: composes the reservation into a WhatsApp message to the school number. */
export function ReservationForm() {
  const { contact } = useSettings();
  const [sent, setSent] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const lead: Record<string, string> = {};
    const lines = FIELDS.map(([name, label]) => {
      const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
      let v = el?.value ?? "";
      if (el instanceof HTMLSelectElement) v = el.selectedOptions[0]?.textContent ?? "";
      lead[name] = v.trim();
      return `${label}: ${v.trim() || "-"}`;
    });
    sendLead("sd-kontak", lead);
    window.open(
      waLinkFor(contact, `Halo Admin SD Al Fakhir, saya ingin reservasi Kunjungan Sekolah & Trial Class.\n${lines.join("\n")}`, "sd"),
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
    requestAnimationFrame(() => alertRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  }

  return (
    <form className="space-y-space-md" id="reservationForm" onSubmit={onSubmit}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="space-y-1">
<label className="block font-label-lg text-label-lg text-on-surface">
                  <T>Nama Lengkap Orang Tua / Wali</T>{" "}<span className="text-primary">*</span>
</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-[20px]">person</span>
<input name="wali" className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline text-ellipsis focus:outline-none focus:ring-2 focus:ring-primary-container" placeholder="Contoh: Ayah Ir. Hendra / Bunda Siti" required type="text" />
</div>
</div>
<div className="space-y-1">
<label className="block font-label-lg text-label-lg text-on-surface">
                  <T>Nomor WhatsApp Aktif</T>{" "}<span className="text-primary">*</span>
</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-[20px]">chat</span>
<input name="wa" className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline text-ellipsis focus:outline-none focus:ring-2 focus:ring-primary-container" placeholder="0812-XXXX-XXXX (Notifikasi E-Ticket)" required type="tel" />
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="space-y-1">
<label className="block font-label-lg text-label-lg text-on-surface">
                  <T>Nama Lengkap Ananda (Calon Siswa)</T>{" "}<span className="text-primary">*</span>
</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-[20px]">child_care</span>
<input name="ananda" className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline text-ellipsis focus:outline-none focus:ring-2 focus:ring-primary-container" placeholder="Contoh: Muhammad Rayyan Fatih" required type="text" />
</div>
</div>
<div className="space-y-1">
<label className="block font-label-lg text-label-lg text-on-surface">
                  <T>Usia Ananda Saat Ini</T>{" "}<span className="text-primary">*</span>
</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-[20px]">cake</span>
<input name="usia" className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container" placeholder="Contoh: 6 Tahun 4 Bulan" required type="text" />
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="space-y-1">
<label className="block font-label-lg text-label-lg text-on-surface">
                  <T>Rencana Jenjang Pendaftaran</T>{" "}<span className="text-primary">*</span>
</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-[20px]">school</span>
<select name="jenjang" className="w-full pl-10 pr-8 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md text-ellipsis focus:outline-none focus:ring-2 focus:ring-primary-container appearance-none" required>
<option value="">Pilih Program / Jenjang...</option>
<option value="kelas1">Kelas 1 Reguler Unggulan</option>
<option value="pindahan">Siswa Pindahan (Mutasi Kelas 2 - 5)</option>
<option value="tahfidz">Program Kelas Tahfidz Khusus</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant text-[20px]">arrow_drop_down</span>
</div>
</div>
<div className="space-y-1">
<label className="block font-label-lg text-label-lg text-on-surface">
                  <T>Asal TK / RA / PAUD</T>
                </label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-[20px]">location_city</span>
<input name="asal" className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container" placeholder="Nama sekolah asal ananda" type="text" />
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="space-y-1">
<label className="block font-label-lg text-label-lg text-on-surface">
                  <T>Rencana Tanggal Kunjungan</T>{" "}<span className="text-primary">*</span>
</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-[20px]">calendar_month</span>
<input name="tanggal" className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container" required type="date" />
</div>
</div>
<div className="space-y-1">
<label className="block font-label-lg text-label-lg text-on-surface">
                  <T>Pilihan Waktu / Sesi Tour</T>{" "}<span className="text-primary">*</span>
</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-[20px]">schedule</span>
<select name="sesi" className="w-full pl-10 pr-8 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md text-ellipsis focus:outline-none focus:ring-2 focus:ring-primary-container appearance-none" required>
<option value="pagi">Sesi Pagi (08.30 - 10.00 WIB)</option>
<option value="siang">Sesi Siang (10.30 - 12.00 WIB)</option>
<option value="sabtu">Sesi Khusus Sabtu Pagi (09.00 - 11.00 WIB)</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant text-[20px]">arrow_drop_down</span>
</div>
</div>
</div>
<div className="space-y-1">
<label className="block font-label-lg text-label-lg text-on-surface">
                <T>Topik Minat &amp; Catatan Khusus</T>
              </label>
<div className="relative">
<textarea name="catatan" className="w-full p-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline resize-y focus:outline-none focus:ring-2 focus:ring-primary-container" placeholder="Contoh: Ingin konsultasi pemetaan gaya belajar anak, penyesuaian adaptasi sosialisasi, atau kurikulum sains bilingual..." rows={5}></textarea>
</div>
</div>
<div className="flex items-start gap-space-sm pt-space-xs">
<input className="mt-1 w-5 h-5 shrink-0 rounded text-primary-container accent-primary-container cursor-pointer" id="commitmentCheck" required type="checkbox" />
<label className="font-body-md text-body-md text-on-surface-variant cursor-pointer" htmlFor="commitmentCheck">
                <T>Saya &amp; ananda bersedia hadir tepat waktu sesuai sesi yang dipilih demi kenyamanan jadwal trial class dan kelancaran simulasi kelas belajar.</T>
              </label>
</div>
<div className="pt-space-xs">
<button className="w-full min-h-12 py-3 px-space-md sm:px-space-lg rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg text-center shadow-md hover:bg-primary active:translate-y-[2px] transition-all flex items-center justify-center gap-space-sm" type="submit">
<span><T>Kirim Reservasi &amp; Unduh E-Pass Kunjungan</T></span>
<span className="material-symbols-outlined text-[20px] shrink-0">confirmation_number</span>
</button>
</div>
<div className="p-space-sm rounded-lg bg-secondary-fixed/50 flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary-container text-[24px] shrink-0">redeem</span>
<p className="font-label-md text-label-md text-on-secondary-fixed leading-snug">
<strong><T>Kunjungan &amp; Trial Class 100% Bebas Biaya</T></strong>{" "}<T>• Termasuk</T>{" "}<em><T>Kids Welcome Pack</T></em>{" "}<T>ceria, snack sehat organik, dan buku panduan kurikulum SD.</T>
              </p>
</div>
<div className={`${sent ? "flex" : "hidden"} p-space-md rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-body-md text-body-md items-center gap-space-sm`} id="formSuccessAlert" ref={alertRef}>
<span className="material-symbols-outlined text-tertiary text-[24px] shrink-0">task_alt</span>
<div>
<strong><T>Alhamdulillah! Reservasi Anda Berhasil Terkirim.</T></strong><br />
                <T>E-Ticket &amp; Petunjuk Lokasi telah kami kirimkan ke WhatsApp Anda. Sampai jumpa di sekolah ceria kami!</T>
              </div>
</div>
</form>
  );
}

"use client";
import { useState } from "react";
import { waLinkFor } from "@/content/settings";
import { useSettings } from "@/components/content/ContentProvider";
import { T } from "@/components/content/T";
import { sendLead } from "@/lib/lead";

const selText = (f: HTMLFormElement, id: string) => {
  const el = f.elements.namedItem(id) as HTMLSelectElement;
  return el.selectedOptions[0]?.text ?? "-";
};

export function ReservationForm() {
  const { contact } = useSettings();
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const v = (id: string) => (f.elements.namedItem(id) as HTMLInputElement).value.trim() || "-";
    const body = [
      "Assalamu'alaikum, saya ingin reservasi School Tour & Konsultasi Akademik SMP Islam Modern Al Fakhir.",
      `Nama Wali: ${v("parentName")}`,
      `WhatsApp: ${v("whatsapp")}`,
      `Nama Calon Siswa: ${v("studentName")}`,
      `Asal Sekolah (SD/MI): ${v("schoolOrigin")}`,
      `Keperluan Kunjungan: ${selText(f, "trackSelection")}`,
      `Rencana Tanggal Kunjungan: ${v("tourDate")}`,
      `Sesi Kunjungan: ${selText(f, "tourSession")}`,
      `Kebutuhan Khusus / Topik Diskusi: ${v("specialTopic")}`,
    ].join("\n");
    sendLead("smp-kontak", {
      parentName: v("parentName"),
      whatsapp: v("whatsapp"),
      studentName: v("studentName"),
      schoolOrigin: v("schoolOrigin"),
      trackSelection: selText(f, "trackSelection"),
      tourDate: v("tourDate"),
      tourSession: selText(f, "tourSession"),
      specialTopic: v("specialTopic"),
    });
    window.open(waLinkFor(contact, body, "smp"), "_blank", "noopener,noreferrer");
    setDone(true);
  }

  return (
    <>
      <form className="flex flex-col gap-5" id="reservationForm" onSubmit={onSubmit}>
        <div className="flex flex-col gap-1.5">
          <label className="font-label-lg text-label-lg text-on-surface" htmlFor="parentName"><T>Nama Lengkap Wali Calon Siswa</T>{" "}
            <span className="text-error">
              *
            </span>
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px]">
              badge
            </span>
            <input className="w-full bg-surface-container-low pl-11 pr-4 py-3 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all" id="parentName" name="parentName" placeholder="Contoh: Ir. H. Ahmad Zulkarnain" required type="text" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-label-lg text-label-lg text-on-surface" htmlFor="whatsapp"><T>Nomor WhatsApp Aktif</T>{" "}
            <span className="text-error">
              *
            </span>
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px]">
              call
            </span>
            <input className="w-full bg-surface-container-low pl-11 pr-4 py-3 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all" id="whatsapp" name="whatsapp" placeholder="Contoh: 081234567890" required type="tel" />
          </div>
          <span className="font-caption text-caption text-outline"><T>Konfirmasi jadwal kunjungan akan disampaikan pihak sekolah melalui nomor ini.</T></span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-lg text-label-lg text-on-surface" htmlFor="studentName"><T>Nama Calon Siswa</T>{" "}
              <span className="text-error">
                *
              </span>
            </label>
            <input className="w-full bg-surface-container-low px-4 py-3 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all" id="studentName" name="studentName" placeholder="Nama ananda" required type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-label-lg text-label-lg text-on-surface" htmlFor="schoolOrigin"><T>Asal Sekolah (SD/MI)</T>{" "}
              <span className="text-error">
                *
              </span>
            </label>
            <input className="w-full bg-surface-container-low px-4 py-3 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all" id="schoolOrigin" name="schoolOrigin" placeholder="Nama SD/MI saat ini" required type="text" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-label-lg text-label-lg text-on-surface" htmlFor="trackSelection"><T>Keperluan Kunjungan</T>{" "}
            <span className="text-error">
              *
            </span>
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px]">
              school
            </span>
            <select className="w-full bg-surface-container-low pl-11 pr-8 py-3 rounded-lg font-body-sm text-body-sm text-on-surface appearance-none focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all" id="trackSelection" name="trackSelection" required defaultValue="">
              <option disabled value="">
                Pilih Keperluan
              </option>
              <option value="ppdb">
                Pendaftaran Siswa Baru (PPDB)
              </option>
              <option value="konsultasi">
                Konsultasi Program &amp; Kurikulum
              </option>
              <option value="tour">
                Mengenal Sekolah (School Tour)
              </option>
            </select>
            <span className="material-symbols-outlined absolute right-3 text-outline pointer-events-none text-[20px]">
              expand_more
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-lg text-label-lg text-on-surface" htmlFor="tourDate"><T>Rencana Tanggal Kunjungan</T>{" "}
              <span className="text-error">
                *
              </span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px]">
                calendar_today
              </span>
              <input className="w-full bg-surface-container-low pl-11 pr-4 py-3 rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all" id="tourDate" name="tourDate" required type="date" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-label-lg text-label-lg text-on-surface" htmlFor="tourSession"><T>Pilihan Sesi Kunjungan</T>{" "}
              <span className="text-error">
                *
              </span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px]">
                schedule
              </span>
              <select className="w-full bg-surface-container-low pl-11 pr-8 py-3 rounded-lg font-body-sm text-body-sm text-on-surface appearance-none focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all" id="tourSession" name="tourSession" required defaultValue="">
                <option disabled value="">
                  Pilih Sesi
                </option>
                <option value="pagi">
                  Sesi Pagi (08.30 – 10.00 WIB)
                </option>
                <option value="siang">
                  Sesi Siang (10.30 – 12.00 WIB)
                </option>
                <option value="sore">
                  Sesi Sore (13.30 – 15.00 WIB)
                </option>
              </select>
              <span className="material-symbols-outlined absolute right-3 text-outline pointer-events-none text-[20px]">
                expand_more
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-label-lg text-label-lg text-on-surface" htmlFor="specialTopic"><T>Kebutuhan Khusus / Topik Diskusi</T></label>
          <textarea className="w-full bg-surface-container-low p-3.5 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all" id="specialTopic" name="specialTopic" placeholder="Contoh: Konsultasi program Tahsin &amp; Tahfiz, kegiatan ekstrakurikuler, atau alur observasi dan wawancara PPDB." rows={4} />
        </div>
        <div className="flex items-start gap-3 pt-1">
          <input className="mt-1 w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer" id="confirmCheckbox" name="confirmCheckbox" required type="checkbox" />
          <label className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer select-none" htmlFor="confirmCheckbox"><T>Saya berkomitmen hadir mendampingi ananda tepat waktu sesuai jadwal sesi yang telah dipilih, untuk menjamin kelancaran kegiatan kunjungan.</T></label>
        </div>
        <button className="mt-3 flex items-center justify-center gap-2.5 bg-primary-container text-on-primary font-headline-sm text-headline-sm max-sm:text-[16px] py-4 px-6 rounded-full hover:bg-primary transition-all shadow-md group" type="submit">
          <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">
            confirmation_number
          </span>
          <span className="font-bold text-center text-balance leading-snug"><T>Kirim Reservasi via WhatsApp</T></span>
        </button>
        <div className="flex items-center gap-3 bg-surface-container-low p-3.5 rounded-xl">
          <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0">
            verified
          </span>
          <p className="font-caption text-caption text-on-surface-variant">
            <strong className="text-on-surface"><T>Konfirmasi Jadwal:</T></strong>
            {" "}<T>Jadwal kunjungan dikonfirmasi oleh pihak sekolah melalui WhatsApp setelah pesan reservasi Anda terkirim.</T></p>
        </div>
      </form>
      {done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-4" id="successModal" role="dialog" aria-modal="true">
          <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-6 md:p-8 flex flex-col gap-5 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 rounded-full bg-surface-container text-primary flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px]">
                check_circle
              </span>
            </div>
            <div className="flex flex-col text-center gap-2">
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold"><T>Permintaan Reservasi Terkirim!</T></h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant"><T>Alhamdulillah, permintaan reservasi school tour Ayah &amp; Bunda telah diteruskan ke WhatsApp resmi SMP Islam Modern Al Fakhir.</T></p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-lg flex flex-col gap-2 font-body-sm text-body-sm text-on-surface">
              <div className="flex justify-between">
                <span className="text-outline"><T>Saluran:</T></span>
                <span className="font-bold text-primary font-mono tracking-wider"><T>WhatsApp Resmi Sekolah</T></span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline"><T>Konfirmasi Jadwal:</T></span>
                <span className="font-semibold text-secondary"><T>Menunggu Balasan Sekolah</T></span>
              </div>
            </div>
            <p className="font-caption text-caption text-outline text-center"><T>Pastikan pesan WhatsApp yang terbuka sudah Anda kirim, lalu tunggu konfirmasi jadwal dari pihak sekolah.</T></p>
            <button type="button" onClick={() => setDone(false)} className="w-full bg-primary text-on-primary py-3 rounded-full font-label-lg text-label-lg font-bold hover:bg-primary-container transition-colors"><T>Tutup &amp; Selesai</T></button>
          </div>
        </div>
      )}
    </>
  );
}

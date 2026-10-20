"use client";
import { useState, type ReactNode } from "react";
import { T } from "@/components/content/T";

const ITEMS: { q: string; a: ReactNode }[] = [
  {
    q: "Apakah ananda wajib diajak saat kunjungan sekolah pertama kali?",
    a: <T>Sangat dianjurkan untuk mengajak ananda tercinta! Dengan melihat langsung suasana kelas, menyapa calon guru, dan berinteraksi di ruang bermain, ananda akan merasa dilibatkan dalam keputusan memilih sekolah serta membangun rasa antusias dan nyaman sejak awal.</T>,
  },
  {
    q: "Apakah ada biaya untuk mengikuti sesi Trial Class?",
    a: (
      <>
        <T>Sesi Trial Class di SD Islam Modern Al Fakhir sepenuhnya</T>{" "}<strong><T>100% Bebas Biaya (Gratis)</T></strong><T>. Kami juga menyediakan welcome snack bergizi serta souvenir alat kreasi mini untuk dibawa pulang oleh ananda.</T>
      </>
    ),
  },
  {
    q: "Bagaimana jika kami berhalangan hadir pada tanggal yang sudah dipesan?",
    a: <T>Tidak perlu khawatir! Ayah dan Bunda cukup memberi kabar kepada admin melalui kontak WhatsApp resmi paling lambat H-1 atau pada pagi hari hari kunjungan. Tim kami akan dengan senang hati menjadwalkan ulang ke tanggal dan sesi alternatif yang paling nyaman bagi keluarga.</T>,
  },
  {
    q: "Apakah ada sesi konsultasi psikologi anak sebelum pendaftaran?",
    a: <T>Ya, benar sekali. Kami memiliki Biro Konseling &amp; Psikologi Ramah Anak. Orang tua dapat berdiskusi mengenai kematangan sekolah, pemetaan modalitas belajar (visual, auditori, kinestetik), dan kebutuhan adaptasi khusus ananda tanpa ada unsur tes seleksi yang menegangkan.</T>,
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-space-sm" id="faqAccordion">
      {ITEMS.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-sm transition-all">
            <button
              className="faq-btn w-full px-space-md py-4 text-left flex items-center justify-between gap-space-sm focus:outline-none"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-title-md sm:font-title-lg text-title-md sm:text-title-lg text-on-surface font-semibold text-pretty"><T>{it.q}</T></span>
              <span className={`material-symbols-outlined shrink-0 text-primary-container transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>expand_more</span>
            </button>
            <div className={`${isOpen ? "" : "hidden"} px-space-md pb-4 text-on-surface-variant font-body-md text-body-md leading-relaxed`}>{it.a}</div>
          </div>
        );
      })}
    </div>
  );
}

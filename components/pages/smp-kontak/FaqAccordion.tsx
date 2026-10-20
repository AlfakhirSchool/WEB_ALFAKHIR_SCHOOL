"use client";
import { useState } from "react";
import { T } from "@/components/content/T";

const items = [
  { q: "Bagaimana alur pendaftaran siswa baru SMP Islam Modern Al Fakhir?", a: "Orang tua mengisi formulir pendaftaran online di situs sekolah. Calon siswa kemudian mengikuti observasi sebagai pemetaan kemampuan awal, sedangkan orang tua mengikuti wawancara bersama tim guru. Pada rangkaian observasi juga dilakukan pengukuran seragam." },
  { q: "Di mana hasil observasi calon siswa diumumkan?", a: "Hasil observasi diumumkan per gelombang melalui menu PPDB di situs resmi smpialfakhir.sch.id, yaitu Hasil Observasi 2025, Hasil Observasi Gel.1 2026, dan Hasil Observasi Gel.2 2026." },
  { q: "Apakah calon siswa mengerjakan soal saat observasi?", a: "Ya. Calon siswa mengerjakan soal observasi di ruang kelas sebagai sarana pemetaan kemampuan awal, sehingga sekolah dapat memberikan layanan pembelajaran yang sesuai dengan potensi masing-masing anak." },
  { q: "Apa yang dibahas pada wawancara orang tua?", a: "Wawancara menggali kesiapan orang tua dalam mendukung proses pendidikan anak, serta menyamakan persepsi terkait nilai-nilai yang diusung SMP Islam Modern Al Fakhir." },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-3" id="faqAccordion">
      {items.map((it, i) => (
        <div key={it.q} className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
          <button
            type="button"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 p-5 text-left font-headline-sm text-[16px] sm:text-[18px] leading-snug text-on-surface font-bold hover:text-primary transition-colors"
          >
            <span className="text-pretty"><T>{it.q}</T></span>
            <span
              className="material-symbols-outlined shrink-0 text-outline transition-transform duration-200"
              style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              expand_more
            </span>
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-on-surface-variant font-body-sm text-body-sm leading-relaxed">
              <T>{it.a}</T>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

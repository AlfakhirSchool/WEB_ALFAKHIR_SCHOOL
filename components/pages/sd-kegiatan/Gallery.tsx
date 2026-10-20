"use client";
import { useState } from "react";
import { T } from "@/components/content/T";
import { Img } from "@/components/content/Img";

type Cat = "all" | "observasi" | "tahfiz" | "steam" | "outdoor" | "seni" | "olahraga";

const FILTERS: { id: Cat; label: string }[] = [
  { id: "all", label: "Semua Kegiatan" },
  { id: "observasi", label: "Penerimaan Murid Baru" },
  { id: "tahfiz", label: "Tahfiz & Karakter Islami" },
  { id: "steam", label: "Joyful STEAM & Sains" },
  { id: "outdoor", label: "Outdoor & Eksplorasi Alam" },
  { id: "seni", label: "Seni Budaya & Literasi" },
  { id: "olahraga", label: "Olahraga Sunnah & Prestasi" },
];

const CARDS: { cat: Exclude<Cat, "all">; img: string; alt: string; blob: string; badgeBg: string; badgeIcon: string; badgeLabel: string; meta1: string; meta2: string; title: string; desc: string; footColor: string; footIcon: string; footText: string }[] = [
  { cat: "observasi", img: "/photos/sd/observasi.webp", alt: "Orang tua dan calon siswa menunggu giliran observasi di aula SD Islam Modern Al Fakhir", blob: "rounded-[58%_42%_64%_36%/43%_57%_43%_57%] group-hover:rounded-full group-hover:-rotate-2", badgeBg: "bg-secondary-container text-on-primary", badgeIcon: "how_to_reg", badgeLabel: "Observasi", meta1: "14 Feb 2026", meta2: "SPMB 2026/27", title: "Observasi Calon Siswa", desc: "Bagian dari rangkaian Seleksi Penerimaan Murid Baru (SPMB) Tahun Pelajaran 2026–2027: mengenal potensi, karakter, dan kesiapan belajar calon siswa dengan pendekatan yang menyenangkan dan edukatif.", footColor: "text-secondary-container", footIcon: "event_available", footText: "Seleksi Penerimaan Murid Baru" },
  { cat: "tahfiz", img: "/design/sd-kegiatan/02.jpg", alt: "Santri cilik SD Islam Al Fakhir perempuan memakai jilbab putih dan laki-laki berpeci rapi duduk melingkar khusyuk di atas karpet hijau lembut membaca Al-Qur'an mushaf besar didampingi ustadzah muda dengan senyum ramah di ruang halaqah yang lapang bercahaya terang.", blob: "rounded-[58%_42%_64%_36%/43%_57%_43%_57%] group-hover:rounded-full group-hover:-rotate-2", badgeBg: "bg-tertiary text-on-tertiary", badgeIcon: "menu_book", badgeLabel: "Tahfiz", meta1: "Metode Usmani", meta2: "Kelas 1–6", title: "Halaqah Pagi & Khotmil Qur'an", desc: "Santri mengawali hari dengan tilawah tartil, tahsin bersanad, dan pemahaman makna surat pendek yang menyenangkan.", footColor: "text-tertiary", footIcon: "verified", footText: "Harian 07.15 WIB" },
  { cat: "steam", img: "/design/sd-kegiatan/03.jpg", alt: "Dua siswa SD Indonesia kelas 3 mengenakan jas lab putih mini dan kacamata sains transparan gembira melihat tabung reaksi dengan busa warna-warni yang mengembang di laboratorium terbuka cerah dengan dekorasi tanaman hijau.", blob: "rounded-[38%_62%_41%_59%/55%_38%_62%_45%] group-hover:rounded-full group-hover:rotate-2", badgeBg: "bg-secondary-container text-on-primary", badgeIcon: "science", badgeLabel: "STEAM", meta1: "Nalar Kritis", meta2: "Kelas 3–4", title: "Young Scientist: Erupsi & Roket Air", desc: "Memahami hukum fisika dan reaksi kimia dasar melalui percobaan hands-on interaktif yang membakar rasa ingin tahu.", footColor: "text-secondary-container", footIcon: "biotech", footText: "Lab Outdoor" },
  { cat: "olahraga", img: "/design/sd-kegiatan/04.jpg", alt: "Anak laki-laki Indonesia murid sekolah dasar mengenakan seragam olahraga Al Fakhir oranye-putih memegang busur panah tradisional horsebow dengan tatapan mata fokus membidik sasaran panahan warna-warni di lapangan rumput hijau luas yang asri.", blob: "rounded-[65%_35%_55%_45%/38%_62%_38%_62%] group-hover:rounded-full group-hover:-rotate-2", badgeBg: "bg-tertiary text-on-tertiary", badgeIcon: "sports_score", badgeLabel: "Olahraga Sunnah", meta1: "Fokus & Konsentrasi", meta2: "Kelas 2–6", title: "Panahan Sunnah & Archery Kids", desc: "Melatih ketajaman konsentrasi, kontrol emosi, pernapasan, serta postur tegap yang mencerminkan keteguhan karakter mukmin.", footColor: "text-tertiary", footIcon: "target", footText: "Tiap Sabtu Pagi" },
  { cat: "outdoor", img: "/design/sd-kegiatan/05.jpg", alt: "Regu pramuka siaga siswa SD Indonesia laki-laki dan perempuan berseragam pramuka lengkap dengan kacu merah putih bergotong royong mendirikan pasak tenda dome di bumi perkemahan pinus yang sejuk dengan tawa lepas riang gembira.", blob: "rounded-[45%_55%_35%_65%/60%_40%_60%_40%] group-hover:rounded-full group-hover:rotate-2", badgeBg: "bg-primary-container text-on-primary", badgeIcon: "forest", badgeLabel: "Kepanduan", meta1: "Kemandirian", meta2: "Kelas 4–6", title: "Outdoor Discovery & Kemah Siaga", desc: "Menempa ketangguhan jasmani, kerja sama kelompok, api unggun adab, serta kecintaan menjaga kelestarian alam ciptaan Allah.", footColor: "text-primary", footIcon: "hiking", footText: "Agenda Semester 2" },
  { cat: "tahfiz", img: "/design/sd-kegiatan/06.jpg", alt: "Suasana riuh stand market day siswa SD Islam di selasar sekolah, anak-anak berpakaian koki cilik tersenyum ramah melayani teman sebaya yang membeli jus buah segar dan kue tradisional dengan uang mainan edukatif bertuliskan mata uang rupiah.", blob: "rounded-[52%_48%_68%_32%/37%_63%_37%_63%] group-hover:rounded-full group-hover:-rotate-2", badgeBg: "bg-secondary-container text-on-primary", badgeIcon: "storefront", badgeLabel: "Muamalah", meta1: "Entrepreneur Cilik", meta2: "Kelas 1–5", title: "Market Day & Muamalah Ramah", desc: "Simulasi jual-beli jujur, penghitungan modal-laba sederhana, komunikasi persuasif, serta infak sukarela dari hasil usaha.", footColor: "text-secondary-container", footIcon: "payments", footText: "Tematik Bisnis" },
  { cat: "seni", img: "/design/sd-kegiatan/07.jpg", alt: "Anak perempuan Indonesia berhijab manis tampil percaya diri memegang mikrofon di panggung pentas seni aula sekolah bernuansa hangat, memperagakan wayang dongeng kancil dan gajah dengan latar panggung bertuliskan Pentas Dongeng Islami.", blob: "rounded-[39%_61%_33%_67%/59%_36%_64%_41%] group-hover:rounded-full group-hover:rotate-2", badgeBg: "bg-tertiary text-on-tertiary", badgeIcon: "theater_comedy", badgeLabel: "Seni Budaya", meta1: "Ekspresi & Vokal", meta2: "Kelas 1–6", title: "Pentas Seni Dongeng & Rebana", desc: "Wadah keberanian anak mengekspresikan bakat seni suara rebana, drama sirah nabawiyah, dan orasi santun di depan publik.", footColor: "text-tertiary", footIcon: "celebration", footText: "Panggung Tahunan" },
  { cat: "outdoor", img: "/design/sd-kegiatan/08.jpg", alt: "Dua anak murid SD tersenyum bangga memegang selada hijau hidroponik segar yang baru dipanen dari instalasi pipa hidroponik di rooftop kebun sekolah yang bersih bermandikan sinar matahari alami Depok.", blob: "rounded-[61%_39%_69%_31%/48%_62%_38%_52%] group-hover:rounded-full group-hover:-rotate-2", badgeBg: "bg-tertiary-container text-on-tertiary", badgeIcon: "eco", badgeLabel: "Adab Lingkungan", meta1: "Green Farming", meta2: "Semua Jenjang", title: "Panen Sayur Hidroponik Sekolah", desc: "Memupuk rasa syukur atas limpahan rezeki bumi, belajar sirkulasi air nutrisi, dan mengonsumsi makanan sehat bergizi tinggi.", footColor: "text-tertiary", footIcon: "potted_plant", footText: "Kebun Al Fakhir" },
  { cat: "seni", img: "/design/sd-kegiatan/09.jpg", alt: "Seorang siswi muslim cilik kelas 5 berhijab krem anggun memegang flashcard besar cerita Nabi Ibrahim AS berbahasa Inggris, tersenyum percaya diri di hadapan teman-temannya di perpustakaan sekolah modern berkarpet nyaman.", blob: "rounded-[42%_58%_36%_64%/53%_41%_59%_47%] group-hover:rounded-full group-hover:rotate-2", badgeBg: "bg-primary text-on-primary", badgeIcon: "translate", badgeLabel: "Bahasa", meta1: "English & Arabic", meta2: "Kelas 3–6", title: "Storytelling Bahasa Arab & Inggris", desc: "Membiasakan keluwesan berbicara dalam Bahasa Inggris dan Arab melalui dongeng kisah teladan para nabi dan pahlawan Islam.", footColor: "text-primary", footIcon: "record_voice_over", footText: "Bahasa Arab & Inggris" }
];

export function Gallery() {
  const [active, setActive] = useState<Cat>("all");
  const shown = CARDS.filter((c) => active === "all" || c.cat === active);
  return (
    <section className="w-full bg-surface-container-low px-margin-mobile lg:px-margin pt-space-md pb-space-xl" id="galeri">
      <div className="max-w-[76rem] mx-auto space-y-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="space-y-space-xs max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-secondary-container font-label-md font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              <span><T>Galeri Pembelajaran Interaktif</T></span>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary text-balance">
              <T>Harmoni Belajar, Membangun Generasi Qur&apos;ani Berprestasi</T>
            </h2>
            <p className="font-body-md text-on-surface-variant text-pretty">
              <T>Setiap momen dirancang agar anak merasa dihargai, terpacu ingin tahunya, serta terbiasa meneladani akhlak mulia sejak dini.</T>
            </p>
          </div>
          <div className="flex items-center gap-3 bg-surface-container-lowest px-5 py-3 rounded-2xl shadow-sm self-start md:self-auto shrink-0">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">collections</span>
            </div>
            <div>
              <div className="font-title-lg text-primary font-bold leading-tight"><T>84+ Momen</T></div>
              <div className="font-label-sm text-on-surface-variant"><T>Terdokumentasi Lengkap</T></div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:grid sm:grid-cols-2 lg:grid-cols-3" id="activity-filters" role="tablist" aria-label="Filter kegiatan">
          {FILTERS.map((f) => {
            const on = f.id === active;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(f.id)}
                className={
                  on
                    ? "filter-btn active whitespace-nowrap min-h-[44px] px-5 py-2.5 rounded-full text-center font-label-md font-bold bg-primary text-on-primary shadow-sm hover:opacity-95 transition-all"
                    : "filter-btn whitespace-nowrap min-h-[44px] px-5 py-2.5 rounded-full text-center font-label-md font-semibold bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-all"
                }
              >
                <T>{f.label}</T>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg pt-space-xs items-stretch">
          {shown.map((c) => (
            <div key={c.title} className="group flex flex-col h-full bg-surface-container-lowest rounded-3xl p-5 shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(184,71,11,0.12)] transition-all duration-300">
              <div className="relative w-full aspect-[4/3.5]">
                <div className={`w-full h-full overflow-hidden ${c.blob} transition-all duration-500 bg-surface-container-high`}>
                  <Img className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" alt={c.alt} src={c.img} />
                </div>
                <div className={`absolute top-3 left-3 ${c.badgeBg} px-3 py-1 rounded-full font-label-sm font-bold flex items-center gap-1 shadow-sm whitespace-nowrap`}>
                  <span className="material-symbols-outlined text-[14px]">{c.badgeIcon}</span>
                  <T>{c.badgeLabel}</T>
                </div>
              </div>
              <div className="pt-4 flex flex-col flex-grow justify-between gap-2">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-on-surface-variant font-label-sm">
                    <span><T>{c.meta1}</T></span>
                    <span><T>{c.meta2}</T></span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary-container transition-colors text-balance">
                    <T>{c.title}</T>
                  </h3>
                  <p className="font-body-md text-on-surface-variant line-clamp-3"><T>{c.desc}</T></p>
                </div>
                <div className="pt-3 mt-2 flex items-center justify-between gap-2 text-primary font-label-md font-bold">
                  <span className={`inline-flex items-start gap-1 min-w-0 ${c.footColor}`}>
                    <span className="material-symbols-outlined text-[16px] shrink-0 leading-snug">{c.footIcon}</span> <span><T>{c.footText}</T></span>
                  </span>
                  <span className="material-symbols-outlined shrink-0 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

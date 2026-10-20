"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { waLinkFor } from "@/content/settings";
import { useSettings } from "@/components/content/ContentProvider";
import { T } from "@/components/content/T";
import { Img } from "@/components/content/Img";

type Karya = { title: string; authors: string; event: string; specs: string[]; description: string; honor: string };

const modalData: Record<string, Karya> = {
  "karya-1": {
    title: "Potensi Buah Bit (Beta Vulgaris) sebagai Alternatif Alami untuk Mengatasi Hiperpigmentasi Bibir",
    authors: "Tim 6 siswa SMP Islam Modern Al Fakhir",
    event: "Invention and Innovation Fair (IIF) 2025, 10–12 Maret 2025 (daring)",
    specs: [
      "Ajang: Invention and Innovation Fair (IIF) 2025, tingkat nasional",
      "Pelaksanaan: daring, 10–12 Maret 2025",
      "Tim: 6 siswa SMP Islam Modern Al Fakhir",
      "Hasil: Medali Silver",
    ],
    description:
      "Karya ilmiah ini mengangkat potensi buah bit (Beta vulgaris) sebagai alternatif alami untuk mengatasi hiperpigmentasi bibir. Tim melewati riset, diskusi, penyusunan laporan, dan latihan presentasi berulang sebelum menjawab pertanyaan juri secara daring.",
    honor: "Medali Silver Invention and Innovation Fair (IIF) 2025",
  },
  "karya-2": {
    title: "Analisis Pemahaman Konsep Matematika di Era Society 5.0",
    authors: "2 siswa delegasi SMP Islam Modern Al Fakhir",
    event: "National Science & Innovation Fair (NSIF), Denpasar, Bali, 6–10 November 2024",
    specs: [
      "Ajang: National Science & Innovation Fair (NSIF), tingkat nasional",
      "Lokasi: Gedung Pusat Industri Kreatif Bali, Denpasar",
      "Waktu: 6–10 November 2024",
      "Hasil: Medali Perak",
    ],
    description:
      "Penelitian ini mengkaji pemahaman konsep matematika di era Society 5.0, topik yang relevan dengan dunia pendidikan modern. Dua delegasi sekolah mempresentasikannya di hadapan dewan juri bersama guru pendamping dan meraih medali perak.",
    honor: "Medali Perak National Science & Innovation Fair (NSIF) 2024",
  },
  "karya-3": {
    title: "Gelar Karya P5: Kearifan Lokal Berbahan Tahu",
    authors: "Siswa-siswi SMP Islam Modern Al Fakhir",
    event: "Project Research Art Contest, 19 Desember 2024",
    specs: [
      "Tema: Kearifan Lokal Berbahan Tahu",
      "Karya: tahu bakar pedas, tahu crispy, dan tahu dessert",
      "Dikelola siswa dari produksi hingga penjualan langsung ke pengunjung",
      "Acara: Gelar Karya P5 bersama Research Exhibition",
    ],
    description:
      "Dalam Gelar Karya P5, siswa mengolah tahu menjadi aneka makanan kreatif, mulai dari tahu bakar pedas, tahu crispy, hingga tahu dessert, lalu mengelola sendiri produksi sampai penjualan langsung kepada pengunjung.",
    honor: "Gelar Karya P5 · 19 Desember 2024",
  },
};

type Cat = "all" | "kompetisi" | "riset" | "p5" | "lapangan";

export default function KaryaShowcase() {
  const { contact } = useSettings();
  const [cat, setCat] = useState<Cat>("all");
  const [modal, setModal] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModal(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modal]);
  const vis = (c: Cat): CSSProperties | undefined => (cat === "all" || cat === c ? undefined : { display: "none" });
  const data = modal ? modalData[modal] : null;

  return (
    <>
<section className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin pt-10 pb-4" id="showcase-karya">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
<div>
<span className="font-label-md text-label-md text-tertiary uppercase font-bold tracking-wider"><T>Kategori Karya Siswa</T></span>
<h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-bold mt-1"><T>Eksplorasi Kluster Inovasi</T></h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-md"><T>Pilih kategori untuk menelusuri karya ilmiah, projek P5, dan kegiatan belajar siswa SMP Islam Modern Al Fakhir.</T></p>
</div>

<div className="flex flex-nowrap md:flex-wrap items-center gap-2 overflow-x-auto md:overflow-visible pb-2 scrollbar-none" id="cluster-filter-nav">
<button type="button" onClick={() => setCat("all")} aria-pressed={cat === "all"} className={`cluster-btn px-5 py-2.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-all font-bold ${cat === "all" ? "bg-primary-container text-on-primary shadow-sm" : "bg-surface-container-lowest text-on-surface"}`}><T>Semua Karya &amp; Kegiatan (9)</T></button>
<button type="button" onClick={() => setCat("kompetisi")} aria-pressed={cat === "kompetisi"} className={`cluster-btn px-5 py-2.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-all font-semibold hover:bg-surface-container ${cat === "kompetisi" ? "bg-primary-container text-on-primary shadow-sm" : "bg-surface-container-lowest text-on-surface"}`}><T>Kompetisi Sains &amp; Inovasi (3)</T></button>
<button type="button" onClick={() => setCat("riset")} aria-pressed={cat === "riset"} className={`cluster-btn px-5 py-2.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-all font-semibold hover:bg-surface-container ${cat === "riset" ? "bg-primary-container text-on-primary shadow-sm" : "bg-surface-container-lowest text-on-surface"}`}><T>Riset Sekolah (2)</T></button>
<button type="button" onClick={() => setCat("p5")} aria-pressed={cat === "p5"} className={`cluster-btn px-5 py-2.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-all font-semibold hover:bg-surface-container ${cat === "p5" ? "bg-primary-container text-on-primary shadow-sm" : "bg-surface-container-lowest text-on-surface"}`}><T>Projek P5 &amp; Budaya (2)</T></button>
<button type="button" onClick={() => setCat("lapangan")} aria-pressed={cat === "lapangan"} className={`cluster-btn px-5 py-2.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-all font-semibold hover:bg-surface-container ${cat === "lapangan" ? "bg-primary-container text-on-primary shadow-sm" : "bg-surface-container-lowest text-on-surface"}`}><T>Belajar di Luar Kelas (2)</T></button>
</div>
</section>

<section className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-8">
<div className="flex items-center gap-3 mb-6">
<span className="w-3 h-3 rounded-full bg-secondary-container"></span>
<h3 className="font-headline-sm text-headline-sm text-primary font-bold"><T>Karya Unggulan: Medali Sains &amp; Gelar Karya P5</T></h3>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

<article className="research-item bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between" style={vis("kompetisi")}>
<div>
<div className="relative w-full h-52 rounded-xl overflow-hidden mb-5 bg-surface-container">
<Img className="w-full h-full object-cover" alt="Karya ilmiah siswa: Potensi Buah Bit (Beta Vulgaris) sebagai Alternatif Alami untuk Mengatasi Hiperpigmentasi Bibir" src="/photos/news/medali-silver-di-invention-and-innovation-fair-2025.webp" />
<span className="absolute top-3 left-3 bg-secondary-container text-on-secondary font-label-md text-label-md font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">military_tech</span>{" "}<T>Medali Silver 2025</T></span>
</div>
<div className="flex flex-col gap-0.5 mb-2">
<span className="font-caption text-caption uppercase font-bold text-tertiary"><T>Kompetisi Sains &amp; Inovasi</T></span>
<span className="hidden text-outline-variant">•</span>
<span className="font-caption text-caption text-on-surface-variant"><T>IIF 2025 · Nasional (Daring)</T></span>
</div>
<h4 className="font-headline-sm text-headline-sm text-primary font-bold mb-3 leading-snug lg:min-h-[5.2rem]"><T>Potensi Buah Bit (Beta Vulgaris) sebagai Alternatif Alami untuk Mengatasi Hiperpigmentasi Bibir</T></h4>
<div className="p-3 bg-surface-container-low rounded-xl mb-4 text-caption font-caption text-on-surface-variant flex flex-col gap-1 lg:min-h-[4.5rem]">
<p><strong><T>Peneliti:</T></strong>{" "}<T>Tim 6 siswa SMP Islam Modern Al Fakhir</T></p>
<p><strong><T>Ajang:</T></strong>{" "}<T>Invention and Innovation Fair, 10–12 Maret 2025</T></p>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 mb-4 leading-relaxed"><T>Karya ilmiah tim siswa tentang potensi buah bit sebagai alternatif alami untuk hiperpigmentasi bibir, dipresentasikan secara daring di hadapan juri IIF 2025 dan meraih Medali Silver.</T></p>
</div>
<div>
<div className="flex flex-wrap gap-1.5 mb-5">
<span className="font-caption text-caption bg-surface-container text-primary font-semibold px-2.5 py-1 rounded-full"><T>Buah Bit</T></span>
<span className="font-caption text-caption bg-surface-container text-primary font-semibold px-2.5 py-1 rounded-full"><T>Riset Siswa</T></span>
<span className="font-caption text-caption bg-surface-container text-primary font-semibold px-2.5 py-1 rounded-full"><T>Beta Vulgaris</T></span>
<span className="font-caption text-caption bg-tertiary-fixed text-on-tertiary-fixed font-bold px-2.5 py-1 rounded-full"><T>IIF 2025</T></span>
</div>
<button type="button" onClick={() => setModal("karya-1")} className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors font-label-md text-label-md text-primary font-bold">
<span><T>Lihat Detail Karya</T></span>
<span className="material-symbols-outlined text-[16px]">north_east</span>
</button>
</div>
</article>

<article className="research-item bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between" style={vis("kompetisi")}>
<div>
<div className="relative w-full h-52 rounded-xl overflow-hidden mb-5 bg-surface-container">
<Img className="w-full h-full object-cover" alt="Karya ilmiah siswa: Analisis Pemahaman Konsep Matematika di Era Society 5.0" src="/photos/news/national-science-and-innovation-fair.webp" />
<span className="absolute top-3 left-3 bg-tertiary text-tertiary-fixed font-label-md text-label-md font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">workspace_premium</span>{" "}<T>Medali Perak 2024</T></span>
</div>
<div className="flex flex-col gap-0.5 mb-2">
<span className="font-caption text-caption uppercase font-bold text-tertiary"><T>Kompetisi Sains &amp; Inovasi</T></span>
<span className="hidden text-outline-variant">•</span>
<span className="font-caption text-caption text-on-surface-variant"><T>NSIF 2024 · Denpasar</T></span>
</div>
<h4 className="font-headline-sm text-headline-sm text-primary font-bold mb-3 leading-snug lg:min-h-[5.2rem]"><T>Analisis Pemahaman Konsep Matematika di Era Society 5.0</T></h4>
<div className="p-3 bg-surface-container-low rounded-xl mb-4 text-caption font-caption text-on-surface-variant flex flex-col gap-1 lg:min-h-[4.5rem]">
<p><strong><T>Peneliti:</T></strong>{" "}<T>2 siswa delegasi SMP Islam Modern Al Fakhir</T></p>
<p><strong><T>Ajang:</T></strong>{" "}<T>National Science &amp; Innovation Fair, 6–10 November 2024</T></p>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 mb-4 leading-relaxed"><T>Penelitian tentang pemahaman konsep matematika di era Society 5.0 yang dipresentasikan dua delegasi sekolah di NSIF, Denpasar, Bali, dan meraih Medali Perak.</T></p>
</div>
<div>
<div className="flex flex-wrap gap-1.5 mb-5">
<span className="font-caption text-caption bg-surface-container text-primary font-semibold px-2.5 py-1 rounded-full"><T>Matematika</T></span>
<span className="font-caption text-caption bg-surface-container text-primary font-semibold px-2.5 py-1 rounded-full"><T>Society 5.0</T></span>
<span className="font-caption text-caption bg-surface-container text-primary font-semibold px-2.5 py-1 rounded-full"><T>Pendidikan</T></span>
<span className="font-caption text-caption bg-tertiary-fixed text-on-tertiary-fixed font-bold px-2.5 py-1 rounded-full"><T>NSIF 2024</T></span>
</div>
<button type="button" onClick={() => setModal("karya-2")} className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors font-label-md text-label-md text-primary font-bold">
<span><T>Lihat Detail Karya</T></span>
<span className="material-symbols-outlined text-[16px]">north_east</span>
</button>
</div>
</article>

<article className="research-item bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between" style={vis("p5")}>
<div>
<div className="relative w-full h-52 rounded-xl overflow-hidden mb-5 bg-surface-container">
<Img className="w-full h-full object-cover" alt="Gelar Karya P5: Kearifan Lokal Berbahan Tahu" src="/photos/news/project-research-art-contest-pra-contest.webp" />
<span className="absolute top-3 left-3 bg-primary text-on-primary font-label-md text-label-md font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">star</span>{" "}<T>Gelar Karya P5</T></span>
</div>
<div className="flex flex-col gap-0.5 mb-2">
<span className="font-caption text-caption uppercase font-bold text-tertiary"><T>Projek P5 &amp; Budaya</T></span>
<span className="hidden text-outline-variant">•</span>
<span className="font-caption text-caption text-on-surface-variant"><T>Kewirausahaan Siswa</T></span>
</div>
<h4 className="font-headline-sm text-headline-sm text-primary font-bold mb-3 leading-snug lg:min-h-[5.2rem]"><T>Gelar Karya P5: Kearifan Lokal Berbahan Tahu</T></h4>
<div className="p-3 bg-surface-container-low rounded-xl mb-4 text-caption font-caption text-on-surface-variant flex flex-col gap-1 lg:min-h-[4.5rem]">
<p><strong><T>Pelaksana:</T></strong>{" "}<T>Siswa-siswi SMP Islam Modern Al Fakhir</T></p>
<p><strong><T>Ajang:</T></strong>{" "}<T>Project Research Art Contest, 19 Desember 2024</T></p>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 mb-4 leading-relaxed"><T>Siswa mengolah tahu menjadi tahu bakar pedas, tahu crispy, hingga tahu dessert, lalu mengelola produksi sampai menjual langsung kepada pengunjung.</T></p>
</div>
<div>
<div className="flex flex-wrap gap-1.5 mb-5">
<span className="font-caption text-caption bg-surface-container text-primary font-semibold px-2.5 py-1 rounded-full"><T>P5</T></span>
<span className="font-caption text-caption bg-surface-container text-primary font-semibold px-2.5 py-1 rounded-full"><T>Kearifan Lokal</T></span>
<span className="font-caption text-caption bg-surface-container text-primary font-semibold px-2.5 py-1 rounded-full"><T>Kewirausahaan</T></span>
<span className="font-caption text-caption bg-tertiary-fixed text-on-tertiary-fixed font-bold px-2.5 py-1 rounded-full"><T>Gelar Karya</T></span>
</div>
<button type="button" onClick={() => setModal("karya-3")} className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors font-label-md text-label-md text-primary font-bold">
<span><T>Lihat Detail Karya</T></span>
<span className="material-symbols-outlined text-[16px]">north_east</span>
</button>
</div>
</article>
</div>
</section>

<section className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-10">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
<div>
<span className="font-label-md text-label-md text-tertiary uppercase font-bold tracking-wider"><T>Dokumentasi Riset &amp; Kegiatan</T></span>
<h3 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-bold mt-1"><T>Galeri Karya &amp; Kegiatan Riset Siswa</T></h3>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low px-4 py-2 rounded-xl text-balance md:shrink-0 md:whitespace-nowrap"><T>Menampilkan 6 Karya &amp; Kegiatan Siswa</T></span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="karya-grid-container">

<div className="research-item bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between" style={vis("riset")}>
<div>
<div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-surface-container">
<Img className="w-full h-full object-cover" alt="Research Contest 2025: sidang karya ilmiah siswa kelas 8" src="/photos/news/research-contest-2025.webp" />
<span className="absolute top-2.5 left-2.5 bg-primary-container text-on-primary font-caption text-caption font-bold px-2.5 py-1 rounded-full"><T>Sidang Karya Ilmiah</T></span>
</div>
<span className="font-caption text-caption text-tertiary uppercase font-bold"><T>Research Contest</T></span>
<h4 className="font-headline-sm text-[18px] leading-[24px] text-primary font-bold mt-1 mb-2"><T>Research Contest 2025: Sidang Karya Ilmiah Kelas 8</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-3"><T>33 siswa kelas 8 mempresentasikan hasil penelitian setahun penuh dengan PowerPoint di aula sekolah, 3 Oktober 2025.</T></p>
<div className="font-caption text-caption text-on-surface-variant border-t border-surface-container-high pt-2 mb-4"><T>Siswa: 33 siswa kelas 8 · Aula SMP Islam Modern Al Fakhir</T></div>
</div>
<div className="flex items-center justify-between">
<span className="font-caption text-caption bg-surface-container px-2 py-0.5 rounded text-primary font-medium"><T>Research Class</T></span>
<a className="font-label-md text-label-md text-primary font-bold flex items-center gap-1 hover:text-tertiary transition-colors" href={waLinkFor(contact, "Halo, saya ingin tahu lebih lanjut tentang Research Contest 2025 di SMP Islam Modern Al Fakhir", "smp")} target="_blank" rel="noopener noreferrer">
<span><T>Tanya Detail</T></span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
</div>
</div>

<div className="research-item bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between" style={vis("riset")}>
<div>
<div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-surface-container">
<Img className="w-full h-full object-cover" alt="Research Exhibition dan Project Research Art Contest, 19 Desember 2024" src="/photos/news/project-research-art-contest-pra-contest.webp" />
<span className="absolute top-2.5 left-2.5 bg-tertiary text-on-tertiary font-caption text-caption font-bold px-2.5 py-1 rounded-full"><T>Pameran Karya</T></span>
</div>
<span className="font-caption text-caption text-tertiary uppercase font-bold"><T>Research Exhibition</T></span>
<h4 className="font-headline-sm text-[18px] leading-[24px] text-primary font-bold mt-1 mb-2"><T>Project Research Art Contest &amp; Research Exhibition</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-3"><T>Seluruh siswa memamerkan karya dan project mereka dengan gaya profesional pada 19 Desember 2024, dikunjungi sekolah-sekolah lain.</T></p>
<div className="font-caption text-caption text-on-surface-variant border-t border-surface-container-high pt-2 mb-4"><T>Siswa: seluruh siswa · 19 Desember 2024</T></div>
</div>
<div className="flex items-center justify-between">
<span className="font-caption text-caption bg-surface-container px-2 py-0.5 rounded text-primary font-medium"><T>Exhibition · Art</T></span>
<a className="font-label-md text-label-md text-primary font-bold flex items-center gap-1 hover:text-tertiary transition-colors" href={waLinkFor(contact, "Halo, saya ingin tahu lebih lanjut tentang Research Exhibition SMP Islam Modern Al Fakhir", "smp")} target="_blank" rel="noopener noreferrer">
<span><T>Tanya Detail</T></span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
</div>
</div>

<div className="research-item bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between" style={vis("kompetisi")}>
<div>
<div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-surface-container">
<Img className="w-full h-full object-cover" alt="Delegasi SMP Islam Modern Al Fakhir di International Science Innovation Fair (ISIF) 2025, Bali" src="/photos/news/smp-islam-modern-al-fakhir-raih-medali-emas-di-international-science-innovation-fair-isif-2025-bali.webp" />
<span className="absolute top-2.5 left-2.5 bg-secondary text-on-secondary font-caption text-caption font-bold px-2.5 py-1 rounded-full"><T>Medali Emas 2025</T></span>
</div>
<span className="font-caption text-caption text-tertiary uppercase font-bold"><T>Kompetisi Internasional</T></span>
<h4 className="font-headline-sm text-[18px] leading-[24px] text-primary font-bold mt-1 mb-2"><T>International Science Innovation Fair (ISIF) 2025, Bali</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-3"><T>Dua delegasi Al Fakhir mempresentasikan penelitian dan inovasi di hadapan juri, lalu pulang membawa Medali Emas.</T></p>
<div className="font-caption text-caption text-on-surface-variant border-t border-surface-container-high pt-2 mb-4"><T>Delegasi: 2 siswa · 11–16 November 2025</T></div>
</div>
<div className="flex items-center justify-between">
<span className="font-caption text-caption bg-surface-container px-2 py-0.5 rounded text-primary font-medium"><T>ISIF · Bali</T></span>
<a className="font-label-md text-label-md text-primary font-bold flex items-center gap-1 hover:text-tertiary transition-colors" href={waLinkFor(contact, "Halo, saya ingin tahu lebih lanjut tentang prestasi ISIF 2025 SMP Islam Modern Al Fakhir", "smp")} target="_blank" rel="noopener noreferrer">
<span><T>Tanya Detail</T></span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
</div>
</div>

<div className="research-item bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between" style={vis("p5")}>
<div>
<div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-surface-container">
<Img className="w-full h-full object-cover" alt="Penilaian P5 bertema Bhinneka Tunggal Ika: Wajah Indonesia" src="/photos/news/keseruan-kegiatan-p5-penilaian-projek-penguatan-profil-pelajar-pancasila-smpi-modern-al-fakhir.webp" />
<span className="absolute top-2.5 left-2.5 bg-primary text-on-primary font-caption text-caption font-bold px-2.5 py-1 rounded-full"><T>Penilaian P5</T></span>
</div>
<span className="font-caption text-caption text-tertiary uppercase font-bold"><T>Projek P5 &amp; Budaya</T></span>
<h4 className="font-headline-sm text-[18px] leading-[24px] text-primary font-bold mt-1 mb-2"><T>P5 Bhinneka Tunggal Ika: Wajah Indonesia</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-3"><T>Tiap kelompok mengangkat satu daerah, dari Aceh, Sumatera Barat, Betawi, Sunda, Bali, hingga Papua, lengkap dengan tarian tradisional.</T></p>
<div className="font-caption text-caption text-on-surface-variant border-t border-surface-container-high pt-2 mb-4"><T>Siswa: kelompok-kelompok siswa · Penilaian 19 Juni 2025</T></div>
</div>
<div className="flex items-center justify-between">
<span className="font-caption text-caption bg-surface-container px-2 py-0.5 rounded text-primary font-medium"><T>Budaya Nusantara</T></span>
<a className="font-label-md text-label-md text-primary font-bold flex items-center gap-1 hover:text-tertiary transition-colors" href={waLinkFor(contact, "Halo, saya ingin tahu lebih lanjut tentang projek P5 Bhinneka Tunggal Ika di SMP Islam Modern Al Fakhir", "smp")} target="_blank" rel="noopener noreferrer">
<span><T>Tanya Detail</T></span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
</div>
</div>

<div className="research-item bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between" style={vis("lapangan")}>
<div>
<div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-surface-container">
<Img className="w-full h-full object-cover" alt="Field trip siswa SMP Islam Modern Al Fakhir ke kampus I3L" src="/photos/news/field-trip-to-indonesia-international-institute-for-life-sciences-campus-i3l.webp" />
<span className="absolute top-2.5 left-2.5 bg-tertiary-container text-on-tertiary font-caption text-caption font-bold px-2.5 py-1 rounded-full"><T>Field Trip Sains</T></span>
</div>
<span className="font-caption text-caption text-tertiary uppercase font-bold"><T>Belajar Sains</T></span>
<h4 className="font-headline-sm text-[18px] leading-[24px] text-primary font-bold mt-1 mb-2"><T>Field Trip Sains ke Kampus I3L</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-3"><T>Siswa membuat coklat bar, berkeliling melihat laboratorium kampus, dan mengikuti seminar motivasi di I3L, 15 Februari 2025.</T></p>
<div className="font-caption text-caption text-on-surface-variant border-t border-surface-container-high pt-2 mb-4"><T>Peserta: seluruh siswa · I3L, 15 Februari 2025</T></div>
</div>
<div className="flex items-center justify-between">
<span className="font-caption text-caption bg-surface-container px-2 py-0.5 rounded text-primary font-medium"><T>Life Sciences · I3L</T></span>
<a className="font-label-md text-label-md text-primary font-bold flex items-center gap-1 hover:text-tertiary transition-colors" href={waLinkFor(contact, "Halo, saya ingin tahu lebih lanjut tentang field trip sains ke I3L SMP Islam Modern Al Fakhir", "smp")} target="_blank" rel="noopener noreferrer">
<span><T>Tanya Detail</T></span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
</div>
</div>

<div className="research-item bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between" style={vis("lapangan")}>
<div>
<div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-surface-container">
<Img className="w-full h-full object-cover" alt="Field trip siswa SMP Islam Modern Al Fakhir ke pabrik tahu" src="/photos/news/field-trip-siswa-al-fakhir-ke-pabrik-tahu.webp" />
<span className="absolute top-2.5 left-2.5 bg-primary-container text-on-primary font-caption text-caption font-bold px-2.5 py-1 rounded-full"><T>Field Trip</T></span>
</div>
<span className="font-caption text-caption text-tertiary uppercase font-bold"><T>Wawasan Kewirausahaan</T></span>
<h4 className="font-headline-sm text-[18px] leading-[24px] text-primary font-bold mt-1 mb-2"><T>Field Trip ke Pabrik Tahu</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-3"><T>Siswa melihat langsung proses pembuatan tahu, dari perendaman kedelai hingga pencetakan, dan mewawancarai pemilik pabrik.</T></p>
<div className="font-caption text-caption text-on-surface-variant border-t border-surface-container-high pt-2 mb-4"><T>Peserta: siswa SMP · 17 Desember 2025</T></div>
</div>
<div className="flex items-center justify-between">
<span className="font-caption text-caption bg-surface-container px-2 py-0.5 rounded text-primary font-medium"><T>Pembelajaran Tematik</T></span>
<a className="font-label-md text-label-md text-primary font-bold flex items-center gap-1 hover:text-tertiary transition-colors" href={waLinkFor(contact, "Halo, saya ingin tahu lebih lanjut tentang field trip ke pabrik tahu SMP Islam Modern Al Fakhir", "smp")} target="_blank" rel="noopener noreferrer">
<span><T>Tanya Detail</T></span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
</div>
</div>
</div>
</section>


      {mounted && data && createPortal(
        <div
          data-site="smp"
          className="fixed inset-0 z-[100] font-body-md text-on-surface bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-surface-container-lowest rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button type="button" onClick={() => setModal(null)} aria-label="Tutup" className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-1 rounded-full bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div>
              <span className="font-caption text-caption bg-secondary-container/10 text-secondary font-bold px-3 py-1 rounded-full uppercase tracking-wider"><T>{data.honor}</T></span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold mt-3 mb-2 leading-tight"><T>{data.title}</T></h3>
              <div className="p-3 bg-surface-container rounded-xl text-caption font-caption text-on-surface-variant mb-4">
                <p><strong><T>Tim Peneliti:</T></strong> <T>{data.authors}</T></p>
                <p><strong><T>Ajang &amp; Waktu:</T></strong> <T>{data.event}</T></p>
              </div>
              <h4 className="font-subheading text-[15px] font-bold text-primary mb-2"><T>Fakta Singkat:</T></h4>
              <ul className="list-disc list-inside font-body-sm text-body-sm text-on-surface-variant space-y-1 mb-4">
                {data.specs.map((s) => <li key={s}><T>{s}</T></li>)}
              </ul>
              <h4 className="font-subheading text-[15px] font-bold text-primary mb-2"><T>Ringkasan Karya:</T></h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-6"><T>{data.description}</T></p>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setModal(null)} className="w-full bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md font-bold hover:bg-primary-container transition-colors"><T>Tutup</T></button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

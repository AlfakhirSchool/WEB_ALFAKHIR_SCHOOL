import type { Metadata } from "next";
import { SiteLink } from "@/components/SiteTransition";
import { Scope, T } from "@/components/content/T";
import { waLinkFor } from "@/content/settings";
import { getSettings } from "@/lib/content/store";
import { Img } from "@/components/content/Img";

export const metadata: Metadata = {
  title: "Program & Kurikulum SD",
  description: "Kurikulum Merdeka, Al-Qur'an metode Usmani, joyful STEAM, pembiasaan bilingual dan adab di SD Islam Modern Al Fakhir.",
};

export default async function Page() {
  const { contact } = await getSettings();
  return (
    <Scope id="sd/program">
    <div className="w-full pt-20 bg-background">
      <div className="flex flex-col w-full">



      <section className="relative w-full overflow-hidden bg-surface pt-space-md lg:pt-space-xl pb-space-xl">

      <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none -z-0"></div>
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center">

      <div className="lg:col-span-7 space-y-space-md">

      <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-primary-fixed text-primary font-label-md text-label-md shadow-sm">
      <span className="material-symbols-outlined text-[16px] text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
      <span><T>Kurikulum Terpadu &amp; Pembiasaan Islami</T></span>
      </div>

      <h1 className="font-display text-display-mobile md:text-display text-on-surface tracking-tight text-balance">
                  <T>Kurikulum yang Menumbuhkan</T>{" "}<span className="whitespace-nowrap"><span className="text-primary-container"><T>Cinta Belajar</T></span>,</span>{" "}<T>Iman, dan Daya Cipta Ananda.</T>
                </h1>

      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed text-pretty">
                  <T>Memadukan Kurikulum Merdeka Nasional, Standar Pembelajaran Al-Qur&apos;an Metode Usmani, serta Pembiasaan Bilingual &amp; Karakter Adab sejak dini dalam suasana yang menggembirakan.</T>
                </p>

      <div className="flex flex-wrap gap-space-xs pt-space-xs">
      <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-md text-label-md shadow-sm transition-transform hover:-translate-y-0.5">
      <span className="material-symbols-outlined text-primary text-[18px]">menu_book</span>
      <span><T>Kurikulum Merdeka + Kemenag</T></span>
      </div>
      <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-md text-label-md shadow-sm transition-transform hover:-translate-y-0.5">
      <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
      <span><T>Metode Usmani Bersanad</T></span>
      </div>
      <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-md text-label-md shadow-sm transition-transform hover:-translate-y-0.5">
      <span className="material-symbols-outlined text-secondary-container text-[18px]">science</span>
      <span><T>Joyful STEAM &amp; Project-Based</T></span>
      </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-space-sm pt-space-sm">
      <a className="inline-flex w-full sm:w-auto justify-center items-center gap-space-xs px-space-lg py-space-sm min-h-[44px] bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-full shadow-[0_8px_20px_rgba(184,71,11,0.25)] active:translate-y-0.5 transition-all" href="#tiga-sumbu">
      <span><T>Pelajari Sumbu Kurikulum</T></span>
      <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
      </a>
      <a className="inline-flex w-full sm:w-auto justify-center items-center gap-space-xs px-space-lg py-space-sm min-h-[44px] bg-surface-container-high hover:bg-surface-container text-on-surface font-label-lg text-label-lg rounded-full transition-all" href="#ekstrakurikuler">
      <span><T>Jelajahi Ekstrakurikuler</T></span>
      <span className="material-symbols-outlined text-[18px]">sports_martial_arts</span>
      </a>
      </div>
      </div>

      <div className="lg:col-span-5 relative flex justify-center">
      <div className="relative w-full max-w-md aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_16px_36px_-6px_rgba(184,71,11,0.18)] bg-surface-container-low p-2.5">
      <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
      <Img alt="Siswa SD Islam Modern Al Fakhir belajar interaktif" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" src="/design/sd-program/01.jpg" />
      <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent"></div>

      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-space-sm rounded-lg bg-surface/90 backdrop-blur-md shadow-lg flex items-center gap-space-sm">
      <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary shrink-0 shadow-sm">
      <span className="material-symbols-outlined text-[20px]">psychology</span>
      </div>
      <div>
      <div className="font-label-lg text-label-lg text-on-surface leading-tight"><T>Pendekatan Holistik</T></div>
      <div className="font-label-sm text-label-sm !text-xs text-on-surface-variant text-pretty"><T>Keseimbangan Intelek, Moral, dan Keterampilan</T></div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </section>

      <section className="w-full bg-surface-container-low py-space-xl" id="tiga-sumbu">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin space-y-space-xl">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
      <div className="max-w-3xl space-y-space-xs">
      <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md">
      <span className="material-symbols-outlined text-[16px]">account_tree</span>
      <span><T>Tiga Sumbu Kurikulum Al Fakhir</T></span>
      </div>
      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight text-balance">
                <T>Pilar Pendidikan Terpadu untuk Generasi Robbani</T>
              </h2>
      <p className="font-body-md text-body-md text-on-surface-variant">
                <T>Penyelarasan menyeluruh antara kecerdasan spiritual, intelektual yang analitis, serta kemandirian sosial sehari-hari.</T>
              </p>
      </div>
      <div className="hidden md:flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md whitespace-nowrap shrink-0">
      <span className="material-symbols-outlined text-primary text-[20px]">account_tree</span>
      <span><T>Keimanan • Intelektual • Karakter</T></span>
      </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">

      <div className="group relative p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(184,71,11,0.12)] transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-space-md">

      <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
      <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
      </div>
      <div>
      <span className="font-label-sm text-label-sm !text-xs text-primary tracking-wider uppercase font-bold"><T>Sumbu Keimanan</T></span>
      <h3 className="font-headline-md text-headline-md text-on-surface mt-1 leading-snug text-balance md:min-h-[2.75em]"><T>Tarbiyah Ruhiyah &amp; Qur&apos;ani</T></h3>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    <T>Membangun kecintaan hakiki kepada firman Allah SWT melalui pengondisian halaqah yang tertib, nyaman, serta pembinaan akhlak mulia sejak langkah pertama di sekolah.</T>
                  </p>
      <ul className="space-y-space-xs pt-space-xs text-on-surface font-body-md text-body-md">
      <li className="flex items-start gap-space-xs">
      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
      <span><T>Tahfiz Juz 30 &amp; 29 metode Usmani terstandar</T></span>
      </li>
      <li className="flex items-start gap-space-xs">
      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
      <span><T>Tartil makharijul huruf &amp; tajwid terpandu</T></span>
      </li>
      <li className="flex items-start gap-space-xs">
      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
      <span><T>Pembiasaan shalat Dhuha dan fardhu berjamaah</T></span>
      </li>
      <li className="flex items-start gap-space-xs">
      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
      <span><T>Internalisasi adab nabawiyah dalam tutur kata</T></span>
      </li>
      </ul>
      </div>
      <div className="mt-space-lg bg-surface-container-low/50 rounded-lg p-space-sm flex flex-wrap items-center justify-between gap-x-space-sm gap-y-1">
      <span className="font-label-md text-label-md text-on-surface-variant"><T>Target Minimum:</T></span>
      <span className="font-label-lg text-label-lg text-primary"><T>2 Juz Mutqin</T></span>
      </div>
      </div>

      <div className="group relative p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(184,71,11,0.12)] transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-space-md">

      <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
      <span className="material-symbols-outlined text-[28px]">lightbulb</span>
      </div>
      <div>
      <span className="font-label-sm text-label-sm !text-xs text-secondary tracking-wider uppercase font-bold"><T>Sumbu Intelektual</T></span>
      <h3 className="font-headline-md text-headline-md text-on-surface mt-1 leading-snug text-balance md:min-h-[2.75em]"><T>Nalar Kritis &amp; Literasi-Numerasi</T></h3>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    <T>Memantik daya pikir kritis melalui pendekatan saintifik Kurikulum Merdeka yang menyenangkan, menempatkan ananda sebagai peneliti muda yang aktif berkolaborasi.</T>
                  </p>
      <ul className="space-y-space-xs pt-space-xs text-on-surface font-body-md text-body-md">
      <li className="flex items-start gap-space-xs">
      <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
      <span><T>Eksplorasi STEAM terapan berorientasi solusi</T></span>
      </li>
      <li className="flex items-start gap-space-xs">
      <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
      <span><T>Deep Literacy: gemar membaca &amp; diskusi nalar</T></span>
      </li>
      <li className="flex items-start gap-space-xs">
      <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
      <span><T>Bilingual Daily Expressions (English &amp; Arabic)</T></span>
      </li>
      <li className="flex items-start gap-space-xs">
      <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
      <span><T>Matematika kontekstual lewat media konkret</T></span>
      </li>
      </ul>
      </div>
      <div className="mt-space-lg bg-surface-container-low/50 rounded-lg p-space-sm flex flex-wrap items-center justify-between gap-x-space-sm gap-y-1">
      <span className="font-label-md text-label-md text-on-surface-variant"><T>Metode Utama:</T></span>
      <span className="font-label-lg text-label-lg text-secondary"><T>Inquiry &amp; Project</T></span>
      </div>
      </div>

      <div className="group relative p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(184,71,11,0.12)] transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-space-md">

      <div className="w-14 h-14 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
      <span className="material-symbols-outlined text-[28px]">handshake</span>
      </div>
      <div>
      <span className="font-label-sm text-label-sm !text-xs text-tertiary tracking-wider uppercase font-bold"><T>Sumbu Karakter</T></span>
      <h3 className="font-headline-md text-headline-md text-on-surface mt-1 leading-snug text-balance md:min-h-[2.75em]"><T>Kemandirian &amp; Kecakapan Hidup</T></h3>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    <T>Mendidik ketangguhan mental, kepekaan sosial, kelestarian lingkungan, dan empati kemanusiaan agar ananda tumbuh menjadi individu yang mandiri dan berdaya guna.</T>
                  </p>
      <ul className="space-y-space-xs pt-space-xs text-on-surface font-body-md text-body-md">
      <li className="flex items-start gap-space-xs">
      <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
      <span><T>Pembiasaan 5S (Senyum, Salam, Sapa, Sopan, Santun)</T></span>
      </li>
      <li className="flex items-start gap-space-xs">
      <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
      <span><T>Green School Project &amp; kebun herbal sekolah</T></span>
      </li>
      <li className="flex items-start gap-space-xs">
      <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
      <span><T>Pelatihan kemandirian diri &amp; kebersihan pribadi</T></span>
      </li>
      <li className="flex items-start gap-space-xs">
      <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
      <span><T>Kepemimpinan cilik &amp; kerja sama tim lintas usia</T></span>
      </li>
      </ul>
      </div>
      <div className="mt-space-lg bg-surface-container-low/50 rounded-lg p-space-sm flex flex-wrap items-center justify-between gap-x-space-sm gap-y-1">
      <span className="font-label-md text-label-md text-on-surface-variant"><T>Indikator:</T></span>
      <span className="font-label-lg text-label-lg text-tertiary"><T>Life Skills Profil Pelajar</T></span>
      </div>
      </div>
      </div>
      </div>
      </section>

      <section className="w-full bg-surface py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin space-y-space-xl">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
      <div className="space-y-space-xs max-w-2xl">
      <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
      <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
      <span><T>Keunggulan Terukur</T></span>
      </div>
      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight text-balance">
                  <T>Lima Program Unggulan SD Al Fakhir</T>
                </h2>
      <p className="font-body-md text-body-md text-on-surface-variant">
                  <T>Program terencana yang secara konsisten membentuk kompetensi santun, cerdas, dan tanggap perkembangan zaman.</T>
                </p>
      </div>
      <div className="hidden md:flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md whitespace-nowrap shrink-0">
      <span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
      <span><T>Diterapkan terpadu Senin - Jumat</T></span>
      </div>
      </div>

      <div className="space-y-space-md">

      <div className="p-space-md sm:p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md lg:gap-space-lg transition-transform hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row items-start gap-space-sm sm:gap-space-md min-w-0">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-display text-headline-md shrink-0 shadow-md">
                    <T>01</T>
                  </div>
      <div className="space-y-1 max-w-3xl min-w-0">
      <div className="flex items-center gap-x-space-xs gap-y-1 flex-wrap">
      <h3 className="font-headline-sm text-headline-sm text-on-surface text-balance"><T>Al-Qur&apos;an &amp; Tahfiz Metode Usmani</T></h3>
      <span className="px-2.5 py-0.5 rounded-full whitespace-nowrap bg-primary-fixed text-primary font-label-sm text-label-sm !text-xs"><T>Intensif Pagi</T></span>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-pretty">
                      <T>Halaqah intensif setiap pagi maksimal 10-12 siswa per ustadz/ustadzah bersanad, target hafalan mutqin Juz 30-29, dan evaluasi munaqasyah berkala bersama wali santri.</T>
                    </p>
      </div>
      </div>
      <div className="flex max-sm:flex-row-reverse max-sm:justify-end max-sm:self-stretch max-sm:pt-space-sm max-sm:border-t max-sm:border-surface-container items-center gap-space-md shrink-0 self-end lg:self-center">
      <div className="text-right max-sm:text-left">
      <span className="block font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Rasio Halaqah</T></span>
      <span className="font-label-lg text-label-lg text-primary"><T>1 : 10 Siswa</T></span>
      </div>
      <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
      <span className="material-symbols-outlined text-[24px]">menu_book</span>
      </div>
      </div>
      </div>

      <div className="p-space-md sm:p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md lg:gap-space-lg transition-transform hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row items-start gap-space-sm sm:gap-space-md min-w-0">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center font-display text-headline-md shrink-0 shadow-md">
                    <T>02</T>
                  </div>
      <div className="space-y-1 max-w-3xl min-w-0">
      <div className="flex items-center gap-x-space-xs gap-y-1 flex-wrap">
      <h3 className="font-headline-sm text-headline-sm text-on-surface text-balance"><T>Joyful STEAM &amp; Kids Robotic</T></h3>
      <span className="px-2.5 py-0.5 rounded-full whitespace-nowrap bg-secondary-fixed text-secondary font-label-sm text-label-sm !text-xs"><T>Hands-on Inovasi</T></span>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-pretty">
                      <T>Eksperimen sains mingguan di laboratorium terpadu, pengenalan logika komputasi sederhana dengan perangkat modular, serta proyek karya kolaboratif yang melatih pemecahan masalah realita.</T>
                    </p>
      </div>
      </div>
      <div className="flex max-sm:flex-row-reverse max-sm:justify-end max-sm:self-stretch max-sm:pt-space-sm max-sm:border-t max-sm:border-surface-container items-center gap-space-md shrink-0 self-end lg:self-center">
      <div className="text-right max-sm:text-left">
      <span className="block font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Siklus Proyek</T></span>
      <span className="font-label-lg text-label-lg text-secondary"><T>1 Tema / Bulan</T></span>
      </div>
      <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
      <span className="material-symbols-outlined text-[24px]">precision_manufacturing</span>
      </div>
      </div>
      </div>

      <div className="p-space-md sm:p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md lg:gap-space-lg transition-transform hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row items-start gap-space-sm sm:gap-space-md min-w-0">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center font-display text-headline-md shrink-0 shadow-md">
                    <T>03</T>
                  </div>
      <div className="space-y-1 max-w-3xl min-w-0">
      <div className="flex items-center gap-x-space-xs gap-y-1 flex-wrap">
      <h3 className="font-headline-sm text-headline-sm text-on-surface text-balance"><T>Bilingual Islamic Habit (English &amp; Arabic)</T></h3>
      <span className="px-2.5 py-0.5 rounded-full whitespace-nowrap bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm !text-xs"><T>Natural Immersion</T></span>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-pretty">
                      <T>Penerapan kosa kata harian, doa praktis, dan percakapan kontekstual dalam sapaan guru, aktivitas kantin halal, antrean wudhu, dan lingkungan pergaulan yang santun serta percaya diri.</T>
                    </p>
      </div>
      </div>
      <div className="flex max-sm:flex-row-reverse max-sm:justify-end max-sm:self-stretch max-sm:pt-space-sm max-sm:border-t max-sm:border-surface-container items-center gap-space-md shrink-0 self-end lg:self-center">
      <div className="text-right max-sm:text-left">
      <span className="block font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Ekosistem</T></span>
      <span className="font-label-lg text-label-lg text-tertiary"><T>English-Arabic Days</T></span>
      </div>
      <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-tertiary">
      <span className="material-symbols-outlined text-[24px]">translate</span>
      </div>
      </div>
      </div>

      <div className="p-space-md sm:p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md lg:gap-space-lg transition-transform hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row items-start gap-space-sm sm:gap-space-md min-w-0">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-display text-headline-md shrink-0 shadow-md">
                    <T>04</T>
                  </div>
      <div className="space-y-1 max-w-3xl min-w-0">
      <div className="flex items-center gap-x-space-xs gap-y-1 flex-wrap">
      <h3 className="font-headline-sm text-headline-sm text-on-surface text-balance"><T>Pembiasaan Adab &amp; Shalat Berjamaah</T></h3>
      <span className="px-2.5 py-0.5 rounded-full whitespace-nowrap bg-primary-fixed text-primary font-label-sm text-label-sm !text-xs"><T>Karakter Utama</T></span>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-pretty">
                      <T>Klinik adab makan sesuai sunnah, bimbingan wudhu sempurna, zikir pagi-petang, serta mutaba&apos;ah yaumiyah terpantau secara transparan melalui buku penghubung aplikasi digital orang tua.</T>
                    </p>
      </div>
      </div>
      <div className="flex max-sm:flex-row-reverse max-sm:justify-end max-sm:self-stretch max-sm:pt-space-sm max-sm:border-t max-sm:border-surface-container items-center gap-space-md shrink-0 self-end lg:self-center">
      <div className="text-right max-sm:text-left">
      <span className="block font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Monitoring</T></span>
      <span className="font-label-lg text-label-lg text-primary"><T>Aplikasi Mutaba&apos;ah</T></span>
      </div>
      <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
      <span className="material-symbols-outlined text-[24px]">mosque</span>
      </div>
      </div>
      </div>

      <div className="p-space-md sm:p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md lg:gap-space-lg transition-transform hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row items-start gap-space-sm sm:gap-space-md min-w-0">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center font-display text-headline-md shrink-0 shadow-md">
                    <T>05</T>
                  </div>
      <div className="space-y-1 max-w-3xl min-w-0">
      <div className="flex items-center gap-x-space-xs gap-y-1 flex-wrap">
      <h3 className="font-headline-sm text-headline-sm text-on-surface text-balance"><T>Outdoor Learning &amp; Discovery Camp</T></h3>
      <span className="px-2.5 py-0.5 rounded-full whitespace-nowrap bg-secondary-fixed text-secondary font-label-sm text-label-sm !text-xs"><T>Eksplorasi Alam</T></span>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-pretty">
                      <T>Kunjungan edukatif tematik terpandu, pengamatan flora-fauna di Green Zone sekolah, dan perkemahan kepanduan tingkat siaga yang menanamkan kemandirian, keberanian, dan rasa syukur.</T>
                    </p>
      </div>
      </div>
      <div className="flex max-sm:flex-row-reverse max-sm:justify-end max-sm:self-stretch max-sm:pt-space-sm max-sm:border-t max-sm:border-surface-container items-center gap-space-md shrink-0 self-end lg:self-center">
      <div className="text-right max-sm:text-left">
      <span className="block font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Frekuensi</T></span>
      <span className="font-label-lg text-label-lg text-secondary"><T>Tiap Semester</T></span>
      </div>
      <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
      <span className="material-symbols-outlined text-[24px]">forest</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      </section>

      <section className="w-full bg-surface-container-low py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin space-y-space-xl">
      <div className="text-center max-w-2xl mx-auto space-y-space-xs">
      <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-primary-fixed text-primary font-label-md text-label-md">
      <span className="material-symbols-outlined text-[16px]">stairs</span>
      <span><T>Tahapan Perkembangan Usia</T></span>
      </div>
      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight text-balance">
                <T>Fase Pembelajaran Berjenjang (Fase A - C)</T>
              </h2>
      <p className="font-body-md text-body-md text-on-surface-variant">
                <T>Peta kurikulum yang dirancang adaptif mengikuti kesiapan kognitif, motorik, dan psikososial peserta didik tingkat sekolah dasar.</T>
              </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">

      <div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)] flex flex-col justify-between overflow-hidden">
      <div className="absolute top-0 right-0 w-28 h-28 bg-primary-fixed/30 rounded-bl-full pointer-events-none"></div>
      <div className="space-y-space-md relative z-10">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm !text-xs">
      <span className="material-symbols-outlined text-[14px]">child_care</span>
      <span><T>Kelas 1 - 2 SD</T></span>
      </div>
      <div>
      <h3 className="font-headline-md text-headline-md text-on-surface"><T>Fase A</T></h3>
      <p className="font-title-md text-title-md text-primary font-semibold text-balance lg:min-h-[3.2em]"><T>Fondasi Adab &amp; Calistung Ceria</T></p>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    <T>Fokus pada transisi TK menuju SD yang menyenangkan. Membimbing ketertarikan membaca fonik alami, tartil huruf hijaiyah makhraj dasar, koordinasi motorik halus, dan adab kelas yang hangat.</T>
                  </p>
      <div className="space-y-space-xs pt-space-xs">
      <div className="font-label-md text-label-md text-on-surface font-bold"><T>Fokus Kunci:</T></div>
      <div className="flex flex-wrap gap-1.5">
      <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant whitespace-nowrap font-label-sm text-label-sm !text-xs"><T>Fonik Membaca Ceria</T></span>
      <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant whitespace-nowrap font-label-sm text-label-sm !text-xs"><T>Tartil Hijaiyah</T></span>
      <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant whitespace-nowrap font-label-sm text-label-sm !text-xs"><T>Kemandirian Diri</T></span>
      </div>
      </div>
      </div>
      <div className="mt-space-lg bg-surface-container-low rounded-lg p-space-sm text-center text-balance">
      <span className="font-label-sm text-label-sm !text-xs text-primary font-bold"><T>Target: Transisi Ceria &amp; Hafal Surat Pendek</T></span>
      </div>
      </div>

      <div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)] flex flex-col justify-between overflow-hidden">
      <div className="absolute top-0 right-0 w-28 h-28 bg-secondary-fixed/40 rounded-bl-full pointer-events-none"></div>
      <div className="space-y-space-md relative z-10">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-secondary font-label-sm text-label-sm !text-xs">
      <span className="material-symbols-outlined text-[14px]">school</span>
      <span><T>Kelas 3 - 4 SD</T></span>
      </div>
      <div>
      <h3 className="font-headline-md text-headline-md text-on-surface"><T>Fase B</T></h3>
      <p className="font-title-md text-title-md text-secondary font-semibold text-balance lg:min-h-[3.2em]"><T>Penguatan Nalar &amp; Kemandirian Ibadah</T></p>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    <T>Meningkatkan literasi pemahaman bacaan kritis, eksplorasi proyek kelompok mini STEAM, pemantapan bacaan Al-Qur&apos;an hingga Juz 30 tuntas mutqin, serta kesadaran shalat lima waktu tanpa diperintah.</T>
                  </p>
      <div className="space-y-space-xs pt-space-xs">
      <div className="font-label-md text-label-md text-on-surface font-bold"><T>Fokus Kunci:</T></div>
      <div className="flex flex-wrap gap-1.5">
      <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant whitespace-nowrap font-label-sm text-label-sm !text-xs"><T>Hafalan Juz 30 Tuntas</T></span>
      <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant whitespace-nowrap font-label-sm text-label-sm !text-xs"><T>Kelompok STEAM</T></span>
      <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant whitespace-nowrap font-label-sm text-label-sm !text-xs"><T>Nalar Matematika</T></span>
      </div>
      </div>
      </div>
      <div className="mt-space-lg bg-surface-container-low rounded-lg p-space-sm text-center text-balance">
      <span className="font-label-sm text-label-sm !text-xs text-secondary font-bold"><T>Target: Mandiri Shalat &amp; Logika Kritis</T></span>
      </div>
      </div>

      <div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)] flex flex-col justify-between overflow-hidden">
      <div className="absolute top-0 right-0 w-28 h-28 bg-tertiary-fixed/40 rounded-bl-full pointer-events-none"></div>
      <div className="space-y-space-md relative z-10">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-label-sm !text-xs">
      <span className="material-symbols-outlined text-[14px]">military_tech</span>
      <span><T>Kelas 5 - 6 SD</T></span>
      </div>
      <div>
      <h3 className="font-headline-md text-headline-md text-on-surface"><T>Fase C</T></h3>
      <p className="font-title-md text-title-md text-tertiary font-semibold text-balance lg:min-h-[3.2em]"><T>Kepemimpinan &amp; Kesiapan Lanjut Jenjang</T></p>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    <T>Membangun kepemimpinan nyata melalui mentoring adik kelas, etika literasi digital bijak, penyusunan mini riset sains sederhana, target hafalan Juz 29, serta kesiapan mental prima menuju jenjang SMP.</T>
                  </p>
      <div className="space-y-space-xs pt-space-xs">
      <div className="font-label-md text-label-md text-on-surface font-bold"><T>Fokus Kunci:</T></div>
      <div className="flex flex-wrap gap-1.5">
      <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant whitespace-nowrap font-label-sm text-label-sm !text-xs"><T>Target Juz 29</T></span>
      <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant whitespace-nowrap font-label-sm text-label-sm !text-xs"><T>Mini Riset Karya</T></span>
      <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant whitespace-nowrap font-label-sm text-label-sm !text-xs"><T>Kesiapan Masuk SMP</T></span>
      </div>
      </div>
      </div>
      <div className="mt-space-lg bg-surface-container-low rounded-lg p-space-sm text-center text-balance">
      <span className="font-label-sm text-label-sm !text-xs text-tertiary font-bold"><T>Target: Karakter Pemimpin &amp; Berwawasan Luas</T></span>
      </div>
      </div>
      </div>
      </div>
      </section>

      <section className="w-full bg-surface py-space-xl" id="ekstrakurikuler">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin space-y-space-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
      <div className="max-w-3xl space-y-space-xs">
      <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
      <span className="material-symbols-outlined text-[16px]">sports_soccer</span>
      <span><T>Bakat &amp; Kebugaran</T></span>
      </div>
      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight text-balance">
                <T>Eksplorasi Minat, Bakat &amp; Sunnah Rasulullah</T>
              </h2>
      <p className="font-body-md text-body-md text-on-surface-variant">
                <T>Wadah pengembangan potensi ananda di luar jam intrakurikuler dengan bimbingan pelatih profesional dan fasilitas sekolah yang aman serta terawat.</T>
              </p>
      </div>
      <div className="hidden md:flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md whitespace-nowrap shrink-0">
      <span className="material-symbols-outlined text-primary text-[20px]">sports_soccer</span>
      <span><T>10 pilihan ekstrakurikuler</T></span>
      </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
      <div className="group min-w-0 px-space-md sm:px-space-lg py-space-md bg-surface-container-lowest rounded-[28px] shadow-[0_8px_20px_rgba(184,71,11,0.06)] hover:shadow-[0_12px_28px_rgba(184,71,11,0.14)] hover:-rotate-2 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-space-sm">
      <span className="text-2xl shrink-0">🏹</span>
      <div>
      <div className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors"><T>Panahan Sunnah (Archery Kids)</T></div>
      <div className="font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Melatih Fokus &amp; Ketenangan</T></div>
      </div>
      </div>
      <div className="group min-w-0 px-space-md sm:px-space-lg py-space-md bg-surface-container-lowest rounded-[28px] shadow-[0_8px_20px_rgba(184,71,11,0.06)] hover:shadow-[0_12px_28px_rgba(184,71,11,0.14)] hover:rotate-2 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-space-sm">
      <span className="text-2xl shrink-0">🤖</span>
      <div>
      <div className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors"><T>Robotic &amp; Coding Kids</T></div>
      <div className="font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Logika Algoritma &amp; Robotik</T></div>
      </div>
      </div>
      <div className="group min-w-0 px-space-md sm:px-space-lg py-space-md bg-surface-container-lowest rounded-[28px] shadow-[0_8px_20px_rgba(184,71,11,0.06)] hover:shadow-[0_12px_28px_rgba(184,71,11,0.14)] hover:-rotate-3 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-space-sm">
      <span className="text-2xl shrink-0">🥋</span>
      <div>
      <div className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors"><T>Taekwondo &amp; Pencak Silat Ceria</T></div>
      <div className="font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Disiplin Diri &amp; Bela Diri Islami</T></div>
      </div>
      </div>
      <div className="group min-w-0 px-space-md sm:px-space-lg py-space-md bg-surface-container-lowest rounded-[28px] shadow-[0_8px_20px_rgba(184,71,11,0.06)] hover:shadow-[0_12px_28px_rgba(184,71,11,0.14)] hover:rotate-1 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-space-sm">
      <span className="text-2xl shrink-0">🏊‍♂️</span>
      <div>
      <div className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors"><T>Renang Gaya Dada &amp; Bebas</T></div>
      <div className="font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Ketahanan &amp; Sunnah Olahraga</T></div>
      </div>
      </div>
      <div className="group min-w-0 px-space-md sm:px-space-lg py-space-md bg-surface-container-lowest rounded-[28px] shadow-[0_8px_20px_rgba(184,71,11,0.06)] hover:shadow-[0_12px_28px_rgba(184,71,11,0.14)] hover:-rotate-1 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-space-sm">
      <span className="text-2xl shrink-0">🎨</span>
      <div>
      <div className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors"><T>Seni Lukis &amp; Kaligrafi Kreatif</T></div>
      <div className="font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Estetika Khat &amp; Imajinasi</T></div>
      </div>
      </div>
      <div className="group min-w-0 px-space-md sm:px-space-lg py-space-md bg-surface-container-lowest rounded-[28px] shadow-[0_8px_20px_rgba(184,71,11,0.06)] hover:shadow-[0_12px_28px_rgba(184,71,11,0.14)] hover:rotate-3 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-space-sm">
      <span className="text-2xl shrink-0">🌿</span>
      <div>
      <div className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors"><T>Cilik Cinta Alam (Green Club)</T></div>
      <div className="font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Urban Farming &amp; Konservasi</T></div>
      </div>
      </div>
      <div className="group min-w-0 px-space-md sm:px-space-lg py-space-md bg-surface-container-lowest rounded-[28px] shadow-[0_8px_20px_rgba(184,71,11,0.06)] hover:shadow-[0_12px_28px_rgba(184,71,11,0.14)] hover:-rotate-2 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-space-sm">
      <span className="text-2xl shrink-0">🎙️</span>
      <div>
      <div className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors"><T>English &amp; Arabic Speech Club</T></div>
      <div className="font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Percakapan Publik &amp; Debat Mini</T></div>
      </div>
      </div>
      <div className="group min-w-0 px-space-md sm:px-space-lg py-space-md bg-surface-container-lowest rounded-[28px] shadow-[0_8px_20px_rgba(184,71,11,0.06)] hover:shadow-[0_12px_28px_rgba(184,71,11,0.14)] hover:rotate-2 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-space-sm">
      <span className="text-2xl shrink-0">🥁</span>
      <div>
      <div className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors"><T>Rebana &amp; Seni Musik Islami</T></div>
      <div className="font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Harmoni Nada &amp; Shalawat</T></div>
      </div>
      </div>
      <div className="group min-w-0 px-space-md sm:px-space-lg py-space-md bg-surface-container-lowest rounded-[28px] shadow-[0_8px_20px_rgba(184,71,11,0.06)] hover:shadow-[0_12px_28px_rgba(184,71,11,0.14)] hover:-rotate-1 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-space-sm">
      <span className="text-2xl shrink-0">🏸</span>
      <div>
      <div className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors"><T>Bulutangkis Junior</T></div>
      <div className="font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Kelincahan &amp; Sportivitas</T></div>
      </div>
      </div>
      <div className="group min-w-0 px-space-md sm:px-space-lg py-space-md bg-surface-container-lowest rounded-[28px] shadow-[0_8px_20px_rgba(184,71,11,0.06)] hover:shadow-[0_12px_28px_rgba(184,71,11,0.14)] hover:rotate-1 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-space-sm">
      <span className="text-2xl shrink-0">📚</span>
      <div>
      <div className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors"><T>Literacy &amp; Storytelling Club</T></div>
      <div className="font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Mendongeng Kisah Sahabat &amp; Menulis Cilik</T></div>
      </div>
      </div>
      </div>

      <div className="p-space-md rounded-xl bg-surface-container flex items-start sm:items-center gap-space-sm sm:gap-space-md">
      <span className="material-symbols-outlined text-primary text-[24px] shrink-0">info</span>
      <p className="font-body-md text-body-md text-on-surface-variant">
                <T>Setiap siswa wajib memilih minimal 1 kegiatan ekstrakurikuler kepanduan/sunnah dan maksimal 2 ekstrakurikuler pilihan per semester untuk menjaga keseimbangan waktu belajar dan istirahat.</T>
              </p>
      </div>
      </div>
      </section>

      <section className="w-full bg-surface-container-low py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
      <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg lg:p-space-xl shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
      <div className="lg:col-span-7 space-y-space-md">
      <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-primary-fixed text-primary font-label-md text-label-md">
      <span className="material-symbols-outlined text-[16px]">fact_check</span>
      <span><T>Sistem Penilaian Ramah Anak</T></span>
      </div>
      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight text-balance">
                    <T>Asesmen Autentik Tanpa Tekanan Berlebih</T>
                  </h2>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-pretty">
                    <T>Kami meyakini setiap anak memiliki keunikan kecerdasan majemuk. Evaluasi belajar dirancang komprehensif melalui portofolio karya nyata, bukan sekadar angka di atas kertas ujian.</T>
                  </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
      <div className="p-space-sm rounded-lg bg-surface-container-low">
      <span className="material-symbols-outlined text-primary text-[24px]">folder_special</span>
      <div className="font-title-md text-title-md text-on-surface mt-1"><T>Portofolio Berkala</T></div>
      <div className="font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Kumpulan karya otentik &amp; refleksi anak sepanjang semester.</T></div>
      </div>
      <div className="p-space-sm rounded-lg bg-surface-container-low">
      <span className="material-symbols-outlined text-secondary text-[24px]">celebration</span>
      <div className="font-title-md text-title-md text-on-surface mt-1"><T>Exhibition Day</T></div>
      <div className="font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Panggung unjuk kreasi &amp; presentasi sains di hadapan orang tua.</T></div>
      </div>
      <div className="p-space-sm rounded-lg bg-surface-container-low">
      <span className="material-symbols-outlined text-tertiary text-[24px]">verified_user</span>
      <div className="font-title-md text-title-md text-on-surface mt-1"><T>Laporan Karakter</T></div>
      <div className="font-label-sm text-label-sm !text-xs text-on-surface-variant"><T>Deskripsi terperinci adab, hafalan Qur&apos;an, &amp; kemandirian.</T></div>
      </div>
      </div>
      </div>
      <div className="lg:col-span-5">
      <div className="w-full p-space-md lg:p-space-lg bg-surface-container rounded-xl space-y-space-md">
      <div className="flex flex-wrap items-center justify-between gap-x-space-sm gap-y-1 pb-space-xs">
      <span className="font-title-md text-title-md text-on-surface"><T>Jadwal Kalender Semester</T></span>
      <span className="px-2 py-0.5 rounded-full whitespace-nowrap bg-primary-container text-on-primary font-label-sm text-label-sm !text-xs"><T>Aktif 2024/2025</T></span>
      </div>
      <div className="space-y-space-xs font-body-md text-body-md text-on-surface-variant">
      <div className="p-2.5 rounded-md bg-surface-container-lowest flex items-center justify-between gap-space-sm">
      <span><T>Munaqasyah Tahfiz Semester 1</T></span>
      <span className="font-label-md text-label-md text-primary font-bold whitespace-nowrap"><T>November 2024</T></span>
      </div>
      <div className="p-2.5 rounded-md bg-surface-container-lowest flex items-center justify-between gap-space-sm">
      <span><T>STEAM Project Showcase</T></span>
      <span className="font-label-md text-label-md text-secondary font-bold whitespace-nowrap"><T>Desember 2024</T></span>
      </div>
      <div className="p-2.5 rounded-md bg-surface-container-lowest flex items-center justify-between gap-space-sm">
      <span><T>Outdoor Discovery Camp</T></span>
      <span className="font-label-md text-label-md text-tertiary font-bold whitespace-nowrap"><T>Februari 2025</T></span>
      </div>
      <div className="p-2.5 rounded-md bg-surface-container-lowest flex items-center justify-between gap-space-sm">
      <span><T>Exhibition Day &amp; Wisuda Tahfiz</T></span>
      <span className="font-label-md text-label-md text-primary font-bold whitespace-nowrap"><T>Juni 2025</T></span>
      </div>
      </div>
      <div className="pt-space-xs text-center">
      <a className="font-label-md text-label-md text-primary hover:underline inline-flex items-center justify-center gap-1 min-h-10 text-center" href={waLinkFor(contact, "Halo Admin SD Al Fakhir, saya ingin meminta Kalender Akademik lengkap.", "sd")} target="_blank" rel="noopener noreferrer">
      <span><T>Unduh Kalender Akademik Lengkap (PDF)</T></span>
      <span className="material-symbols-outlined text-[16px]">download</span>
      </a>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </section>

      <section className="relative w-full bg-primary-container text-on-primary py-space-xl overflow-hidden">

      <div className="absolute -right-16 -bottom-16 w-80 h-80 opacity-10 pointer-events-none rotate-12">
      <svg fill="currentColor" viewBox="0 0 100 100">
      <rect height="50" rx="4" width="50" x="25" y="25"></rect>
      <rect height="50" rx="4" transform="rotate(45 50 50)" width="50" x="25" y="25"></rect>
      </svg>
      </div>
      <div className="absolute -left-12 -top-12 w-64 h-64 opacity-10 pointer-events-none -rotate-12">
      <svg fill="currentColor" viewBox="0 0 100 100">
      <rect height="50" rx="4" width="50" x="25" y="25"></rect>
      <rect height="50" rx="4" transform="rotate(45 50 50)" width="50" x="25" y="25"></rect>
      </svg>
      </div>
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin relative z-10 text-center space-y-space-md">
      <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-on-primary/10 text-on-primary font-label-md text-label-md mx-auto backdrop-blur-sm">
      <span className="material-symbols-outlined text-[16px]">stars</span>
      <span><T>Mari Tumbuh Bersama SD Al Fakhir</T></span>
      </div>
      <h2 className="font-display text-display-mobile md:text-display text-on-primary tracking-tight max-w-3xl mx-auto text-balance">
              <T>Tertarik dengan Pendekatan Pembelajaran Kami?</T>
            </h2>
      <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mx-auto leading-relaxed text-pretty">
              <T>Konsultasikan kebutuhan tumbuh kembang ananda bersama tim akademik kami atau ikuti program Trial Class gratis untuk merasakan langsung keceriaan belajar di SD Al Fakhir.</T>
            </p>

      <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-space-sm sm:gap-space-md pt-space-xs">
      <SiteLink className="inline-flex w-full sm:w-auto justify-center items-center gap-space-xs px-space-lg py-space-sm min-h-[44px] bg-surface-container-lowest hover:bg-surface text-primary font-label-lg text-label-lg rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.15)] active:translate-y-0.5 transition-all" href="/sd/ppdb">
      <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
      <span><T>Daftar Trial Class (Gratis)</T></span>
      </SiteLink>
      <a className="inline-flex w-full sm:w-auto justify-center items-center gap-space-xs px-space-md sm:px-space-lg py-space-sm min-h-[44px] bg-on-primary/15 hover:bg-on-primary/25 text-on-primary font-label-lg text-label-lg text-center rounded-full backdrop-blur-sm active:translate-y-0.5 transition-all" href={waLinkFor(contact, "Halo Admin SD Al Fakhir, saya ingin konsultasi kurikulum.", "sd")} rel="noopener noreferrer" target="_blank">
      <span className="material-symbols-outlined text-[20px]">chat</span>
      <span><T>Konsultasi Kurikulum via WhatsApp</T></span>
      </a>
      </div>
      <div className="pt-space-xs">
      <span className="font-label-sm text-label-sm !text-xs text-on-primary-container opacity-80">
                <T>Kuota Trial Class terbatas untuk 15 siswa per gelombang agar bimbingan optimal.</T>
              </span>
      </div>
      </div>
      </section>
      </div>
    </div>
    </Scope>
  );
}

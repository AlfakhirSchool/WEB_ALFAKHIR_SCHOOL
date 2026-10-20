import type { Metadata } from "next";
import { SiteLink } from "@/components/SiteTransition";
import { Scope, T } from "@/components/content/T";
import { waLinkFor } from "@/content/settings";
import { getSettings } from "@/lib/content/store";
import { Img } from "@/components/content/Img";

export const metadata: Metadata = {
  title: "SD Islam Modern Al Fakhir",
  description: "Smart Concept, Islamic Identity & Modern Character. Membentuk generasi Qur'ani, cerdas, dan berakhlak mulia di era digital.",
};

export default async function SdHome() {
  const { contact } = await getSettings();
  return (
<Scope id="sd/home">
<div className="w-full pt-20 bg-background"><div className="flex flex-col w-full">
<section className="relative w-full overflow-hidden bg-surface pt-space-md lg:pt-space-xl pb-0">
<div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-primary-fixed/30 rounded-full blur-2xl pointer-events-none"></div>
<div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin relative z-10">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
<div className="lg:col-span-7 flex flex-col items-start gap-space-md">
<div className="inline-flex flex-wrap items-center gap-x-space-xs gap-y-1 px-space-md py-space-xs rounded-full bg-surface-container shadow-[0_4px_16px_rgba(184,71,11,0.08)]">
<span className="text-secondary-container font-headline-sm text-headline-sm leading-none">✦</span>
<span className="font-label-lg text-label-lg text-primary font-bold tracking-tight"><T>SD Islam Modern Al Fakhir</T></span>
<span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium"><T>Kelas 1 – 6</T></span>
</div>
<h1 className="font-display text-display-mobile sm:text-display tracking-tight text-on-background leading-tight text-balance">
<span className="text-primary-container"><T>Generasi</T></span>{" "}
<span className="text-secondary-container"><T>Qur&apos;ani,</T></span>
<br />
<span className="text-secondary"><T>Cerdas &amp;</T></span>{" "}
<span className="text-tertiary"><T>Berakhlak.</T></span>
</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed text-pretty">
            <T>Membentuk generasi Qur&apos;ani, cerdas, dan berakhlak mulia di era digital.</T>{" "}<em><T>Smart Concept, Islamic Identity &amp; Modern Character</T></em>{" "}<T>untuk membangun generasi cerdas dengan karakter terpuji.</T>
          </p>
<div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-space-sm sm:gap-space-md pt-space-xs w-full sm:w-auto">
<SiteLink className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg whitespace-nowrap shadow-[0_12px_28px_rgba(184,71,11,0.28)] hover:shadow-[0_4px_12px_rgba(184,71,11,0.2)] active:translate-y-0.5 transition-all" href="/sd/ppdb">
<span><T>Daftar SD 2027/2028</T></span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</SiteLink>
<SiteLink className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md rounded-full bg-surface-container-low hover:bg-surface-container text-primary font-label-lg text-label-lg whitespace-nowrap shadow-[0_4px_12px_rgba(184,71,11,0.06)] active:translate-y-0.5 transition-all" href="/sd/program">
<span className="material-symbols-outlined text-[18px] text-secondary">menu_book</span>
<span><T>Lihat Program &amp; Kurikulum</T></span>
</SiteLink>
</div>
<div className="grid grid-cols-3 gap-space-md pt-space-md w-full max-w-lg">
<div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-[0_8px_20px_-4px_rgba(184,71,11,0.06)]">
<div className="flex items-center gap-space-xs text-primary font-headline-sm text-headline-sm font-bold">
<span><T>1:12</T></span>
<span className="material-symbols-outlined text-[18px] text-secondary-container">group</span>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5"><T>Rasio Guru &amp; Siswa Ideal</T></p>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-[0_8px_20px_-4px_rgba(184,71,11,0.06)]">
<div className="flex items-center gap-space-xs text-tertiary font-headline-sm text-headline-sm font-bold">
<span><T>2 Juz</T></span>
<span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim">verified</span>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5"><T>Target Mutqin Tahfiz SD</T></p>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-[0_8px_20px_-4px_rgba(184,71,11,0.06)]">
<div className="flex items-center gap-space-xs text-secondary-container font-headline-sm text-headline-sm font-bold">
<span><T>100%</T></span>
<span className="material-symbols-outlined text-[18px] text-primary-fixed-dim">sentiment_very_satisfied</span>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5"><T>Joyful Active Habits</T></p>
</div>
</div>
</div>
<div className="lg:col-span-5 relative flex items-center justify-center pt-space-lg lg:pt-0">
<div className="absolute w-[calc(100%+1rem)] max-w-[440px] aspect-square rounded-full pointer-events-none opacity-40">
<svg className="w-full h-full animate-[spin_60s_linear_infinite]" fill="none" viewBox="0 0 440 440">
<circle cx="220" cy="220" r="210" stroke="#fe7027" strokeDasharray="14 14" strokeLinecap="round" strokeWidth="3"></circle>
</svg>
</div>
<div className="absolute w-80 h-80 rounded-full bg-secondary-fixed blur-3xl opacity-60"></div>
<div className="relative w-full max-w-[420px]">
<div className="relative w-full aspect-[4/4.5] overflow-hidden shadow-[0_24px_48px_-12px_rgba(184,71,11,0.22)]" style={{ borderRadius: "42% 58% 70% 30% / 45% 45% 55% 55%" }}>
<Img className="w-full h-full object-cover" alt="Joyful Indonesian elementary school children in neat Islamic school uniform, a cheerful girl wearing a soft white veil and a smiling boy with songkok holding colorful Al-Qur'an books together in a modern, sunny, plant-filled classroom with warm ambient morning light, high key tones, genuine laughter and playful energy." src="/design/sd-home/01.jpg" />
</div>
<div className="absolute -top-4 left-0 sm:-left-2 z-20 flex items-center justify-center p-space-sm bg-tertiary text-on-tertiary rounded-lg shadow-[0_12px_24px_rgba(0,93,99,0.25)] hover:scale-105 transition-transform">
<div className="flex items-center gap-space-xs font-label-md text-label-md font-bold">
<span className="material-symbols-outlined text-[18px] text-tertiary-fixed">grade</span>
<span><T>Kelas 1 – 6</T></span>
</div>
</div>
<div className="absolute top-1/4 right-0 sm:-right-6 z-20 w-24 h-24 rounded-full bg-secondary-container text-on-secondary flex flex-col items-center justify-center text-center p-2 shadow-[0_12px_24px_rgba(254,112,39,0.35)] hover:rotate-6 transition-transform">
<span className="material-symbols-outlined text-[20px]">auto_stories</span>
<span className="font-label-sm text-label-sm font-bold uppercase leading-tight mt-0.5"><T>Metode</T><br /><T>Usmani</T></span>
</div>
<div className="absolute bottom-12 left-0 sm:-left-6 z-20 bg-surface-container-lowest text-on-surface px-space-md py-space-xs rounded-full shadow-[0_12px_28px_rgba(184,71,11,0.14)] flex items-center gap-space-xs whitespace-nowrap hover:-translate-y-1 transition-transform">
<span className="text-secondary font-headline-sm text-headline-sm leading-none">★</span>
<span className="font-label-md text-label-md font-bold text-primary"><T>Salat Dhuha Setiap Pagi</T></span>
</div>
<div className="absolute -bottom-4 right-4 z-20 bg-secondary-fixed text-on-secondary-fixed-variant px-space-md py-space-xs rounded-full shadow-[0_12px_24px_rgba(163,62,0,0.18)] flex items-center gap-space-xs whitespace-nowrap hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[16px] text-primary">translate</span>
<span className="font-label-sm text-label-sm font-bold uppercase tracking-wider"><T>Bilingual Islamic Habit</T></span>
</div>
</div>
</div>
</div>
</div>
<div className="w-full overflow-hidden leading-none pt-space-xl -mb-1">
<svg className="relative block w-full h-12 lg:h-16 text-surface-container" preserveAspectRatio="none" viewBox="0 0 1200 120">
<path d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
</svg>
</div>
</section>
<section className="w-full bg-surface-container py-space-xl">
<div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
<div className="text-center max-w-3xl mx-auto space-y-space-xs mb-space-xl">
<div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest text-primary shadow-[0_2px_8px_rgba(184,71,11,0.06)]">
<span className="material-symbols-outlined text-[16px] text-secondary-container">psychology_alt</span>
<span className="font-label-md text-label-md font-bold"><T>Kenapa Memilih SD Al Fakhir?</T></span>
</div>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight text-balance">
          <T>Fondasi Karakter &amp; Nalar Sejak Dini</T>
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed text-pretty">
          <T>Empat pilar esensial yang menyatukan keluhuran adab</T>{" "}<span className="whitespace-nowrap"><T>Al-Qur&apos;an</T></span><T>, kemandirian spiritual, kepekaan sosial, dan kecintaan belajar seumur hidup.</T>
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg lg:gap-space-xl">
<div className="flex flex-col items-center text-center p-space-md rounded-lg bg-surface-container-lowest/80 backdrop-blur-sm shadow-[0_8px_20px_-4px_rgba(184,71,11,0.06)] hover:-translate-y-1.5 transition-all">
<div className="relative w-20 h-20 mb-space-md flex items-center justify-center rounded-full bg-secondary-container text-on-secondary shadow-[0_12px_24px_rgba(254,112,39,0.3)]">
<span className="material-symbols-outlined text-[36px]">menu_book</span>
<div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
<span className="font-label-sm text-label-sm font-bold text-primary"><T>01</T></span>
</div>
</div>
<h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-space-xs">
            <T>Bisa Mengaji</T>
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed flex-1 text-pretty">
            <T>Bimbingan tahsin dan tahfiz</T>{" "}<span className="whitespace-nowrap"><T>Al-Qur&apos;an</T></span>{" "}<T>metode Usmani dengan tartil, mutqin, dan kecintaan tulus membaca kalamullah setiap hari.</T>
          </p>
<div className="mt-space-md pt-space-xs inline-flex items-center gap-space-xs text-primary font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
<span><T>Metode Usmani Resmi</T></span>
</div>
</div>
<div className="flex flex-col items-center text-center p-space-md rounded-lg bg-surface-container-lowest/80 backdrop-blur-sm shadow-[0_8px_20px_-4px_rgba(184,71,11,0.06)] hover:-translate-y-1.5 transition-all">
<div className="relative w-20 h-20 mb-space-md flex items-center justify-center">
<div className="absolute inset-0 bg-secondary-fixed rounded-lg rotate-45"></div>
<div className="absolute inset-0 bg-secondary-fixed rounded-lg"></div>
<span className="material-symbols-outlined text-[36px] text-primary relative z-10">mosque</span>
<div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm z-20">
<span className="font-label-sm text-label-sm font-bold text-primary"><T>02</T></span>
</div>
</div>
<h3 className="font-headline-sm text-headline-sm text-secondary font-bold mb-space-xs">
            <T>Rajin Ibadah</T>
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed flex-1 text-pretty">
            <T>Pembiasaan salat fardu berjamaah di masjid sekolah, salat dhuha rutin, adab doa harian, dan fiqih keputrian sejak usia dini.</T>
          </p>
<div className="mt-space-md pt-space-xs inline-flex items-center gap-space-xs text-secondary font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-[16px] text-secondary-container">wb_sunny</span>
<span><T>Dhuha &amp; Fardu Disiplin</T></span>
</div>
</div>
<div className="flex flex-col items-center text-center p-space-md rounded-lg bg-surface-container-lowest/80 backdrop-blur-sm shadow-[0_8px_20px_-4px_rgba(184,71,11,0.06)] hover:-translate-y-1.5 transition-all">
<div className="relative w-20 h-20 mb-space-md flex items-center justify-center bg-tertiary-container text-on-tertiary shadow-[0_12px_24px_rgba(0,93,99,0.25)]" style={{ borderRadius: "48% 52% 62% 38% / 44% 56% 44% 56%" }}>
<span className="material-symbols-outlined text-[36px]">volunteer_activism</span>
<div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
<span className="font-label-sm text-label-sm font-bold text-tertiary"><T>03</T></span>
</div>
</div>
<h3 className="font-headline-sm text-headline-sm text-tertiary font-bold mb-space-xs">
            <T>Santun &amp; Peduli</T>
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed flex-1 text-pretty">
            <T>Budaya akhlakul karimah 5S (Senyum, Salam, Sapa, Sopan, Santun), iklim sekolah anti-bullying, dan asah empati sosial sesama teman.</T>
          </p>
<div className="mt-space-md pt-space-xs inline-flex items-center gap-space-xs text-tertiary font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-[16px] text-tertiary">favorite</span>
<span><T>Budaya 5S &amp; Empati</T></span>
</div>
</div>
<div className="flex flex-col items-center text-center p-space-md rounded-lg bg-surface-container-lowest/80 backdrop-blur-sm shadow-[0_8px_20px_-4px_rgba(184,71,11,0.06)] hover:-translate-y-1.5 transition-all">
<div className="relative w-20 h-20 mb-space-md flex items-center justify-center rounded-2xl bg-primary-fixed text-on-primary-fixed-variant shadow-[0_12px_24px_rgba(184,71,11,0.18)]">
<span className="material-symbols-outlined text-[36px]">lightbulb</span>
<div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
<span className="font-label-sm text-label-sm font-bold text-primary"><T>04</T></span>
</div>
</div>
<h3 className="font-headline-sm text-headline-sm text-primary-container font-bold mb-space-xs">
            <T>Senang Belajar</T>
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed flex-1 text-pretty">
            <T>Pembelajaran joyful learning, eksplorasi sains langsung, robotic for kids sederhana, serta kurikulum nasional terintegrasi adab.</T>
          </p>
<div className="mt-space-md pt-space-xs inline-flex items-center gap-space-xs text-primary font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-[16px] text-secondary">smart_toy</span>
<span><T>Joyful Science &amp; STEM</T></span>
</div>
</div>
</div>
</div>
</section>
<section className="w-full py-space-xl bg-surface">
<div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
<div className="bg-surface-container-low rounded-xl p-space-md lg:p-space-xl relative overflow-hidden shadow-[0_12px_36px_-8px_rgba(184,71,11,0.08)]">
<div className="text-center max-w-2xl mx-auto space-y-space-xs mb-space-xl">
<div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest text-primary shadow-[0_2px_8px_rgba(184,71,11,0.05)]">
<span className="material-symbols-outlined text-[16px] text-secondary-container">schedule</span>
<span className="font-label-md text-label-md font-bold"><T>Jadwal &amp; Ritme Siswa</T></span>
</div>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight text-balance">
            <T>Sehari Penuh Makna di SD Al Fakhir</T>
          </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
            <T>Alur ritme harian yang menyenangkan, ramah anak, dan menumbuhkan kemandirian serta kecerdasan fitrah.</T>
          </p>
</div>
<div className="relative w-full">
<div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-1 bg-gradient-to-r from-secondary-container via-secondary to-tertiary rounded-full -z-0 opacity-40"></div>
<div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-x-space-md gap-y-space-lg md:gap-y-space-xl relative z-10">
<div className="flex flex-col items-center text-center group md:col-span-2 lg:col-span-1 max-md:grid max-md:grid-cols-[4rem_1fr] max-md:gap-x-space-md max-md:items-start max-md:text-left">
<div className="w-20 h-20 rounded-full bg-surface-container-lowest shadow-[0_8px_20px_rgba(184,71,11,0.12)] flex flex-col items-center justify-center mb-space-sm group-hover:scale-110 group-hover:bg-primary-container group-hover:text-on-primary transition-all duration-300 max-md:row-span-3 max-md:w-16 max-md:h-16 max-md:mb-0">
<span className="font-headline-sm text-headline-sm font-extrabold text-primary group-hover:text-on-primary"><T>01</T></span>
<span className="font-label-sm text-label-sm font-semibold text-secondary-container group-hover:text-on-primary-container"><T>Pagi</T></span>
</div>
<div className="inline-block whitespace-nowrap px-space-xs py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-bold mb-space-xs max-md:justify-self-start">
                <T>07.00 - 07.20</T>
              </div>
<h4 className="font-title-md text-title-md text-on-surface font-bold"><T>Disambut Guru</T></h4>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-snug">
                <T>Guru menyambut siswa di gerbang dengan salam hangat, senyuman, dan doa awal hari.</T>
              </p>
</div>
<div className="flex flex-col items-center text-center group md:col-span-2 lg:col-span-1 max-md:grid max-md:grid-cols-[4rem_1fr] max-md:gap-x-space-md max-md:items-start max-md:text-left">
<div className="w-20 h-20 rounded-full bg-surface-container-lowest shadow-[0_8px_20px_rgba(184,71,11,0.12)] flex flex-col items-center justify-center mb-space-sm group-hover:scale-110 group-hover:bg-secondary-container group-hover:text-on-secondary transition-all duration-300 max-md:row-span-3 max-md:w-16 max-md:h-16 max-md:mb-0">
<span className="font-headline-sm text-headline-sm font-extrabold text-secondary-container group-hover:text-on-secondary"><T>02</T></span>
<span className="font-label-sm text-label-sm font-semibold text-primary group-hover:text-on-secondary"><T>Spiritual</T></span>
</div>
<div className="inline-block whitespace-nowrap px-space-xs py-0.5 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm font-bold mb-space-xs max-md:justify-self-start">
                <T>07.20 - 08.00</T>
              </div>
<h4 className="font-title-md text-title-md text-on-surface font-bold"><T>Dhuha &amp; Mengaji</T></h4>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-snug">
                <T>Salat Dhuha bersama dilanjutkan halaqah tahfiz &amp; tahsin metode Usmani secara intensif.</T>
              </p>
</div>
<div className="flex flex-col items-center text-center group md:col-span-2 lg:col-span-1 max-md:grid max-md:grid-cols-[4rem_1fr] max-md:gap-x-space-md max-md:items-start max-md:text-left">
<div className="w-20 h-20 rounded-full bg-surface-container-lowest shadow-[0_8px_20px_rgba(184,71,11,0.12)] flex flex-col items-center justify-center mb-space-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 max-md:row-span-3 max-md:w-16 max-md:h-16 max-md:mb-0">
<span className="font-headline-sm text-headline-sm font-extrabold text-primary group-hover:text-on-primary"><T>03</T></span>
<span className="font-label-sm text-label-sm font-semibold text-secondary-container group-hover:text-on-primary"><T>Kelas</T></span>
</div>
<div className="inline-block whitespace-nowrap px-space-xs py-0.5 rounded-full bg-surface-container text-primary-container font-label-sm text-label-sm font-bold mb-space-xs max-md:justify-self-start">
                <T>08.00 - 11.45</T>
              </div>
<h4 className="font-title-md text-title-md text-on-surface font-bold"><T>Belajar di Kelas</T></h4>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-snug">
                <T>Tematik interaktif, literasi-numerasi, bilingual science, dan eksplorasi proyek aktif.</T>
              </p>
</div>
<div className="flex flex-col items-center text-center group md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-auto max-md:grid max-md:grid-cols-[4rem_1fr] max-md:gap-x-space-md max-md:items-start max-md:text-left">
<div className="w-20 h-20 rounded-full bg-surface-container-lowest shadow-[0_8px_20px_rgba(184,71,11,0.12)] flex flex-col items-center justify-center mb-space-sm group-hover:scale-110 group-hover:bg-tertiary-container group-hover:text-on-tertiary transition-all duration-300 max-md:row-span-3 max-md:w-16 max-md:h-16 max-md:mb-0">
<span className="font-headline-sm text-headline-sm font-extrabold text-tertiary group-hover:text-on-tertiary"><T>04</T></span>
<span className="font-label-sm text-label-sm font-semibold text-tertiary-container group-hover:text-on-tertiary"><T>Adab</T></span>
</div>
<div className="inline-block whitespace-nowrap px-space-xs py-0.5 rounded-full bg-surface-container text-tertiary font-label-sm text-label-sm font-bold mb-space-xs max-md:justify-self-start">
                <T>11.45 - 12.45</T>
              </div>
<h4 className="font-title-md text-title-md text-on-surface font-bold"><T>Zuhur &amp; Makan</T></h4>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-snug">
                <T>Salat berjamaah di masjid, penerapan adab makan islami, dan relaksasi gembira.</T>
              </p>
</div>
<div className="flex flex-col items-center text-center group md:col-span-2 lg:col-span-1 max-md:grid max-md:grid-cols-[4rem_1fr] max-md:gap-x-space-md max-md:items-start max-md:text-left">
<div className="w-20 h-20 rounded-full bg-surface-container-lowest shadow-[0_8px_20px_rgba(184,71,11,0.12)] flex flex-col items-center justify-center mb-space-sm group-hover:scale-110 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-300 max-md:row-span-3 max-md:w-16 max-md:h-16 max-md:mb-0">
<span className="font-headline-sm text-headline-sm font-extrabold text-secondary group-hover:text-on-secondary"><T>05</T></span>
<span className="font-label-sm text-label-sm font-semibold text-primary group-hover:text-on-secondary"><T>Bakat</T></span>
</div>
<div className="inline-block whitespace-nowrap px-space-xs py-0.5 rounded-full bg-surface-container text-secondary-container font-label-sm text-label-sm font-bold mb-space-xs max-md:justify-self-start">
                <T>12.45 - 14.30</T>
              </div>
<h4 className="font-title-md text-title-md text-on-surface font-bold"><T>Ekskul &amp; Pulang</T></h4>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-snug">
                <T>Ekskul minat bakat (panahan, robotik, pramuka, tahfiz club), evaluasi &amp; doa penutup.</T>
              </p>
</div>
</div>
</div>
<div className="mt-space-xl p-space-md rounded-lg bg-surface-container-lowest flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md shadow-[0_4px_16px_rgba(184,71,11,0.06)]">
<div className="flex items-start sm:items-center gap-space-sm">
<div className="w-10 h-10 rounded-full bg-secondary-fixed text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">notifications_active</span>
</div>
<div>
<p className="font-title-md text-title-md text-on-surface font-bold"><T>Sistem Penjemputan Aman &amp; Terintegrasi</T></p>
<p className="font-body-md text-body-md text-on-surface-variant text-pretty"><T>Kartu penjemput digital dan pendampingan ustadz/ustadzah hingga ananda sampai di kendaraan keluarga.</T></p>
</div>
</div>
<SiteLink className="inline-flex items-center justify-center gap-space-xs px-space-md py-space-xs min-h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-bold whitespace-nowrap transition-colors shrink-0" href="/sd/kegiatan">
<span><T>Rincian Ekskul</T></span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</SiteLink>
</div>
</div>
</div>
</section>
<section className="w-full bg-surface py-space-xl">
<div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
<div className="text-center max-w-3xl mx-auto space-y-space-xs mb-space-xl">
<div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-low text-primary shadow-[0_2px_8px_rgba(184,71,11,0.04)]">
<span className="text-secondary-container font-headline-sm text-headline-sm leading-none">✦</span>
<span className="font-label-md text-label-md font-bold"><T>Dokumentasi Sekolah</T></span>
<span className="text-secondary-container font-headline-sm text-headline-sm leading-none">✦</span>
</div>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight text-balance">
          <T>Keceriaan Belajar Setiap Hari</T>
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed text-pretty">
          <T>Menyaksikan senyum, antusiasme, dan kemajuan santri kecil Al Fakhir dalam lingkungan yang aman dan penuh kasih sayang.</T>
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl items-start">
<div className="flex flex-col items-center group">
<div className="relative w-full aspect-[5/4] md:aspect-square overflow-hidden shadow-[0_16px_36px_-6px_rgba(184,71,11,0.16)] group-hover:scale-[1.02] transition-transform duration-300" style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}>
<Img className="w-full h-full object-cover" alt="Young elementary school children in neat Islamic uniform sitting cross-legged on green carpet in circular halaqah reciting Al-Qur'an with wooden rehal bookstands, guided by a smiling Indonesian teacher, soft morning rays through arched windows." src="/design/sd-home/02.jpg" />
<div className="absolute top-4 left-4 p-2 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary shadow-sm">
<span className="material-symbols-outlined text-[20px]">auto_stories</span>
</div>
</div>
<div className="text-center mt-space-md px-space-sm">
<h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              <T>Mengaji &amp; Halaqah Bersama</T>
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
              <T>Bimbingan tartil penuh kasih oleh ustadz dan ustadzah untuk memastikan makhraj dan adab</T>{" "}<span className="whitespace-nowrap"><T>Al-Qur&apos;an</T></span>{" "}<T>terpatri kuat di dada anak.</T>
            </p>
</div>
</div>
<div className="flex flex-col items-center group">
<div className="relative w-full aspect-[5/4] md:aspect-square overflow-hidden shadow-[0_16px_36px_-6px_rgba(184,71,11,0.16)] group-hover:scale-[1.02] transition-transform duration-300" style={{ borderRadius: "40% 60% 70% 30% / 50% 60% 40% 50%" }}>
<Img className="w-full h-full object-cover" alt="Happy primary school students wearing school uniforms and science aprons examining plants with magnifying glasses in an organic school garden in Sawangan Depok, smiling enthusiastically, bright sunny natural outdoor setting." src="/design/sd-home/03.jpg" />
<div className="absolute top-4 right-4 p-2 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-secondary-container shadow-sm">
<span className="material-symbols-outlined text-[20px]">psychology</span>
</div>
</div>
<div className="text-center mt-space-md px-space-sm">
<h3 className="font-headline-sm text-headline-sm text-secondary-container font-bold">
              <T>Eksperimen di Luar Kelas</T>
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
              <T>Menjelajah sains dan alam di green zone sekolah Sawangan, merangsang nalar kritis lewat proyek pengamatan botani &amp; ekosistem.</T>
            </p>
</div>
</div>
<div className="flex flex-col items-center group">
<div className="relative w-full aspect-[5/4] md:aspect-square overflow-hidden shadow-[0_16px_36px_-6px_rgba(184,71,11,0.16)] group-hover:scale-[1.02] transition-transform duration-300" style={{ borderRadius: "70% 30% 50% 50% / 30% 50% 50% 70%" }}>
<Img className="w-full h-full object-cover" alt="Elementary school students doing archery extracurricular activity on neat green lawn with colorful targets, accompanied by instructor, energetic posture, bright daylight, building agility and confidence." src="/design/sd-home/04.jpg" />
<div className="absolute bottom-4 left-4 p-2 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-tertiary shadow-sm">
<span className="material-symbols-outlined text-[20px]">sports_martial_arts</span>
</div>
</div>
<div className="text-center mt-space-md px-space-sm">
<h3 className="font-headline-sm text-headline-sm text-tertiary font-bold">
              <T>Aktivitas Fisik &amp; Sunnah</T>
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
              <T>Melatih ketangkasan fisik, kemandirian, dan adab sportivitas lewat ekskul panahan, renang, futsal ceria, dan bela diri islami.</T>
            </p>
</div>
</div>
</div>
<div className="flex justify-center mt-space-xl">
<SiteLink className="inline-flex items-center justify-center gap-space-xs px-space-md min-[400px]:px-space-lg sm:px-space-xl min-h-12 rounded-full bg-surface-container-low hover:bg-surface-container text-primary font-label-lg text-label-lg shadow-[0_4px_16px_rgba(184,71,11,0.08)] transition-all text-center" href="/sd/kegiatan">
<span className="material-symbols-outlined text-[18px]">photo_library</span>
<span><T>Lihat Seluruh Aktivitas &amp; Prestasi</T></span>
<span className="material-symbols-outlined text-[16px] max-[399px]:hidden">arrow_forward</span>
</SiteLink>
</div>
</div>
</section>
<section className="relative w-full bg-secondary-container text-on-secondary overflow-hidden">
<div className="w-full overflow-hidden leading-none -mt-1">
<svg className="relative block w-full h-12 lg:h-16 text-surface" preserveAspectRatio="none" viewBox="0 0 1200 120">
<path d="M0,0 L1200,0 L1200,60 C1050,0 800,100 600,40 C450,-10 200,90 0,30 Z" fill="currentColor"></path>
</svg>
</div>
<div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin py-space-xl relative z-10">
<div className="flex flex-col items-center text-center max-w-4xl mx-auto">
<div className="w-20 h-20 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shadow-[0_12px_28px_rgba(0,0,0,0.18)] mb-space-md">
<div className="relative w-12 h-12 flex items-center justify-center">
<div className="absolute inset-0 bg-secondary-fixed rounded-sm rotate-45"></div>
<div className="absolute inset-0 bg-secondary-fixed rounded-sm"></div>
<span className="material-symbols-outlined text-primary text-[24px] relative z-10">school</span>
</div>
</div>
<h2 className="font-display text-display-mobile sm:text-display text-on-secondary tracking-tight max-w-3xl leading-tight text-balance">
          <T>Mulai Langkah Pertama Menuju Generasi Cerdas &amp; Bertakwa.</T>
        </h2>
<p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mt-space-sm leading-relaxed text-pretty">
          <T>Informasi Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2027/2028 untuk</T>{" "}<strong><T>Kelas 1</T></strong><T>. Pendaftaran online saat ini belum dibuka; hubungi panitia melalui WhatsApp untuk informasi terbaru.</T>
        </p>
<div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-space-sm sm:gap-space-md pt-space-lg w-full sm:w-auto">
<SiteLink className="inline-flex items-center justify-center gap-space-xs px-space-xl min-h-14 rounded-full bg-surface-container-lowest hover:bg-surface-container text-primary font-label-lg text-label-lg font-bold whitespace-nowrap shadow-[0_12px_24px_rgba(0,0,0,0.18)] active:translate-y-0.5 transition-all" href="/sd/ppdb">
<span><T>Lihat Informasi PPDB</T></span>
<span className="material-symbols-outlined text-[20px] text-secondary-container">arrow_forward</span>
</SiteLink>
<SiteLink className="inline-flex items-center justify-center gap-space-xs px-space-xl min-h-14 rounded-full bg-on-secondary/15 hover:bg-on-secondary/25 text-on-secondary font-label-lg text-label-lg whitespace-nowrap transition-all shadow-[0_4px_12px_rgba(0,0,0,0.08)]" href="/sd/kontak">
<span className="material-symbols-outlined text-[18px]">calendar_month</span>
<span><T>Jadwalkan Kunjungan / Trial Class</T></span>
</SiteLink>
</div>
<div className="mt-space-lg pt-space-xs flex flex-wrap items-center justify-center gap-x-space-xs gap-y-1 text-center text-on-primary-container font-label-md text-label-md">
<span className="material-symbols-outlined text-[18px]">chat</span>
<span><T>Ada pertanyaan? Hubungi Panitia PPDB SD:</T></span>
<a className="font-bold underline text-on-secondary hover:text-surface-bright transition-colors" href={waLinkFor(contact, "Halo Panitia PPDB SD Al Fakhir, saya ingin bertanya tentang PPDB SD.", "sd")} rel="noopener noreferrer" target="_blank">
            {contact.sd.waDisplay}{" "}<T>(WhatsApp)</T>
          </a>
</div>
</div>
</div>
<div className="w-full overflow-hidden leading-none -mb-1">
<svg className="relative block w-full h-12 lg:h-16 text-primary" preserveAspectRatio="none" viewBox="0 0 1200 120">
<path d="M0,0 C250,90 450,20 650,80 C850,140 1050,40 1200,100 L1200,120 L0,120 Z" fill="currentColor"></path>
</svg>
</div>
</section>
</div></div>
</Scope>
  );
}

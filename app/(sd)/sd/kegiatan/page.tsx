import type { Metadata } from "next";
import { SiteLink } from "@/components/SiteTransition";
import { Scope, T } from "@/components/content/T";
import { waLinkFor } from "@/content/settings";
import { getSettings } from "@/lib/content/store";
import { StudentSection } from "@/components/pages/portal-shared/StudentCard";
import { Gallery } from "@/components/pages/sd-kegiatan/Gallery";
import { VideoSpot } from "@/components/pages/sd-kegiatan/VideoSpot";
import { Img } from "@/components/content/Img";

export const metadata: Metadata = {
  title: "Kegiatan Siswa & Galeri",
  description: "Galeri dokumentasi kegiatan belajar, tahfiz, STEAM, outdoor dan agenda tahunan SD Islam Modern Al Fakhir.",
};

export default async function Page() {
  const { contact, students } = await getSettings();
  return (
    <Scope id="sd/kegiatan">
    <div className="w-full pt-20 bg-background min-h-screen">
      <div className="flex flex-col w-full">
        <section className="relative w-full overflow-hidden px-margin-mobile lg:px-margin pt-space-md pb-space-xl">

        <div className="absolute -top-24 -left-20 w-96 h-96 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 -right-28 w-[450px] h-[450px] bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[76rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center relative z-10">

        <div className="lg:col-span-7 flex flex-col items-start space-y-space-md">

        <div className="inline-flex items-start sm:items-center gap-2 px-4 py-2 rounded-2xl sm:rounded-full bg-surface-container shadow-sm max-w-full">
        <span className="material-symbols-outlined text-[18px] text-secondary-container shrink-0 mt-0.5 sm:mt-0" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        <span className="font-label-md text-primary tracking-wide min-w-0 text-pretty"><T>Dokumentasi &amp; Dinamika Siswa · SD Islam Modern Al Fakhir</T></span>
        </div>

        <h1 className="font-display text-headline-lg-mobile sm:text-headline-lg lg:text-display text-primary tracking-tight leading-[1.15] text-balance">
                  <T>Merekam Ceria, Menempa Karakter, Merayakan Tiap</T>{" "}<span className="text-secondary-container underline decoration-tertiary decoration-wavy decoration-2"><T>Langkah Juara</T></span>.
                </h1>

        <p className="font-body-lg text-on-surface-variant max-w-2xl text-pretty leading-relaxed">
                  <T>Setiap hari di SD Islam Modern Al Fakhir dipenuhi ragam aktivitas bermakna—dari halaqah Al-Qur&apos;an pagi, eksperimen sains interaktif, kepanduan alam terbuka, hingga panggung ekspresi seni dan olahraga sunnah.</T>
                </p>

        <div className="flex flex-wrap items-center gap-3 pt-space-xs">
        <div className="inline-flex items-center gap-2 bg-surface-container-lowest px-4 py-2.5 rounded-full shadow-[0_8px_20px_-4px_rgba(184,71,11,0.08)]">
        <span className="w-6 h-6 rounded-full bg-secondary-container text-on-primary flex items-center justify-center font-label-sm font-bold">★</span>
        <span className="font-label-md text-on-surface font-bold"><T>15+ Agenda Tahunan</T></span>
        </div>
        <div className="inline-flex items-center gap-2 bg-surface-container-lowest px-4 py-2.5 rounded-full shadow-[0_8px_20px_-4px_rgba(184,71,11,0.08)]">
        <span className="material-symbols-outlined text-tertiary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
        <span className="font-label-md text-on-surface font-bold"><T>100% Keterlibatan Siswa</T></span>
        </div>
        <div className="inline-flex items-center gap-2 bg-surface-container-lowest px-4 py-2.5 rounded-full shadow-[0_8px_20px_-4px_rgba(184,71,11,0.08)]">
        <span className="material-symbols-outlined text-secondary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
        <span className="font-label-md text-on-surface font-bold"><T>Lingkungan Aman &amp; Ramah</T></span>
        </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 w-full sm:w-auto">
        <a className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] bg-primary-container text-on-primary font-label-lg font-semibold rounded-full shadow-[0_10px_24px_-4px_rgba(184,71,11,0.35)] hover:bg-primary transition-all active:translate-y-0.5 text-center" href="#galeri">
        <span><T>Jelajahi Galeri Kami</T></span>
        <span className="material-symbols-outlined text-[20px]">arrow_downward</span>
        </a>
        <a className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] bg-surface-container-low text-primary font-label-lg font-semibold rounded-full hover:bg-surface-container transition-all text-center" href="#agenda-tahunan">
        <span><T>Jadwal Agenda 2024</T></span>
        <span className="material-symbols-outlined text-[18px]">calendar_month</span>
        </a>
        </div>
        </div>

        <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0 w-full max-w-md mx-auto lg:max-w-none">

        <div className="absolute -inset-6 w-auto h-auto flex items-center justify-center pointer-events-none opacity-80">
        <svg className="w-full h-full max-w-[480px] max-h-[480px] animate-[spin_60s_linear_infinite]" fill="none" viewBox="0 0 400 400">
        <circle cx="200" cy="200" opacity="0.45" r="185" stroke="#FE7027" strokeDasharray="10 14" strokeWidth="2"></circle>
        <circle cx="200" cy="200" opacity="0.3" r="165" stroke="#005D63" strokeDasharray="4 8" strokeWidth="1.5"></circle>
        </svg>
        </div>

        <div className="relative w-full max-w-[420px] aspect-square rounded-[46%_54%_62%_38%/44%_48%_52%_56%] overflow-hidden shadow-[0_20px_40px_-8px_rgba(184,71,11,0.25)] bg-surface-container-low transition-all duration-700 hover:rounded-[50%]">
        <Img alt="Grup ceria siswa-siswi SD Islam Modern Al Fakhir, anak perempuan berhijab putih rapi dan anak laki-laki dengan seragam batik modern bernuansa oranye terakota dan teal, tersenyum lebar sambil memegang proyek sains kincir angin dan buku hafalan juz amma di teras halaman sekolah tropis yang hijau cerah, pencahayaan matahari pagi alami yang hangat." className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700" src="/design/sd-kegiatan/01.jpg" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent"></div>
        </div>

        <div className="absolute top-2 left-2 sm:-top-3 sm:-left-4 bg-tertiary text-on-tertiary px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-[0_8px_16px_rgba(0,93,99,0.25)] flex items-center gap-2 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
        <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-tertiary-fixed shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
        <div className="flex flex-col">
        <span className="font-label-sm leading-none opacity-80 uppercase tracking-wider"><T>Pondasi Dini</T></span>
        <span className="font-label-md font-bold leading-tight whitespace-nowrap"><T>Adab &amp; Prestasi</T></span>
        </div>
        </div>

        <div className="absolute bottom-2 right-2 sm:-bottom-4 sm:-right-2 bg-secondary-container text-on-primary px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-[0_12px_24px_rgba(254,112,39,0.3)] flex items-center gap-2 transform rotate-3 hover:scale-105 transition-transform duration-300">
        <span className="material-symbols-outlined text-[20px] sm:text-[22px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        <div className="flex flex-col text-left">
        <span className="font-label-sm uppercase tracking-widest text-on-primary-container leading-none"><T>Joyful Schooling</T></span>
        <span className="font-title-md font-bold leading-tight whitespace-nowrap"><T>Eksplorasi Ceria</T></span>
        </div>
        </div>
        </div>
        </div>
        </section>
        <div className="w-full overflow-hidden leading-none text-surface-container-low select-none">
        <svg className="relative block w-full h-12 lg:h-16" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 1200 120">
        <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"></path>
        </svg>
        </div>
        <Gallery />
        <div className="w-full overflow-hidden leading-none text-surface-container-low select-none rotate-180">
        <svg className="relative block w-full h-12 lg:h-16" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 1200 120">
        <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"></path>
        </svg>
        </div>
        <StudentSection students={students.sd} className="bg-background" eyebrow={<T>Profil &amp; Prestasi Siswa</T>} title={<T>Bintang Inspirasi SD Al Fakhir</T>} lead={<T>Mengenal siswa-siswi SD Islam Modern Al Fakhir dengan semangat tahfiz, eksperimen sains, dan adab mulia.</T>} />

        <section className="w-full px-margin-mobile lg:px-margin py-space-xl relative" id="agenda-tahunan">
        <div className="max-w-[76rem] mx-auto space-y-space-lg">
        <div className="text-center max-w-2xl mx-auto space-y-space-xs">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-surface-container text-primary font-label-sm uppercase tracking-widest font-bold">
        <span className="material-symbols-outlined text-[16px]">event_repeat</span>
                  <T>Jadwal Kalender Pendidikan</T>
                </div>
        <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary text-balance">
                  <T>Agenda Akbar Tahunan Kebanggaan Siswa</T>
                </h2>
        <p className="font-body-md text-on-surface-variant text-pretty">
                  <T>Puncak pembelajaran terpadu yang ditunggu-tunggu setiap semester untuk menguji kepemimpinan, kekompakan, dan kreativitas santri.</T>
                </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-5 gap-space-md pt-space-xs items-stretch">

        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-[0_6px_20px_-4px_rgba(184,71,11,0.06)] flex flex-col justify-between relative group hover:-translate-y-1 transition-transform lg:col-span-2 xl:col-span-1">
        <div className="space-y-3">
        <div className="flex items-center justify-between">
        <span className="w-10 h-10 rounded-2xl bg-primary-fixed text-primary font-headline-sm flex items-center justify-center font-bold"><T>01</T></span>
        <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm font-bold text-on-surface-variant"><T>Oktober</T></span>
        </div>
        <h4 className="font-title-lg text-primary leading-tight"><T>Bulan Bahasa &amp; Gebyar Literasi</T></h4>
        <p className="font-body-md text-on-surface-variant">
                      <T>Lomba bedah buku cilik, cipta puisi islami, dan pameran mading raksasa karya santri antar-kelas.</T>
                    </p>
        </div>
        <div className="pt-4 mt-2 flex items-center gap-1.5 text-secondary font-label-sm font-bold">
        <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    <T>Festival Literasi</T>
                  </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-[0_6px_20px_-4px_rgba(184,71,11,0.06)] flex flex-col justify-between relative group hover:-translate-y-1 transition-transform lg:col-span-2 xl:col-span-1">
        <div className="space-y-3">
        <div className="flex items-center justify-between">
        <span className="w-10 h-10 rounded-2xl bg-secondary-fixed text-secondary font-headline-sm flex items-center justify-center font-bold"><T>02</T></span>
        <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm font-bold text-on-surface-variant"><T>Desember</T></span>
        </div>
        <h4 className="font-title-lg text-primary leading-tight"><T>STEAM &amp; Robotic Expo Day</T></h4>
        <p className="font-body-md text-on-surface-variant">
                      <T>Demonstrasi rakitan robot line-follower dan presentasi sains aplikatif langsung di hadapan orang tua.</T>
                    </p>
        </div>
        <div className="pt-4 mt-2 flex items-center gap-1.5 text-secondary-container font-label-sm font-bold">
        <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                    <T>Pameran Teknologi</T>
                  </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-[0_6px_20px_-4px_rgba(184,71,11,0.06)] flex flex-col justify-between relative group hover:-translate-y-1 transition-transform lg:col-span-2 xl:col-span-1">
        <div className="space-y-3">
        <div className="flex items-center justify-between">
        <span className="w-10 h-10 rounded-2xl bg-tertiary-fixed text-tertiary font-headline-sm flex items-center justify-center font-bold"><T>03</T></span>
        <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm font-bold text-on-surface-variant"><T>Februari</T></span>
        </div>
        <h4 className="font-title-lg text-primary leading-tight"><T>Al Fakhir Outdoor Adventure</T></h4>
        <p className="font-body-md text-on-surface-variant">
                      <T>Tadabbur alam 2 hari 1 malam, navigasi kompas, survival skills, dan qiyamul lail di alam terbuka.</T>
                    </p>
        </div>
        <div className="pt-4 mt-2 flex items-center gap-1.5 text-tertiary font-label-sm font-bold">
        <span className="material-symbols-outlined text-[16px]">cabin</span>
                    <T>Kepanduan Siaga</T>
                  </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-[0_6px_20px_-4px_rgba(184,71,11,0.06)] flex flex-col justify-between relative group hover:-translate-y-1 transition-transform lg:col-span-2 lg:col-start-2 xl:col-span-1 xl:col-start-auto">
        <div className="space-y-3">
        <div className="flex items-center justify-between">
        <span className="w-10 h-10 rounded-2xl bg-primary-fixed text-primary font-headline-sm flex items-center justify-center font-bold"><T>04</T></span>
        <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm font-bold text-on-surface-variant"><T>Ramadhan</T></span>
        </div>
        <h4 className="font-title-lg text-primary leading-tight"><T>Sanlat Ramadhan &amp; Ifthar Akbar</T></h4>
        <p className="font-body-md text-on-surface-variant">
                      <T>Pesantren kilat penuh berkah, pendalaman fiqih ibadah, pembagian zakat fitrah, dan buka puasa bersama.</T>
                    </p>
        </div>
        <div className="pt-4 mt-2 flex items-center gap-1.5 text-primary font-label-sm font-bold">
        <span className="material-symbols-outlined text-[16px]">mosque</span>
                    <T>Karakter Spiritual</T>
                  </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-[0_6px_20px_-4px_rgba(184,71,11,0.06)] flex flex-col justify-between relative group hover:-translate-y-1 transition-transform sm:col-span-2 sm:max-w-md sm:w-full sm:justify-self-center lg:col-span-2 lg:max-w-none xl:col-span-1">
        <div className="space-y-3">
        <div className="flex items-center justify-between">
        <span className="w-10 h-10 rounded-2xl bg-secondary-fixed text-secondary font-headline-sm flex items-center justify-center font-bold"><T>05</T></span>
        <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm font-bold text-on-surface-variant"><T>Juni</T></span>
        </div>
        <h4 className="font-title-lg text-primary leading-tight"><T>Haflah &amp; Wisuda Akbar Tahfiz</T></h4>
        <p className="font-body-md text-on-surface-variant">
                      <T>Momen sakral penyematan mahkota kemuliaan hafalan Al-Qur&apos;an dan pelepasan lulusan berkarakter.</T>
                    </p>
        </div>
        <div className="pt-4 mt-2 flex items-center gap-1.5 text-secondary font-label-sm font-bold">
        <span className="material-symbols-outlined text-[16px]">school</span>
                    <T>Puncak Kelulusan</T>
                  </div>
        </div>
        </div>
        </div>
        </section>
        <VideoSpot />
        <section className="relative w-full overflow-hidden bg-primary text-on-primary">

        <div className="w-full overflow-hidden leading-none text-surface-container-high select-none">
        <svg className="relative block w-full h-12 lg:h-16" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 1200 120">
        <path d="M0,0 C300,100 600,0 900,90 C1050,135 1150,50 1200,30 L1200,0 L0,0 Z"></path>
        </svg>
        </div>

        <div className="max-w-5xl mx-auto px-margin-mobile lg:px-margin pt-space-lg pb-space-xl text-center flex flex-col items-center space-y-space-md relative z-10">

        <div className="w-16 h-16 rounded-3xl bg-surface-container-lowest text-primary flex items-center justify-center shadow-[0_12px_28px_rgba(0,0,0,0.25)] transform -rotate-6 hover:rotate-0 transition-transform">
        <span className="material-symbols-outlined text-[36px] text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        </div>
        <div className="space-y-space-sm max-w-2xl">
        <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-primary text-balance">
                  <T>Ingin Ananda Merasakan Langsung Keseruan Belajar di SD Al Fakhir?</T>
                </h2>
        <p className="font-body-lg text-on-primary/90 text-pretty">
                  <T>Pintu kami selalu terbuka hangat untuk Ayah &amp; Bunda. Bergabunglah dalam sesi observasi kelas gratis atau jadwalkan tur sekolah bersama tim konsultan pendidikan kami.</T>
                </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-space-xs w-full sm:w-auto">
        <SiteLink className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-4 rounded-full bg-surface-container-lowest text-primary font-label-lg font-bold shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:bg-surface-container transition-all active:translate-y-0.5 text-center w-full sm:w-auto" href="/sd/ppdb">
        <span className="material-symbols-outlined text-[20px]">school</span>
        <span><T>Ikuti Free Trial Class</T></span>
        </SiteLink>
        <a className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-4 rounded-full bg-secondary-container text-on-primary font-label-lg font-bold shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:opacity-95 transition-all active:translate-y-0.5 text-center w-full sm:w-auto" href={waLinkFor(contact, "Halo Admin SD Al Fakhir, saya ingin menjadwalkan school tour.", "sd")} rel="noopener noreferrer" target="_blank">
        <span className="material-symbols-outlined text-[20px]">chat</span>
        <span><T>Jadwalkan School Tour (WhatsApp)</T></span>
        </a>
        </div>

        <div className="pt-2 font-label-sm text-secondary-fixed opacity-90 flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px]">info</span>
        <span><T>Kuota Trial Class terbatas 10 anak per pekan demi kenyamanan belajar.</T></span>
        </div>
        </div>

        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-tertiary/20 blur-2xl pointer-events-none"></div>
        </section>
      </div>
    </div>
    </Scope>
  );
}

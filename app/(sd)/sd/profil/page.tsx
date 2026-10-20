import type { Metadata } from "next";
import { SiteLink } from "@/components/SiteTransition";
import { Scope, T } from "@/components/content/T";
import { waLinkFor } from "@/content/settings";
import { StaffSection } from "@/components/pages/portal-shared/StaffCard";
import { StudentSection } from "@/components/pages/portal-shared/StudentCard";
import { getSettings } from "@/lib/content/store";
import { Img } from "@/components/content/Img";

export const metadata: Metadata = {
  title: "Profil SD Islam Modern Al Fakhir",
  description: "Visi, misi, nilai luhur, pendidik, dan fasilitas SD Islam Modern Al Fakhir, Sawangan, Depok.",
};

// Fasilitas sesuai daftar di situs resmi SD (sdialfakhir.sch.id/fasilitas). Yang belum berfoto di situs resminya ditandai "Segera Hadir".
const FACILITIES: { icon: string; t: string; d: string; img?: string; alt?: string }[] = [
  { icon: "mosque", t: "Musala", d: "Tempat ibadah yang bersih dan tenang dengan karpet berkualitas.", img: "/photos/sd/musala.jpg", alt: "Musala SD Islam Modern Al Fakhir dengan karpet merah" },
  { icon: "festival", t: "Aula", d: "Gedung serbaguna modern untuk acara dan presentasi siswa.", img: "/photos/sd/aula.jpg", alt: "Aula serbaguna dengan panggung, podium, dan layar proyektor" },
  { icon: "deck", t: "Gazebo", d: "Gazebo bambu tradisional untuk belajar di luar ruangan.", img: "/photos/sd/gazebo.jpg", alt: "Gazebo bambu beratap ijuk di halaman sekolah" },
  { icon: "pool", t: "Kolam Renang", d: "Fasilitas renang yang bersih untuk kesehatan dan rekreasi.", img: "/photos/sd/kolam.jpg", alt: "Kolam renang sekolah dengan payung dan kursi kayu" },
  { icon: "school", t: "Ruang Kelas", d: "Ruang belajar modern dengan perlengkapan multimedia lengkap." },
  { icon: "computer", t: "Laboratorium Komputer", d: "Teknologi terkini untuk mendukung literasi digital." },
  { icon: "menu_book", t: "Perpustakaan", d: "Koleksi buku beragam untuk menumbuhkan kecintaan membaca siswa." },
  { icon: "sports_soccer", t: "Lapangan Olahraga", d: "Lapangan luas untuk aktivitas fisik dan kreativitas." },
];

export default async function SdProfil() {
  const { contact, staff, students, ppdb } = await getSettings();
  const brochureUrl = ppdb.brochureSd?.url || ppdb.brochurePortal?.url;
  return (
<Scope id="sd/profil">
<div className="w-full pt-20 bg-background"><div className="flex flex-col w-full overflow-hidden">
<div className="relative w-full">
<div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary-fixed/40 via-secondary-fixed/20 to-transparent blur-3xl -z-10 pointer-events-none rounded-full"></div>
<section className="max-w-7xl mx-auto px-margin-mobile lg:px-margin pt-space-lg pb-space-xl">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
<div className="lg:col-span-7 flex flex-col items-start gap-space-md">
<div className="inline-flex flex-wrap items-center gap-space-xs px-space-md py-1 rounded-2xl sm:rounded-full bg-surface-container-low shadow-sm max-w-full">
<span className="material-symbols-outlined text-secondary-container text-[18px]">hotel_class</span>
<span className="font-label-md text-label-md text-primary tracking-wide uppercase"><T>Profil &amp; Identitas SD</T></span>
</div>
<h1 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg lg:text-display lg:font-display text-primary leading-tight tracking-tight text-balance">
            <T>Menumbuhkan</T>{" "}<span className="text-secondary-container whitespace-nowrap"><T>Fitrah Keimanan</T></span>{" "}<T>&amp; Nalar Cerdas Anak Sejak Dini.</T>
          </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl text-pretty">
            <T>SD Islam Modern Al Fakhir hadir sebagai ekosistem pendidikan bilingual yang hangat dan ramah anak di bawah naungan</T>{" "}<strong className="text-on-surface font-semibold"><T>Al Fakhir School</T></strong><T>. Berlokasi asri di Sawangan, Depok, kami memadukan keteladanan Qur&apos;ani dengan metode eksplorasi aktif untuk menyalakan binar kecerdasan generasi masa depan.</T>
</p><div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
<div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-md text-label-md shadow-sm">
<span className="material-symbols-outlined text-primary text-[18px]">verified</span>
<span><T>Sawangan, Kota Depok</T></span>
</div>
<div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-md text-label-md shadow-sm">
<span className="material-symbols-outlined text-tertiary text-[18px]">translate</span>
<span><T>English &amp; Arabic Habit</T></span>
</div>
<div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container text-on-surface font-label-md text-label-md shadow-sm">
<span className="material-symbols-outlined text-secondary-container text-[18px]">diversity_1</span>
<span><T>Nurturing Islamic Environment</T></span>
</div>
</div>
</div>
<div className="lg:col-span-5 relative flex items-center justify-center w-full max-w-md mx-auto lg:max-w-none">
<div className="absolute inset-0 bg-gradient-to-tr from-primary-fixed via-secondary-fixed to-surface-container-high rounded-[48%_52%_68%_32%/38%_44%_56%_62%] blur-xl opacity-70 transform rotate-6 scale-105 pointer-events-none"></div>
<div className="relative w-full max-w-[440px] aspect-square rounded-[42%_58%_65%_35%/48%_40%_60%_52%] overflow-hidden shadow-xl bg-surface-container">
<Img className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" alt="Joyful Indonesian Muslim elementary school students in clean modern Islamic uniform learning outdoors in a lush sunny green school garden in Sawangan Depok, accompanied by a caring female teacher wearing a soft terracotta hijab. Natural sunlight, warm joyful atmosphere, candid smiles, soft bokeh background." src="/design/sd-profil/01.jpg" />
</div>
<div className="absolute top-2 left-2 sm:-top-3 sm:-left-4 bg-surface-container-lowest/95 backdrop-blur-md px-3 sm:px-space-md py-1.5 sm:py-space-xs rounded-full shadow-md flex items-center gap-space-xs transform -rotate-3 hover:rotate-0 transition-transform">
<div className="w-8 h-8 relative flex items-center justify-center shrink-0">
<div className="absolute inset-0 bg-secondary-container rotate-45 rounded-sm"></div>
<div className="absolute inset-0 bg-secondary-container rounded-sm"></div>
<span className="material-symbols-outlined text-on-secondary text-[16px] relative z-10">verified</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase text-on-surface-variant leading-none"><T>Status Resmi</T></span>
<span className="font-title-md text-title-md text-primary leading-tight whitespace-nowrap"><T>Terakreditasi A</T></span>
</div>
</div>
<div className="absolute bottom-2 left-2 sm:bottom-4 sm:-left-4 bg-tertiary text-on-tertiary px-3 sm:px-space-md py-1.5 sm:py-space-xs rounded-full shadow-lg flex items-center gap-space-xs transform rotate-2 hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-tertiary-fixed text-[20px] shrink-0">menu_book</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-tertiary-fixed leading-none"><T>Standar Tilawah</T></span>
<span className="font-title-md text-title-md leading-tight whitespace-nowrap"><T>Metode Usmani Resmi</T></span>
</div>
</div>
<div className="absolute top-[44%] right-0 sm:top-8 sm:-right-4 bg-primary text-on-primary px-3 sm:px-space-md py-1.5 sm:py-space-xs rounded-full shadow-md flex items-center gap-space-xs transform rotate-6">
<span className="material-symbols-outlined text-primary-fixed text-[18px] shrink-0">record_voice_over</span>
<span className="font-label-lg text-label-lg whitespace-nowrap"><T>Bilingual Habit</T></span>
</div>
</div>
</div>
</section>
<section className="w-full bg-surface-container-low py-space-xl relative overflow-hidden">
<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-15 pointer-events-none">
<svg className="w-96 h-96 text-primary animate-[spin_60s_linear_infinite]" fill="currentColor" viewBox="0 0 100 100">
<polygon points="50,0 65,35 100,50 65,65 50,100 35,65 0,50 35,35"></polygon>
<polygon fill="none" points="50,5 61,39 95,50 61,61 50,95 39,61 5,50 39,39" stroke="currentColor" strokeWidth="1.5"></polygon>
</svg>
</div>
<div className="max-w-5xl mx-auto px-margin-mobile lg:px-margin text-center relative z-10 flex flex-col items-center">
<div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md mb-space-md">
<span className="material-symbols-outlined text-secondary-container text-[18px]">auto_awesome</span>
<span><T>Visi Akbar Sekolah</T></span>
</div>
<div className="relative max-w-4xl">
<span className="material-symbols-outlined text-[64px] text-primary-fixed leading-none absolute -top-8 -left-6 opacity-60 select-none">format_quote</span>
<blockquote className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg lg:text-[38px] lg:leading-[48px] text-primary font-extrabold tracking-tight px-4 text-balance">
            <T>“Terwujudnya Generasi Qur&apos;ani yang Cerdas, Mandiri, Berakhlak Mulia, dan Adaptif terhadap Kemajuan Zaman.”</T>
          </blockquote>
<span className="material-symbols-outlined text-[64px] text-primary-fixed leading-none absolute -bottom-10 -right-4 opacity-60 rotate-180 select-none">format_quote</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-md">
          <T>Landasan filosofis yang mengakar dalam setiap interaksi pengasuhan harian, pembelajaran sains, dan pembiasaan adab di SD Islam Modern Al Fakhir.</T>
        </p>
</div>
</section>
<section className="max-w-7xl mx-auto px-margin-mobile lg:px-margin py-space-xl">
<div className="flex flex-col items-center text-center mb-space-xl">
<div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md mb-space-sm">
<span className="material-symbols-outlined text-[16px]">military_tech</span>
<span><T>Arah Langkah Nyata</T></span>
</div>
<h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary tracking-tight text-balance">
          <T>Pilar Misi Pembinaan Ananda</T>
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-xs text-pretty">
          <T>Rangkaian langkah terstruktur yang menyatukan kecerdasan spiritual, kematangan emosi, dan kecakapan literasi modern.</T>
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
<div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-[2rem] sm:rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex flex-col sm:flex-row items-start gap-space-sm sm:gap-space-md">
<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-display text-headline-sm sm:text-headline-md shrink-0 shadow-md">
              <T>01</T>
            </div>
<div className="flex flex-col gap-space-xs min-w-0">
<span className="font-label-sm text-label-sm uppercase text-secondary-container tracking-wider font-bold"><T>Spiritualitas &amp; Sunnah</T></span>
<h3 className="font-headline-sm text-headline-sm text-primary">
                <T>Pondasi Al-Qur&apos;an &amp; Adab Harian</T>
              </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                <T>Membina kecintaan Al-Qur&apos;an melalui metode Usmani bersanad dengan target tartil dan hafalan mutqin, disertai pembiasaan adab harian, salat dhuha berjamaah, dan dzikir pagi-petang.</T>
              </p>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center gap-space-xs text-tertiary font-label-md text-label-md">
<span className="material-symbols-outlined text-[18px]">verified_user</span>
<span><T>Sanad Tajwid &amp; Mutaba&apos;ah Yaumiyah</T></span>
</div>
</div>
<div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-[2rem] sm:rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex flex-col sm:flex-row items-start gap-space-sm sm:gap-space-md">
<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center font-display text-headline-sm sm:text-headline-md shrink-0 shadow-md">
              <T>02</T>
            </div>
<div className="flex flex-col gap-space-xs min-w-0">
<span className="font-label-sm text-label-sm uppercase text-primary tracking-wider font-bold"><T>Eksplorasi Aktif</T></span>
<h3 className="font-headline-sm text-headline-sm text-primary">
                <T>Pembelajaran Aktif, Kontekstual &amp; Ceria</T>
              </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                <T>Menyelenggarakan active &amp; joyful learning yang memantik rasa ingin tahu sains, literasi-numerasi kuat, integrasi STEAM, dan wawasan dwibahasa (Arab-Inggris) tanpa rasa terbebani.</T>
              </p>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center gap-space-xs text-secondary-container font-label-md text-label-md">
<span className="material-symbols-outlined text-[18px]">science</span>
<span><T>Joyful STEAM &amp; Bilingual Inquiry</T></span>
</div>
</div>
<div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-[2rem] sm:rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex flex-col sm:flex-row items-start gap-space-sm sm:gap-space-md">
<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center font-display text-headline-sm sm:text-headline-md shrink-0 shadow-md">
              <T>03</T>
            </div>
<div className="flex flex-col gap-space-xs min-w-0">
<span className="font-label-sm text-label-sm uppercase text-tertiary tracking-wider font-bold"><T>Integritas Diri</T></span>
<h3 className="font-headline-sm text-headline-sm text-primary">
                <T>Pengembangan Karakter &amp; Kemandirian</T>
              </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                <T>Membentuk pribadi santun, disiplin, berjiwa empati melalui budaya 5S (Senyum, Sapa, Salam, Sopan, Santun), pengasuhan ramah anak, dan komitmen nol-toleransi perundungan (anti-bullying).</T>
              </p>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center gap-space-xs text-primary font-label-md text-label-md">
<span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
<span><T>Budaya 5S &amp; Sekolah Ramah Anak</T></span>
</div>
</div>
<div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-[2rem] sm:rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex flex-col sm:flex-row items-start gap-space-sm sm:gap-space-md">
<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-surface-container-highest text-primary flex items-center justify-center font-display text-headline-sm sm:text-headline-md shrink-0 shadow-sm">
              <T>04</T>
            </div>
<div className="flex flex-col gap-space-xs min-w-0">
<span className="font-label-sm text-label-sm uppercase text-outline tracking-wider font-bold"><T>Harmoni Ekosistem</T></span>
<h3 className="font-headline-sm text-headline-sm text-primary">
                <T>Kemitraan Sinergis Orang Tua &amp; Sekolah</T>
              </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                <T>Membangun ekosistem pendidikan kolaboratif antara asatidz dan ayah bunda melalui parenting berkala, buku penghubung digital, dan pelibatan orang tua demi kelangsungan tumbuh kembang optimal ananda.</T>
              </p>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center gap-space-xs text-tertiary font-label-md text-label-md">
<span className="material-symbols-outlined text-[18px]">handshake</span>
<span><T>Parent-Teacher Partnership Portal</T></span>
</div>
</div>
</div>
</section>
<section className="max-w-7xl mx-auto px-margin-mobile lg:px-margin pb-space-xl">
<div className="bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low p-space-lg lg:p-space-xl rounded-[3rem] shadow-sm">
<div className="flex flex-col lg:flex-row items-center justify-between gap-space-lg">
<div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md">
<div className="inline-flex items-center gap-space-xs font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider mb-1">
<span className="material-symbols-outlined text-[16px]">stars</span>
<span><T>Intisari Akhlak</T></span>
</div>
<h3 className="font-headline-md text-headline-md text-primary"><T>Nilai Luhur Budaya Sekolah</T></h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
              <T>Empat karakter utama yang dihidupkan dalam sapaan, karya, dan pergaulan santri sehari-hari.</T>
            </p>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md w-full lg:w-auto">
<div className="flex flex-col items-center justify-center p-space-md bg-surface-container-lowest rounded-[2rem] shadow-sm hover:-translate-y-1 transition-all text-center">
<div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-[24px] mb-2 shadow-inner">
                🌟
              </div>
<span className="font-title-md text-title-md text-primary text-balance"><T>Cinta</T>{" "}<span className="whitespace-nowrap"><T>Al-Qur&apos;an</T></span></span>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5"><T>Tartil &amp; Tadabbur</T></span>
</div>
<div className="flex flex-col items-center justify-center p-space-md bg-surface-container-lowest rounded-[2rem] shadow-sm hover:-translate-y-1 transition-all text-center">
<div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-[24px] mb-2 shadow-inner">
                🤝
              </div>
<span className="font-title-md text-title-md text-primary text-balance"><T>Santun Beradab</T></span>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5"><T>Hormat &amp; Empati</T></span>
</div>
<div className="flex flex-col items-center justify-center p-space-md bg-surface-container-lowest rounded-[2rem] shadow-sm hover:-translate-y-1 transition-all text-center">
<div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-[24px] mb-2 shadow-inner">
                💡
              </div>
<span className="font-title-md text-title-md text-primary text-balance"><T>Kreatif &amp; Kritis</T></span>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5"><T>Inovatif &amp; Logis</T></span>
</div>
<div className="flex flex-col items-center justify-center p-space-md bg-surface-container-lowest rounded-[2rem] shadow-sm hover:-translate-y-1 transition-all text-center">
<div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-[24px] mb-2 shadow-inner">
                🌱
              </div>
<span className="font-title-md text-title-md text-primary text-balance"><T>Mandiri &amp; Tangguh</T></span>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5"><T>Solutif &amp; Pantang Putus</T></span>
</div>
</div>
</div>
</div>
</section>
<StaffSection
  people={staff.sd}
  variant="blob"
  className="bg-background"
  eyebrow={<T>Dewan Asatidz &amp; Guru</T>}
  title={<T>Pendidik &amp; Pengasuh Penuh Kasih</T>}
  lead={<T>Guru-guru berdedikasi tinggi dengan sertifikasi tahfiz dan kualifikasi pedagogik ramah anak, senantiasa mendampingi langkah kecil ananda dengan senyum dan ketulusan.</T>}
/>
<StudentSection students={students.sd} className="bg-surface-container-low" eyebrow={<T>Profil &amp; Prestasi Siswa</T>} title={<T>Generasi Qur&apos;ani &amp; Pembelajar Ceria</T>} lead={<T>Potret capaian hafalan Al-Qur&apos;an, karya sains, dan keteladanan adab siswa-siswi SD Islam Modern Al Fakhir.</T>} />
<section className="max-w-7xl mx-auto px-margin-mobile lg:px-margin py-space-xl">
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-xl">
<div className="flex flex-col">
<div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md w-fit mb-space-sm">
<span className="material-symbols-outlined text-[16px]">domain</span>
<span><T>Lingkungan Edukatif</T></span>
</div>
<h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary tracking-tight text-balance">
            <T>Fasilitas Sekolah</T>
          </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-space-xs">
            <T>Sarana yang mendukung kegiatan belajar, ibadah, dan kreativitas siswa di kampus Sawangan, Depok.</T>
          </p>
</div>
<div className="flex items-center gap-space-xs text-secondary-container font-label-lg text-label-lg">
<span className="material-symbols-outlined">child_care</span>
<span><T>Kampus Sawangan, Kota Depok</T></span>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
{FACILITIES.map((f) => (
<div key={f.t} className="bg-surface-container-low p-space-md rounded-[2rem] flex flex-col justify-between hover:shadow-md transition-all">
<div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-space-md bg-surface-container">
{f.img ? (
<Img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt={f.alt ?? f.t} src={f.img} />
) : (
<div className="w-full h-full flex flex-col items-center justify-center gap-space-xs bg-surface-container-high text-primary">
<span className="material-symbols-outlined text-[44px] text-secondary-container">{f.icon}</span>
<span className="px-space-sm py-1 rounded-full bg-surface-container-lowest font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-surface-variant"><T>Segera Hadir</T></span>
</div>
)}
</div>
<div className="flex flex-col gap-space-xs">
<div className="flex items-center gap-space-xs text-primary font-title-lg text-title-lg">
<span className="material-symbols-outlined text-secondary-container text-[20px]">{f.icon}</span>
<h4><T>{f.t}</T></h4>
</div>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <T>{f.d}</T>
            </p>
</div>
</div>
))}
</div>
</section>
<section className="w-full pb-space-xl">
<div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
<div className="relative bg-gradient-to-r from-primary-container via-secondary to-primary text-on-primary rounded-[2rem] sm:rounded-[3rem] p-space-lg sm:p-space-xl shadow-xl overflow-hidden">
<div className="absolute -right-12 -bottom-12 w-80 h-80 opacity-10 pointer-events-none">
<svg className="w-full h-full text-on-primary" fill="currentColor" viewBox="0 0 100 100">
<polygon points="50,0 65,35 100,50 65,65 50,100 35,65 0,50 35,35"></polygon>
</svg>
</div>
<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
<div className="lg:col-span-7 flex flex-col items-start gap-space-md">
<div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-on-primary/15 text-primary-fixed font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px]">celebration</span>
<span><T>Kunjungan Terbuka Ayah &amp; Bunda</T></span>
</div>
<h3 className="font-headline-lg text-headline-lg max-sm:text-headline-lg-mobile lg:text-[40px] lg:leading-[48px] text-on-primary tracking-tight">
              <T>Ingin Mengenal Lebih Dekat Lingkungan Belajar Kami?</T>
            </h3>
<p className="font-body-lg text-body-lg text-primary-fixed leading-relaxed max-w-2xl">
              <T>Pintu SD Islam Modern Al Fakhir terbuka lebar untuk ayah bunda yang ingin melihat langsung keceriaan suasana kelas, berkonsultasi dengan kepala sekolah, dan merencanakan pendidikan terbaik bagi ananda.</T>
            </p>
<div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-space-sm sm:gap-space-md pt-space-xs w-full sm:w-auto">
<SiteLink className="inline-flex items-center justify-center gap-space-xs px-space-lg sm:px-space-xl py-space-sm min-h-12 sm:min-h-0 bg-surface-container-lowest hover:bg-surface text-primary font-label-lg text-label-lg whitespace-nowrap rounded-full shadow-lg hover:shadow-xl active:translate-y-0.5 transition-all" href="/sd/kontak">
<span className="material-symbols-outlined text-[20px] text-secondary-container">calendar_month</span>
<span><T>Jadwalkan School Tour</T></span>
</SiteLink>
<a target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm min-h-12 sm:min-h-0 bg-on-primary/10 hover:bg-on-primary/20 text-on-primary font-label-lg text-label-lg whitespace-nowrap rounded-full backdrop-blur-sm active:translate-y-0.5 transition-all" href={brochureUrl || waLinkFor(contact, "Halo Admin SD Al Fakhir, saya ingin meminta brosur profil sekolah (PDF).", "sd")}>
<span className="material-symbols-outlined text-[20px]">download</span>
<span><T>Unduh Brosur Profil (PDF)</T></span>
</a>
</div>
</div>
<div className="hidden lg:block lg:col-span-5">
<div className="relative rotate-2 rounded-[2.5rem] p-2 bg-on-primary/15 shadow-2xl">
<Img alt="Santri SD Islam Modern Al Fakhir bermain di halaman sekolah" className="w-full aspect-[4/3] object-cover rounded-[2rem]" src="/photos/halaman.webp" />
<div className="absolute -bottom-4 -left-4 inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md shadow-lg -rotate-2">
<span className="material-symbols-outlined text-[18px] text-secondary-container">location_on</span>
<span><T>Sawangan, Kota Depok</T></span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
</div>
</div></div>
</Scope>
  );
}

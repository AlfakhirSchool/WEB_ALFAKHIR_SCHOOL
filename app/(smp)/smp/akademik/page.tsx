import type { Metadata } from "next";
import { Scope, T } from "@/components/content/T";
import { waLinkFor } from "@/content/settings";
import { getSettings } from "@/lib/content/store";
import { Img } from "@/components/content/Img";

export const metadata: Metadata = { title: "Kurikulum & Riset Siswa | SMP Islam Modern Al Fakhir" };

export default async function Page() {
  const { contact } = await getSettings();
  return (
<Scope id="smp/akademik">
<div className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]"><div className="flex flex-col w-full">



<section className="relative w-full overflow-hidden bg-gradient-to-b from-surface via-surface-container-low to-surface pt-6 pb-20 lg:py-24">

<div className="absolute -top-16 -right-16 w-96 h-96 opacity-5 pointer-events-none text-primary">
<svg className="w-full h-full fill-current" viewBox="0 0 100 100">
<path d="M50 0 L61 35 L97 25 L75 55 L97 85 L61 75 L50 100 L39 75 L3 85 L25 55 L3 25 L39 35 Z" />
</svg>
</div>
<div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-5 pointer-events-none text-tertiary">
<svg className="w-full h-full fill-current" viewBox="0 0 100 100">
<path d="M50 0 L61 35 L97 25 L75 55 L97 85 L61 75 L50 100 L39 75 L3 85 L25 55 L3 25 L39 35 Z" />
</svg>
</div>
<div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin relative z-10">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

<div className="lg:col-span-7 flex flex-col gap-6">

<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl sm:rounded-full bg-surface-container-high w-fit max-w-full">
<span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim shrink-0"></span>
<span className="font-label-md text-label-md text-primary font-semibold tracking-wide uppercase text-pretty">
              <T>Kurikulum Merdeka · Tahfiz · Research Class SMP Al Fakhir</T>
            </span>
</div>

<h1 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg xl:text-5xl text-on-surface tracking-tight leading-tight text-balance">
            <T>Harmoni Nalar Sains, Kedalaman Qur&apos;ani, &amp;</T>{" "}<span className="text-primary-container"><T>Tradisi Riset Sejak Remaja</T></span>
</h1>

<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed text-pretty">
            <T>Memadukan Kurikulum Merdeka, program internasional, pembelajaran Tahsin &amp; Tahfiz Al-Qur&apos;an yang terstruktur, serta Research Class yang membimbing siswa menjadi generasi muda berprestasi.</T>
          </p>

<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
<div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
<span className="font-headline-sm text-headline-sm text-primary"><T>Merdeka</T></span>
<span className="font-caption text-caption text-on-surface-variant"><T>Kurikulum Merdeka</T></span>
</div>
<div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
<span className="font-headline-sm text-headline-sm text-secondary-container"><T>33 Siswa</T></span>
<span className="font-caption text-caption text-on-surface-variant"><T>Research Contest 2025</T></span>
</div>
<div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
<span className="font-headline-sm text-headline-sm text-tertiary"><T>Juz 30</T></span>
<span className="font-caption text-caption text-on-surface-variant"><T>Wisuda Tahfidz 2025</T></span>
</div>
<div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
<span className="font-headline-sm text-headline-sm text-primary-container"><T>3 Medali</T></span>
<span className="font-caption text-caption text-on-surface-variant"><T>Sains &amp; Inovasi</T></span>
</div>
</div>

<div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4">
<a className="font-label-lg text-label-lg bg-primary hover:bg-primary-container text-on-primary px-5 sm:px-7 py-3.5 rounded-full shadow-md hover:scale-[1.02] transition-all block uppercase tracking-wide text-center" href={waLinkFor(contact, "Halo, saya ingin meminta dokumen silabus & pedoman akademik SMP Islam Modern Al Fakhir.", "smp")} target="_blank" rel="noopener noreferrer">
<span className="text-balance"><span className="material-symbols-outlined text-[18px] align-middle mr-2">download</span><T>Unduh Silabus &amp; Pedoman Akademik</T></span>
</a>
<a className="font-label-lg text-label-lg bg-surface-container-lowest hover:bg-surface-container text-primary px-6 py-3.5 rounded-full shadow-sm transition-all block text-center" href={waLinkFor(contact, "Halo, saya ingin berkonsultasi mengenai kurikulum SMP Islam Modern Al Fakhir.", "smp")} target="_blank" rel="noopener noreferrer">
<span className="text-balance"><span className="material-symbols-outlined text-[18px] text-secondary align-middle mr-2">forum</span><T>Konsultasi Kurikulum</T></span>
</a>
</div>
</div>

<div className="lg:col-span-5 relative">
<div className="relative mx-auto max-w-md lg:max-w-none">

<div className="relative rounded-2xl overflow-hidden shadow-2xl bg-surface-container aspect-[4/5] flex items-center justify-center">
<Img className="w-full h-full object-cover" alt="Siswa SMP melakukan percobaan sains di laboratorium" src="/design/smp-akademik/01.jpg" />
<div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>

<div className="absolute bottom-20 sm:bottom-14 left-5 right-5 text-on-primary">
<span className="font-label-md text-label-md bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-1 rounded-full uppercase tracking-wider font-bold inline-block mb-1"><T>Young Researchers</T></span>
<p className="font-headline-sm text-headline-sm font-semibold"><T>Laboratorium IPA Al Fakhir</T></p>
<p className="font-caption text-caption text-surface-container-highest text-pretty"><T>Investigasi fenomena sains berlandaskan tauhid dan etika ilmiah.</T></p>
</div>
</div>

<div className="absolute top-3 right-3 sm:-top-4 sm:-right-4 bg-surface-container-lowest/95 backdrop-blur-md p-3 sm:p-3.5 rounded-xl shadow-xl flex items-center gap-2.5 sm:gap-3">
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[20px] sm:text-[24px]">verified_user</span>
</div>
<div className="flex flex-col">
<span className="font-label-lg text-label-lg font-bold text-on-surface whitespace-nowrap"><T>Kurikulum Merdeka</T></span>
<span className="font-caption text-caption text-on-surface-variant whitespace-nowrap"><T>Pembinaan Pengawas Sekolah</T></span>
</div>
</div>

<div className="absolute bottom-3 left-3 sm:-bottom-5 sm:-left-5 bg-surface-container-lowest/95 backdrop-blur-md p-3 sm:p-3.5 rounded-xl shadow-xl flex items-center gap-2.5 sm:gap-3">
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0">
<span className="material-symbols-outlined text-[20px] sm:text-[24px]">science</span>
</div>
<div className="flex flex-col">
<span className="font-label-lg text-label-lg font-bold text-on-surface whitespace-nowrap"><T>Research Class</T></span>
<span className="font-caption text-caption text-on-surface-variant whitespace-nowrap"><T>Research Contest Kelas 8</T></span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full py-20 bg-surface-container-lowest">
<div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">

<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
<div className="flex flex-col gap-2 max-w-2xl">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">auto_stories</span>
<span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold"><T>Arsitektur Pembelajaran</T></span>
</div>
<h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface text-balance">
            <T>Tiga Sumbu Kurikulum Terpadu</T>
          </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
            <T>Sinergi Kurikulum Merdeka, wawasan internasional dan pembelajaran digital, serta pembiasaan ibadah dan Tahfiz Al-Qur&apos;an.</T>
          </p>
</div>
<div className="hidden md:flex flex-wrap justify-end gap-2 max-w-lg text-primary font-label-md text-label-md font-semibold">
<span className="inline-flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full"><span className="material-symbols-outlined text-[18px]">workspace_premium</span><T>Visitasi Akreditasi 2025</T></span>
<span className="inline-flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full"><span className="material-symbols-outlined text-[18px]">public</span><T>International Program</T></span>
<span className="inline-flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full"><span className="material-symbols-outlined text-[18px]">verified</span><T>Karakter Holistik</T></span>
<span className="inline-flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full"><span className="material-symbols-outlined text-[18px]">translate</span><T>Tablet &amp; LMS</T></span>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

<div className="bg-surface rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
<div>
<div className="flex items-center justify-between mb-6">
<span className="font-label-md text-label-md px-3 py-1 bg-surface-container-highest text-primary font-bold rounded-full">
                <T>Visitasi Akreditasi Nov 2025</T>
              </span>
<div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">school</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-3">
              <T>Kurikulum Merdeka</T>
            </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
              <T>Implementasi Kurikulum Merdeka yang dikunjungi Pengawas Sekolah pada Mei 2025, dengan P5 sebagai penguatan Profil Pelajar Pancasila.</T>
            </p>
<div className="space-y-4 pt-4 bg-surface-container-lowest/60 p-4 rounded-xl mb-6">
<div className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold"><T>Program &amp; Kegiatan Kurikulum:</T></div>
<ul className="space-y-2 font-body-sm text-body-sm text-on-surface">
<li className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
<span><T>Research Class (Kelas 8)</T></span>
</li>
<li className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
<span><T>Tahsin &amp; Tahfiz Al-Qur&apos;an</T></span>
</li>
<li className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
<span><T>Salat Dhuha Rutin</T></span>
</li>
<li className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
<span><T>P5: Bhinneka Tunggal Ika</T></span>
</li>
<li className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
<span><T>Pramuka Wajib bagi Semua Siswa</T></span>
</li>
</ul>
</div>
</div>
<div className="pt-4 mt-auto">
<div className="flex items-start gap-2.5 text-primary-container">
<span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">workspace_premium</span>
<p className="font-caption text-caption text-on-surface-variant">
<strong><T>Visi Sekolah:</T></strong>{" "}<T>Siswa-siswi berakhlak, modern, dan menjadi kebanggaan orang tua, masyarakat, bangsa dan negara.</T>
              </p>
</div>
</div>
</div>

<div className="bg-surface rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/5 rounded-bl-full pointer-events-none"></div>
<div>
<div className="flex items-center justify-between mb-6">
<span className="font-label-md text-label-md px-3 py-1 bg-secondary-fixed text-on-secondary-fixed font-bold rounded-full">
                <T>Program Internasional</T>
              </span>
<div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">public</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-3">
              <T>International Program</T>
            </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
              <T>Model kelas dan program internasional yang tetap mengutamakan pendidikan karakter, moral, akhlak, dan nilai-nilai keislaman.</T>
            </p>
<div className="space-y-4 pt-4 bg-surface-container-lowest/60 p-4 rounded-xl mb-6">
<div className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold"><T>Penunjang Pembelajaran Modern:</T></div>
<div className="space-y-3 font-body-sm text-body-sm text-on-surface">
<div>
<strong className="text-primary block font-medium"><T>Tablet Belajar</T></strong>
<span className="text-caption text-on-surface-variant"><T>Siswa baru menerima tablet belajar saat AEP.</T></span>
</div>
<div>
<strong className="text-primary block font-medium"><T>LMS Online Learning</T></strong>
<span className="text-caption text-on-surface-variant"><T>Pembelajaran daring melalui LMS sekolah.</T></span>
</div>
<div>
<strong className="text-primary block font-medium"><T>Media Pembelajaran Digital</T></strong>
<span className="text-caption text-on-surface-variant"><T>Sosialisasi media pembelajaran digital bagi siswa baru.</T></span>
</div>
</div>
</div>
</div>
<div className="pt-4 mt-auto">
<div className="flex items-start gap-2.5 text-secondary">
<span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">verified</span>
<p className="font-caption text-caption text-on-surface-variant">
<strong><T>Pengayaan:</T></strong>{" "}<T>Field trip ke I3L (15 Feb 2025) dan kunjungan tamu dari Jepang (24 Nov 2025) memperluas wawasan siswa.</T>
              </p>
</div>
</div>
</div>

<div className="bg-surface rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="absolute top-0 right-0 w-32 h-32 bg-tertiary-fixed/20 rounded-bl-full pointer-events-none"></div>
<div>
<div className="flex items-center justify-between mb-6">
<span className="font-label-md text-label-md px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed font-bold rounded-full">
                <T>Tahsin &amp; Tahfiz</T>
              </span>
<div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[20px]">menu_book</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-3">
              <T>Adab, Ibadah &amp; Tahfiz</T>
            </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
              <T>Pembiasaan ibadah dan akhlak mulia, pembelajaran Tahsin (tajwid &amp; makhraj) serta Tahfiz Al-Qur&apos;an terstruktur sebagai bagian integral kurikulum.</T>
            </p>
<div className="space-y-4 pt-4 bg-surface-container-lowest/60 p-4 rounded-xl mb-6">
<div className="font-label-md text-label-md uppercase tracking-wider text-tertiary font-bold"><T>Komponen Ibadah &amp; Qur&apos;an:</T></div>
<ul className="space-y-2 font-body-sm text-body-sm text-on-surface">
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[14px] mt-1 shrink-0">star</span>
<div>
<strong className="font-medium"><T>Tahsin &amp; Tahfiz Al-Qur&apos;an</T></strong>
<span className="block text-caption text-on-surface-variant"><T>Tajwid, makhraj, dan hafalan terstruktur disertai Murajaah.</T></span>
</div>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[14px] mt-1 shrink-0">star</span>
<div>
<strong className="font-medium"><T>Salat Dhuha Rutin</T></strong>
<span className="block text-caption text-on-surface-variant"><T>Pembiasaan ibadah yang menjadi bagian integral kurikulum.</T></span>
</div>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[14px] mt-1 shrink-0">star</span>
<div>
<strong className="font-medium"><T>Wisuda Tahfidz &amp; Pesantren Kilat</T></strong>
<span className="block text-caption text-on-surface-variant"><T>Wisuda Tahfidz Juz 30 (Mei 2025) dan Pesantren Kilat Ramadhan.</T></span>
</div>
</li>
</ul>
</div>
</div>
<div className="pt-4 mt-auto">
<div className="flex items-start gap-2.5 text-tertiary">
<span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">psychology</span>
<p className="font-caption text-caption text-on-surface-variant">
<strong><T>Kegiatan:</T></strong>{" "}<T>Wisuda Tahfidz Juz 30 pada 22 Mei 2025, bersama seminar parenting dan pengajian bulanan.</T>
              </p>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full py-20 bg-surface">
<div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">

<div className="text-center max-w-3xl mx-auto mb-16">
<span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold inline-block mb-2">
          <T>Research Incubation Framework</T>
        </span>
<h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface mb-4 text-balance">
          <T>Dari Observasi Menuju Solusi Nyata</T>
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
          <T>Alur Research Class: dari metodologi penelitian, pengumpulan dan analisis data, hingga sidang karya ilmiah dan kompetisi sains.</T>
        </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative">

<div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col justify-between shadow-sm relative group hover:-translate-y-1 transition-all">
<div>
<div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center font-headline-sm text-headline-sm mb-4">
              <T>01</T>
            </div>
<span className="font-label-md text-label-md text-secondary font-semibold block mb-1"><T>Research Class · Tahap 1</T></span>
<h4 className="font-headline-sm text-headline-sm text-on-surface mb-2"><T>Metodologi Penelitian</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              <T>Siswa mempelajari metodologi penelitian sebagai dasar menyusun karya ilmiah dalam Research Class sejak 2024.</T>
            </p>
</div>
<div className="mt-6 pt-3 flex items-center gap-1.5 text-primary text-caption font-semibold">
<span className="material-symbols-outlined text-[14px]">travel_explore</span>
<span><T>Metodologi</T></span>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col justify-between shadow-sm relative group hover:-translate-y-1 transition-all">
<div>
<div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center font-headline-sm text-headline-sm mb-4">
              <T>02</T>
            </div>
<span className="font-label-md text-label-md text-secondary font-semibold block mb-1"><T>Research Class · Tahap 2</T></span>
<h4 className="font-headline-sm text-headline-sm text-on-surface mb-2"><T>Pengumpulan Data</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              <T>Siswa mengumpulkan dan menganalisis data penelitian sesuai topik karya ilmiah masing-masing.</T>
            </p>
</div>
<div className="mt-6 pt-3 flex items-center gap-1.5 text-primary text-caption font-semibold">
<span className="material-symbols-outlined text-[14px]">assignment</span>
<span><T>Data &amp; Analisis</T></span>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col justify-between shadow-sm relative group hover:-translate-y-1 transition-all">
<div>
<div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center font-headline-sm text-headline-sm mb-4">
              <T>03</T>
            </div>
<span className="font-label-md text-label-md text-secondary font-semibold block mb-1"><T>Research Class · Tahap 3</T></span>
<h4 className="font-headline-sm text-headline-sm text-on-surface mb-2"><T>Penyusunan Laporan</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              <T>Hasil penelitian disusun menjadi laporan karya ilmiah yang siap dipresentasikan.</T>
            </p>
</div>
<div className="mt-6 pt-3 flex items-center gap-1.5 text-primary text-caption font-semibold">
<span className="material-symbols-outlined text-[14px]">biotech</span>
<span><T>Laporan Ilmiah</T></span>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col justify-between shadow-sm relative group hover:-translate-y-1 transition-all">
<div>
<div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center font-headline-sm text-headline-sm mb-4">
              <T>04</T>
            </div>
<span className="font-label-md text-label-md text-secondary font-semibold block mb-1"><T>Kelas 8 · Okt 2025</T></span>
<h4 className="font-headline-sm text-headline-sm text-on-surface mb-2"><T>Research Contest</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              <T>Sidang karya ilmiah siswa kelas 8 pada Research Contest 3 Oktober 2025; 33 siswa tampil.</T>
            </p>
</div>
<div className="mt-6 pt-3 flex items-center gap-1.5 text-primary text-caption font-semibold">
<span className="material-symbols-outlined text-[14px]">co_present</span>
<span><T>Sidang Karya Ilmiah</T></span>
</div>
</div>

<div className="bg-primary text-on-primary p-6 rounded-2xl flex flex-col justify-between shadow-md relative group hover:-translate-y-1 transition-all md:col-span-2 lg:col-span-1">
<div>
<div className="w-12 h-12 rounded-xl bg-primary-container text-tertiary-fixed flex items-center justify-center font-headline-sm text-headline-sm mb-4">
              <T>05</T>
            </div>
<span className="font-label-md text-label-md text-tertiary-fixed font-semibold block mb-1"><T>2024 – 2025</T></span>
<h4 className="font-headline-sm text-headline-sm text-on-primary mb-2"><T>Pameran &amp; Kompetisi</T></h4>
<p className="font-body-sm text-body-sm text-primary-fixed-dim leading-relaxed">
              <T>Research Exhibition 19 Desember 2024 serta kompetisi sains NSIF 2024, IIF 2025, dan ISIF 2025.</T>
            </p>
</div>
<div className="mt-6 pt-3 flex items-center gap-1.5 text-tertiary-fixed text-caption font-semibold">
<span className="material-symbols-outlined text-[14px]">emoji_events</span>
<span><T>Medali Sains</T></span>
</div>
</div>
</div>
</div>
</section>

<section className="w-full py-20 bg-surface-container-low">
<div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
<div>
<span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold block mb-2"><T>Prestasi Sains &amp; Riset</T></span>
<h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface text-balance">
            <T>Capaian Sains &amp; Riset Siswa</T>
          </h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
          <T>Karya ilmiah siswa SMP Al Fakhir meraih medali di ajang sains dan inovasi tingkat nasional maupun internasional.</T>
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

<div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-xl bg-surface-container text-primary flex items-center justify-center mb-5">
<span className="material-symbols-outlined text-[26px]">memory</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2"><T>NSIF 2024 · Medali Perak</T></h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
              <T>National Science &amp; Innovation Fair di Denpasar, Bali (6–10 Nov 2024), diwakili dua siswa.</T>
            </p>
<div className="space-y-2 mb-6">
<span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold block"><T>Topik Unggulan:</T></span>
<ul className="text-xs leading-snug font-caption text-on-surface-variant space-y-1.5 [&>li]:pl-3 [&>li]:-indent-3">
<li><T>• Analisis Pemahaman Konsep Matematika di Era Society 5.0</T></li>
<li><T>• Diwakili 2 siswa</T></li>
<li><T>• Denpasar, Bali</T></li>
<li><T>• 6–10 November 2024</T></li>
</ul>
</div>
</div>
<span className="font-label-md text-label-md text-primary font-bold flex items-center gap-1">
<span><T>Medali Perak</T></span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</span>
</div>

<div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-xl bg-surface-container text-primary flex items-center justify-center mb-5">
<span className="material-symbols-outlined text-[26px]">eco</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2"><T>IIF 2025 · Medali Silver</T></h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
              <T>Invention and Innovation Fair tingkat nasional (daring), 10–12 Maret 2025, oleh tim 6 siswa.</T>
            </p>
<div className="space-y-2 mb-6">
<span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold block"><T>Topik Unggulan:</T></span>
<ul className="text-xs leading-snug font-caption text-on-surface-variant space-y-1.5 [&>li]:pl-3 [&>li]:-indent-3">
<li><T>• Potensi Buah Bit (Beta Vulgaris) untuk Hiperpigmentasi Bibir</T></li>
<li><T>• Tim 6 siswa</T></li>
<li><T>• Tingkat nasional, daring</T></li>
<li><T>• 10–12 Maret 2025</T></li>
</ul>
</div>
</div>
<span className="font-label-md text-label-md text-primary font-bold flex items-center gap-1">
<span><T>Medali Silver</T></span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</span>
</div>

<div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-xl bg-surface-container text-tertiary flex items-center justify-center mb-5">
<span className="material-symbols-outlined text-[26px]">nights_stay</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2"><T>ISIF 2025 · Medali Emas</T></h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
              <T>International Science Innovation Fair di Bali (11–16 Nov 2025) dengan dua delegasi siswa.</T>
            </p>
<div className="space-y-2 mb-6">
<span className="font-label-md text-label-md uppercase tracking-wider text-tertiary font-bold block"><T>Topik Unggulan:</T></span>
<ul className="text-xs leading-snug font-caption text-on-surface-variant space-y-1.5 [&>li]:pl-3 [&>li]:-indent-3">
<li><T>• Medali Emas</T></li>
<li><T>• Diwakili 2 siswa</T></li>
<li><T>• Bali, tingkat internasional</T></li>
<li><T>• 11–16 November 2025</T></li>
</ul>
</div>
</div>
<span className="font-label-md text-label-md text-tertiary font-bold flex items-center gap-1">
<span><T>Medali Emas</T></span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</span>
</div>

<div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-xl bg-surface-container text-secondary flex items-center justify-center mb-5">
<span className="material-symbols-outlined text-[26px]">diversity_3</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2"><T>Research Contest 2025</T></h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
              <T>Sidang karya ilmiah siswa kelas 8 yang digelar pada 3 Oktober 2025.</T>
            </p>
<div className="space-y-2 mb-6">
<span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold block"><T>Topik Unggulan:</T></span>
<ul className="text-xs leading-snug font-caption text-on-surface-variant space-y-1.5 [&>li]:pl-3 [&>li]:-indent-3">
<li><T>• 33 siswa kelas 8 tampil</T></li>
<li><T>• Sidang karya ilmiah</T></li>
<li><T>• Diselenggarakan 3 Oktober 2025</T></li>
<li><T>• Tahun ajaran 2025/2026</T></li>
</ul>
</div>
</div>
<span className="font-label-md text-label-md text-secondary font-bold flex items-center gap-1">
<span><T>Research Contest</T></span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</span>
</div>
</div>
</div>
</section>

<section className="w-full py-20 bg-surface">
<div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
<div>
<span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold block mb-2"><T>Ekosistem Riset Sekolah</T></span>
<h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface text-balance">
            <T>Laboratorium &amp; Sarana Penunjang Riset</T>
          </h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
          <T>Lab IPA, Lab Komputer, dan Perpustakaan mendukung pembelajaran sains serta kegiatan penelitian siswa.</T>
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

<div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col group">
<div className="h-56 overflow-hidden relative">
<Img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Laboratorium IPA sekolah" src="/design/smp-akademik/02.jpg" />
<span className="absolute top-4 left-4 font-label-md text-label-md bg-primary text-on-primary px-3 py-1 rounded-full font-bold">
              <T>Lab IPA</T>
            </span>
</div>
<div className="p-6 flex-1 flex flex-col justify-between">
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2"><T>Laboratorium IPA (Sains)</T></h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                <T>Laboratorium sains sekolah untuk pembelajaran IPA dan percobaan siswa.</T>
              </p>
<div className="space-y-1.5 font-caption text-caption text-on-surface-variant">
<div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span><T>Laboratorium Sains sekolah</T></div>
<div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span><T>Praktikum pembelajaran IPA</T></div>
<div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span><T>Pendukung kegiatan Research Class</T></div>
</div>
</div>
<div className="pt-6 mt-6 border-t border-surface-container flex items-center justify-between">
<span className="font-caption text-caption font-bold text-primary"><T>Fasilitas Sekolah</T></span>
<span className="font-caption text-caption text-on-surface-variant"><T>Lab IPA</T></span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col group">
<div className="h-56 overflow-hidden relative">
<Img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Laboratorium komputer sekolah" src="/design/smp-akademik/03.jpg" />
<span className="absolute top-4 left-4 font-label-md text-label-md bg-secondary text-on-secondary px-3 py-1 rounded-full font-bold">
              <T>Lab Komputer</T>
            </span>
</div>
<div className="p-6 flex-1 flex flex-col justify-between">
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2"><T>Laboratorium Komputer</T></h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                <T>Ruang komputer sekolah untuk pembelajaran dan literasi digital siswa.</T>
              </p>
<div className="space-y-1.5 font-caption text-caption text-on-surface-variant">
<div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span><T>Lab Komputer sekolah</T></div>
<div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span><T>Ruang Multimedia</T></div>
<div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span><T>Tablet belajar &amp; LMS</T></div>
</div>
</div>
<div className="pt-6 mt-6 border-t border-surface-container flex items-center justify-between">
<span className="font-caption text-caption font-bold text-secondary"><T>Fasilitas Sekolah</T></span>
<span className="font-caption text-caption text-on-surface-variant"><T>Lab Komputer</T></span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col group">
<div className="h-56 overflow-hidden relative">
<Img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Perpustakaan sekolah" src="/design/smp-akademik/04.jpg" />
<span className="absolute top-4 left-4 font-label-md text-label-md bg-tertiary text-on-tertiary px-3 py-1 rounded-full font-bold">
              <T>Perpustakaan</T>
            </span>
</div>
<div className="p-6 flex-1 flex flex-col justify-between">
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2"><T>Perpustakaan Al Fakhir</T></h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                <T>Pusat referensi dan literasi siswa untuk mendukung belajar dan penelitian.</T>
              </p>
<div className="space-y-1.5 font-caption text-caption text-on-surface-variant">
<div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span><T>Perpustakaan sekolah</T></div>
<div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span><T>Mendukung literasi siswa</T></div>
<div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span><T>Referensi untuk karya ilmiah</T></div>
</div>
</div>
<div className="pt-6 mt-6 border-t border-surface-container flex items-center justify-between">
<span className="font-caption text-caption font-bold text-tertiary"><T>Fasilitas Sekolah</T></span>
<span className="font-caption text-caption text-on-surface-variant"><T>Perpustakaan</T></span>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full py-20 bg-surface-container-lowest">
<div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
<div className="lg:col-span-4 lg:sticky lg:top-28 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
<span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold inline-block mb-2">
          <T>Keseimbangan Ritme Siswa</T>
        </span>
<h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface mb-4 text-balance">
          <T>Ritme Belajar di SMP Al Fakhir: Ibadah, Nalar, &amp; Riset</T>
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
          <T>Rangkaian pembiasaan ibadah, pembelajaran, riset, dan pengembangan diri yang membentuk keseimbangan siswa Al Fakhir.</T>
        </p>
<div className="hidden lg:flex flex-col gap-3 mt-8">
<div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-surface">
<span className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-semibold"><T>Format Sekolah</T></span>
<span className="font-headline-sm text-headline-sm text-primary font-bold whitespace-nowrap"><T>Sekolah Harian</T></span>
</div>
<div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-surface">
<span className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-semibold"><T>Kegiatan Utama</T></span>
<span className="font-headline-sm text-headline-sm text-tertiary font-bold"><T>8 Kegiatan</T></span>
</div>
<div className="flex flex-wrap gap-2 pt-2">
<span className="font-caption text-caption bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full font-semibold"><T>Spiritual</T></span>
<span className="font-caption text-caption bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full font-semibold"><T>Akademik</T></span>
<span className="font-caption text-caption bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full font-semibold"><T>Riset</T></span>
<span className="font-caption text-caption bg-surface-container-high text-primary px-3 py-1 rounded-full font-semibold"><T>Leadership</T></span>
</div>
</div>
</div>

<div className="lg:col-span-8 bg-surface rounded-2xl p-4 sm:p-6 md:p-10 shadow-sm w-full">
<div className="space-y-4 sm:space-y-6">

<div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface-container-lowest rounded-xl gap-4 hover:bg-surface-container-low transition-colors">
<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
<span className="font-headline-sm text-headline-sm text-tertiary font-bold sm:w-36 shrink-0 whitespace-nowrap"><T>Rutin Harian</T></span>
<div className="min-w-0">
<h4 className="font-subheading text-subheading text-on-surface"><T>Apel Pagi &amp; Salat Dhuha</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Apel di lapangan sekolah dan Salat Dhuha rutin sebagai pembiasaan ibadah siswa.</T></p>
</div>
</div>
<span className="font-caption text-caption bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full font-semibold shrink-0 w-fit"><T>Spiritual</T></span>
</div>

<div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface-container-lowest rounded-xl gap-4 hover:bg-surface-container-low transition-colors">
<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
<span className="font-headline-sm text-headline-sm text-primary font-bold sm:w-36 shrink-0 whitespace-nowrap"><T>Pembiasaan</T></span>
<div className="min-w-0">
<h4 className="font-subheading text-subheading text-on-surface"><T>Adab, Literasi &amp; Karakter</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Pembiasaan akhlak mulia, 7 Kebiasaan Anak Hebat Indonesia, dan literasi.</T></p>
</div>
</div>
<span className="font-caption text-caption bg-surface-container-high text-primary px-3 py-1 rounded-full font-semibold shrink-0 w-fit"><T>Adab &amp; Literasi</T></span>
</div>

<div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface-container-lowest rounded-xl gap-4 hover:bg-surface-container-low transition-colors">
<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
<span className="font-headline-sm text-headline-sm text-primary font-bold sm:w-36 shrink-0 whitespace-nowrap"><T>Kegiatan Belajar</T></span>
<div className="min-w-0">
<h4 className="font-subheading text-subheading text-on-surface"><T>Pembelajaran Kurikulum Merdeka</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Pembelajaran mata pelajaran dengan tablet belajar dan media pembelajaran digital.</T></p>
</div>
</div>
<span className="font-caption text-caption bg-primary-fixed text-on-primary-fixed font-semibold px-3 py-1 rounded-full shrink-0 w-fit"><T>Akademik</T></span>
</div>

<div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface-container-lowest rounded-xl gap-4 hover:bg-surface-container-low transition-colors">
<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
<span className="font-headline-sm text-headline-sm text-tertiary font-bold sm:w-36 shrink-0 whitespace-nowrap"><T>Program Qur&apos;ani</T></span>
<div className="min-w-0">
<h4 className="font-subheading text-subheading text-on-surface"><T>Tahsin &amp; Tahfiz Al-Qur&apos;an</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Belajar tajwid dan makhraj serta hafalan Al-Qur&apos;an secara terstruktur.</T></p>
</div>
</div>
<span className="font-caption text-caption bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full font-semibold shrink-0 w-fit"><T>Tahfiz</T></span>
</div>

<div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface-container-lowest rounded-xl gap-4 hover:bg-surface-container-low transition-colors">
<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
<span className="font-headline-sm text-headline-sm text-secondary font-bold sm:w-36 shrink-0 whitespace-nowrap"><T>Research Class</T></span>
<div className="min-w-0">
<h4 className="font-subheading text-subheading text-on-surface"><T>Research Class &amp; Karya Ilmiah</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Metodologi penelitian, pengumpulan dan analisis data, serta penyusunan laporan.</T></p>
</div>
</div>
<span className="font-caption text-caption bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full font-semibold shrink-0 w-fit"><T>Riset</T></span>
</div>

<div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface-container-lowest rounded-xl gap-4 hover:bg-surface-container-low transition-colors">
<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
<span className="font-headline-sm text-headline-sm text-primary font-bold sm:w-36 shrink-0 whitespace-nowrap"><T>Pengembangan Diri</T></span>
<div className="min-w-0">
<h4 className="font-subheading text-subheading text-on-surface"><T>Ekstrakurikuler</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Pramuka (wajib), basket, taekwondo, futsal, panahan, drumband, jurnalistik, tari, dan hadroh.</T></p>
</div>
</div>
<span className="font-caption text-caption bg-surface-container-high text-primary px-3 py-1 rounded-full font-semibold shrink-0 w-fit"><T>Ekskul</T></span>
</div>

<div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface-container-lowest rounded-xl gap-4 hover:bg-surface-container-low transition-colors">
<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
<span className="font-headline-sm text-headline-sm text-tertiary font-bold sm:w-36 shrink-0 whitespace-nowrap"><T>Pembinaan Karakter</T></span>
<div className="min-w-0">
<h4 className="font-subheading text-subheading text-on-surface"><T>Murajaah &amp; Pembinaan Karakter</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Murajaah hafalan Al-Qur&apos;an serta pembinaan karakter seperti anti-bullying dan kepemimpinan.</T></p>
</div>
</div>
<span className="font-caption text-caption bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full font-semibold shrink-0 w-fit"><T>Tahfiz &amp; Karakter</T></span>
</div>

<div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface-container-lowest rounded-xl gap-4 hover:bg-surface-container-low transition-colors">
<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
<span className="font-headline-sm text-headline-sm text-primary-container font-bold sm:w-36 shrink-0 whitespace-nowrap"><T>Kesiswaan</T></span>
<div className="min-w-0">
<h4 className="font-subheading text-subheading text-on-surface"><T>OSIS &amp; Projek P5</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Kepemimpinan siswa melalui OSIS serta Projek Penguatan Profil Pelajar Pancasila (P5).</T></p>
</div>
</div>
<span className="font-caption text-caption bg-surface-container-high text-primary font-semibold px-3 py-1 rounded-full shrink-0 w-fit"><T>Leadership</T></span>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full py-20 bg-surface">
<div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
<div className="bg-surface-container-lowest rounded-3xl p-8 md:p-14 shadow-sm border border-primary/10">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
<div className="lg:col-span-5 flex flex-col gap-4">
<span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold"><T>Standard of Excellence</T></span>
<h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface text-balance">
              <T>Portofolio Prestasi &amp; Karya Siswa</T>
            </h2>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <T>Siswa tidak sekadar mengikuti pembelajaran formal, tetapi juga membangun rekam jejak karya ilmiah dan prestasi di ajang sains, inovasi, serta kegiatan Qur&apos;ani.</T>
            </p>
<div className="pt-2">
<div className="inline-flex items-center gap-2 p-3 bg-surface-container-low rounded-xl text-primary font-label-md text-label-md">
<span className="material-symbols-outlined text-[20px]">military_tech</span>
<span><T>Generasi Qurani &amp; Berprestasi</T></span>
</div>
</div>
</div>
<div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">

<div className="p-6 bg-surface rounded-2xl flex flex-col gap-3">
<div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
                <T>1</T>
              </div>
<h3 className="font-headline-sm text-headline-sm text-on-surface"><T>Medali Sains &amp; Inovasi</T></h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                <T>Medali Perak NSIF 2024, Medali Silver IIF 2025, dan Medali Emas ISIF 2025 untuk karya ilmiah siswa.</T>
              </p>
</div>

<div className="p-6 bg-surface rounded-2xl flex flex-col gap-3">
<div className="w-10 h-10 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center font-bold">
                <T>2</T>
              </div>
<h3 className="font-headline-sm text-headline-sm text-on-surface"><T>Wisuda Tahfidz Juz 30</T></h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                <T>Wisuda Tahfidz Juz 30 pada 22 Mei 2025, bersama seminar parenting, pengajian bulanan, dan buka puasa sunnah.</T>
              </p>
</div>

<div className="p-6 bg-surface rounded-2xl flex flex-col gap-3">
<div className="w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center font-bold">
                <T>3</T>
              </div>
<h3 className="font-headline-sm text-headline-sm text-on-surface"><T>Karya Ilmiah Research Class</T></h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                <T>Siswa kelas 8 mempresentasikan karya ilmiahnya di Research Contest 3 Oktober 2025, diikuti 33 siswa.</T>
              </p>
</div>

<div className="p-6 bg-surface rounded-2xl flex flex-col gap-3">
<div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-bold">
                <T>4</T>
              </div>
<h3 className="font-headline-sm text-headline-sm text-on-surface"><T>Field Trip &amp; Inspiration Class</T></h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                <T>Kunjungan ke I3L dan pabrik tahu, Inspiration Class, serta tamu dari Jepang memperkaya pengalaman belajar siswa.</T>
              </p>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full py-16 bg-surface-container-low">
<div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
<div className="bg-primary text-on-primary rounded-3xl p-8 md:p-14 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">

<div className="absolute -right-10 -bottom-10 w-80 h-80 opacity-10 pointer-events-none text-tertiary-fixed">
<svg className="w-full h-full fill-current" viewBox="0 0 100 100">
<path d="M50 0 L61 35 L97 25 L75 55 L97 85 L61 75 L50 100 L39 75 L3 85 L25 55 L3 25 L39 35 Z" />
</svg>
</div>
<div className="relative z-10 max-w-2xl flex flex-col gap-4">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container text-tertiary-fixed w-fit font-label-md text-label-md font-bold uppercase tracking-wider">
<span className="material-symbols-outlined text-[16px]">school</span>
<span><T>Modern Islamic Education</T></span>
</div>
<h2 className="font-headline-lg text-headline-md md:text-headline-lg text-surface-container-lowest text-balance">
            <T>Siapkan Putra-Putri Anda Menjadi Generasi Qurani &amp; Berprestasi</T>
          </h2>
<p className="font-body-md text-body-md text-primary-fixed-dim leading-relaxed">
            <T>Diskusikan kesiapan belajar, program Research Class, serta pembiasaan ibadah dan Tahfiz bersama pihak SMP Islam Modern Al Fakhir.</T>
          </p>
</div>
<div className="relative z-10 flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto shrink-0">
<a className="font-label-lg text-label-lg bg-secondary-container hover:bg-secondary text-on-secondary px-8 py-4 rounded-full text-center font-bold shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2" href={waLinkFor(contact, "Halo, saya ingin berkonsultasi mengenai kurikulum SMP Islam Modern Al Fakhir.", "smp")} target="_blank" rel="noopener noreferrer">
<span className="material-symbols-outlined text-[20px]">calendar_month</span>
<span><T>Jadwalkan Konsultasi Kurikulum</T></span>
</a>
<a className="font-label-lg text-label-lg bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-surface-container-lowest px-8 py-4 rounded-full text-center font-bold backdrop-blur-sm transition-all flex items-center justify-center gap-2" href={waLinkFor(contact, "Halo, saya ingin meminta dokumen silabus & pedoman akademik SMP Islam Modern Al Fakhir.", "smp")} target="_blank" rel="noopener noreferrer">
<span className="material-symbols-outlined text-[20px]">description</span>
<span><T>Unduh Dokumen Silabus Lengkap</T></span>
</a>
</div>
</div>
</div>
</section>
</div></div>
</Scope>
  );
}

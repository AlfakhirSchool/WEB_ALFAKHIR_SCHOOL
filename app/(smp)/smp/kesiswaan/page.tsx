import type { Metadata } from "next";
import { SiteLink } from "@/components/SiteTransition";
import { waLinkFor } from "@/content/settings";
import { getSettings } from "@/lib/content/store";
import { Scope, T } from "@/components/content/T";
import { StudentSection } from "@/components/pages/portal-shared/StudentCard";
import KaryaShowcase from "@/components/pages/smp-kesiswaan/KaryaShowcase";
import { Img } from "@/components/content/Img";

export const metadata: Metadata = { title: "Karya & Prestasi Siswa | SMP Islam Modern Al Fakhir" };

export default async function Page() {
  const { contact, students } = await getSettings();
  return (
<Scope id="smp/kesiswaan">
<div className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]"><div className="flex flex-col w-full">

<div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin pt-6">
<div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-primary font-caption text-caption tracking-widest uppercase">
<span className="inline-flex items-start sm:items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-tertiary shrink-0">diamond</span>
<span className="whitespace-normal"><T>Portofolio Akademik Resmi · SMP Islam Modern Al Fakhir</T></span>
</span>
<span className="hidden sm:inline-block w-8 h-[1px] bg-primary/20"></span>
<span className="text-tertiary font-semibold whitespace-nowrap"><T>TA 2025/2026</T></span>
</div>
</div>

<section className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin pt-6 pb-12">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

<div className="lg:col-span-8 flex flex-col gap-6">
<div className="inline-flex items-start sm:items-center gap-2 bg-surface-container text-primary font-label-md text-label-md px-3.5 py-1.5 rounded-2xl sm:rounded-full w-fit max-w-full">
<span className="w-2 h-2 mt-1.5 sm:mt-0 rounded-full bg-secondary-container animate-pulse shrink-0"></span>
<span><T>Showcase Riset &amp; Portofolio Karya Remaja Cendekia</T>{" "}<span className="text-outline-variant font-normal hidden sm:inline">|</span> <span className="text-tertiary font-bold whitespace-nowrap"><T>Sawangan, Depok</T></span></span>
</div>
<h1 className="font-display-hero text-headline-lg-mobile sm:text-headline-lg xl:text-5xl text-primary tracking-tight font-extrabold leading-[1.2] text-balance"><T>Bukti Otentik Nalar Kritis &amp; Inovasi:</T>{" "}<span className="text-tertiary-container italic font-normal pr-1"><T>Karya Nyata Siswa</T></span>{" "}<T>untuk Kemaslahatan Ummat.</T></h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed text-pretty"><T>Dari Research Class SMP Islam Modern Al Fakhir Sawangan menuju panggung ilmiah nasional dan internasional. Siswa belajar metodologi penelitian, mengumpulkan dan menganalisis data, lalu mempertanggungjawabkan karya ilmiahnya di Research Contest kelas 8.</T></p>
<div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
<a className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary hover:bg-primary px-7 py-3.5 rounded-full font-label-lg text-label-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 text-center" href="#showcase-karya">
<span><T>Jelajahi Galeri Karya</T></span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</a>
<a className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest text-primary hover:bg-surface-container px-6 py-3.5 rounded-full font-label-lg text-label-lg font-bold shadow-sm transition-all duration-300 text-center" href="#publikasi-jurnal">
<span className="material-symbols-outlined text-tertiary text-[20px]">menu_book</span>
<span><T>Lihat Research Contest 2025</T></span>
</a>
</div>
</div>

<div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden">
<div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary-container text-[24px]">verified</span>
<span className="font-label-md text-label-md font-bold text-primary tracking-wider uppercase"><T>Visitasi Akreditasi Sekolah</T></span>
</div>
<span className="font-caption text-caption bg-surface-container text-tertiary font-bold px-2.5 py-1 rounded-full"><T>17–18 Nov 2025</T></span>
</div>
<div className="p-4 bg-surface-container-low rounded-xl flex flex-col gap-2">
<span className="font-caption text-caption text-on-surface-variant uppercase font-semibold"><T>Fokus Riset Siswa</T></span>
<p className="font-headline-sm text-headline-sm text-primary font-bold"><T>Research Class Sejak 2024</T></p>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Siswa mempelajari metodologi penelitian, mengumpulkan dan menganalisis data, lalu menyusun laporan hasil penelitian.</T></p>
</div>
<div className="flex items-center justify-between pt-2">
<div className="flex -space-x-2 overflow-hidden">
<div className="inline-block h-8 w-8 rounded-full bg-primary text-on-primary font-bold text-[12px] flex items-center justify-center"><T>NSIF</T></div>
<div className="inline-block h-8 w-8 rounded-full bg-tertiary text-on-tertiary font-bold text-[12px] flex items-center justify-center"><T>IIF</T></div>
<div className="inline-block h-8 w-8 rounded-full bg-secondary-container text-on-secondary font-bold text-[12px] flex items-center justify-center"><T>ISIF</T></div>
<div className="inline-block h-8 w-8 rounded-full bg-primary-container text-on-primary font-bold text-[12px] flex items-center justify-center"><T>+33</T></div>
</div>
<span className="font-caption text-caption text-on-surface-variant font-medium"><T>Ajang Sains &amp; Research Contest</T></span>
</div>
</div>
</div>

<div className="mt-12 pt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm">
<div className="flex flex-col gap-1.5 p-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary-container text-[26px]">emoji_events</span>
<span className="font-headline-lg text-headline-md lg:text-headline-lg font-bold text-primary whitespace-nowrap"><T>3</T></span>
</div>
<span className="font-subheading text-[15px] font-bold text-on-surface"><T>Medali Sains</T></span>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Perak NSIF 2024, Silver IIF 2025, dan Emas ISIF 2025.</T></p>
</div>
<div className="flex flex-col gap-1.5 p-3 bg-surface-container-low/50 lg:bg-transparent rounded-xl">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[26px]">auto_stories</span>
<span className="font-headline-lg text-headline-md lg:text-headline-lg font-bold text-primary whitespace-nowrap"><T>33</T></span>
</div>
<span className="font-subheading text-[15px] font-bold text-on-surface"><T>Siswa Kelas 8 Tampil</T></span>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Presentasi karya ilmiah di Research Contest, 3 Oktober 2025.</T></p>
</div>
<div className="flex flex-col gap-1.5 p-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-[26px]">workspace_premium</span>
<span className="font-headline-lg text-headline-md lg:text-headline-lg font-bold text-primary whitespace-nowrap"><T>2025</T></span>
</div>
<span className="font-subheading text-[15px] font-bold text-on-surface"><T>Research Class</T></span>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Belajar metodologi penelitian, olah data, dan menyusun laporan.</T></p>
</div>
<div className="flex flex-col gap-1.5 p-3 bg-surface-container-low/50 lg:bg-transparent rounded-xl">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[26px]">account_balance_wallet</span>
<span className="font-headline-lg text-headline-md lg:text-headline-lg font-bold text-primary whitespace-nowrap"><T>19 Des</T></span>
</div>
<span className="font-subheading text-[15px] font-bold text-on-surface"><T>Research Exhibition</T></span>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Siswa memamerkan karya dan project riset pada tahun 2024.</T></p>
</div>
</div>
</section>


<StudentSection students={students.smp} className="bg-surface-container-low" eyebrow={<T>Profil &amp; Prestasi Siswa</T>} title={<T>Cendekiawan Muda SMP Al Fakhir</T>} lead={<T>Profil siswa periset, penghafal Al-Qur&apos;an, dan peraih medali kompetisi sains nasional &amp; internasional.</T>} />
<KaryaShowcase />
<section className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-12">
<div className="bg-surface-container-lowest rounded-3xl p-6 md:p-10 shadow-sm">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
<div>
<div className="flex items-center gap-2 text-secondary font-label-md text-label-md uppercase font-bold">
<span className="material-symbols-outlined text-[18px]">workspace_premium</span>
<span><T>Wall of Champions · Rekam Prestasi Ilmiah &amp; Karakter</T></span>
</div>
<h3 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-bold mt-1"><T>Dari Karya Kelas hingga Panggung Internasional</T></h3>
</div>
<div className="flex items-center gap-3">
<span className="font-label-md text-label-md bg-surface-container px-3.5 py-1.5 rounded-full text-primary font-semibold whitespace-nowrap"><T>Rekap Berita Resmi Sekolah</T></span>
</div>
</div>

<div className="lg:overflow-x-auto">
<table className="block lg:table w-full lg:min-w-[44rem] text-left">
<thead className="hidden lg:table-header-group">
<tr className="bg-surface-container-low text-primary font-label-md text-label-md uppercase tracking-wider">
<th className="py-3.5 px-4 rounded-l-xl"><T>Tahun</T></th>
<th className="py-3.5 px-4"><T>Kompetisi / Event Riset</T></th>
<th className="py-3.5 px-4"><T>Peringkat &amp; Kategori</T></th>
<th className="py-3.5 px-4"><T>Delegasi Siswa</T></th>
<th className="py-3.5 px-4 rounded-r-xl"><T>Tingkat</T></th>
</tr>
</thead>
<tbody className="flex flex-col gap-3 lg:table-row-group font-body-sm text-body-sm lg:divide-y divide-surface-container [&_td]:align-middle [&_td>span.inline-flex]:flex lg:[&_td>span.inline-flex]:whitespace-nowrap">
<tr className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 p-4 rounded-2xl bg-surface-container-low/50 lg:table-row lg:p-0 lg:rounded-none lg:bg-transparent hover:bg-surface-container-low/40 transition-colors">
<td className="order-1 lg:py-4 lg:px-4 font-bold text-primary"><T>2025</T></td>
<td className="order-3 col-span-2 lg:py-4 lg:px-4 font-semibold text-on-surface max-lg:leading-snug"><T>International Science Innovation Fair (ISIF), Bali</T></td>
<td className="order-4 col-span-2 lg:py-4 lg:px-4">
<span className="inline-flex items-center gap-1 font-bold text-tertiary">
<span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">stars</span>{" "}<T>Medali Emas</T></span>
</td>
<td className="order-5 col-span-2 flex items-center gap-1.5 lg:table-cell lg:py-4 lg:px-4 text-on-surface-variant"><span className="material-symbols-outlined text-[16px] lg:hidden" aria-hidden="true">groups</span><T>2 siswa delegasi</T></td>
<td className="order-2 justify-self-end lg:py-4 lg:px-4"><span className="whitespace-nowrap bg-surface-container text-primary font-caption text-caption px-2.5 py-1 rounded-full font-bold"><T>Internasional</T></span></td>
</tr>
<tr className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 p-4 rounded-2xl bg-surface-container-low/50 lg:table-row lg:p-0 lg:rounded-none lg:bg-transparent hover:bg-surface-container-low/40 transition-colors">
<td className="order-1 lg:py-4 lg:px-4 font-bold text-primary"><T>2025</T></td>
<td className="order-3 col-span-2 lg:py-4 lg:px-4 font-semibold text-on-surface max-lg:leading-snug"><T>Research Contest 2025 (Sidang Karya Ilmiah)</T></td>
<td className="order-4 col-span-2 lg:py-4 lg:px-4">
<span className="inline-flex items-center gap-1 font-bold text-secondary-container">
<span className="material-symbols-outlined text-[16px]">military_tech</span>{" "}<T>Presentasi Karya Ilmiah</T></span>
</td>
<td className="order-5 col-span-2 flex items-center gap-1.5 lg:table-cell lg:py-4 lg:px-4 text-on-surface-variant"><span className="material-symbols-outlined text-[16px] lg:hidden" aria-hidden="true">groups</span><T>33 siswa kelas 8</T></td>
<td className="order-2 justify-self-end lg:py-4 lg:px-4"><span className="whitespace-nowrap bg-surface-container text-primary font-caption text-caption px-2.5 py-1 rounded-full font-bold"><T>Sekolah</T></span></td>
</tr>
<tr className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 p-4 rounded-2xl bg-surface-container-low/50 lg:table-row lg:p-0 lg:rounded-none lg:bg-transparent hover:bg-surface-container-low/40 transition-colors">
<td className="order-1 lg:py-4 lg:px-4 font-bold text-primary"><T>2025</T></td>
<td className="order-3 col-span-2 lg:py-4 lg:px-4 font-semibold text-on-surface max-lg:leading-snug"><T>Wisuda Tahfidz Juz 30</T></td>
<td className="order-4 col-span-2 lg:py-4 lg:px-4">
<span className="inline-flex items-center gap-1 font-bold text-tertiary">
<span className="material-symbols-outlined text-[16px]">emoji_events</span>{" "}<T>Wisudawan Tahfidz Juz 30</T></span>
</td>
<td className="order-5 col-span-2 flex items-center gap-1.5 lg:table-cell lg:py-4 lg:px-4 text-on-surface-variant"><span className="material-symbols-outlined text-[16px] lg:hidden" aria-hidden="true">groups</span><T>Siswa penghafal Juz 30</T></td>
<td className="order-2 justify-self-end lg:py-4 lg:px-4"><span className="whitespace-nowrap bg-surface-container text-primary font-caption text-caption px-2.5 py-1 rounded-full font-bold"><T>Sekolah</T></span></td>
</tr>
<tr className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 p-4 rounded-2xl bg-surface-container-low/50 lg:table-row lg:p-0 lg:rounded-none lg:bg-transparent hover:bg-surface-container-low/40 transition-colors">
<td className="order-1 lg:py-4 lg:px-4 font-bold text-primary"><T>2024</T></td>
<td className="order-3 col-span-2 lg:py-4 lg:px-4 font-semibold text-on-surface max-lg:leading-snug"><T>Invention and Innovation Fair (IIF) 2025</T></td>
<td className="order-4 col-span-2 lg:py-4 lg:px-4">
<span className="inline-flex items-center gap-1 font-bold text-primary">
<span className="material-symbols-outlined text-[16px]">public</span>{" "}<T>Medali Silver</T></span>
</td>
<td className="order-5 col-span-2 flex items-center gap-1.5 lg:table-cell lg:py-4 lg:px-4 text-on-surface-variant"><span className="material-symbols-outlined text-[16px] lg:hidden" aria-hidden="true">groups</span><T>Tim 6 siswa</T></td>
<td className="order-2 justify-self-end lg:py-4 lg:px-4"><span className="whitespace-nowrap bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption px-2.5 py-1 rounded-full font-bold"><T>Nasional</T></span></td>
</tr>
<tr className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 p-4 rounded-2xl bg-surface-container-low/50 lg:table-row lg:p-0 lg:rounded-none lg:bg-transparent hover:bg-surface-container-low/40 transition-colors">
<td className="order-1 lg:py-4 lg:px-4 font-bold text-primary"><T>2024</T></td>
<td className="order-3 col-span-2 lg:py-4 lg:px-4 font-semibold text-on-surface max-lg:leading-snug"><T>Research Exhibition &amp; Project Research Art Contest</T></td>
<td className="order-4 col-span-2 lg:py-4 lg:px-4">
<span className="inline-flex items-center gap-1 font-bold text-secondary">
<span className="material-symbols-outlined text-[16px]">menu_book</span>{" "}<T>Pameran Karya Seluruh Siswa</T></span>
</td>
<td className="order-5 col-span-2 flex items-center gap-1.5 lg:table-cell lg:py-4 lg:px-4 text-on-surface-variant"><span className="material-symbols-outlined text-[16px] lg:hidden" aria-hidden="true">groups</span><T>Seluruh siswa</T></td>
<td className="order-2 justify-self-end lg:py-4 lg:px-4"><span className="whitespace-nowrap bg-surface-container text-primary font-caption text-caption px-2.5 py-1 rounded-full font-bold"><T>Sekolah</T></span></td>
</tr>
<tr className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 p-4 rounded-2xl bg-surface-container-low/50 lg:table-row lg:p-0 lg:rounded-none lg:bg-transparent hover:bg-surface-container-low/40 transition-colors">
<td className="order-1 lg:py-4 lg:px-4 font-bold text-primary"><T>2024</T></td>
<td className="order-3 col-span-2 lg:py-4 lg:px-4 font-semibold text-on-surface max-lg:leading-snug"><T>National Science &amp; Innovation Fair (NSIF), Denpasar</T></td>
<td className="order-4 col-span-2 lg:py-4 lg:px-4">
<span className="inline-flex items-center gap-1 font-bold text-primary-container">
<span className="material-symbols-outlined text-[16px]">smart_toy</span>{" "}<T>Medali Perak</T></span>
</td>
<td className="order-5 col-span-2 flex items-center gap-1.5 lg:table-cell lg:py-4 lg:px-4 text-on-surface-variant"><span className="material-symbols-outlined text-[16px] lg:hidden" aria-hidden="true">groups</span><T>2 siswa delegasi</T></td>
<td className="order-2 justify-self-end lg:py-4 lg:px-4"><span className="whitespace-nowrap bg-surface-container text-primary font-caption text-caption px-2.5 py-1 rounded-full font-bold"><T>Nasional</T></span></td>
</tr>
</tbody>
</table>
</div>
</div>
</section>

<section className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-10" id="publikasi-jurnal">
<div className="bg-surface-container-low rounded-3xl p-8 lg:p-12 relative overflow-hidden">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

<div className="lg:col-span-7 flex flex-col gap-5">
<div className="inline-flex items-center gap-2 text-primary font-label-md text-label-md font-bold uppercase tracking-wider">
<span className="material-symbols-outlined text-[20px] text-tertiary">library_books</span>
<span><T>Research Class &amp; Research Contest</T></span>
</div>
<h3 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-bold leading-tight"><T>Research Contest 2025: Sidang Karya Ilmiah Siswa Kelas 8</T></h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed"><T>Pada 3 Oktober 2025, 33 siswa kelas 8 mempresentasikan hasil penelitian mereka selama satu tahun penuh di aula sekolah, mulai dari mencari ide, mengumpulkan data, hingga menyusun laporan, di hadapan guru dan teman-teman.</T></p>
<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
<div className="bg-surface-container-lowest p-3.5 rounded-xl">
<span className="font-caption text-caption text-on-surface-variant block"><T>Tanggal</T></span>
<strong className="font-label-lg text-label-lg text-primary"><T>3 Oktober 2025</T></strong>
</div>
<div className="bg-surface-container-lowest p-3.5 rounded-xl">
<span className="font-caption text-caption text-on-surface-variant block"><T>Peserta</T></span>
<strong className="font-label-lg text-label-lg text-primary"><T>33 Siswa Kelas 8</T></strong>
</div>
<div className="col-span-2 sm:col-span-1 bg-surface-container-lowest p-3.5 rounded-xl">
<span className="font-caption text-caption text-on-surface-variant block"><T>Lokasi</T></span>
<strong className="font-label-lg text-label-lg text-primary"><T>Aula Sekolah</T></strong>
</div>
</div>
<div className="flex flex-wrap items-center gap-3 pt-3">
<a className="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-primary-container px-6 py-3 rounded-full font-label-md text-label-md font-bold transition-colors" href={waLinkFor(contact, "Halo, saya ingin bertanya tentang program Research Class dan Research Contest di SMP Islam Modern Al Fakhir.", "smp")} target="_blank" rel="noopener noreferrer">
<span className="material-symbols-outlined text-[18px]">download</span>
<span><T>Tanya Research Class &amp; Contest</T></span>
</a>
<a className="inline-flex items-center gap-2 bg-surface-container-lowest text-primary hover:bg-surface-container px-6 py-3 rounded-full font-label-md text-label-md font-bold transition-colors" href={waLinkFor(contact, "Halo, saya ingin bertanya tentang prestasi sains siswa (NSIF, IIF, ISIF) SMP Islam Modern Al Fakhir.", "smp")} target="_blank" rel="noopener noreferrer">
<span className="material-symbols-outlined text-[18px]">rule</span>
<span><T>Tanya Prestasi Sains Siswa</T></span>
</a>
</div>
</div>

<div className="lg:col-span-5 flex justify-center">
<div className="w-full max-w-sm bg-surface-container-lowest p-5 rounded-2xl shadow-md flex flex-col gap-4 border border-outline-variant/10">
<div className="h-64 rounded-xl overflow-hidden bg-surface-container relative">
<Img className="w-full h-full object-cover" alt="Dokumentasi karya ilmiah siswa SMP Islam Modern Al Fakhir" src="/photos/news/research-contest-2025.webp" />
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-4">
<span className="text-on-primary font-headline-sm text-[16px] font-bold"><T>Research Contest · 3 Okt 2025</T></span>
</div>
</div>
<div className="flex flex-col gap-1">
<span className="font-caption text-caption text-secondary font-bold uppercase"><T>Sorotan Karya</T></span>
<p className="font-subheading text-[15px] font-bold text-primary line-clamp-2"><T>Potensi Buah Bit (Beta Vulgaris) sebagai Alternatif Alami untuk Mengatasi Hiperpigmentasi Bibir</T></p>
<span className="font-caption text-caption text-on-surface-variant"><T>Medali Silver IIF 2025 · Tim 6 Siswa</T></span>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-12">
<div className="text-center max-w-2xl mx-auto mb-10">
<span className="font-label-md text-label-md text-tertiary uppercase font-bold tracking-wider"><T>Proses Riset Siswa</T></span>
<h3 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-bold mt-1"><T>4 Tahap dari Research Class hingga Sidang Karya Ilmiah</T></h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-2"><T>Gagasan kreatif siswa tidak berhenti di meja kelas: dilatih meneliti, dipresentasikan di Research Contest, lalu dibawa ke ajang sains nasional dan internasional.</T></p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

<div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-headline-sm text-headline-sm font-extrabold mb-4"><T>01</T></div>
<h4 className="font-headline-sm text-[18px] text-primary font-bold mb-2"><T>Ide &amp; Metodologi</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed"><T>Siswa belajar metodologi penelitian di Research Class dan mulai mencari ide riset yang menarik dan bermanfaat.</T></p>
</div>
<div className="mt-6 pt-4 border-t border-surface-container-high flex items-center gap-1.5 text-tertiary font-label-md text-label-md font-bold">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
<span><T>Research Class</T></span>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-headline-sm text-headline-sm font-extrabold mb-4"><T>02</T></div>
<h4 className="font-headline-sm text-[18px] text-primary font-bold mb-2"><T>Pengumpulan &amp; Analisis Data</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed"><T>Siswa mengumpulkan data penelitian, lalu menganalisisnya dengan bimbingan guru sepanjang tahun ajaran.</T></p>
</div>
<div className="mt-6 pt-4 border-t border-surface-container-high flex items-center gap-1.5 text-tertiary font-label-md text-label-md font-bold">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
<span><T>Sepanjang Tahun Ajaran</T></span>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-headline-sm text-headline-sm font-extrabold mb-4"><T>03</T></div>
<h4 className="font-headline-sm text-[18px] text-primary font-bold mb-2"><T>Penyusunan Laporan</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed"><T>Hasil penelitian dirangkum menjadi laporan karya ilmiah yang siap dipresentasikan di depan guru dan teman-teman.</T></p>
</div>
<div className="mt-6 pt-4 border-t border-surface-container-high flex items-center gap-1.5 text-secondary font-label-md text-label-md font-bold">
<span className="material-symbols-outlined text-[16px]">verified_user</span>
<span><T>Laporan Karya Ilmiah</T></span>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-headline-sm text-headline-sm font-extrabold mb-4"><T>04</T></div>
<h4 className="font-headline-sm text-[18px] text-primary font-bold mb-2"><T>Research Contest &amp; Expo</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed"><T>Siswa kelas 8 mempresentasikan karyanya di Research Contest, dan seluruh siswa memamerkan project di Research Exhibition.</T></p>
</div>
<div className="mt-6 pt-4 border-t border-surface-container-high flex items-center gap-1.5 text-primary font-label-md text-label-md font-bold">
<span className="material-symbols-outlined text-[16px]">campaign</span>
<span><T>Sidang Karya Ilmiah Kelas 8</T></span>
</div>
</div>
</div>
</section>

<section className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-10">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

<div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm flex flex-col justify-between relative overflow-hidden">
<blockquote className="font-subheading text-[17px] leading-relaxed text-primary font-medium italic mb-6"><T>“Al Fakhir, Luar Biasa!” Testimoni video Kepala Dinas Pendidikan Kota Depok yang mengapresiasi pendidikan berkualitas, akhlak mulia, dan inovasi nyata di SMP Islam Modern Al Fakhir.</T></blockquote>
<div className="flex items-center gap-3.5">
<div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden">
<Img className="w-full h-full object-cover" alt="Kepala Dinas Pendidikan Kota Depok" src="/photos/news/testimoni-kepala-dinas-pendidikan-kota-depok.webp" />
</div>
<div>
<h5 className="font-headline-sm text-[16px] text-primary font-bold"><T>Hj. Siti Chaerijah Aurijah, S.Pd., MM</T></h5>
<span className="font-caption text-caption text-on-surface-variant"><T>Kepala Dinas Pendidikan Kota Depok</T></span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm flex flex-col justify-between relative overflow-hidden">
<blockquote className="font-subheading text-[17px] leading-relaxed text-primary font-medium italic mb-6"><T>“Inovatif, Religius, dan Visioner!” Testimoni video pengawas sekolah yang melihat langsung semangat belajar dan budaya positif di SMP Islam Modern Al Fakhir.</T></blockquote>
<div className="flex items-center gap-3.5">
<div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden">
<Img className="w-full h-full object-cover" alt="Pengawas Sekolah" src="/photos/news/testimoni-pengawas-smpi-modern-al-fakhir.webp" />
</div>
<div>
<h5 className="font-headline-sm text-[16px] text-primary font-bold"><T>Rini Setyowati, S.Pd.</T></h5>
<span className="font-caption text-caption text-on-surface-variant"><T>Pengawas Sekolah</T></span>
</div>
</div>
</div>
</div>
</section>

<section className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin pt-6 pb-16">
<div className="bg-primary text-on-primary rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-lg">

<div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
<div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-primary-fixed/10 blur-3xl pointer-events-none"></div>
<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
<div className="lg:col-span-7 flex flex-col gap-5">
<div className="inline-flex items-center gap-2 bg-primary-container px-3.5 py-1.5 rounded-full text-tertiary-fixed font-label-md text-label-md font-bold w-fit">
<span className="material-symbols-outlined text-[16px]">school</span>
<span><T>Penerimaan Siswa Baru (PPDB)</T></span>
</div>
<h3 className="font-headline-lg text-headline-md lg:text-headline-lg text-surface-container-lowest font-bold leading-tight"><T>Ingin Ananda Menjadi Bagian dari Generasi Periset dan Pemimpin Cendekia?</T></h3>
<p className="font-body-md text-body-md text-primary-fixed-dim leading-relaxed"><T>Daftarkan ananda di SMP Islam Modern Al Fakhir Sawangan, Depok melalui pendaftaran online, lalu ikuti observasi calon siswa dan wawancara orang tua.</T></p>
<div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 pt-4">
<SiteLink className="inline-flex items-center justify-center gap-2 bg-secondary-container hover:bg-secondary text-on-secondary px-8 py-4 rounded-full font-label-lg text-label-lg font-bold shadow-md hover:scale-[1.02] transition-all text-center" href="/smp/ppdb">
<span className="material-symbols-outlined text-[20px]">how_to_reg</span>
<span><T>Daftar PPDB SMP</T></span>
</SiteLink>
<a className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-surface-container-lowest hover:text-primary text-surface-container-lowest px-7 py-4 rounded-full font-label-lg text-label-lg font-bold transition-all text-center" href={waLinkFor(contact, "Halo, saya ingin berkonsultasi mengenai minat riset anak saya di SMP Islam Modern Al Fakhir.", "smp")} target="_blank" rel="noopener noreferrer">
<span className="material-symbols-outlined text-[20px]">chat</span>
<span><T>Konsultasi Minat Riset Anak (WhatsApp)</T></span>
</a>
</div>
</div>
<div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-4" aria-hidden="true">
<div className="col-span-2 h-48 rounded-2xl overflow-hidden ring-4 ring-primary-container shadow-xl">
<Img className="w-full h-full object-cover" alt="" src="/photos/news/medali-silver-di-invention-and-innovation-fair-2025.webp" />
</div>
<div className="h-36 rounded-2xl overflow-hidden ring-4 ring-primary-container shadow-xl">
<Img className="w-full h-full object-cover" alt="" src="/photos/news/smp-islam-modern-al-fakhir-raih-medali-emas-di-international-science-innovation-fair-isif-2025-bali.webp" />
</div>
<div className="h-36 rounded-2xl overflow-hidden ring-4 ring-primary-container shadow-xl">
<Img className="w-full h-full object-cover" alt="" src="/photos/news/national-science-and-innovation-fair.webp" />
</div>
</div>
</div>
</div>
</section>

</div></div>
</Scope>
  );
}

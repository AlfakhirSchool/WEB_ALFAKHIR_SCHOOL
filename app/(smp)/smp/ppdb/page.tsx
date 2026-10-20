import type { Metadata } from "next";
import { waLinkFor } from "@/content/settings";
import { getSettings } from "@/lib/content/store";
import { Scope, T } from "@/components/content/T";
import VisitModal from "@/components/pages/smp-ppdb/VisitModal";
import { PpdbBrochureSection, type BrochureEntry } from "@/components/pages/portal-ppdb/PpdbBrochureSection";
import { Img } from "@/components/content/Img";

export const metadata: Metadata = { title: "Biaya & PPDB | SMP Islam Modern Al Fakhir" };
const tdLabel = "before:content-[attr(data-label)] before:block before:mb-0.5 before:font-caption before:text-caption before:font-bold before:uppercase before:tracking-wide before:text-on-surface-variant lg:before:hidden";
const tdPeriod = "col-span-full lg:table-cell lg:py-4 lg:px-4 xl:px-6 lg:min-w-[10rem]";
const tdCell = `block lg:table-cell lg:py-4 lg:px-4 xl:px-6 lg:whitespace-nowrap ${tdLabel}`;
const tdStatus = `block lg:table-cell lg:py-4 lg:px-4 xl:px-6 ${tdLabel}`;

export default async function Page() {
  const { contact, ppdb } = await getSettings();
  const smpBrochureUrl = ppdb.brochureSmp?.url || ppdb.brochurePortal?.url;
  const smpBrochures: BrochureEntry[] = [
    ...(ppdb.brochureSmp ? [{ badge: "PPDB SMP · Kelas 7", brochure: ppdb.brochureSmp }] : []),
    ...(ppdb.brochurePortal ? [{ badge: "Informasi Umum PPDB", brochure: ppdb.brochurePortal }] : []),
  ];
  return (
<Scope id="smp/ppdb">
<div className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]"><div className="flex flex-col w-full">

<section className="w-full bg-primary-container text-on-primary py-2.5 px-margin-mobile md:px-margin-tablet lg:px-margin">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-4 text-center md:text-left">
<div className="flex items-start md:items-center gap-2 justify-center md:justify-start">
<span className="inline-flex w-2.5 h-2.5 mt-1.5 md:mt-0 shrink-0 rounded-full bg-secondary-container animate-pulse"></span>
<span className="font-label-md text-label-md tracking-wide text-balance"><T>PPDB SMP ISLAM MODERN AL FAKHIR: PENDAFTARAN ONLINE, OBSERVASI CALON SISWA &amp; WAWANCARA ORANG TUA</T></span>
</div>
<div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-0.5 font-caption text-caption text-on-primary-container">
<span className="whitespace-nowrap"><T>Seleksi:</T>{" "}<strong><T>Observasi &amp; Wawancara</T></strong></span>
<span aria-hidden="true" className="hidden sm:inline">•</span>
<a className="underline whitespace-nowrap hover:text-surface-container-lowest transition-colors" href={smpBrochureUrl ? "#brosur-ppdb" : "#biaya"}><T>Unduh Tabel Biaya</T></a>
</div>
</div>
</section>

<section className="relative w-full bg-surface-container-lowest py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin overflow-hidden">

<div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-surface-container/60 blur-3xl pointer-events-none"></div>
<div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-2xl pointer-events-none"></div>
<div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-gutter relative z-10">

<div className="w-full lg:w-7/12 flex flex-col gap-space-md">

<div className="inline-flex items-center gap-2 bg-surface-container text-primary font-label-md text-label-md px-3.5 py-1.5 rounded-2xl sm:rounded-full self-start">
<span className="material-symbols-outlined text-[16px] text-tertiary shrink-0">workspace_premium</span>
<span className="text-balance"><T>Penerimaan Peserta Didik Baru &amp; Program Beasiswa · Gelombang 1 &amp; 2</T></span>
</div>

<h1 className="font-display-hero text-headline-lg-mobile sm:text-headline-lg xl:text-display-hero text-primary font-extrabold tracking-tight leading-tight text-balance"><T>Gerbang Menuju Periset Unggul &amp; Pemimpin Berkarakter Qur'ani:</T>{" "}<span className="text-tertiary"><T>Investasi Pendidikan Paling Bernilai.</T></span>
</h1>

<p className="font-body-lg text-body-lg max-sm:text-body-md text-on-surface-variant leading-relaxed text-pretty"><T>SMP Islam Modern Al Fakhir membuka pendaftaran peserta didik baru melalui formulir online, dilanjutkan observasi calon siswa dan wawancara orang tua. Seleksi bertujuan mengenali potensi ananda sejak awal dan menyelaraskan visi bersama orang tua.</T></p>

<div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-space-sm pt-2">
<a className="bg-primary text-on-primary hover:bg-primary-container px-7 py-3.5 rounded-full font-label-lg text-label-lg max-sm:text-label-md font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center" href="#jalur-seleksi">
<span className="material-symbols-outlined text-[20px]">how_to_reg</span>
<span><T>Daftar Akun PPDB Sekarang</T></span>
</a>
<a className="bg-surface-container text-primary hover:bg-surface-container-high px-6 py-3.5 rounded-full font-label-lg text-label-lg max-sm:text-label-md font-bold transition-all flex items-center justify-center gap-2 text-center" href={smpBrochureUrl ? "#brosur-ppdb" : "#biaya"}>
<span className="material-symbols-outlined text-[20px]">download</span>
<span><T>Unduh Panduan &amp; Brosur Biaya (PDF)</T></span>
</a>
</div>

<div className="flex items-start gap-2 text-on-surface-variant font-caption text-caption pt-1">
<span className="material-symbols-outlined text-secondary-container text-[18px] shrink-0">verified</span>
<span className="text-pretty"><strong><T>Tersedia Gelombang 1 &amp; Gelombang 2</T></strong>{" "}<T>(Keuntungan Early Bird Potongan Uang Pangkal Rp 3.000.000)</T></span>
</div>
</div>

<div className="w-full lg:w-5/12 flex flex-col gap-4">
<div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-low p-2">
<Img className="w-full h-64 sm:h-80 object-cover rounded-xl" alt="Siswa SMP Islam Modern Al Fakhir belajar sains di laboratorium" src="/design/smp-ppdb/01.jpg" />
<div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/95 backdrop-blur-md p-3 sm:p-4 rounded-xl flex items-center justify-between gap-3 shadow-sm">
<div className="flex items-center gap-3 min-w-0">
<div className="hidden sm:flex lg:hidden xl:flex w-10 h-10 shrink-0 rounded-full bg-primary text-on-primary items-center justify-center">
<span className="material-symbols-outlined text-[20px]">biotech</span>
</div>
<div>
<p className="font-headline-sm text-body-sm font-bold text-primary"><T>Lab IPA &amp; Lab Komputer</T></p>
<p className="font-caption text-caption text-on-surface-variant"><T>Fasilitas belajar sekolah</T></p>
</div>
</div>
<span className="font-label-md text-label-md bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-1 rounded-full font-bold whitespace-nowrap shrink-0"><T>Visitasi Nov 2025</T></span>
</div>
</div>

<div className="grid grid-cols-2 gap-3">
<div className="bg-surface-container-low p-3.5 rounded-xl flex items-start gap-2.5">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">group</span>
<div>
<p className="font-label-lg text-label-md font-bold text-primary"><T>Tablet Belajar</T></p>
<p className="font-caption text-caption text-on-surface-variant"><T>Untuk siswa baru</T></p>
</div>
</div>
<div className="bg-surface-container-low p-3.5 rounded-xl flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">award_star</span>
<div>
<p className="font-label-lg text-label-md font-bold text-primary"><T>Program Beasiswa</T></p>
<p className="font-caption text-caption text-on-surface-variant"><T>Tanya panitia PPDB</T></p>
</div>
</div>
<div className="bg-surface-container-low p-3.5 rounded-xl flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">shield</span>
<div>
<p className="font-label-lg text-label-md font-bold text-primary"><T>AEP Siswa Baru</T></p>
<p className="font-caption text-caption text-on-surface-variant"><T>Orientasi lima hari</T></p>
</div>
</div>
<div className="bg-surface-container-low p-3.5 rounded-xl flex items-start gap-2.5">
<span className="material-symbols-outlined text-primary-container text-[20px] shrink-0 mt-0.5">psychology</span>
<div>
<p className="font-label-lg text-label-md font-bold text-primary"><T>Research Class</T></p>
<p className="font-caption text-caption text-on-surface-variant"><T>Belajar metodologi riset</T></p>
</div>
</div>
</div>
</div>
</div>
</section>

<PpdbBrochureSection items={smpBrochures} className="bg-surface-container-low" />

<section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin" id="jalur-seleksi">
<div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
<div className="text-center max-w-3xl mx-auto flex flex-col gap-2">
<span className="font-caption text-caption uppercase text-tertiary font-bold tracking-widest"><T>PILIHAN STRATEGIS</T></span>
<h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-bold"><T>Tiga Jalur Masuk Berkelanjutan</T></h2>
<p className="font-body-md text-body-md text-on-surface-variant"><T>Dirancang untuk memfasilitasi berbagai ragam potensi: baik siswa penghafal Qur'an, talenta riset &amp; sains, maupun calon pembelajar beradab tinggi.</T></p>
</div>
<div className="grid grid-cols-1 xl:grid-cols-3 xl:grid-rows-[repeat(6,auto)] gap-gutter xl:gap-y-0 items-stretch">

<div className="bg-surface-container-lowest rounded-2xl p-6 shadow-md flex flex-col relative overflow-hidden xl:row-span-6 xl:grid xl:grid-rows-subgrid">
<div className="absolute top-0 left-0 right-0 h-2 bg-tertiary"></div>
<div className="flex items-center justify-between gap-2 mb-4">
<span className="font-caption text-caption font-bold uppercase tracking-wider text-tertiary bg-tertiary-fixed/60 px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">stars</span><T>Jalur Prestasi Emas</T></span>
<span className="font-label-md text-label-md font-bold text-on-surface-variant"><T>Kuota: 10 Siswa</T></span>
</div>
<h3 className="font-headline-md text-headline-sm lg:text-headline-md text-primary font-bold mb-2"><T>Beasiswa Penuh Cendekiawan Muda</T></h3>
<p className="font-caption text-caption text-tertiary font-semibold mb-3"><T>100% Full Scholarship Al Fakhir</T></p>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed"><T>Pembebasan 100% biaya pendaftaran, uang pangkal, SPP bulanan selama 3 tahun penuh, serta subsidi dana riset Karya Tulis Ilmiah (KTI) tahunan.</T></p>
<div className="bg-surface-container-low p-4 rounded-xl mb-4 flex flex-col gap-2">
<p className="font-label-md text-label-md font-bold text-primary"><T>Kriteria Utama Calon Penerima:</T></p>
<ul className="flex flex-col gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-tertiary text-[16px] mt-1 shrink-0">check_circle</span>
<span><T>Memiliki hafalan Al-Qur'an min. 3 Juz mutqin bersanad/teruji</T></span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-tertiary text-[16px] mt-1 shrink-0">check_circle</span>
<span><T>ATAU Medalis Olimpiade Sains / Robotika / O2SN min. tingkat Kota/Nasional</T></span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-tertiary text-[16px] mt-1 shrink-0">check_circle</span>
<span><T>Lolos observasi calon siswa &amp; wawancara orang tua</T></span>
</li>
</ul>
</div>
<div className="pt-4 flex flex-col gap-2">
<a className="w-full text-center bg-tertiary text-on-tertiary hover:bg-tertiary-container py-3 rounded-full font-label-lg text-label-lg font-bold transition-colors shadow-sm" href={waLinkFor(contact, "Halo Tim PPDB SMP Al Fakhir, saya ingin mengetahui syarat dan mendaftar Jalur Beasiswa Penuh Cendekiawan Muda.", "smp")} target="_blank" rel="noopener noreferrer"><T>Syarat &amp; Daftar Jalur Beasiswa</T></a>
<span className="text-center font-caption text-caption text-on-surface-variant"><T>Khusus Gelombang 1 &amp; 2</T></span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl p-6 shadow-md flex flex-col relative overflow-hidden xl:row-span-6 xl:grid xl:grid-rows-subgrid">
<div className="absolute top-0 left-0 right-0 h-2 bg-primary"></div>
<div className="flex items-center justify-between gap-2 mb-4">
<span className="font-caption text-caption font-bold uppercase tracking-wider text-primary bg-surface-container px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">psychology_alt</span><T>Jalur Fast Track</T></span>
<span className="font-label-md text-label-md font-bold text-secondary"><T>Diskon s.d 50%</T></span>
</div>
<h3 className="font-headline-md text-headline-sm lg:text-headline-md text-primary font-bold mb-2"><T>Prestasi Akademik &amp; Talenta Riset</T></h3>
<p className="font-caption text-caption text-primary font-semibold mb-3"><T>Portofolio Rapor &amp; Bakat Unggulan</T></p>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed"><T>Jalur percepatan seleksi berbasis portofolio nilai rapor (rata-rata min. 85), sertifikat kejuaraan non-akademik, pidato bahasa asing, atau karya inovasi awal.</T></p>
<div className="bg-surface-container-low p-4 rounded-xl mb-4 flex flex-col gap-2">
<p className="font-label-md text-label-md font-bold text-primary"><T>Benefit &amp; Fasilitas Khusus:</T></p>
<ul className="flex flex-col gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[16px] mt-1 shrink-0">check_circle</span>
<span><T>Keringanan uang pangkal sarana pembelajaran 25% hingga 50%</T></span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[16px] mt-1 shrink-0">check_circle</span>
<span><T>Prioritas pemetaan Research Class &amp; pendampingan karya siswa</T></span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[16px] mt-1 shrink-0">check_circle</span>
<span><T>Bebas tes tertulis akademik; fokus observasi portofolio &amp; wawancara</T></span>
</li>
</ul>
</div>
<div className="pt-4 flex flex-col gap-2">
<a className="w-full text-center bg-primary text-on-primary hover:bg-primary-container py-3 rounded-full font-label-lg text-label-lg font-bold transition-colors shadow-sm" href={waLinkFor(contact, "Halo Tim PPDB SMP Al Fakhir, saya ingin mendaftar Jalur Fast Track (Prestasi Akademik & Talenta Riset).", "smp")} target="_blank" rel="noopener noreferrer"><T>Daftar Jalur Prestasi</T></a>
<span className="text-center font-caption text-caption text-on-surface-variant"><T>Seleksi berkas berlangsung 3 hari kerja</T></span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl p-6 shadow-md flex flex-col relative overflow-hidden xl:row-span-6 xl:grid xl:grid-rows-subgrid">
<div className="absolute top-0 left-0 right-0 h-2 bg-secondary-container"></div>
<div className="flex items-center justify-between gap-2 mb-4">
<span className="font-caption text-caption font-bold uppercase tracking-wider text-secondary bg-secondary-fixed/50 px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">school</span><T>Jalur Umum &amp; Afiliasi</T></span>
<span className="font-label-md text-label-md font-bold text-primary"><T>Terbuka Umum</T></span>
</div>
<h3 className="font-headline-md text-headline-sm lg:text-headline-md text-primary font-bold mb-2"><T>Jalur Reguler &amp; Afiliasi Alumni</T></h3>
<p className="font-caption text-caption text-secondary font-semibold mb-3"><T>Fondasi Adab &amp; Karakter Mandiri</T></p>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed"><T>Terbuka untuk seluruh lulusan SD/MI sederajat dengan seleksi observasi calon siswa dan wawancara orang tua, serta prioritas khusus bagi alumni SD Al Fakhir.</T></p>
<div className="bg-surface-container-low p-4 rounded-xl mb-4 flex flex-col gap-2">
<p className="font-label-md text-label-md font-bold text-primary"><T>Fasilitas Jalur Afiliasi &amp; Reguler:</T></p>
<ul className="flex flex-col gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary text-[16px] mt-1 shrink-0">check_circle</span>
<span><T>Bebas tes observasi dasar khusus alumni SD Islam Modern Al Fakhir</T></span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary text-[16px] mt-1 shrink-0">check_circle</span>
<span><T>Early bird benefit diskon sarana Rp 3.000.000 pada Gelombang 1</T></span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary text-[16px] mt-1 shrink-0">check_circle</span>
<span><T>Mengikuti AEP (Al Fakhir Enrichment Program), orientasi siswa baru, sebelum KBM</T></span>
</li>
</ul>
</div>
<div className="pt-4 flex flex-col gap-2">
<a className="w-full text-center bg-surface-container text-primary hover:bg-surface-container-high py-3 rounded-full font-label-lg text-label-lg font-bold transition-colors" href={waLinkFor(contact, "Halo Tim PPDB SMP Al Fakhir, saya ingin mendaftar Jalur Reguler & Afiliasi Alumni.", "smp")} target="_blank" rel="noopener noreferrer"><T>Daftar Jalur Reguler</T></a>
<span className="text-center font-caption text-caption text-on-surface-variant"><T>Tersedia cicilan biaya 3x tanpa bunga</T></span>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface-container-lowest py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
<div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
<div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
<div>
<span className="font-caption text-caption uppercase text-primary-container font-bold tracking-widest"><T>SISTEMATIKA PENDAFTARAN</T></span>
<h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-bold"><T>Alur Seleksi 5 Tahap Terpadu</T></h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant md:max-w-md text-pretty"><T>Calon siswa dikenali potensinya lewat observasi, dan orang tua dilibatkan lewat wawancara sebagai mitra pendidikan.</T></p>
</div>

<div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-5 md:grid-rows-[repeat(8,auto)] xl:grid-rows-[repeat(4,auto)] gap-4 md:gap-y-0">

<div className="bg-surface-container-low rounded-xl p-5 flex flex-col group hover:bg-surface-container transition-colors md:col-span-2 xl:col-span-1 md:row-span-4 md:grid md:grid-rows-subgrid">
<span className="font-headline-lg text-headline-lg font-extrabold text-primary-container/20 group-hover:text-primary transition-colors mb-3"><T>01</T></span>
<h4 className="font-headline-sm text-body-lg leading-snug font-bold text-primary mb-3"><T>Pendaftaran Online</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Mengisi formulir online di situs sekolah: nama lengkap, no. HP, jenis kelamin, tanggal &amp; tempat lahir, NIK, dan NISN.</T></p>
<div className="pt-4 flex items-center gap-1.5 text-primary font-caption text-caption font-bold">
<span className="material-symbols-outlined text-[16px]">cloud_upload</span>
<span><T>Via Situs Resmi Sekolah</T></span>
</div>
</div>

<div className="bg-surface-container-low rounded-xl p-5 flex flex-col group hover:bg-surface-container transition-colors md:col-span-2 xl:col-span-1 md:row-span-4 md:grid md:grid-rows-subgrid">
<span className="font-headline-lg text-headline-lg font-extrabold text-primary-container/20 group-hover:text-primary transition-colors mb-3"><T>02</T></span>
<h4 className="font-headline-sm text-body-lg leading-snug font-bold text-primary mb-3"><T>Observasi Calon Siswa</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Calon siswa mengerjakan tes observasi di ruang kelas sebagai pemetaan kemampuan awal.</T></p>
<div className="pt-4 flex items-center gap-1.5 text-primary font-caption text-caption font-bold">
<span className="material-symbols-outlined text-[16px]">psychology</span>
<span><T>Tatap Muka di Sekolah</T></span>
</div>
</div>

<div className="bg-surface-container-low rounded-xl p-5 flex flex-col group hover:bg-surface-container transition-colors md:col-span-2 xl:col-span-1 md:row-span-4 md:grid md:grid-rows-subgrid">
<span className="font-headline-lg text-headline-lg font-extrabold text-primary-container/20 group-hover:text-primary transition-colors mb-3"><T>03</T></span>
<h4 className="font-headline-sm text-body-lg leading-snug font-bold text-primary mb-3"><T>Wawancara Orang Tua</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Orang tua mengisi formulir wawancara, lalu berdiskusi dengan tim guru tentang kesiapan mendukung pendidikan anak.</T></p>
<div className="pt-4 flex items-center gap-1.5 text-primary font-caption text-caption font-bold">
<span className="material-symbols-outlined text-[16px]">menu_book</span>
<span><T>Bersama Tim Guru</T></span>
</div>
</div>

<div className="bg-surface-container-low rounded-xl p-5 flex flex-col group hover:bg-surface-container transition-colors md:col-span-3 xl:col-span-1 md:mt-4 xl:mt-0 md:row-span-4 md:grid md:grid-rows-subgrid">
<span className="font-headline-lg text-headline-lg font-extrabold text-primary-container/20 group-hover:text-primary transition-colors mb-3"><T>04</T></span>
<h4 className="font-headline-sm text-body-lg leading-snug font-bold text-primary mb-3"><T>Pengukuran Seragam</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Pengukuran seragam dilakukan pada hari pelaksanaan observasi, bersama pengenalan sekolah dan program unggulan.</T></p>
<div className="pt-4 flex items-center gap-1.5 text-primary font-caption text-caption font-bold">
<span className="material-symbols-outlined text-[16px]">handshake</span>
<span><T>Pada Hari Observasi</T></span>
</div>
</div>

<div className="bg-primary text-on-primary rounded-xl p-5 flex flex-col shadow-md md:col-span-3 xl:col-span-1 md:mt-4 xl:mt-0 md:row-span-4 md:grid md:grid-rows-subgrid">
<span className="font-headline-lg text-headline-lg font-extrabold text-primary-fixed/40 mb-3"><T>05</T></span>
<h4 className="font-headline-sm text-body-lg leading-snug font-bold text-surface-container-lowest mb-3"><T>Pengumuman Hasil Observasi</T></h4>
<p className="font-body-sm text-body-sm text-on-primary-container"><T>Hasil observasi diumumkan lewat menu Pengumuman di situs sekolah, misalnya Hasil Observasi Gel.1 dan Gel.2.</T></p>
<div className="pt-4 flex items-center gap-1.5 text-tertiary-fixed font-caption text-caption font-bold">
<span className="material-symbols-outlined text-[16px]">rocket_launch</span>
<span><T>Siap Menjadi Siswa Al Fakhir</T></span>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin" id="biaya">
<div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
<div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-2">
<span className="font-caption text-caption uppercase text-tertiary font-bold tracking-widest"><T>AKUNTABILITAS &amp; INTEGRITAS</T></span>
<h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-bold"><T>Transparansi Investasi Pendidikan</T></h2>
<p className="font-body-md text-body-md text-on-surface-variant"><T>Semua komponen dijabarkan lugas. Al Fakhir memberlakukan sistem</T>{" "}<em><T>Fixed Cost Assurance</T></em>{" "}<T>tanpa pungutan uang bangku, iuran praktikum berkala, atau kenaikan SPP sepihak.</T></p>
</div>

<div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">

<div className="xl:col-span-8 flex flex-col gap-3">

<div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-transparent">
<div className="flex items-start gap-3.5">
<div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">description</span>
</div>
<div>
<h4 className="font-headline-sm text-body-md leading-snug mb-0.5 font-bold text-primary"><T>Biaya Formulir &amp; Observasi Calon Siswa</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Meliputi pendaftaran online, tes observasi calon siswa, dan wawancara orang tua.</T></p>
</div>
</div>
<div className="text-right sm:shrink-0">
<span className="font-headline-sm text-body-lg font-bold text-primary"><T>Rp 450.000</T></span>
<p className="font-caption text-caption text-on-surface-variant"><T>Sekali saat mendaftar</T></p>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-primary">
<div className="flex items-start gap-3.5">
<div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">apartment</span>
</div>
<div>
<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
<h4 className="font-headline-sm text-body-md leading-snug mb-0.5 font-bold text-primary"><T>Uang Pangkal / Sarana Pembelajaran</T></h4>
<span className="bg-tertiary-fixed text-on-tertiary-fixed text-[12px] leading-none whitespace-nowrap font-bold px-2 py-1 rounded"><T>Berlaku 3 Tahun</T></span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Investasi sarana lab IPA, lab komputer, ruang kelas ber-AC, dan perpustakaan.</T></p>
</div>
</div>
<div className="text-right sm:shrink-0">
<span className="font-headline-sm text-body-lg font-bold text-primary"><T>Rp 22.500.000</T></span>
<p className="font-caption text-caption text-secondary font-bold"><T>Early Bird: Rp 19.500.000</T></p>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-transparent">
<div className="flex items-start gap-3.5">
<div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">checkroom</span>
</div>
<div>
<h4 className="font-headline-sm text-body-md leading-snug mb-0.5 font-bold text-primary"><T>Paket Seragam Siswa Lengkap</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Seragam sekolah lengkap termasuk pramuka &amp; olahraga; ukuran diambil saat pengukuran seragam.</T></p>
</div>
</div>
<div className="text-right sm:shrink-0">
<span className="font-headline-sm text-body-lg font-bold text-primary"><T>Rp 2.250.000</T></span>
<p className="font-caption text-caption text-on-surface-variant"><T>Pengukuran saat hari observasi</T></p>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-transparent">
<div className="flex items-start gap-3.5">
<div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">auto_stories</span>
</div>
<div>
<h4 className="font-headline-sm text-body-md leading-snug mb-0.5 font-bold text-primary"><T>Buku Pelajaran &amp; Modul Riset (1 Tahun)</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Buku teks Kurikulum Merdeka, akses LMS sekolah, dan panduan metodologi riset.</T></p>
</div>
</div>
<div className="text-right sm:shrink-0">
<span className="font-headline-sm text-body-lg font-bold text-primary"><T>Rp 1.850.000</T></span>
<p className="font-caption text-caption text-on-surface-variant"><T>Per tahun ajaran</T></p>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-transparent">
<div className="flex items-start gap-3.5">
<div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">payments</span>
</div>
<div>
<h4 className="font-headline-sm text-body-md leading-snug mb-0.5 font-bold text-primary"><T>SPP Bulanan (All-Inclusive)</T></h4>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Termasuk pembelajaran di kelas ber-AC, Lab IPA &amp; Lab Komputer, serta ekskul wajib Pramuka.</T></p>
</div>
</div>
<div className="text-right sm:shrink-0">
<span className="font-headline-sm text-body-lg font-bold text-primary"><T>Rp 1.650.000</T></span>
<p className="font-caption text-caption text-on-surface-variant"><T>Per bulan (mulai Juli 2027)</T></p>
</div>
</div>
</div>

<div className="xl:col-span-4 flex flex-col gap-4">

<div className="bg-primary text-on-primary p-6 rounded-2xl shadow-md flex flex-col gap-4">
<div className="flex items-center gap-2 text-tertiary-fixed">
<span className="material-symbols-outlined text-[24px]">verified_user</span>
<h3 className="font-headline-sm text-headline-sm font-bold text-surface-container-lowest"><T>Garansi Finansial Al Fakhir School</T></h3>
</div>
<p className="font-body-sm text-body-sm text-primary-fixed-dim leading-relaxed"><T>"Tidak ada uang bangku siluman, tidak ada iuran daftar ulang saat naik kelas 8 dan 9, serta gratis pemakaian Lab IPA dan Lab Komputer selama 3 tahun pendidikan."</T></p>
<div className="h-px bg-primary-container"></div>
<div className="flex flex-col gap-2 font-caption text-caption text-surface-container-low">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-tertiary-fixed">done_all</span>
<span><T>Termasuk asuransi kecelakaan siswa selama KBM</T></span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-tertiary-fixed">done_all</span>
<span><T>Audit keuangan berkala bersertifikat WTP</T></span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col gap-3">
<h4 className="font-headline-sm text-body-lg font-bold text-primary"><T>Skema Pembayaran Fleksibel</T></h4>
<div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
<span className="font-label-md text-label-md font-bold text-primary"><T>Opsi A: Lunas Tunai Sekaligus</T></span>
<p className="font-caption text-caption text-on-surface-variant"><T>Mendapatkan potongan ekstra langsung sebesar</T>{" "}<strong><T>Rp 1.500.000</T></strong>{" "}<T>dari total uang pangkal.</T></p>
</div>
<div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
<span className="font-label-md text-label-md font-bold text-primary"><T>Opsi B: Cicilan 3x Tanpa Bunga</T></span>
<div className="grid grid-cols-3 gap-1 pt-1 font-caption text-caption text-center">
<div className="bg-surface-container-lowest py-1.5 rounded"><T>Tahap 1: 50%</T></div>
<div className="bg-surface-container-lowest py-1.5 rounded"><T>Tahap 2: 25%</T></div>
<div className="bg-surface-container-lowest py-1.5 rounded"><T>Tahap 3: 25%</T></div>
</div>
<p className="font-caption text-caption text-on-surface-variant mt-1"><T>Dicicil hingga H-7 masuk sekolah.</T></p>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface-container-lowest py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
<div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
<div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
<div>
<span className="font-caption text-caption uppercase text-tertiary font-bold tracking-widest"><T>KESIAPAN ADMINISTRASI</T></span>
<h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-bold"><T>Kriteria Calon Siswa &amp; Data Pendaftaran</T></h2>
</div>
<span className="font-caption text-caption text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full whitespace-nowrap"><T>Pendaftaran melalui formulir online sekolah</T></span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

<div className="bg-surface-container-low p-6 rounded-2xl flex flex-col gap-4">
<div className="flex items-center gap-2.5 text-primary">
<span className="material-symbols-outlined text-[24px]">person_check</span>
<h3 className="font-headline-sm text-headline-sm font-bold"><T>Kriteria Calon Siswa</T></h3>
</div>
<div className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
<div className="flex items-start gap-3 bg-surface-container-lowest p-3.5 rounded-xl">
<span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">done</span>
<span><T>Lulus SD/MI/sederajat atau saat ini duduk di bangku kelas 6 dengan usia maksimal 15 tahun per Juli 2027.</T></span>
</div>
<div className="flex items-start gap-3 bg-surface-container-lowest p-3.5 rounded-xl">
<span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">done</span>
<span><T>Memiliki integritas adab yang baik, tidak merokok/vaping, dan bersedia menaati tata tertib adab Islami.</T></span>
</div>
<div className="flex items-start gap-3 bg-surface-container-lowest p-3.5 rounded-xl">
<span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">done</span>
<span><T>Memiliki minat dan rasa ingin tahu tinggi terhadap sains, eksplorasi riset sains, atau hafalan Al-Qur'an.</T></span>
</div>
<div className="flex items-start gap-3 bg-surface-container-lowest p-3.5 rounded-xl">
<span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">done</span>
<span><T>Bersedia mengikuti program fullday terintegrasi halaqah hingga pukul 16.00 WIB.</T></span>
</div>
</div>
</div>

<div className="bg-surface-container-low p-6 rounded-2xl flex flex-col gap-4">
<div className="flex items-center gap-2.5 text-primary">
<span className="material-symbols-outlined text-[24px]">folder_copy</span>
<h3 className="font-headline-sm text-headline-sm font-bold"><T>Data Formulir Pendaftaran Online</T></h3>
</div>
<div className="grid grid-cols-1 gap-3">
<div className="bg-surface-container-lowest p-3 rounded-xl flex items-center gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px]">check_box</span>
<span className="font-body-sm text-body-sm font-medium text-on-surface"><T>Nama Lengkap Calon Siswa</T></span>
</div>
<div className="bg-surface-container-lowest p-3 rounded-xl flex items-center gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px]">check_box</span>
<span className="font-body-sm text-body-sm font-medium text-on-surface"><T>Nomor HP Aktif</T></span>
</div>
<div className="bg-surface-container-lowest p-3 rounded-xl flex items-center gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px]">check_box</span>
<span className="font-body-sm text-body-sm font-medium text-on-surface"><T>Jenis Kelamin</T></span>
</div>
<div className="bg-surface-container-lowest p-3 rounded-xl flex items-center gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px]">check_box</span>
<span className="font-body-sm text-body-sm font-medium text-on-surface"><T>Tanggal &amp; Tempat Lahir</T></span>
</div>
<div className="bg-surface-container-lowest p-3 rounded-xl flex items-center gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px]">check_box</span>
<span className="font-body-sm text-body-sm font-medium text-on-surface"><T>NIK (Nomor Induk Kependudukan)</T></span>
</div>
<div className="bg-surface-container-lowest p-3 rounded-xl flex items-center gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px]">check_box</span>
<span className="font-body-sm text-body-sm font-medium text-on-surface"><T>NISN (Nomor Induk Siswa Nasional)</T></span>
</div>
</div>
<div className="bg-surface-container p-3 rounded-xl flex items-center gap-2 text-on-surface-variant font-caption text-caption mt-auto">
<span className="material-symbols-outlined text-primary text-[16px]">info</span>
<span><T>Siapkan NIK dan NISN calon siswa sebelum mengisi formulir pendaftaran online.</T></span>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
<div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
<div className="text-center max-w-3xl mx-auto flex flex-col gap-2">
<span className="font-caption text-caption uppercase text-primary font-bold tracking-widest"><T>TIMELINE SELEKSI</T></span>
<h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-bold"><T>Jadwal &amp; Linimasa PPDB</T></h2>
<p className="font-body-md text-body-md text-on-surface-variant"><T>Berikut jadwal observasi yang pernah berlangsung dan pengumuman gelombang terbaru. Jadwal gelombang berikutnya diinformasikan oleh sekolah.</T></p>
</div>

<div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden lg:overflow-x-auto">
<table className="block lg:table w-full text-left font-body-sm text-body-sm">
<thead className="hidden lg:table-header-group bg-primary text-on-primary font-label-md text-label-md uppercase">
<tr>
<th className="py-4 px-4 xl:px-6"><T>Gelombang / Periode</T></th>
<th className="py-4 px-4 xl:px-6"><T>Masa Pendaftaran</T></th>
<th className="py-4 px-4 xl:px-6"><T>Pelaksanaan Tes Seleksi</T></th>
<th className="py-4 px-4 xl:px-6"><T>Pengumuman Kelulusan</T></th>
<th className="py-4 px-4 xl:px-6"><T>Status</T></th>
</tr>
</thead>
<tbody className="block lg:table-row-group divide-y divide-surface-container text-on-surface">

<tr className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 p-5 lg:table-row lg:p-0 bg-surface-container-low/50 font-medium">
<td className={tdPeriod}>
<div className="flex items-start lg:items-center gap-2">
<span className="w-2.5 h-2.5 mt-1.5 lg:mt-0 shrink-0 rounded-full bg-secondary-container"></span>
<span className="font-bold text-primary"><T>Observasi &amp; Wawancara TA 2025/2026</T></span>
</div>
</td>
<td data-label="Masa Pendaftaran" className={tdCell}><T>Pendaftaran online</T></td>
<td data-label="Tes Seleksi" className={tdCell}><T>8 Februari 2025</T></td>
<td data-label="Pengumuman" className={tdCell}><T>Menu Pengumuman</T></td>
<td data-label="Status" className={tdStatus}>
<span className="inline-flex items-center bg-secondary text-on-secondary px-2.5 py-1 rounded-full text-caption leading-none font-bold whitespace-nowrap"><T>Telah Berlangsung</T></span>
</td>
</tr>

<tr className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 p-5 lg:table-row lg:p-0">
<td className={tdPeriod}>
<span className="font-bold text-primary"><T>Gelombang Kedua TA 2025/2026</T></span>
</td>
<td data-label="Masa Pendaftaran" className={tdCell}><T>Pendaftaran online</T></td>
<td data-label="Tes Seleksi" className={tdCell}><T>21 Juni 2025</T></td>
<td data-label="Pengumuman" className={tdCell}><T>Menu Pengumuman</T></td>
<td data-label="Status" className={tdStatus}>
<span className="inline-flex items-center bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-full text-caption leading-none font-semibold whitespace-nowrap"><T>Telah Berlangsung</T></span>
</td>
</tr>

<tr className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 p-5 lg:table-row lg:p-0">
<td className={tdPeriod}>
<span className="font-bold text-primary"><T>Gelombang 1 &amp; 2 Tahun 2026</T></span>
</td>
<td data-label="Masa Pendaftaran" className={tdCell}><T>Pendaftaran online</T></td>
<td data-label="Tes Seleksi" className={tdCell}><T>Jadwal via panitia</T></td>
<td data-label="Pengumuman" className={tdCell}><T>Menu Pengumuman</T></td>
<td data-label="Status" className={tdStatus}>
<span className="inline-flex items-center bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-full text-caption leading-none font-semibold whitespace-nowrap"><T>Cek Pengumuman</T></span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>

<section className="w-full bg-surface-container-lowest py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-12 items-start">
<div className="lg:col-span-4 lg:sticky lg:top-28 text-center lg:text-left flex flex-col gap-2">
<span className="font-caption text-caption uppercase text-tertiary font-bold tracking-widest"><T>KONSULTASI PERTANYAAN</T></span>
<h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-bold"><T>Frequently Asked Questions</T></h2>
<p className="font-body-md text-body-md text-on-surface-variant"><T>Jawaban lugas atas hal-hal yang paling sering ditanyakan oleh calon orang tua/wali siswa.</T></p>
<div className="hidden lg:flex flex-col gap-3 mt-6 bg-surface-container-low p-5 rounded-2xl">
<span className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">support_agent</span></span>
<p className="font-body-sm text-body-sm text-on-surface-variant"><T>Belum menemukan jawaban yang dicari? Tanyakan langsung kepada tim PPDB kami.</T></p>
<a className="inline-flex items-center gap-1.5 font-label-md text-label-md font-bold text-primary hover:text-secondary transition-colors w-fit" href="#kontak-konselor">
<span><T>Hubungi Tim PPDB</T></span>
<span className="material-symbols-outlined text-[18px]">arrow_downward</span>
</a>
</div>
</div>
<div className="lg:col-span-8 flex flex-col gap-3">

<details className="group bg-surface-container-low rounded-xl p-5 open:bg-surface-container transition-all" open>
<summary className="flex items-center justify-between gap-4 cursor-pointer font-headline-sm text-body-lg font-bold text-primary list-none">
<span><T>Apakah siswa yang belum pernah ikut lomba sains tetap bisa diterima?</T></span>
<span className="material-symbols-outlined shrink-0 group-open:rotate-180 transition-transform text-primary">expand_more</span>
</summary>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-3 leading-relaxed"><T>Sangat bisa! Jalur Reguler terbuka lebar untuk ananda yang memiliki motivasi belajar tinggi. Kami percaya bahwa potensi riset dan nalar kritis dapat dibina dan dikembangkan melalui lingkungan laboratorium Al Fakhir yang suportif sejak kelas 7.</T></p>
</details>

<details className="group bg-surface-container-low rounded-xl p-5 open:bg-surface-container transition-all">
<summary className="flex items-center justify-between gap-4 cursor-pointer font-headline-sm text-body-lg font-bold text-primary list-none">
<span><T>Bagaimana proses seleksi calon siswa?</T></span>
<span className="material-symbols-outlined shrink-0 group-open:rotate-180 transition-transform text-primary">expand_more</span>
</summary>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-3 leading-relaxed"><T>Seleksi terdiri dari observasi calon siswa, yaitu tes pemetaan kemampuan awal, dan wawancara orang tua dengan tim guru untuk menggali kesiapan mendukung pendidikan anak serta menyamakan persepsi tentang nilai-nilai sekolah.</T></p>
</details>

<details className="group bg-surface-container-low rounded-xl p-5 open:bg-surface-container transition-all">
<summary className="flex items-center justify-between gap-4 cursor-pointer font-headline-sm text-body-lg font-bold text-primary list-none">
<span><T>Apakah SMP Al Fakhir menganut sistem boarding atau sekolah harian?</T></span>
<span className="material-symbols-outlined shrink-0 group-open:rotate-180 transition-transform text-primary">expand_more</span>
</summary>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-3 leading-relaxed"><T>SMP Islam Modern Al Fakhir Sawangan menyelenggarakan sistem</T>{" "}<em><T>sekolah harian (day school)</T></em>{" "}<T>dan bukan boarding. Siswa belajar, beribadah, serta mengikuti ekstrakurikuler di sekolah pada hari sekolah, lalu pulang ke rumah.</T></p>
</details>

<details className="group bg-surface-container-low rounded-xl p-5 open:bg-surface-container transition-all">
<summary className="flex items-center justify-between gap-4 cursor-pointer font-headline-sm text-body-lg font-bold text-primary list-none">
<span><T>Bagaimana mekanisme beasiswa 100% dipertahankan selama 3 tahun?</T></span>
<span className="material-symbols-outlined shrink-0 group-open:rotate-180 transition-transform text-primary">expand_more</span>
</summary>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-3 leading-relaxed"><T>Penerima Beasiswa Penuh Cendekiawan Muda menjalani evaluasi tahunan dengan standar yang terjangkau: menjaga ketertiban adab siswa, mempertahankan rata-rata nilai akademik minimal 80, serta menyelesaikan proyek karya tulis ilmiah siswa tepat waktu sesuai tahapan riset.</T></p>
</details>
</div>
</div>
</section>

<section className="w-full bg-primary text-on-primary py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin relative overflow-hidden" id="kontak-konselor">
<div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-tertiary/20 blur-3xl pointer-events-none"></div>
<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-gutter relative z-10">
<div className="flex flex-col gap-3 text-center md:text-left">
<div className="inline-flex items-center gap-2 text-tertiary-fixed font-label-md text-label-md font-bold self-center md:self-start">
<span className="material-symbols-outlined text-[18px]">support_agent</span>
<span><T>LAYANAN KONSULTASI PPDB</T></span>
</div>
<h2 className="font-headline-lg text-headline-md lg:text-headline-lg font-bold text-surface-container-lowest leading-tight"><T>Konsultasikan Pendaftaran Ananda Bersama Tim PPDB Kami</T></h2>
<p className="font-body-md text-body-md text-primary-fixed-dim max-w-xl"><T>Kunjungi sekolah kami di Sawangan, Depok, rasakan langsung suasana belajar di Lab IPA, Lab Komputer, dan perpustakaan, serta tanyakan seputar observasi dan wawancara kepada tim PPDB.</T></p>
</div>
<div className="flex flex-col w-full sm:w-auto gap-3 shrink-0">
<a className="bg-secondary-container text-on-primary hover:bg-secondary px-8 py-4 rounded-full font-label-lg text-label-lg font-bold transition-all shadow-md flex items-center justify-center gap-2" href={waLinkFor(contact, "Halo Tim PPDB SMP Al Fakhir, saya ingin konsultasi seputar penerimaan siswa baru", "smp")} rel="noopener noreferrer" target="_blank">
<span className="material-symbols-outlined text-[20px]">chat</span>
<span><T>Chat Tim PPDB via WhatsApp</T></span>
</a>
<VisitModal />
</div>
</div>
</section>

</div></div>
</Scope>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteLink } from "@/components/SiteTransition";
import { Scope, T } from "@/components/content/T";
import { PpdbForm } from "@/components/pages/sd-ppdb/PpdbForm";
import { PpdbBrochureSection, type BrochureEntry } from "@/components/pages/portal-ppdb/PpdbBrochureSection";
import { waLinkFor } from "@/content/settings";
import { getSettings } from "@/lib/content/store";
import { Img } from "@/components/content/Img";

export const metadata: Metadata = {
  title: "PPDB SD — Informasi Kelas 1",
  description: "Informasi PPDB Kelas 1 SD Islam Modern Al Fakhir 2027/2028: alur, jadwal, biaya, persyaratan, dan formulir untuk menghubungi panitia.",
};

// Wave 1 opening date; the closing date comes from the PPDB deadline setting (fallback mirrors the default FAQ).
const WAVE1_START = "1 Oktober";

const cardShadow = "shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)]";
const eyebrow = "font-label-sm text-label-sm uppercase tracking-wider text-secondary";
const h2 = "font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary tracking-tight text-balance";

const steps = [
  { n: "01", icon: "assignment", t: "Isi Formulir Pendaftaran", d: "Lengkapi data singkat ananda dan orang tua pada formulir online di halaman ini. Data terkirim langsung ke panitia lewat WhatsApp.", footIcon: "edit_note", foot: "Formulir online" },
  { n: "02", icon: "folder_copy", t: "Siapkan Berkas", d: "Siapkan Akta Kelahiran, KK, KTP orang tua/wali, pas foto, serta surat keterangan lulus dan rapor TK/RA.", footIcon: "fact_check", foot: "6 berkas utama" },
  { n: "03", icon: "psychology", t: "Observasi & Tes Qur'an", d: "Ananda mengikuti observasi kematangan dan kesiapan belajar serta tes Qur'an dalam suasana yang ramah dan menyenangkan.", footIcon: "favorite", foot: "Nyaman & menggembirakan" },
  { n: "04", icon: "notifications_active", t: "Pengumuman Hasil", d: "Hasil observasi diumumkan langsung oleh panitia PPDB kepada orang tua calon siswa.", footIcon: "campaign", foot: "Diinformasikan panitia" },
  { n: "05", icon: "task_alt", t: "Daftar Ulang & Administrasi", d: "Calon siswa yang diterima melanjutkan daftar ulang dan penyelesaian administrasi sebelum masuk Kelas 1.", footIcon: "school", foot: "Siap masuk Kelas 1" },
];

const feeMeta: Record<string, { icon: string; tone: string; ink: string; d: string; foot: string; badge?: string }> = {
  "Uang pangkal": { icon: "apartment", tone: "bg-primary-fixed text-primary", ink: "text-secondary", d: "Investasi sarana pembelajaran dan fasilitas sekolah untuk ananda.", foot: "Sesuai ketentuan panitia", badge: "Biaya masuk" },
  "Seragam & buku": { icon: "checkroom", tone: "bg-surface-container text-primary", ink: "text-primary", d: "Paket seragam sekolah dan buku pelajaran untuk Kelas 1.", foot: "Paket Kelas 1" },
  "SPP bulanan": { icon: "calendar_month", tone: "bg-tertiary-fixed text-tertiary", ink: "text-tertiary", d: "Biaya pendidikan rutin setiap bulan selama ananda bersekolah.", foot: "per bulan" },
};
const feeOrder = ["Uang pangkal", "Seragam & buku", "SPP bulanan"];

const askList = [
  "Cakupan uang pangkal untuk sarana pembelajaran.",
  "Isi paket seragam dan buku Kelas 1.",
  "Komponen yang tercakup dalam SPP bulanan.",
  "Pilihan dan jadwal pembayaran biaya masuk.",
];

const criteria = [
  "Calon siswa baru Kelas 1 SD (lulusan TK/RA atau sederajat).",
  "Bersedia mengikuti observasi dan tes Qur'an sesuai jadwal yang ditetapkan panitia.",
  "Orang tua/wali mengisi formulir pendaftaran dan sejalan dengan visi pendidikan Islami sekolah.",
  "Bersedia mengikuti tata tertib sekolah dan program pembiasaan adab serta ibadah.",
];

const docs = [
  { icon: "badge", t: "Akta Kelahiran", d: "Fotokopi dan dokumen asli untuk verifikasi data ananda." },
  { icon: "roofing", t: "Kartu Keluarga (KK)", d: "Kartu Keluarga yang mencantumkan nama ananda." },
  { icon: "contact_emergency", t: "KTP Orang Tua/Wali", d: "Identitas orang tua atau wali calon siswa." },
  { icon: "portrait", t: "Pas Foto 3x4", d: "3 lembar pas foto terbaru ananda." },
  { icon: "workspace_premium", t: "Surat Keterangan Lulus TK/RA", d: "Diterbitkan oleh sekolah asal ananda." },
  { icon: "menu_book", t: "Buku Rapor TK", d: "Atau catatan penilaian tumbuh kembang dari TK/RA." },
];

export default async function Page() {
  const { contact, fees, faq, ppdb } = await getSettings();
  const deadline = ppdb.deadline
    ? new Date(ppdb.deadline).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    : "30 November 2026";
  const feeRows = [...fees.sd].sort((a, b) => feeOrder.indexOf(a.item) - feeOrder.indexOf(b.item));
  // Derived from the real fee data: uang pangkal + seragam & buku + first month of SPP.
  const entryTotal = `Rp ${new Intl.NumberFormat("id-ID").format(fees.sd.reduce((s, f) => s + Number(f.value.replace(/\D/g, "")), 0))}`;
  const sdFaq: { key: string; q: ReactNode; a: ReactNode }[] = [
    ...faq.slice(0, 2).map((f) => ({ key: f.q, q: f.q, a: f.a })),
    { key: "tes", q: <T>Apakah ada tes masuk untuk calon siswa Kelas 1?</T>, a: <T>Untuk jenjang SD dilaksanakan observasi kematangan dan kesiapan belajar serta tes Qur&apos;an dalam suasana yang ramah. Jadwal observasi diinformasikan langsung oleh panitia PPDB.</T> },
    { key: "kuota", q: <T>Apakah kuota bisa terpenuhi sebelum batas waktu pendaftaran?</T>, a: <><T>Bisa. Gelombang 1 berlaku hingga</T>{` ${deadline} `}<T>atau hingga kuota terpenuhi, sehingga Ayah Bunda disarankan mendaftar lebih awal.</T></> },
    { key: "kunjungan", q: <T>Kapan Ayah Bunda bisa berkunjung langsung ke sekolah?</T>, a: <><T>Kunjungan sekolah dapat dijadwalkan dengan menghubungi panitia PPDB melalui WhatsApp</T>{` ${contact.sd.waDisplay} `}<T>atau melalui halaman Kontak SD.</T></> },
    { key: "biaya", q: <T>Bagaimana rincian biaya pendidikan Kelas 1?</T>, a: <T>Rincian uang pangkal, seragam &amp; buku, dan SPP bulanan tercantum pada bagian Rincian Biaya di halaman ini. Untuk detail lengkap dan skema pembayaran, silakan hubungi panitia melalui WhatsApp resmi.</T> },
  ];
  return (
    <Scope id="sd/ppdb">
    <div className="w-full pt-20 bg-background min-h-screen overflow-x-clip">
      {/* Hero */}
      <section className="relative overflow-hidden px-margin-mobile lg:px-margin py-space-xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-tertiary-fixed/30 blur-3xl pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="inline-flex items-center gap-space-xs self-start px-space-md py-1.5 rounded-2xl sm:rounded-full bg-primary-fixed text-primary font-label-md text-label-md shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0"></span>
              <span className="text-pretty"><T>Penerimaan Peserta Didik Baru (PPDB) TA 2027/2028</T></span>
            </div>
            <h1 className="font-display text-display-mobile sm:text-display text-primary tracking-tight !leading-[1.1] text-balance">
              <T>Investasi Pendidikan Berkah, Transparan &amp; Berkelanjutan untuk Masa Depan Ananda</T>
            </h1>
            <p className="font-body-lg text-body-lg max-sm:text-body-md text-on-surface-variant max-w-2xl leading-relaxed text-pretty">
              <T>Halaman ini memuat informasi penerimaan Kelas 1 SD Islam Modern Al Fakhir untuk Tahun Ajaran 2027/2028. Pendaftaran online saat ini belum dibuka; Ayah Bunda dapat menghubungi panitia PPDB melalui WhatsApp untuk informasi terbaru. Rincian biaya kami sajikan terbuka, observasi berlangsung ramah anak, dan panitia siap mendampingi di setiap langkah.</T>
            </p>
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              {[
                { icon: "verified", tone: "text-tertiary", t: "Kurikulum Merdeka + Kemenag" },
                { icon: "star_rate", tone: "text-secondary", t: "Metode Usmani Bersanad" },
                { icon: "science", tone: "text-primary", t: "Joyful STEAM & Project-Based" },
              ].map((b) => (
                <div key={b.t} className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-full bg-surface-container-low shadow-[0_4px_16px_rgba(184,71,11,0.06)] text-on-surface">
                  <span className={`material-symbols-outlined text-[18px] ${b.tone}`}>{b.icon}</span>
                  <span className="font-label-md text-label-md"><T>{b.t}</T></span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-space-md pt-space-md">
              <a className="inline-flex items-center justify-center gap-space-xs px-space-lg sm:px-space-xl py-4 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg max-sm:text-label-md shadow-[0_12px_28px_-6px_rgba(184,71,11,0.25)] active:translate-y-0.5 transition-all text-center" href="#formulir">
                <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                <span><T>Hubungi Panitia via Formulir WhatsApp</T></span>
              </a>
              <a className="inline-flex items-center justify-center gap-space-xs px-space-lg sm:px-space-xl py-4 rounded-full bg-surface hover:bg-surface-container-high text-primary font-label-lg text-label-lg max-sm:text-label-md shadow-[0_4px_16px_rgba(184,71,11,0.08)] active:translate-y-0.5 transition-all text-center" href="#biaya">
                <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                <span><T>Lihat Rincian Biaya</T></span>
              </a>
              {(ppdb.brochureSd || ppdb.brochurePortal) && (
                <a className="inline-flex items-center justify-center gap-space-xs px-space-lg sm:px-space-xl py-4 rounded-full bg-secondary-container hover:bg-secondary text-on-secondary font-label-lg text-label-lg max-sm:text-label-md shadow-md active:translate-y-0.5 transition-all text-center" href="#brosur-ppdb">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  <span><T>Unduh Brosur PPDB</T></span>
                </a>
              )}
            </div>
            <div className="flex items-start gap-space-sm pt-space-xs text-on-surface-variant font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px] text-tertiary shrink-0">event_available</span>
              <span className="text-pretty"><T>Pendaftaran online saat ini belum dibuka. Hubungi panitia PPDB melalui WhatsApp</T>{` ${contact.waDisplay} `}<T>untuk informasi gelombang dan jadwal.</T></span>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center items-center py-space-md lg:py-0">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-tr from-secondary-fixed via-primary-fixed to-tertiary-fixed rounded-[3.5rem] rotate-3 opacity-70 blur-xl"></div>
              <div className="relative z-10 w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(184,71,11,0.18)] bg-surface-container">
                <Img alt="Siswa kelas 1 SD Islam Modern Al Fakhir belajar di kelas" className="w-full h-full object-cover" src="/photos/kelas2.webp" />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-6 right-6 text-on-primary">
                  <p className="font-headline-sm text-headline-sm font-bold"><T>Observasi Ramah Anak</T></p>
                  <p className="font-body-md text-body-md opacity-90 text-surface-container-low"><T>Mengenali kematangan dan kesiapan belajar ananda dengan suasana yang menyenangkan.</T></p>
                </div>
              </div>
              <div className="absolute -top-6 -right-2 sm:-right-6 z-20 bg-secondary-container text-on-secondary px-space-md py-space-sm rounded-2xl shadow-xl flex items-center gap-space-xs max-w-[240px] rotate-3 hover:rotate-0 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-surface text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">event_available</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-bright"><T>Gelombang 1</T></span>
                  <span className="font-label-md text-label-md font-bold leading-tight"><T>Pendaftaran Online Belum Dibuka</T></span>
                  <span className="font-label-sm text-label-sm opacity-90 text-surface-bright font-medium"><T>Hubungi panitia via WhatsApp</T></span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-2 sm:-left-6 z-20 bg-surface text-on-surface px-space-md py-3 rounded-full shadow-lg flex items-center gap-space-xs">
                <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">child_care</span>
                </div>
                <span className="font-label-md text-label-md text-primary font-bold"><T>Observasi &amp; Tes Qur&apos;an Ramah Anak</T></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PpdbBrochureSection
        items={[
          ...(ppdb.brochureSd ? [{ badge: "PPDB SD · Kelas 1", brochure: ppdb.brochureSd }] : []),
          ...(ppdb.brochurePortal ? [{ badge: "Informasi Umum PPDB", brochure: ppdb.brochurePortal }] : []),
        ] satisfies BrochureEntry[]}
        className="bg-surface"
      />

      {/* Alur */}
      <section className="px-margin-mobile lg:px-margin py-space-xl bg-surface-container-low scroll-mt-20" id="alur">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs max-w-xl">
              <span className={eyebrow}><T>Proses Ringkas &amp; Nyaman</T></span>
              <h2 className={h2}><T>Alur Pendaftaran 5 Langkah Mudah</T></h2>
              <p className="font-body-md text-body-md text-on-surface-variant"><T>Dirancang ringkas dan transparan agar Ayah Bunda dapat mempersiapkan transisi sekolah ananda dengan tenang tanpa kerumitan administrasi.</T></p>
            </div>
            <div className="inline-flex items-center gap-space-xs self-start md:self-auto px-space-md py-2 rounded-full bg-surface text-tertiary font-label-md text-label-md shadow-sm">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
              <span><T>Didampingi panitia PPDB di setiap langkah</T></span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-space-md pt-space-xs">
            {steps.map((s) => (
              <div key={s.n} className="group flex flex-col p-space-md rounded-2xl bg-surface shadow-[0_8px_20px_-4px_rgba(184,71,11,0.05)] hover:shadow-md transition-all relative overflow-hidden">
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-display text-display text-primary-fixed font-black select-none">{s.n}</span>
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                  </div>
                </div>
                <h3 className="font-title-md text-title-md text-primary mb-1"><T>{s.t}</T></h3>
                <p className="font-body-md text-body-md text-on-surface-variant"><T>{s.d}</T></p>
                <div className="mt-auto pt-space-md text-secondary font-label-sm text-label-sm font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">{s.footIcon}</span> <T>{s.foot}</T>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jadwal */}
      <section className="px-margin-mobile lg:px-margin py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <span className={eyebrow}><T>Kalender Penerimaan TA 2027/2028</T></span>
              <h2 className={h2}><T>Jadwal &amp; Linimasa Gelombang PPDB SD</T></h2>
              <p className="font-body-md text-body-md text-on-surface-variant"><T>Diselaraskan dengan kalender akademik Al Fakhir School. Kami menyarankan pendaftaran lebih awal pada Gelombang 1 untuk mendapatkan kuota dan keringanan biaya terbaik.</T></p>
            </div>
            <div className="inline-flex items-center gap-space-xs self-start md:self-auto px-space-md py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md shrink-0">
              <span className="material-symbols-outlined text-[18px] text-secondary">event_available</span><T>Kuota Terbatas: 2 Rombel (56 Siswa)</T>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
            {/* Gelombang 1 */}
            <div className="flex flex-col p-space-lg rounded-3xl bg-surface-container-low border-2 border-primary-container relative overflow-hidden shadow-md">
              <div className="flex items-center justify-between gap-space-sm mb-space-sm">
                <span className="px-space-sm py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold uppercase tracking-wider"><T>Gelombang Aktif</T></span>
                <span className="font-label-sm text-label-sm font-bold text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">stars</span><T>Rekomendasi</T>
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1"><T>Gelombang 1 (Early Bird)</T></h3>
              <p className="font-title-md text-title-md text-secondary font-bold mb-space-sm"><T>{WAVE1_START}</T> – {deadline}</p>
              <div className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface-variant pt-space-sm border-t border-outline-variant/30">
                <Row icon="psychology" tone="text-primary" k="Observasi" v={<T>Tiap Sabtu (08.00 - 11.30 WIB)</T>} />
                <Row icon="notifications_active" tone="text-primary" k="Pengumuman" v={<T>Maks. 5 Hari Kerja</T>} />
                <Row icon="fact_check" tone="text-primary" k="Daftar Ulang" v={<T>Maks. 14 Hari Setelah Lulus</T>} />
              </div>
              <div className="mt-auto pt-space-md">
                <div className="bg-primary-fixed text-primary px-space-md py-2 rounded-2xl font-label-sm text-label-sm font-bold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] shrink-0">redeem</span><T>Potongan Uang Pangkal Rp 2.500.000</T>
                </div>
              </div>
            </div>
            {/* Gelombang 2 */}
            <div className="flex flex-col p-space-lg rounded-3xl bg-surface-container-low shadow-[0_4px_16px_rgba(184,71,11,0.04)] relative overflow-hidden">
              <div className="flex items-center justify-between gap-space-sm mb-space-sm">
                <span className="px-space-sm py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm font-bold uppercase tracking-wider"><T>Segera Hadir</T></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant"><T>Tahap Reguler</T></span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1"><T>Gelombang 2 (Reguler)</T></h3>
              <p className="font-title-md text-title-md text-on-surface font-bold mb-space-sm"><T>2 Januari – 31 Maret 2027</T></p>
              <div className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface-variant pt-space-sm border-t border-outline-variant/30">
                <Row icon="psychology" tone="text-tertiary" k="Observasi" v={<T>Tiap Sabtu (08.00 - 11.30 WIB)</T>} />
                <Row icon="notifications_active" tone="text-tertiary" k="Pengumuman" v={<T>Maks. 5 Hari Kerja</T>} />
                <Row icon="fact_check" tone="text-tertiary" k="Daftar Ulang" v={<T>Maks. 14 Hari Setelah Lulus</T>} />
              </div>
              <div className="mt-auto pt-space-md">
                <div className="bg-surface text-on-surface-variant px-space-md py-2 rounded-2xl font-label-sm text-label-sm flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-tertiary shrink-0">sell</span><T>Potongan Uang Pangkal Rp 1.000.000</T>
                </div>
              </div>
            </div>
            {/* Gelombang 3 */}
            <div className="flex flex-col p-space-lg rounded-3xl bg-surface-container-low shadow-[0_4px_16px_rgba(184,71,11,0.04)] relative overflow-hidden">
              <div className="flex items-center justify-between gap-space-sm mb-space-sm">
                <span className="px-space-sm py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm font-bold uppercase tracking-wider"><T>Kondisional</T></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant"><T>Tahap Akhir</T></span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1"><T>Gelombang 3 (Kuota Sisa)</T></h3>
              <p className="font-title-md text-title-md text-on-surface font-bold mb-space-sm"><T>1 April – 30 Mei 2027</T></p>
              <div className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface-variant pt-space-sm border-t border-outline-variant/30">
                <Row icon="psychology" tone="text-secondary" k="Observasi" v={<T>Sesuai Perjanjian Jadwal</T>} />
                <Row icon="notifications_active" tone="text-secondary" k="Pengumuman" v={<T>Maks. 3 Hari Kerja</T>} />
                <Row icon="fact_check" tone="text-secondary" k="Daftar Ulang" v={<T>Maks. 7 Hari Setelah Lulus</T>} />
              </div>
              <div className="mt-auto pt-space-md">
                <div className="bg-surface text-on-surface-variant px-space-md py-2 rounded-2xl font-label-sm text-label-sm flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">info</span><T>Dibuka hanya jika kuota 56 siswa belum penuh</T>
                </div>
              </div>
            </div>
          </div>
          <div className="p-space-md rounded-2xl bg-secondary-fixed/40 flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">school</span>
              </div>
              <div>
                <div className="font-title-md text-title-md text-primary font-bold"><T>Orientasi Wali Murid &amp; Masa Pengenalan Lingkungan Sekolah (MPLS)</T></div>
                <div className="font-body-md text-body-md text-on-surface-variant"><T>Dijadwalkan serentak pada</T>{" "}<strong><T>12 – 15 Juli 2027</T></strong>{" "}<T>sebelum hari pertama efektif KBM Tahun Ajaran Baru.</T></div>
              </div>
            </div>
            <a className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors shrink-0 self-start sm:self-center" href="#formulir">
              <span className="material-symbols-outlined text-[16px]">how_to_reg</span><T>Hubungi Panitia</T>
            </a>
          </div>
        </div>
      </section>

      {/* Biaya */}
      <section className="px-margin-mobile lg:px-margin py-space-xl scroll-mt-20" id="biaya">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-space-xs">
            <span className={eyebrow}><T>Transparansi Finansial Tanpa Biaya Tersembunyi</T></span>
            <h2 className={h2}><T>Rincian Komponen Biaya Tahun Ajaran 2027/2028</T></h2>
            <p className="font-body-md text-body-md text-on-surface-variant"><T>Semua komponen biaya disajikan jelas dan gamblang di awal pendaftaran agar Ayah Bunda dapat merencanakan pendidikan ananda dengan tenang.</T></p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            <div className="lg:col-span-8 flex flex-col bg-surface-container-low rounded-3xl p-space-md sm:p-space-lg shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                <div>
                  <h3 className="font-title-lg text-title-lg text-primary"><T>Paket Masuk Kelas 1 (Tahun Pertama)</T></h3>
                  <p className="font-body-md text-body-md text-on-surface-variant"><T>Komponen biaya resmi dari panitia PPDB SD Islam Modern Al Fakhir.</T></p>
                </div>
                <span className="self-start sm:self-auto px-space-md py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold shrink-0"><T>All-In Transparan</T></span>
              </div>
              <div className="flex flex-col gap-space-sm mt-space-md">
                {feeRows.map((f) => {
                  const m = feeMeta[f.item] ?? { icon: "payments", tone: "bg-surface-container text-primary", ink: "text-primary", d: "", foot: "" };
                  return (
                    <div key={f.item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm p-space-md rounded-2xl bg-surface hover:bg-surface-bright transition-colors">
                      <div className="flex items-center gap-space-md">
                        <div className={`w-10 h-10 rounded-full ${m.tone} flex items-center justify-center shrink-0`}>
                          <span className="material-symbols-outlined text-[20px]">{m.icon}</span>
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-space-xs">
                            <span className="font-title-md text-title-md text-on-surface">{f.item}</span>
                            {m.badge && <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm"><T>{m.badge}</T></span>}
                          </div>
                          {m.d && <div className="font-body-md text-body-md text-on-surface-variant"><T>{m.d}</T></div>}
                        </div>
                      </div>
                      <div className="pl-14 sm:pl-0 sm:text-right shrink-0">
                        <div className={`font-title-lg text-title-lg font-bold ${m.ink}`}>{f.value}</div>
                        {m.foot && <div className="font-label-sm text-label-sm text-on-surface-variant"><T>{m.foot}</T></div>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-space-md p-space-md rounded-2xl bg-primary text-on-primary flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                <div>
                  <div className="font-label-md text-label-md opacity-80 uppercase tracking-wider"><T>Estimasi Biaya Masuk Kelas 1</T></div>
                  <div className="font-headline-md text-headline-md font-bold">{entryTotal}</div>
                  <div className="font-label-sm text-label-sm opacity-80"><T>(Uang pangkal + seragam &amp; buku + SPP bulan pertama)</T></div>
                </div>
                <a className="inline-flex items-center gap-space-xs px-space-md py-3 rounded-full bg-surface text-primary font-label-lg text-label-lg hover:bg-surface-bright transition-all shadow-md self-start sm:self-center shrink-0" href="#formulir">
                  <T>Hubungi Panitia</T>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
              <div className="mt-space-md p-space-md rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[28px] text-secondary shrink-0">verified_user</span>
                <div className="font-body-md text-body-md font-medium">
                  <strong><T>Garansi Tanpa Biaya Tersembunyi:</T></strong>{" "}<T>Seluruh kegiatan studi wisata dalam kota, munaqasyah tahfiz, dan ekstrakurikuler wajib sudah tercover dalam rincian resmi sekolah.</T>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-space-md">
              <div className={`p-space-lg rounded-3xl bg-surface ${cardShadow} flex flex-col gap-space-sm`}>
                <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
                </div>
                <h4 className="font-title-lg text-title-lg text-primary"><T>Apa yang Sudah Termasuk SPP?</T></h4>
                <ul className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface-variant pt-space-xs">
                  <li className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-tertiary mt-0.5 shrink-0">check_circle</span>
                    <span><T>Snack sehat pagi &amp; katering makan siang bergizi halal</T></span>
                  </li>
                  <li className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-tertiary mt-0.5 shrink-0">check_circle</span>
                    <span><T>Pembinaan Tahfiz harian &amp; buku prestasi Usmani</T></span>
                  </li>
                  <li className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-tertiary mt-0.5 shrink-0">check_circle</span>
                    <span><T>Bahan habis pakai eksperimen sains &amp; prakarya</T></span>
                  </li>
                  <li className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-tertiary mt-0.5 shrink-0">check_circle</span>
                    <span><T>Pemeriksaan kesehatan umum &amp; gigi berkala 6 bulan sekali</T></span>
                  </li>
                  <li className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-tertiary mt-0.5 shrink-0">check_circle</span>
                    <span><T>Akses penuh aplikasi pantau orang tua Al Fakhir School</T></span>
                  </li>
                </ul>
                <a className="mt-space-xs inline-flex items-center justify-center gap-space-xs px-space-md py-3 rounded-full bg-tertiary text-on-tertiary font-label-lg text-label-lg hover:opacity-90 transition-opacity" href={waLinkFor(contact, "Halo Admin SD Al Fakhir, saya ingin menanyakan rincian biaya PPDB Kelas 1 2027/2028.", "sd")} target="_blank" rel="noopener noreferrer">
                  <span className="material-symbols-outlined text-[18px]">chat</span><T>Tanya Biaya via WhatsApp</T>
                </a>
              </div>
              <div className="p-space-lg rounded-3xl bg-surface-container flex flex-col gap-space-sm">
                <div className="flex items-center justify-between gap-space-sm">
                  <span className="font-label-md text-label-md text-primary font-bold"><T>Status Kuota Kelas 1</T></span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold"><T>Terisi 68%</T></span>
                </div>
                <div className="w-full bg-surface-variant rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-container to-secondary-container h-full rounded-full w-[68%]"></div>
                </div>
                <div className="flex justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
                  <span><T>Tersedia: 18 Kursi</T></span>
                  <span><T>Total Kuota: 56 Siswa (2 Rombel)</T></span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant pt-space-xs"><T>Penerimaan Gelombang 1 berlangsung hingga</T>{" "}{deadline}{" "}<T>atau ditutup otomatis saat kuota terpenuhi.</T></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skema pembayaran & Beasiswa */}
      <section className="px-margin-mobile lg:px-margin py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <span className={eyebrow}><T>Fleksibilitas Finansial Ramah Keluarga</T></span>
            <h2 className={h2}><T>Skema Pembayaran Bertahap &amp; Beasiswa</T></h2>
            <p className="font-body-md text-body-md text-on-surface-variant"><T>Kami memahami kebutuhan perencanaan keluarga. Tersedia opsi cicilan syariah 0% tanpa bunga maupun apresiasi khusus bagi keluarga dan hafizh cilik.</T></p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            <div className={`flex flex-col p-space-lg rounded-3xl bg-surface ${cardShadow} relative overflow-hidden`}>
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mb-space-sm">
                <span className="material-symbols-outlined text-[24px]">payments</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-primary"><T>Skema Lunas Tunai</T></h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-sm"><T>Pelunasan 100% saat daftar ulang.</T></p>
              <div className="mt-auto pt-space-sm flex flex-col gap-space-xs">
                <div className="font-title-md text-title-md text-secondary font-bold"><T>Ekstra Diskon Rp 1.000.000</T></div>
                <p className="font-label-sm text-label-sm text-on-surface-variant"><T>Dapat digabung dengan promo Gelombang Early Bird.</T></p>
              </div>
            </div>
            <div className={`flex flex-col p-space-lg rounded-3xl bg-surface ${cardShadow} relative overflow-hidden`}>
              <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center mb-space-sm">
                <span className="material-symbols-outlined text-[24px]">price_change</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-primary"><T>Skema Bertahap 3x</T></h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-sm"><T>Cicilan ringan 3 bulan pertama tanpa bunga (0% riba).</T></p>
              <div className="mt-auto pt-space-sm flex flex-col gap-space-xs">
                <div className="font-title-md text-title-md text-primary font-bold"><T>50% · 30% · 20%</T></div>
                <p className="font-label-sm text-label-sm text-on-surface-variant"><T>Bulan ke-1 (Daftar Ulang), Bulan ke-2, dan Bulan ke-3.</T></p>
              </div>
            </div>
            <div className="flex flex-col p-space-lg rounded-3xl bg-tertiary text-on-tertiary shadow-[0_8px_24px_-4px_rgba(0,93,99,0.2)] relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full bg-tertiary-container opacity-40 blur-xl"></div>
              <div className="relative w-12 h-12 rounded-2xl bg-surface text-tertiary flex items-center justify-center mb-space-sm">
                <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
              </div>
              <h3 className="relative font-title-lg text-title-lg text-on-tertiary"><T>Beasiswa Hafizh Cilik</T></h3>
              <p className="relative font-body-md text-body-md text-on-tertiary/90 mb-space-sm"><T>Apresiasi khusus ananda lulusan TK yang telah memiliki hafalan Juz 30.</T></p>
              <div className="relative mt-auto pt-space-sm flex flex-col gap-space-xs">
                <div className="font-title-md text-title-md text-on-tertiary-container font-bold"><T>Potongan s/d 30%</T></div>
                <p className="font-label-sm text-label-sm text-on-tertiary/80"><T>Uang Pangkal setelah verifikasi bacaan oleh Tim Tahfiz.</T></p>
              </div>
            </div>
            <div className={`flex flex-col p-space-lg rounded-3xl bg-surface ${cardShadow} relative overflow-hidden`}>
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mb-space-sm">
                <span className="material-symbols-outlined text-[24px]">family_restroom</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-primary"><T>Diskon Saudara Kandung</T></h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-sm"><T>Keringanan khusus bagi keluarga yang menyekolahkan lebih dari 1 putra/putri di Al Fakhir (SD/SMP).</T></p>
              <div className="mt-auto pt-space-sm flex flex-col gap-space-xs">
                <div className="font-title-md text-title-md text-secondary font-bold"><T>Potongan Rp 1.500.000</T></div>
                <p className="font-label-sm text-label-sm text-on-surface-variant"><T>Berlaku otomatis untuk pendaftaran adik kandung.</T></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Persyaratan */}
      <section className="px-margin-mobile lg:px-margin py-space-xl">
        <div className="max-w-7xl mx-auto">
          <div className="p-space-md sm:p-space-xl rounded-3xl bg-surface shadow-[0_12px_32px_-6px_rgba(184,71,11,0.07)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              <div className="lg:col-span-5 flex flex-col gap-space-sm">
                <span className={eyebrow}><T>Ketentuan PPDB Kelas 1</T></span>
                <h2 className={h2}><T>Persyaratan Berkas &amp; Kelayakan Masuk</T></h2>
                <p className="font-body-md text-body-md text-on-surface-variant"><T>Berkas dapat diunggah dalam bentuk foto/scan saat mengisi formulir online, atau dibawa langsung saat jadwal observasi di sekolah.</T></p>
                <div className="p-space-md rounded-2xl bg-surface-container-low flex items-start gap-space-sm mt-space-xs">
                  <span className="material-symbols-outlined text-[24px] text-primary shrink-0 mt-0.5">cake</span>
                  <div>
                    <h4 className="font-title-md text-title-md text-primary mb-1"><T>Kriteria Usia Anak</T></h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-2"><T>Berusia minimal 6 tahun pada tanggal 1 Juli 2027. Usia 5 tahun 8 bulan dapat dipertimbangkan melalui rekomendasi tertulis psikolog perkembangan anak.</T></p>
                    <ul className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface-variant">
                      {criteria.map((c) => (
                        <li key={c} className="flex items-start gap-space-xs">
                          <span className="material-symbols-outlined text-[16px] text-primary mt-1 shrink-0">check</span>
                          <span><T>{c}</T></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  {docs.map((d) => (
                    <div key={d.t} className="flex items-start gap-space-sm p-space-md rounded-2xl bg-surface-container-low">
                      <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[16px]">{d.icon}</span>
                      </div>
                      <div>
                        <h5 className="font-title-md text-title-md text-on-surface"><T>{d.t}</T></h5>
                        <p className="font-body-md text-body-md text-on-surface-variant"><T>{d.d}</T></p>
                      </div>
                    </div>
                  ))}
                  <div className="sm:col-span-2 flex items-start gap-space-sm p-space-md rounded-2xl bg-secondary-fixed text-on-secondary-fixed">
                    <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[16px]">info</span>
                    </div>
                    <div>
                      <h5 className="font-title-md text-title-md"><T>Format Berkas: PDF / JPG (Maks. 2MB)</T></h5>
                      <p className="font-body-md text-body-md"><T>Berkas fisik asli ditunjukkan saat sesi wawancara dan daftar ulang.</T></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulir */}
      <section className="px-margin-mobile lg:px-margin py-space-xl bg-surface-container-low scroll-mt-20" id="formulir">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-start">
          <div className="lg:col-span-5 flex flex-col gap-space-sm lg:sticky lg:top-28">
            <span className={eyebrow}><T>Formulir Pendaftaran Kelas 1</T></span>
            <h2 className={h2}><T>Kirim Data Calon Siswa ke Panitia</T></h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <T>Pendaftaran online resmi saat ini belum dibuka. Isi data singkat pada formulir; setelah dikirim, pesan akan terbuka di WhatsApp dan diteruskan langsung ke panitia PPDB SD Al Fakhir.</T>
            </p>
            <div className="hidden md:flex flex-col gap-space-sm pt-space-xs">
              {[
                { icon: "bolt", t: "Formulir cepat", d: <T>Cukup lima isian data dasar ananda dan orang tua.</T> },
                { icon: "chat", t: "Langsung ke panitia", d: <><T>Terkirim ke WhatsApp resmi</T>{` ${contact.sd.waDisplay}.`}</> },
                { icon: "event_available", t: "Gelombang 1", d: <><T>Dibuka hingga</T>{` ${deadline} `}<T>atau saat kuota terpenuhi.</T></> },
              ].map((b) => (
                <div key={b.t} className="flex items-start gap-space-sm p-space-md rounded-2xl bg-surface shadow-[0_4px_16px_rgba(184,71,11,0.04)]">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">{b.icon}</span>
                  </div>
                  <div>
                    <div className="font-title-md text-title-md text-primary"><T>{b.t}</T></div>
                    <div className="font-body-md text-body-md text-on-surface-variant">{b.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 bg-surface rounded-3xl p-space-md sm:p-space-xl shadow-[0_12px_32px_-6px_rgba(184,71,11,0.07)]">
            <div className="flex items-center gap-space-sm mb-space-lg">
              <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">how_to_reg</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-primary"><T>Formulir Cepat PPDB Kelas 1</T></h3>
                <p className="font-label-md text-label-md text-on-surface-variant"><T>Tahun Ajaran 2027/2028</T></p>
              </div>
            </div>
            <PpdbForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-margin-mobile lg:px-margin py-space-xl">
        <div className="max-w-4xl mx-auto flex flex-col gap-space-lg">
          <div className="text-center flex flex-col gap-space-xs">
            <span className={eyebrow}><T>Pertanyaan Sering Diajukan</T></span>
            <h2 className={h2}><T>Tanya Jawab Seputar Masuk SD Al Fakhir</T></h2>
            <p className="font-body-md text-body-md text-on-surface-variant"><T>Temukan jawaban atas hal-hal yang paling sering ditanyakan orang tua seputar pendaftaran Kelas 1.</T></p>
          </div>
          <div className="flex flex-col gap-space-sm">
            {sdFaq.map((it) => (
              <details key={it.key} className="group rounded-2xl bg-surface-container-low shadow-[0_4px_16px_rgba(184,71,11,0.04)] overflow-hidden transition-all">
                <summary className="w-full p-space-md flex items-center justify-between text-left gap-space-md cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-title-md text-title-md text-on-surface font-bold">{it.q}</span>
                  <span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0 transition-transform duration-300 group-open:rotate-180">
                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                  </span>
                </summary>
                <p className="px-space-md pb-space-md font-body-md text-body-md text-on-surface-variant leading-relaxed">{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-margin-mobile lg:px-margin py-space-xl relative overflow-hidden scroll-mt-20" id="kontak-konselor">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-br from-primary-container via-primary to-secondary p-space-lg sm:p-space-xl text-on-primary shadow-[0_24px_48px_-12px_rgba(184,71,11,0.3)] overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full border-4 border-on-primary/10 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full border-4 border-on-primary/10 rotate-45"></div>
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
              <div className="lg:col-span-8 flex flex-col gap-space-sm">
                <div className="inline-flex items-center gap-space-xs self-start px-space-md py-1 rounded-full bg-surface-bright/20 backdrop-blur-md text-surface-bright font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[16px]">support_agent</span>
                  <T>Layanan Konsultasi PPDB</T>
                </div>
                <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-surface-bright leading-tight text-balance">
                  <T>Konsultasikan Kesiapan Masuk SD Ananda Bersama Tim Kami</T>
                </h2>
                <p className="font-body-lg text-body-lg max-sm:text-body-md opacity-90 text-surface-container-low max-w-2xl text-pretty">
                  <T>Masih ragu mengenai kesiapan ananda atau ingin mendiskusikan rincian biaya? Kunjungi sekolah kami, rasakan suasana belajar yang ceria, dan tanyakan apa saja kepada panitia PPDB kami.</T>
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-space-sm justify-center">
                <a className="inline-flex flex-1 items-center justify-center gap-space-xs px-space-lg py-4 rounded-full bg-surface text-primary hover:bg-surface-bright font-label-lg text-label-lg shadow-lg active:translate-y-0.5 transition-all text-center" href={waLinkFor(contact, "Halo Tim PPDB SD Al Fakhir, saya ingin konsultasi pendaftaran Kelas 1 2027/2028.", "sd")} target="_blank" rel="noopener noreferrer">
                  <span className="material-symbols-outlined text-[20px] text-tertiary">chat</span>
                  <T>Chat Panitia PPDB (WhatsApp)</T>
                </a>
                <SiteLink className="inline-flex flex-1 items-center justify-center gap-space-xs px-space-lg py-4 rounded-full bg-surface-bright/10 hover:bg-surface-bright/20 text-surface-bright font-label-lg text-label-lg backdrop-blur-sm active:translate-y-0.5 transition-all text-center" href="/sd/kontak">
                  <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
                  <T>Jadwalkan Kunjungan Sekolah</T>
                </SiteLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </Scope>
  );
}

function Row({ icon, tone, k, v }: { icon: string; tone: string; k: string; v: ReactNode }) {
  return (
    <div className="flex items-start gap-space-xs">
      <span className={`material-symbols-outlined text-[18px] ${tone} shrink-0 mt-0.5`}>{icon}</span>
      <span>
        <strong className="text-on-surface"><T>{k}</T>:</strong> {v}
      </span>
    </div>
  );
}

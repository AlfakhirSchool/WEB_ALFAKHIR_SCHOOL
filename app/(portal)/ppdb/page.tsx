import type { Metadata } from "next";
import Image from "@/components/content/Image";
import { SiteLink } from "@/components/SiteTransition";
import { PageHero } from "@/components/pages/portal-shared/PageHero";
import { Eyebrow, StarDivider, StarGlyph } from "@/components/pages/portal-shared/Ornaments";
import { FaqAccordion } from "@/components/pages/portal-ppdb/FaqAccordion";
import { PpdbBrochureSection, type BrochureEntry } from "@/components/pages/portal-ppdb/PpdbBrochureSection";
import { Scope, T } from "@/components/content/T";
import { getSettings } from "@/lib/content/store";
import { waLinkFor } from "@/content/settings";

export const metadata: Metadata = { title: "PPDB 2027/2028", description: "Pendaftaran peserta didik baru SD dan SMP Islam Modern Al Fakhir." };

const paths = [
  {
    href: "/sd/ppdb", logo: "/logo-sd.webp", tag: "Jenjang Dasar", level: "Daftar SD · Kelas 1",
    desc: "Pendaftaran peserta didik baru kelas 1 SD Islam Modern Al Fakhir. Modern Islamic School — Bright • Brilliant • Faithful.",
    points: ["Observasi & tes Qur'an", "Uang pangkal, SPP, seragam & buku", "Rincian biaya di halaman PPDB SD"],
    accent: "bg-secondary-container", accentText: "text-secondary", btn: "bg-secondary-container hover:bg-secondary", icon: "text-secondary-container", chip: "bg-secondary-fixed/60 text-on-secondary-container",
  },
  {
    href: "/smp/ppdb", logo: "/logo-smp.png", tag: "Jenjang Menengah", level: "Daftar SMP · Kelas 7",
    desc: "Pendaftaran peserta didik baru kelas 7 dengan Research Class, Tahfiz & Tahsin, dan OSIS.",
    points: ["Observasi calon siswa & wawancara orang tua", "Gelombang 1, 2, dan 3", "Rincian biaya di halaman PPDB SMP"],
    accent: "bg-primary-container", accentText: "text-primary", btn: "bg-primary-container hover:bg-primary", icon: "text-primary-container", chip: "bg-primary-fixed/60 text-on-primary-fixed-variant",
  },
];

const steps = [
  { icon: "edit_document", t: "Isi formulir online", d: "Lengkapi data calon peserta didik pada halaman PPDB jenjang yang dituju." },
  { icon: "upload_file", t: "Unggah berkas", d: "Siapkan dan unggah berkas persyaratan pendaftaran." },
  { icon: "menu_book", t: "Observasi & wawancara", d: "Observasi calon siswa dan wawancara orang tua bersama tim guru." },
  { icon: "campaign", t: "Pengumuman", d: "Hasil seleksi diumumkan kepada orang tua / wali." },
  { icon: "how_to_reg", t: "Daftar ulang", d: "Selesaikan daftar ulang untuk mengamankan kursi ananda." },
];

export default async function Ppdb() {
  const { contact, faq, ppdb } = await getSettings();
  const brochures: BrochureEntry[] = [
    ...(ppdb.brochurePortal ? [{ badge: "Informasi Umum PPDB", brochure: ppdb.brochurePortal }] : []),
    ...(ppdb.brochureSd ? [{ badge: "Jenjang SD · Kelas 1", brochure: ppdb.brochureSd }] : []),
    ...(ppdb.brochureSmp ? [{ badge: "Jenjang SMP · Kelas 7", brochure: ppdb.brochureSmp }] : []),
  ];
  return (
    <Scope id="portal/ppdb">
    <div className="w-full bg-surface">
      <PageHero
        eyebrow="PPDB 2027/2028"
        title={<><T>Pilih jenjang</T><br /><span className="bg-gradient-to-r from-secondary-container via-tertiary-fixed-dim to-primary-container bg-clip-text text-transparent"><T>pendaftaran.</T></span></>}
        lead={<T>Penerimaan peserta didik baru SD dan SMP Islam Modern Al Fakhir. Pilih jalur yang sesuai, lalu lanjutkan ke halaman PPDB masing-masing jenjang.</T>}
        aside={
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-lowest p-2">
            <div className="relative h-72 md:h-96 w-full rounded-xl overflow-hidden">
              <Image src="/photos/kelas.webp" alt="Suasana kelas Al Fakhir School" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" priority />
              <div className="absolute left-3 bottom-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-lowest/90 backdrop-blur px-3.5 py-2 font-label-md text-label-md font-semibold uppercase tracking-wider text-secondary">
                  <span className="w-2 h-2 rounded-full bg-secondary-container" /><T>SD · Kelas 1</T>
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-lowest/90 backdrop-blur px-3.5 py-2 font-label-md text-label-md font-semibold uppercase tracking-wider text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary-container" /><T>SMP · Kelas 7</T>
                </span>
              </div>
            </div>
          </div>
        }
      >
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-space-sm pt-2">
          <a href="#jalur" className="bg-primary text-on-primary hover:bg-primary-container px-7 py-3.5 rounded-full font-label-lg text-label-lg font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 no-underline whitespace-nowrap">
            <span className="material-symbols-outlined text-[20px]">how_to_reg</span><T>Pilih Jenjang</T>
          </a>
          <a href="#alur" className="bg-surface-container text-primary hover:bg-surface-container-high px-6 py-3.5 rounded-full font-label-lg text-label-lg font-bold transition-all flex items-center justify-center gap-2 no-underline whitespace-nowrap">
            <span className="material-symbols-outlined text-[20px]">route</span><T>Lihat Alur</T>
          </a>
          {brochures.length > 0 && (
            <a href="#brosur-ppdb" className="bg-secondary-container text-on-primary hover:bg-secondary px-6 py-3.5 rounded-full font-label-lg text-label-lg font-bold transition-all flex items-center justify-center gap-2 no-underline whitespace-nowrap shadow-sm">
              <span className="material-symbols-outlined text-[20px]">download</span><T>Unduh Brosur PPDB</T>
            </a>
          )}
        </div>
      </PageHero>

      <PpdbBrochureSection items={brochures} className="bg-surface-container-low" />

      {/* Two paths */}
      <section id="jalur" className="w-full py-space-xl bg-surface scroll-mt-24">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="text-center max-w-3xl mx-auto mb-space-lg">
            <span className="font-caption text-caption uppercase text-tertiary font-bold tracking-widest"><T>Dua pintu pendaftaran</T></span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-extrabold tracking-tight mt-2 text-balance"><T>SD atau SMP, satu arah pembinaan.</T></h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            {paths.map((p) => (
              <SiteLink key={p.href} href={p.href} className="group relative flex flex-col gap-4 bg-surface-container-lowest rounded-xl p-6 md:p-space-lg border border-primary-container/10 hover:border-primary-container/30 hover:shadow-xl transition-all duration-300 overflow-hidden no-underline">
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${p.accent}`} />
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container-low">
                    <Image src={p.logo} alt="" width={72} height={72} className="h-16 w-16 object-contain transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
                  </span>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-label-md text-label-md uppercase tracking-wider font-bold ${p.chip}`}>
                    <StarGlyph className="w-2.5 h-2.5" /><T>{p.tag}</T>
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold"><T>{p.level}</T></h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-pretty"><T>{p.desc}</T></p>
                <ul className="m-0 list-none p-0 flex flex-col gap-2 border-t border-primary-container/10 pt-space-sm">
                  {p.points.map((x) => (
                    <li key={x} className="flex items-start gap-3 font-body-sm text-body-sm text-on-surface-variant">
                      <StarGlyph className={`w-3.5 h-3.5 mt-1 shrink-0 ${p.icon}`} /><T>{x}</T>
                    </li>
                  ))}
                </ul>
                <span className={`self-start mt-auto inline-flex items-center gap-3 px-6 py-3 rounded-full text-on-primary font-label-lg text-label-lg uppercase tracking-wider shadow-md transition-all duration-300 whitespace-nowrap ${p.btn}`}>
                  <T>Mulai mendaftar</T>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
                </span>
              </SiteLink>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="alur" className="w-full relative py-space-xl bg-surface-container-lowest scroll-mt-24">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="mb-space-lg max-w-3xl">
            <Eyebrow dot="bg-secondary-container" className="text-secondary"><T>Langkah demi langkah</T></Eyebrow>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-extrabold tracking-tight"><T>Alur pendaftaran</T></h2>
          </div>
          <ol className="m-0 list-none p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-space-md gap-x-gutter relative">
            <span className="hidden lg:block absolute top-6 left-6 right-6 h-px bg-primary-container/20" aria-hidden="true" />
            {steps.map((s, i) => (
              <li key={s.t} className="relative flex lg:flex-col gap-4 lg:gap-3">
                <span className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md ring-4 ring-surface-container-lowest">
                  <span className="material-symbols-outlined text-[22px]">{s.icon}</span>
                </span>
                <div>
                  <span className="font-display-hero text-headline-md font-extrabold text-tertiary-fixed-dim leading-none">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-subheading text-subheading text-on-surface font-bold mt-1 text-balance"><T>{s.t}</T></h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-pretty"><T>{s.d}</T></p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Status band */}
      <section className="w-full relative bg-[#022E31] text-surface-container-lowest py-space-xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none flex items-center justify-between">
          <div className="w-80 h-80 -ml-20 rounded-full bg-primary-fixed-dim blur-3xl" />
          <div className="w-96 h-96 -mr-20 rounded-full bg-secondary-container blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin relative z-10 flex flex-col lg:flex-row items-center justify-between gap-space-lg">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl sm:rounded-full bg-tertiary-container/30 text-tertiary-fixed font-label-md text-label-md uppercase tracking-wider font-semibold text-left leading-snug">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-pulse shrink-0" />
              <T>Penerimaan peserta didik baru TA 2027/2028</T>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-surface-container-lowest font-extrabold tracking-tight text-balance">
              <T>Pendaftaran Gelombang&nbsp;1</T><br className="hidden sm:inline" />{" "}<T>Telah Dibuka</T>
            </h2>
            <p className="font-body-md text-body-md text-surface-dim max-w-lg text-pretty mx-auto lg:mx-0"><T>Ikuti observasi calon siswa dan wawancara orang tua untuk tahun akademik 2027/2028.</T></p>
          </div>
          <div className="flex flex-col gap-3 w-full sm:w-auto lg:w-[24rem]">
          <div className="flex items-center gap-4 rounded-2xl bg-[#012224]/80 backdrop-blur-md p-4 sm:p-5 text-left">
            <span className="w-12 h-12 rounded-xl bg-tertiary-container/30 text-tertiary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">event_available</span>
            </span>
            <span className="flex flex-col min-w-0">
              <span className="font-caption text-caption text-surface-dim uppercase tracking-widest"><T>Gelombang 1</T></span>
              <span className="font-subheading text-subheading text-surface-container-lowest font-bold"><T>1 Okt – 30 Nov 2026</T></span>
              <span className="font-caption text-caption text-surface-dim"><T>atau hingga kuota terpenuhi</T></span>
            </span>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <a href={waLinkFor(contact, "Assalamu'alaikum, saya ingin konsultasi PPDB 2027/2028 Al Fakhir School.")} target="_blank" rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-secondary-container hover:bg-secondary text-surface-container-lowest font-label-lg text-label-lg uppercase tracking-wider text-center transition-all duration-300 shadow-md flex items-center justify-center gap-2 no-underline whitespace-nowrap">
              <span className="material-symbols-outlined text-[18px]">chat</span><span><T>Konsultasi PPDB via WhatsApp</T></span>
            </a>
            <SiteLink href="/kontak" className="px-6 py-3.5 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-surface-container-lowest font-label-lg text-label-lg tracking-wide text-center transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 no-underline whitespace-nowrap">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span><span><T>Jadwalkan kunjungan</T></span>
            </SiteLink>
          </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 flex flex-col gap-space-md">
              <div>
                <Eyebrow><T>Bantuan</T></Eyebrow>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-extrabold tracking-tight"><T>Pertanyaan umum</T></h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-3 text-pretty"><T>Belum menemukan jawabannya? Tim informasi kami siap membantu melalui WhatsApp.</T></p>
              </div>
              <div className="rounded-xl bg-surface-container-lowest border border-primary-container/10 p-space-md flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[22px]">chat</span>
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span className="font-caption text-caption text-outline font-semibold uppercase tracking-wider"><T>WhatsApp</T></span>
                    <span className="font-subheading text-subheading text-on-surface font-bold">{contact.waDisplay}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-tertiary shrink-0">
                    <span className="material-symbols-outlined text-[22px]">schedule</span>
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span className="font-caption text-caption text-outline font-semibold uppercase tracking-wider"><T>Jam layanan</T></span>
                    <span className="font-body-md text-body-md text-on-surface"><T>Senin – Sabtu, 07.30 – 16.00 WIB</T></span>
                  </span>
                </div>
                <a href={waLinkFor(contact, "Assalamu'alaikum, saya ingin bertanya tentang PPDB 2027/2028.")} target="_blank" rel="noopener noreferrer"
                  className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg uppercase tracking-wider shadow-md transition-all no-underline whitespace-nowrap">
                  <span className="material-symbols-outlined text-[18px]">help</span><T>Tanyakan via WhatsApp</T>
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <FaqAccordion items={faq} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin mt-space-xl">
          <StarDivider />
        </div>
      </section>

      {/* CTA */}
      <section className="w-full pb-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="rounded-2xl bg-surface-container-low p-space-lg md:p-space-xl flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div>
              <h2 className="font-headline-md text-headline-sm md:text-headline-md text-primary font-bold text-balance"><T>Siap mendaftarkan ananda?</T></h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-pretty"><T>Pilih jenjang di atas atau hubungi kami langsung.</T></p>
            </div>
            <a href={waLinkFor(contact, "Assalamu'alaikum, saya ingin menanyakan PPDB 2027/2028.")} target="_blank" rel="noopener noreferrer"
              className="self-stretch md:self-auto justify-center px-7 py-3.5 rounded-full bg-secondary-container hover:bg-secondary text-on-primary font-label-lg text-label-lg uppercase tracking-wider shadow-md transition-all inline-flex items-center gap-2 no-underline whitespace-nowrap">
              <span className="material-symbols-outlined text-[18px]">chat</span><T>Hubungi via WhatsApp</T>
            </a>
          </div>
        </div>
      </section>
    </div>
    </Scope>
  );
}

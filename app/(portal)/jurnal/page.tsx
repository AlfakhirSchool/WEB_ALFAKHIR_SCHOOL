import type { Metadata } from "next";
import { SiteLink } from "@/components/SiteTransition";
import { PageHero } from "@/components/pages/portal-shared/PageHero";
import { Eyebrow, StarDivider, StarGlyph, Watermark } from "@/components/pages/portal-shared/Ornaments";
import { JurnalList } from "@/components/pages/portal-jurnal/JurnalList";
import { Scope, T } from "@/components/content/T";
import { Img } from "@/components/content/Img";
import { getPublishedJournals } from "@/lib/content/journals";

export const metadata: Metadata = {
  title: "Jurnal & Karya Tulis Siswa | Al Fakhir School",
  description: "Perpustakaan karya tulis ilmiah (KTI), laporan eksperimen sains, dan jurnal siswa SD dan SMP Islam Modern Al Fakhir.",
};

const FEATURED_ABSTRACTS: { jenjang: "SD" | "SMP"; year: string; badge: string; title: string; author: string; className: string; abstract: string; href: string }[] = [
  {
    jenjang: "SMP" as const,
    year: "2025",
    badge: "Medali Emas · ISIF 2025 Bali",
    title: "Penelitian dan Inovasi Delegasi SMP Islam Modern Al Fakhir di International Science Innovation Fair 2025",
    author: "Amr Wahyu & Gendis",
    className: "Delegasi SMP",
    abstract:
      "Mempresentasikan penelitian dan inovasi di hadapan dewan juri pada ajang inovasi sains internasional di Bali, 11–16 November 2025, dan membawa pulang Medali Emas.",
    href: "/smp/kesiswaan",
  },
  {
    jenjang: "SMP" as const,
    year: "2025",
    badge: "Medali Silver · IIF 2025",
    title: "Potensi Buah Bit (Beta Vulgaris) sebagai Alternatif Alami untuk Mengatasi Hiperpigmentasi Bibir",
    author: "Azizah, Nindi, Matine, Nada, Zavier & Zidan",
    className: "Tim SMP",
    abstract:
      "Karya ilmiah yang dipresentasikan secara daring pada Invention and Innovation Fair (IIF) 2025, 10–12 Maret 2025, dan meraih Medali Silver.",
    href: "/smp/kesiswaan",
  },
  {
    jenjang: "SMP" as const,
    year: "2024",
    badge: "Medali Perak · NSIF 2024 Denpasar",
    title: "Analisis Pemahaman Konsep Matematika di Era Society 5.0",
    author: "Faiqah Kamilah & Hafidzah Nur Radhwa",
    className: "Delegasi SMP",
    abstract:
      "Penelitian yang dipresentasikan di National Science & Innovation Fair (NSIF), Denpasar, Bali, 6–10 November 2024, dan meraih medali perak.",
    href: "/smp/kesiswaan",
  },
];

export default async function Jurnal() {
  const journals = await getPublishedJournals();
  return (
    <Scope id="portal/jurnal">
      <div className="w-full bg-surface">
        <PageHero
          eyebrow="Karya Siswa"
          title={
            <>
              <T>Jurnal &amp; Karya</T>
              <br />
              <span className="bg-gradient-to-r from-secondary-container via-tertiary-fixed-dim to-primary-container bg-clip-text text-transparent">
                <T>Cendekia Al Fakhir</T>
              </span>
            </>
          }
          lead={
            <T>
              Kumpulan Karya Tulis Ilmiah (KTI), laporan proyek sains STEAM, dan jurnal siswa SD serta SMP Islam Modern Al Fakhir. Membudayakan nalar kritis, kejujuran ilmiah, dan literasi sejak dini.
            </T>
          }
          aside={
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-primary-container/10 shadow-xl p-5 md:p-6">
              <Watermark className="absolute -right-20 -top-20 w-64 h-64 text-primary" />
              <div className="relative flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-2 font-label-md text-label-md text-primary font-bold uppercase tracking-widest">
                  <StarGlyph className="w-3.5 h-3.5 text-secondary-container" />
                  <T>Publikasi Berkala</T>
                </span>
                <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-bold">
                  <T>e-ISSN 2987-991X</T>
                </span>
              </div>
              <div className="relative h-56 rounded-xl overflow-hidden bg-surface-container mb-4">
                <Img
                  src="/design/smp-kesiswaan/10.jpg"
                  alt="Sampul Jurnal Cendekiawan Cilik Al Fakhir"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent flex flex-col justify-end p-4 text-on-primary">
                  <span className="font-caption text-caption text-tertiary-fixed uppercase tracking-wider font-bold">
                    <T>Jurnal Cendekiawan Cilik Al Fakhir</T>
                  </span>
                  <p className="font-headline-sm text-headline-sm font-bold leading-snug mt-0.5">
                    <T>Kompilasi Riset &amp; Karya Tulis Ilmiah Siswa</T>
                  </p>
                </div>
              </div>
              <div className="relative grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-surface-container-low p-2.5">
                  <span className="block font-headline-sm text-headline-sm font-extrabold text-primary"><T>2 Edisi</T></span>
                  <span className="font-caption text-caption text-on-surface-variant"><T>Per Tahun</T></span>
                </div>
                <div className="rounded-xl bg-surface-container-low p-2.5">
                  <span className="block font-headline-sm text-headline-sm font-extrabold text-secondary"><T>IMRAD</T></span>
                  <span className="font-caption text-caption text-on-surface-variant"><T>Standar Naskah</T></span>
                </div>
                <div className="rounded-xl bg-surface-container-low p-2.5">
                  <span className="block font-headline-sm text-headline-sm font-extrabold text-tertiary"><T>SD &amp; SMP</T></span>
                  <span className="font-caption text-caption text-on-surface-variant"><T>Terintegrasi</T></span>
                </div>
              </div>
            </div>
          }
        />

        <section className="w-full py-space-xl bg-surface">
          <JurnalList journals={journals} />
        </section>

        <section className="w-full py-space-xl bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-space-lg">
              <div className="max-w-2xl">
                <Eyebrow dot="bg-secondary-container" className="text-secondary">
                  <T>Sorotan Riset &amp; Eksperimen</T>
                </Eyebrow>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-extrabold tracking-tight text-balance">
                  <T>Karya Riset Siswa di Ajang Sains &amp; Inovasi</T>
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 text-pretty">
                  <T>Karya riset dan inovasi siswa SMP Islam Modern Al Fakhir yang diikutsertakan di ajang sains dan inovasi tingkat nasional maupun internasional.</T>
                </p>
              </div>
              <SiteLink
                href="/smp/kesiswaan"
                className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container/10 hover:bg-primary-container/20 text-primary font-label-lg text-label-lg uppercase tracking-wider transition-colors no-underline whitespace-nowrap"
              >
                <T>Lihat Galeri Prototipe SMP</T>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </SiteLink>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
              {FEATURED_ABSTRACTS.map((item) => (
                <article
                  key={item.title}
                  className="bg-surface rounded-2xl p-6 border border-primary-container/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-surface-container-lowest font-label-md text-label-md font-bold uppercase tracking-wider ${
                          item.jenjang === "SD" ? "bg-secondary-container" : "bg-primary-container"
                        }`}
                      >
                        {item.jenjang}
                      </span>
                      <span className="font-caption text-caption font-semibold text-tertiary bg-tertiary-fixed/50 px-2.5 py-1 rounded-full">
                        <T>{item.badge}</T>
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-snug text-pretty">
                      <T>{item.title}</T>
                    </h3>
                    <p className="mt-2 font-label-md text-label-md text-primary font-bold">
                      <T>{item.author}</T>{" "}
                      <span className="text-on-surface-variant font-normal">
                        · <T>{item.className}</T> ({item.year})
                      </span>
                    </p>
                    <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-pretty">
                      <T>{item.abstract}</T>
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-primary-container/10 flex items-center justify-between">
                    <span className="font-caption text-caption text-outline uppercase tracking-wider font-semibold">
                      <T>Dari Berita Sekolah</T>
                    </span>
                    <SiteLink
                      href={item.href}
                      className="inline-flex items-center gap-1.5 font-label-md text-label-md font-bold text-primary hover:text-secondary transition-colors no-underline"
                    >
                      <T>Selengkapnya</T>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </SiteLink>
                  </div>
                </article>
              ))}
            </div>

            <StarDivider className="mt-space-xl" />
          </div>
        </section>
      </div>
    </Scope>
  );
}

import { PageHero } from "@/components/pages/portal-shared/PageHero";
import { StarGlyph, Watermark } from "@/components/pages/portal-shared/Ornaments";
import { DokumenForm } from "@/components/pages/portal-dokumen/DokumenForm";
import { Scope, T } from "@/components/content/T";

export default function Dokumen() {
  return (
    <Scope id="portal/dokumen">
      <div className="w-full bg-surface">
        <PageHero
          eyebrow="Dokumen Siswa"
          title={
            <>
              <T>Unduh Dokumen</T>
              <br />
              <span className="bg-gradient-to-r from-secondary-container via-tertiary-fixed-dim to-primary-container bg-clip-text text-transparent">
                <T>Profil &amp; PPDB Siswa</T>
              </span>
            </>
          }
          lead={<T>Masukkan NIS untuk mengunduh profil siswa dan formulir PPDB. Dokumen dibuat otomatis dari data sekolah dan dikunci dengan NIS siswa.</T>}
        />
        <section className="w-full py-space-xl bg-surface">
          <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-tablet">
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-primary-container/10 shadow-xl p-5 sm:p-8">
              <Watermark className="absolute -right-24 -top-24 w-72 h-72 text-primary pointer-events-none" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 font-label-md text-label-md text-primary font-bold uppercase tracking-widest mb-4">
                  <StarGlyph className="w-3.5 h-3.5 text-secondary-container" />
                  <T>Unduhan Mandiri</T>
                </span>
                <DokumenForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Scope>
  );
}

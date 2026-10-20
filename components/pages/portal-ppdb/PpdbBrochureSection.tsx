import type { PpdbBrochure } from "@/content/settings";
import { T } from "@/components/content/T";

export type BrochureEntry = {
  badge: string;
  brochure: PpdbBrochure;
};

function downloadUrl(url: string): string {
  return url.includes("?") ? `${url}&download=1` : `${url}?download=1`;
}

export function PpdbBrochureSection({
  items,
  className = "bg-surface",
}: {
  items: BrochureEntry[];
  className?: string;
}) {
  const valid = items.filter((it) => it.brochure?.url);
  if (valid.length === 0) return null;

  return (
    <section id="brosur-ppdb" className={`w-full py-space-xl ${className} scroll-mt-24`}>
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-3xl mb-space-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
            <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-primary">
              <T>Dokumen &amp; Informasi Resmi</T>
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-extrabold tracking-tight text-balance">
            <T>Brosur &amp; Pamflet PPDB</T>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 text-pretty">
            <T>Lihat atau unduh brosur resmi pendaftaran, rincian program, dan panduan investasi pendidikan Al Fakhir School.</T>
          </p>
        </div>

        <div className={`grid grid-cols-1 ${valid.length > 1 ? "lg:grid-cols-2" : ""} gap-gutter`}>
          {valid.map(({ badge, brochure }, idx) => {
            const isPdf = brochure.kind === "pdf" || /\.pdf$/i.test(brochure.fileName ?? "");
            return (
              <div
                key={`${brochure.url}-${idx}`}
                className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 border border-primary-container/10 shadow-sm flex flex-col justify-between gap-6"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed/60 px-3.5 py-1 font-label-md text-label-md font-bold uppercase tracking-wider text-secondary">
                      <span className="material-symbols-outlined text-[16px]">{isPdf ? "picture_as_pdf" : "image"}</span>
                      {badge}
                    </span>
                    {brochure.fileName && (
                      <span className="font-caption text-caption text-on-surface-variant truncate max-w-[16rem]">{brochure.fileName}</span>
                    )}
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold text-balance">{brochure.title}</h3>

                  {!isPdf ? (
                    <a
                      href={brochure.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block overflow-hidden rounded-2xl border border-primary-container/10 bg-surface-container-low"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={brochure.url}
                        alt={brochure.title}
                        className="w-full max-h-[28rem] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </a>
                  ) : (
                    <div className="rounded-2xl bg-surface-container-low p-5 flex items-center gap-4">
                      <span className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-[28px]">description</span>
                      </span>
                      <div className="min-w-0">
                        <p className="font-title-md text-title-md text-primary font-bold">
                          <T>Dokumen Panduan &amp; Brosur Resmi (PDF)</T>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          <T>Klik tombol di bawah untuk membuka langsung di browser atau mengunduh ke perangkat Anda.</T>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2 border-t border-primary-container/10">
                  <a
                    href={downloadUrl(brochure.url)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-container text-on-primary px-6 py-3 font-label-lg text-label-lg font-bold shadow-sm transition-all no-underline"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span><T>Unduh Brosur</T></span>
                  </a>
                  <a
                    href={brochure.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary px-6 py-3 font-label-lg text-label-lg font-bold transition-all no-underline"
                  >
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                    <span>{isPdf ? <T>Buka PDF</T> : <T>Lihat Ukuran Penuh</T>}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

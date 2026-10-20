import { notFound } from "next/navigation";
import { SiteLink } from "@/components/SiteTransition";
import { Img } from "@/components/content/Img";
import { Scope, T } from "@/components/content/T";
import { StarGlyph, Watermark } from "@/components/pages/portal-shared/Ornaments";
import { NewsLink } from "@/components/pages/portal-shared/NewsLink";
import { newsArticles } from "@/content/news-articles";
import type { Jenjang } from "@/content/site";
import { getSettings } from "@/lib/content/store";

const badge: Record<Jenjang, string> = {
  SD: "bg-secondary-container text-surface-container-lowest",
  SMP: "bg-primary-container text-surface-container-lowest",
  UMUM: "bg-tertiary-container text-surface-container-lowest",
};

function splitParagraphs(text: string): string[] {
  const raw = text.replace(/\r\n/g, "\n").trim();
  if (!raw) return [];
  const byDouble = raw.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  if (byDouble.length > 1) return byDouble;
  return raw.split(/\n+/).map((p) => p.trim()).filter(Boolean);
}

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { news } = await getSettings();
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();

  const detail = newsArticles[item.slug];
  const fullBody = (item.body && item.body.trim()) || detail?.body || item.summary;
  const paragraphs = splitParagraphs(fullBody);
  const related = news.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <Scope id={`portal/berita/${item.slug}`}>
      <article className="w-full bg-surface pb-space-2xl">
        {/* Hero Header */}
        <header className="relative overflow-hidden bg-gradient-to-br from-[#022E31] via-[#043C40] to-[#064E53] text-inverse-on-surface pt-28 pb-16 md:pt-36 md:pb-24">
          <Watermark className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 text-primary-fixed opacity-10" />
          <div className="relative mx-auto max-w-4xl px-margin-mobile md:px-margin-tablet lg:px-margin">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <SiteLink
                href="/berita"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-label-md text-label-md text-primary-fixed hover:bg-white/20 transition-colors no-underline"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <T>Semua Berita</T>
              </SiteLink>
              <span className={`inline-flex items-center justify-center rounded-full px-3.5 py-1 font-label-md text-label-md font-bold uppercase tracking-wider ${badge[item.jenjang]}`}>
                {item.jenjang}
              </span>
              {detail?.category && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 font-label-md text-label-md text-tertiary-fixed uppercase tracking-wider">
                  <StarGlyph className="h-2.5 w-2.5 text-tertiary-fixed" />
                  {detail.category}
                </span>
              )}
              <span className="font-caption text-caption text-surface-dim">{item.date}</span>
              {detail?.author && (
                <span className="font-caption text-caption text-surface-dim">
                  · Oleh <strong className="text-primary-fixed font-semibold">{detail.author}</strong>
                </span>
              )}
            </div>

            <h1 className="font-headline-lg text-headline-lg-mobile md:text-display-sm text-white font-extrabold tracking-tight text-balance leading-tight">
              {item.title}
            </h1>

            {detail?.longTitle && detail.longTitle !== item.title && (
              <p className="mt-4 font-subheading text-subheading text-primary-fixed/90 text-pretty">
                {detail.longTitle}
              </p>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl px-margin-mobile md:px-margin-tablet lg:px-margin -mt-8 md:-mt-12 relative z-10">
          {item.image && (
            <div className="mb-8 overflow-hidden rounded-2xl bg-surface-container shadow-2xl border border-primary-container/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Img
                src={item.image}
                alt={item.title}
                className="w-full max-h-[520px] object-cover"
              />
            </div>
          )}

          <div className="rounded-2xl bg-surface-container-lowest p-6 sm:p-8 md:p-12 shadow-lg border border-primary-container/10">
            <div className="space-y-5 font-body-lg text-body-md md:text-body-lg text-on-surface leading-relaxed">
              {paragraphs.map((p, idx) => {
                const isSubhead = p.length < 110 && (/^(DAY \d+|Hari [A-Za-z0-9]+|[0-9]+\.|✨|🏆|🥇|🥈|📌|🎯)/i.test(p) || (!p.endsWith(".") && idx > 0 && p.length < 70));
                if (isSubhead) {
                  return (
                    <h2 key={idx} className="pt-3 font-headline-sm text-headline-sm text-primary font-bold">
                      {p}
                    </h2>
                  );
                }
                return (
                  <p key={idx} className="text-pretty whitespace-pre-line">
                    {p}
                  </p>
                );
              })}
            </div>

            <div className="mt-10 pt-6 border-t border-primary-container/15 flex flex-wrap items-center justify-between gap-4">
              <SiteLink
                href="/berita"
                className="inline-flex items-center gap-2 font-label-lg text-label-lg text-primary font-bold uppercase tracking-wider hover:underline no-underline"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <T>Kembali ke Daftar Berita</T>
              </SiteLink>

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-caption text-caption text-on-surface-variant hover:text-primary transition-colors no-underline"
                >
                  <span>Arsip sumber asli</span>
                  <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Related News */}
        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-margin-mobile md:px-margin-tablet lg:px-margin mt-16">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-primary-container/15">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                <T>Berita &amp; Kegiatan Lainnya</T>
              </h2>
              <SiteLink href="/berita" className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider no-underline hover:underline">
                <T>Lihat Semua</T>
              </SiteLink>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <NewsLink
                  key={r.slug}
                  item={r}
                  fallbackHref="/berita"
                  className="group flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest border border-primary-container/10 shadow-sm hover:shadow-md transition-all no-underline"
                >
                  {r.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <Img src={r.image} alt="" className="w-full aspect-[16/10] object-cover bg-surface-container" />
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full font-caption text-caption font-bold uppercase ${badge[r.jenjang]}`}>
                        {r.jenjang}
                      </span>
                      <span className="font-caption text-caption text-outline">{r.date}</span>
                    </div>
                    <h3 className="font-subheading text-subheading text-on-surface font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {r.title}
                    </h3>
                    <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {r.summary}
                    </p>
                  </div>
                </NewsLink>
              ))}
            </div>
          </section>
        )}
      </article>
    </Scope>
  );
}

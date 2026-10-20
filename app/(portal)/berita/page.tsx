import { NewsLink } from "@/components/pages/portal-shared/NewsLink";
import { PageHero } from "@/components/pages/portal-shared/PageHero";
import { BeritaList } from "@/components/pages/portal-berita/BeritaList";
import { StarGlyph, Watermark } from "@/components/pages/portal-shared/Ornaments";
import { Scope, T } from "@/components/content/T";
import { getSettings } from "@/lib/content/store";
import type { Jenjang } from "@/content/site";
import type { NewsItem } from "@/content/settings";
import { Img } from "@/components/content/Img";

const tone: Record<Jenjang, { badge: string; dot: string; label: string }> = {
  SD: { badge: "bg-secondary-container", dot: "bg-secondary-container", label: "SD" },
  SMP: { badge: "bg-primary-container", dot: "bg-primary-container", label: "SMP" },
  UMUM: { badge: "bg-tertiary-container", dot: "bg-tertiary-container", label: "Umum" },
};
const dest: Record<Jenjang, string> = { SD: "/sd/kegiatan", SMP: "/smp/kesiswaan", UMUM: "/berita" };

function Sorotan({ news }: { news: NewsItem[] }) {
  const latest = news[0];
  if (!latest) return null;
  const counts = (["SD", "SMP", "UMUM"] as const).map((j) => ({ j, n: news.filter((x) => x.jenjang === j).length })).filter((c) => c.n > 0);
  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-primary-container/10 shadow-xl p-6 md:p-space-lg hidden lg:block">
      <Watermark className="absolute -right-20 -top-20 w-64 h-64 text-primary" />
      <div className="relative flex items-center gap-2 font-label-md text-label-md text-primary font-bold uppercase tracking-widest">
        <StarGlyph className="w-3.5 h-3.5 text-secondary-container" /><T>Sorotan terbaru</T>
      </div>
      <NewsLink item={latest} fallbackHref={dest[latest.jenjang]} className="group relative mt-4 block no-underline">
        {latest.image && (
          // eslint-disable-next-line @next/next/no-img-element -- dashboard uploads are served from /api/media
          <Img src={latest.image} alt="" className="mb-4 w-full aspect-[16/9] rounded-xl object-cover bg-surface-container" />
        )}
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full ${tone[latest.jenjang].badge} text-surface-container-lowest font-label-md text-label-md font-bold uppercase tracking-wider`}>{latest.jenjang}</span>
          <span className="font-caption text-caption text-outline">{latest.date}</span>
        </div>
        <h2 className="mt-3 font-headline-sm text-headline-sm text-on-surface font-bold text-pretty group-hover:text-primary transition-colors">{latest.title}</h2>
        <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant text-pretty line-clamp-2">{latest.summary}</p>
        <span className="mt-4 inline-flex items-center gap-2 font-label-lg text-label-lg text-primary uppercase tracking-wider">
          <T>Baca selengkapnya</T>
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
        </span>
      </NewsLink>
      <div className="relative mt-space-md pt-space-md border-t border-primary-container/10 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="font-label-md text-label-md text-on-surface font-bold">{news.length} <T>berita</T></span>
        {counts.map(({ j, n }) => (
          <span key={j} className="inline-flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
            <span className={`w-2 h-2 rounded-full ${tone[j].dot}`} /><T>{tone[j].label}</T> · {n}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function Berita() {
  const { news } = await getSettings();
  return (
    <Scope id="portal/berita">
      <div className="w-full bg-surface">
        <PageHero eyebrow="Kabar" title={<T>Berita Al Fakhir</T>} lead={<T>Kabar terbaru dari SD dan SMP Islam Modern Al Fakhir: kegiatan, prestasi, dan dinamika civitas.</T>} aside={<Sorotan news={news} />} />
        <section className="w-full py-space-xl bg-surface">
          <BeritaList />
        </section>
      </div>
    </Scope>
  );
}

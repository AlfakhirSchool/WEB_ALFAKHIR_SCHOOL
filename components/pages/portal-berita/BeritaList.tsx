"use client";
import { useEffect, useState } from "react";
import { NewsLink } from "@/components/pages/portal-shared/NewsLink";
import type { Jenjang } from "@/content/site";
import { StarGlyph } from "@/components/pages/portal-shared/Ornaments";
import { T } from "@/components/content/T";
import { useSettings } from "@/components/content/ContentProvider";
import { Img } from "@/components/content/Img";

type Filter = "Semua" | Jenjang;

const badge: Record<Jenjang, string> = {
  SD: "bg-secondary-container",
  SMP: "bg-primary-container",
  UMUM: "bg-tertiary-container",
};
const hoverTitle: Record<Jenjang, string> = {
  SD: "group-hover:text-secondary",
  SMP: "group-hover:text-primary",
  UMUM: "group-hover:text-tertiary-container",
};
const arrow: Record<Jenjang, string> = {
  SD: "text-secondary-container group-hover:bg-secondary-container",
  SMP: "text-primary group-hover:bg-primary",
  UMUM: "text-tertiary group-hover:bg-tertiary-container",
};
const dest: Record<Jenjang, string> = { SD: "/sd/kegiatan", SMP: "/smp/kesiswaan", UMUM: "/berita" };
const labels: Record<Filter, string> = { Semua: "Semua", SD: "SD", SMP: "SMP", UMUM: "Umum" };

const PAGE_SIZE = 10;

export function BeritaList() {
  const { news } = useSettings();
  const [f, setF] = useState<Filter>("Semua");
  const [shown, setShown] = useState(PAGE_SIZE);
  const filters: Filter[] = ["Semua", ...(["SD", "SMP", "UMUM"] as const).filter((j) => news.some((n) => n.jenjang === j))];
  const items = news.filter((n) => f === "Semua" || n.jenjang === f);
  const visible = items.slice(0, shown);

  // A link such as /berita#<slug> must work even when that item is beyond the first page.
  useEffect(() => {
    const slug = decodeURIComponent(window.location.hash.slice(1));
    const idx = slug ? news.findIndex((n) => n.slug === slug) : -1;
    if (idx < 0) return;
    setF("Semua");
    setShown(Math.max(PAGE_SIZE, Math.ceil((idx + 1) / PAGE_SIZE) * PAGE_SIZE));
    requestAnimationFrame(() => document.getElementById(slug)?.scrollIntoView());
  }, [news]);

  return (
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-space-lg pb-4 border-b border-primary-container/15">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
            <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider"><T>Warta &amp; Dinamika Civitas</T></span>
          </div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-extrabold tracking-tight text-balance"><T>Kabar &amp; Prestasi Al Fakhir</T></h2>
        </div>
        <div className="grid grid-flow-col auto-cols-fr gap-2 shrink-0 sm:flex sm:flex-wrap" role="group" aria-label="Filter jenjang">
          {filters.map((k) => {
            const on = f === k;
            return (
              <button key={k} type="button" onClick={() => { setF(k); setShown(PAGE_SIZE); }} aria-pressed={on}
                className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-5 py-2.5 min-h-11 rounded-full font-label-lg text-label-lg uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${on ? "bg-primary text-on-primary shadow-md" : "bg-primary-container/10 text-primary hover:bg-primary-container/20"}`}>
                {on && <StarGlyph className="w-2 h-2 text-tertiary-fixed-dim" />}
                <T>{labels[k]}</T>
              </button>
            );
          })}
        </div>
      </div>

      <p className="font-caption text-caption text-outline mb-2" aria-live="polite">
        {items.length} <T>berita</T>{f !== "Semua" && <>{" · "}<T>{labels[f]}</T></>}
      </p>

      {items.length === 0 ? (
        <p className="py-space-xl text-center font-body-md text-body-md text-on-surface-variant"><T>Belum ada berita untuk jenjang ini.</T></p>
      ) : (
        <div className="flex flex-col">
          {visible.map((n) => (
            <div key={n.slug} id={n.slug} className="border-b border-primary-container/10 last:border-b-0 scroll-mt-28">
            <NewsLink item={n} fallbackHref={dest[n.jenjang]}
              className="group flex items-center justify-between gap-4 py-space-md hover:bg-surface-container-lowest/70 transition-all duration-200 px-4 -mx-4 rounded-xl no-underline">
              {n.image && (
                // eslint-disable-next-line @next/next/no-img-element -- dashboard uploads are served from /api/media
                <Img src={n.image} alt="" loading="lazy" decoding="async" className="self-start lg:self-center shrink-0 w-16 h-16 sm:w-28 sm:h-20 rounded-lg object-cover bg-surface-container" />
              )}
              <div className="flex-1 min-w-0 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-space-md">
                <div className="shrink-0 flex items-center gap-3 lg:w-44">
                  <span className={`inline-flex items-center justify-center min-w-[4.75rem] px-3 py-1 rounded-full ${badge[n.jenjang]} text-surface-container-lowest font-label-md text-label-md font-bold uppercase tracking-wider whitespace-nowrap`}>{n.jenjang}</span>
                  <span className="font-caption text-caption text-outline whitespace-nowrap">{n.date}</span>
                </div>
                <div className="min-w-0 flex-1 max-w-3xl">
                  <h3 className={`font-subheading text-subheading text-on-surface font-bold transition-colors text-pretty ${hoverTitle[n.jenjang]}`}>{n.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-pretty line-clamp-3">{n.summary}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-bold uppercase tracking-wider">
                    <T>Baca artikel lengkap</T>
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">menu_book</span>
                  </span>
                </div>
              </div>
              <div className={`shrink-0 w-10 h-10 rounded-full bg-surface-container group-hover:text-surface-container-lowest flex items-center justify-center transition-all duration-300 group-hover:rotate-[-45deg] shadow-sm ${arrow[n.jenjang]}`}>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </div>
            </NewsLink>
            </div>
          ))}
        </div>
      )}

      {items.length > shown && (
        <div className="mt-space-lg flex justify-center">
          <button type="button" onClick={() => setShown((s) => s + PAGE_SIZE)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-11 rounded-full bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider shadow-md hover:bg-primary-container transition-colors">
            <T>Muat lebih banyak</T>
            <span className="opacity-80">({items.length - shown})</span>
          </button>
        </div>
      )}
    </div>
  );
}

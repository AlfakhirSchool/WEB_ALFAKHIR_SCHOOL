"use client";
import { useMemo, useState } from "react";
import { StarGlyph } from "@/components/pages/portal-shared/Ornaments";
import { T } from "@/components/content/T";
import { formatBytes, type JournalItem, type JournalJenjang } from "@/lib/content/journal-types";

type Filter = "Semua" | JournalJenjang;

const badge: Record<JournalJenjang, string> = { SD: "bg-secondary-container", SMP: "bg-primary-container" };

export function JurnalList({ journals }: { journals: JournalItem[] }) {
  const [f, setF] = useState<Filter>("Semua");
  const [q, setQ] = useState("");
  const filters: Filter[] = ["Semua", ...(["SD", "SMP"] as const).filter((j) => journals.some((x) => x.jenjang === j))];
  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return journals.filter((j) => (f === "Semua" || j.jenjang === f) && (!needle || `${j.title} ${j.author} ${j.className} ${j.year} ${j.abstract}`.toLowerCase().includes(needle)));
  }, [journals, f, q]);

  return (
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-space-lg pb-4 border-b border-primary-container/15">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
            <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider"><T>Perpustakaan Karya</T></span>
          </div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-extrabold tracking-tight text-balance"><T>Karya Tulis Siswa Al Fakhir</T></h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 lg:items-center">
          <label className="relative block sm:w-72">
            <span className="sr-only"><T>Cari jurnal</T></span>
            <span aria-hidden="true" className="material-symbols-outlined pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-outline">search</span>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari judul atau penulis…"
              className="block w-full min-h-11 rounded-full border border-primary-container/20 bg-surface-container-lowest pl-11 pr-4 font-body-sm text-body-sm text-on-surface outline-none placeholder:text-outline focus:border-primary focus:ring-4 focus:ring-primary/10" />
          </label>
          {filters.length > 1 && (
            <div className="grid grid-flow-col auto-cols-fr gap-2 shrink-0 sm:flex sm:flex-wrap" role="group" aria-label="Filter jenjang">
              {filters.map((k) => {
                const on = f === k;
                return (
                  <button key={k} type="button" onClick={() => setF(k)} aria-pressed={on}
                    className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-5 py-2.5 min-h-11 rounded-full font-label-lg text-label-lg uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${on ? "bg-primary text-on-primary shadow-md" : "bg-primary-container/10 text-primary hover:bg-primary-container/20"}`}>
                    {on && <StarGlyph className="w-2 h-2 text-tertiary-fixed-dim" />}
                    <T>{k}</T>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <p className="font-caption text-caption text-outline mb-space-md" aria-live="polite">
        {items.length} <T>jurnal</T>{f !== "Semua" && <>{" · "}<T>{f}</T></>}
      </p>

      {items.length === 0 ? (
        <p className="py-space-xl text-center font-body-md text-body-md text-on-surface-variant text-pretty">
          {journals.length === 0 ? <T>Belum ada jurnal yang dipublikasikan.</T> : <T>Tidak ada jurnal yang cocok dengan pencarian.</T>}
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
          {items.map((j) => (
            <li key={j.id} className="flex flex-col rounded-2xl bg-surface-container-lowest border border-primary-container/10 shadow-sm hover:shadow-lg transition-shadow duration-300 p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center justify-center min-w-[4.25rem] px-3 py-1 rounded-full ${badge[j.jenjang]} text-surface-container-lowest font-label-md text-label-md font-bold uppercase tracking-wider`}>{j.jenjang}</span>
                {j.year && <span className="font-caption text-caption text-outline"><T>Tahun ajaran</T> {j.year}</span>}
              </div>
              <h3 className="mt-4 font-subheading text-subheading text-on-surface font-bold text-pretty [overflow-wrap:anywhere]">{j.title}</h3>
              <p className="mt-1.5 font-label-lg text-label-lg text-primary font-semibold">{j.author}{j.className && <span className="text-on-surface-variant font-normal"> · <T>Kelas</T> {j.className}</span>}</p>
              {j.abstract && <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant text-pretty line-clamp-4">{j.abstract}</p>}
              <div className="mt-auto pt-5 flex flex-wrap items-center gap-3">
                <a href={`/api/journal/${j.id}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity no-underline">
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">menu_book</span><T>Baca</T>
                </a>
                <a href={`/api/journal/${j.id}?download=1`} download={j.fileName}
                  className="inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full bg-primary-container/10 text-primary font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container/20 transition-colors no-underline">
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">download</span><T>Unduh</T>
                </a>
                <span className="font-caption text-caption text-outline">PDF · {formatBytes(j.fileSize)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { SiteLink } from "@/components/SiteTransition";
import { T } from "@/components/content/T";
import { Img } from "@/components/content/Img";

export function TwoDoors() {
  const [hover, setHover] = useState<"sd" | "smp" | null>(null);
  const cols =
    hover === "sd"
      ? "lg:grid-cols-[58%_42%]"
      : hover === "smp"
        ? "lg:grid-cols-[42%_58%]"
        : "lg:grid-cols-[50%_50%]";

  return (
    <div
      className={`w-full grid grid-cols-1 ${cols} rounded-2xl overflow-hidden shadow-xl bg-inverse-surface min-h-[580px] lg:min-h-[640px] transition-[grid-template-columns] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]`}
      id="twoDoorsContainer"
    >
      {/* Door 1: SD Islam Modern */}
      <SiteLink
        className="group relative flex flex-col justify-between gap-8 min-h-[420px] lg:min-h-0 p-6 md:p-space-xl overflow-hidden transition-all duration-700 ease-out focus:outline-none"
        href="/sd"
        id="doorSD"
        onMouseEnter={() => setHover("sd")}
        onMouseLeave={() => setHover(null)}
      >
        <div className="absolute inset-0 z-0">
          <Img
            alt="Murid SD Islam Modern Al Fakhir belajar di ruang terbuka"
            className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
            src="/design/beranda-portal/01.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#250d00] via-[#5c2000]/75 to-[#0c1e1f]/40 mix-blend-multiply opacity-90 transition-opacity duration-500 group-hover:opacity-85"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/80 via-secondary-container/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>
        </div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-secondary-container shadow-sm whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-secondary-container shrink-0"></span>
            <span className="font-label-md text-label-md tracking-wider uppercase font-semibold"><T>Kelas 1 – 6 · Usia 6–12 Tahun</T></span>
          </div>
          <span className="hidden sm:inline font-caption text-caption text-surface-container-lowest/80 tracking-widest uppercase font-semibold whitespace-nowrap"><T>Jenjang Dasar</T></span>
        </div>
        <div className="relative z-10 pt-space-xl">
          <div className="space-y-3">
            <span className="font-label-lg text-label-lg text-secondary-fixed uppercase tracking-wider block"><T>Portal Pendidikan Dasar</T></span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-surface-container-lowest font-extrabold tracking-tight group-hover:translate-x-1 transition-transform duration-300">
              <T>SD Islam Modern</T><br /><T>Al Fakhir</T>
            </h2>
            <p className="font-body-md text-body-md text-surface-dim/95 max-w-md pt-1 text-pretty">
              <T>Modern Islamic School · Bright • Brilliant • Faithful</T>
            </p>
          </div>
          <div className="mt-space-lg flex items-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-secondary-container group-hover:bg-secondary text-surface-container-lowest font-label-lg text-label-lg uppercase tracking-wider transition-all duration-300 shadow-md group-hover:shadow-lg whitespace-nowrap">
              <span><T>Masuk ke Situs SD</T></span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
            </div>
          </div>
        </div>
      </SiteLink>

      {/* Door 2: SMP Islam Modern */}
      <SiteLink
        className="group relative flex flex-col justify-between gap-8 min-h-[420px] lg:min-h-0 p-6 md:p-space-xl overflow-hidden transition-all duration-700 ease-out focus:outline-none border-t lg:border-t-0 lg:border-l border-surface-container-lowest/15"
        href="/smp"
        id="doorSMP"
        onMouseEnter={() => setHover("smp")}
        onMouseLeave={() => setHover(null)}
      >
        <div className="absolute inset-0 z-0">
          <Img
            alt="Pelajar SMP Islam Modern Al Fakhir presentasi karya ilmiah riset sains"
            className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
            src="/design/beranda-portal/02.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011b1d] via-[#022e31]/80 to-[#0c1e1f]/40 mix-blend-multiply opacity-90 transition-opacity duration-500 group-hover:opacity-85"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 via-primary-container/45 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500"></div>
        </div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-primary shadow-sm whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-primary-container shrink-0"></span>
            <span className="font-label-md text-label-md tracking-wider uppercase font-semibold"><T>Kelas 7 – 9 · Usia 12–15 Tahun</T></span>
          </div>
          <span className="hidden sm:inline font-caption text-caption text-surface-container-lowest/80 tracking-widest uppercase font-semibold whitespace-nowrap"><T>Jenjang Menengah</T></span>
        </div>
        <div className="relative z-10 pt-space-xl">
          <div className="space-y-3">
            <span className="font-label-lg text-label-lg text-primary-fixed uppercase tracking-wider block"><T>Portal Pendidikan Menengah</T></span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-surface-container-lowest font-extrabold tracking-tight group-hover:translate-x-1 transition-transform duration-300">
              <T>SMP Islam Modern</T><br /><T>Al Fakhir</T>
            </h2>
            <p className="font-body-md text-body-md text-surface-dim/95 max-w-md pt-1 text-pretty">
              <T>Tahfiz • Research • Character Building — Membentuk Generasi Qurani &amp; Berprestasi</T>
            </p>
          </div>
          <div className="mt-space-lg flex items-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary-container group-hover:bg-primary text-surface-container-lowest font-label-lg text-label-lg uppercase tracking-wider transition-all duration-300 shadow-md group-hover:shadow-lg whitespace-nowrap">
              <span><T>Masuk ke Situs SMP</T></span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
            </div>
          </div>
        </div>
      </SiteLink>
    </div>
  );
}

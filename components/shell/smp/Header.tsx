"use client";
import Image from "@/components/content/Image";
import { SiteLink } from "@/components/SiteTransition";
import { T } from "@/components/content/T";
import type { HeaderProps } from "../types";
import { useHeaderHeight } from "../sd/useHeaderHeight";

const ACTIVE = "bg-primary-container text-on-primary font-bold rounded-lg px-3 py-1.5 shadow-sm";
const IDLE = "text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all px-3 py-1.5 rounded-lg";

const nav = [
  { href: "/smp", label: "Beranda" },
  { href: "/smp/profil", label: "Profil SMP" },
  { href: "/smp/akademik", label: "Kurikulum & Riset" },
  { href: "/smp/kesiswaan", label: "Karya & Prestasi" },
  { href: "/smp/ppdb", label: "Beasiswa & PPDB" },
  { href: "/smp/kontak", label: "Kontak" },
];

/** Stitch variant B (PPDB, Kontak): top-strip links carry icons. Variant A: home, profil, akademik, kesiswaan. */
const isIconStrip = (p: string) => p === "/smp/ppdb" || p === "/smp/kontak";

export function Header({ pathname, menu, setMenu }: HeaderProps) {
  const ref = useHeaderHeight();
  const icons = isIconStrip(pathname);
  const stripLink = `hover:text-surface-container-lowest transition-colors${icons ? " flex items-center gap-1" : ""}`;
  return (
    <header ref={ref} className="md:whitespace-nowrap fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="bg-primary text-on-primary text-label-md py-1.5">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin flex flex-col md:flex-row justify-between items-center gap-x-4 gap-y-1">
          <div className="flex min-w-0 items-start md:items-center justify-center gap-2 font-medium text-center md:text-left">
            <span className="material-symbols-outlined shrink-0 text-tertiary-fixed text-[14px] mt-px md:mt-0">verified</span>
            <span className="text-balance md:truncate"><T>SMP Islam Modern Al Fakhir · Sawangan, Depok · Modern Islamic Education</T></span>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-primary-fixed whitespace-nowrap">
            <SiteLink className={stripLink} href="/">
              {icons && <span className="material-symbols-outlined text-[13px]">account_balance</span>}
              {icons ? <span><T>Portal Induk AL FAKHIR</T></span> : <T>Portal Induk AL FAKHIR</T>}
            </SiteLink>
            <span className="opacity-40">|</span>
            <SiteLink className={stripLink} href="/sd">
              {icons && <span className="material-symbols-outlined text-[13px]">school</span>}
              {icons ? <span><T>SD Islam Modern</T></span> : <T>SD Islam Modern</T>}
            </SiteLink>
            <span className="opacity-40 max-xl:hidden">|</span>
            <span className="flex items-center gap-1 max-xl:hidden">
              <span className="material-symbols-outlined text-[13px]">schedule</span><T>Senin - Sabtu: 07.30 - 16.00 WIB</T>
            </span>
          </div>
        </div>
      </div>
      <div className="h-20 max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin flex items-center justify-between gap-6">
        <SiteLink href="/smp" className="flex items-center gap-3.5">
          <Image alt="Logo SMP Islam Modern Al Fakhir" className="h-8 w-8 shrink-0 object-contain" src="/logo-smp.png" width={482} height={512} priority />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none max-sm:whitespace-nowrap"><T>SMP Islam Modern</T></span>
            <span className="font-caption text-caption uppercase text-tertiary font-semibold tracking-wider mt-1 hidden 2xl:block"><T>AL FAKHIR · MODERN ISLAMIC EDUCATION</T></span>
          </div>
        </SiteLink>
        <nav className="hidden xl:flex items-center gap-1 font-body-sm text-body-sm" data-active-classes={ACTIVE}>
          {nav.map((n) => {
            const on = n.href === pathname;
            return (
              <SiteLink key={n.href} href={n.href} aria-current={on ? "page" : undefined} className={on ? `transition-all ${ACTIVE}` : IDLE}><T>{n.label}</T></SiteLink>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 max-xl:shrink-0">
          <SiteLink href="/smp/ppdb" aria-label="Daftar PPDB SMP" className="font-label-lg text-label-lg bg-primary-container text-on-primary hover:bg-primary min-h-10 px-3 sm:px-4 py-2 rounded-lg shadow-sm ring-1 ring-tertiary-fixed transition-all flex items-center justify-center gap-1.5 whitespace-nowrap">
            <span className="material-symbols-outlined text-[18px]">school</span>
            <span className="hidden sm:inline"><T>Daftar PPDB SMP</T></span>
          </SiteLink>
          <div className="w-8 h-8 rounded-full bg-primary hidden sm:flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
          <button
            type="button"
            aria-label={menu ? "Tutup menu" : "Buka menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
            className="xl:hidden w-10 h-10 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">{menu ? "close" : "menu"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

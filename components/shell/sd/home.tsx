"use client";
import { SiteLink } from "@/components/SiteTransition";
import { T } from "@/components/content/T";
import { useSettings } from "@/components/content/ContentProvider";
import { waLinkFor } from "@/content/settings";
import { SocialLinks, socialsOf } from "@/components/SocialLinks";
import type { HeaderProps } from "../types";
import { useHeaderHeight } from "./useHeaderHeight";
import { Img } from "@/components/content/Img";

/** Stitch "Beranda / Profil / Program SD" chrome (also used for /sd/ppdb). */

const nav = [
  { label: "Beranda", href: "/sd" },
  { label: "Profil SD", href: "/sd/profil" },
  { label: "Program & Kurikulum", href: "/sd/program" },
  { label: "Kegiatan", href: "/sd/kegiatan" },
  { label: "Biaya & PPDB", href: "/sd/ppdb" },
  { label: "Kontak", href: "/sd/kontak" },
];


export function HomeHeader({ pathname, menu, setMenu }: HeaderProps) {
  const ref = useHeaderHeight();
  const { contact } = useSettings();
  return (
    <header ref={ref} className="md:whitespace-nowrap fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)]">
      <div className="bg-surface-container-high py-space-xs">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin flex items-center justify-between whitespace-nowrap font-label-md text-label-md">
          <div className="hidden lg:flex items-center gap-space-sm text-on-surface-variant">
            <span className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[14px] text-primary">verified</span><T>Al Fakhir School</T></span>
            <span className="hidden sm:inline text-outline-variant">•</span>
            <span className="hidden sm:inline"><T>Bright • Brilliant • Faithful</T></span>
          </div>
          <div className="flex w-full lg:w-auto items-center justify-between sm:justify-center lg:justify-start gap-space-md font-label-md text-label-md">
            <span className="hidden md:inline text-on-surface-variant"><T>Situs Terafiliasi:</T></span>
            <SiteLink className="text-tertiary hover:text-primary transition-colors flex items-center gap-space-xs font-label-md text-label-md" href="/">
              <span className="material-symbols-outlined text-[14px]">hub</span><T>Portal Induk AL FAKHIR</T></SiteLink>
            <span className="text-outline-variant">|</span>
            <SiteLink className="text-tertiary hover:text-primary transition-colors flex items-center gap-space-xs font-label-md text-label-md" href="/smp">
              <span className="material-symbols-outlined text-[14px]">school</span><T>SMP Islam Modern</T></SiteLink>
          </div>
        </div>
      </div>
      <div className="h-20 max-w-7xl mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-space-sm sm:gap-space-md">
        <div className="flex min-w-0 items-center gap-space-sm sm:gap-space-md">
          <Img alt="Logo SD Islam Modern Al Fakhir" className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0" src="/logo-sd.webp" width={48} height={48} />
          <div className="flex min-w-0 flex-col">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-space-xs xl:flex-col xl:items-start xl:gap-0.5">
              <span className="font-headline-sm text-headline-sm max-sm:text-[16px] max-sm:leading-5 tracking-tight text-primary leading-none whitespace-nowrap"><T>SD Islam Modern</T></span>
              <span className="font-headline-sm text-headline-sm max-sm:text-[16px] max-sm:leading-5 tracking-tight text-secondary-container leading-none whitespace-nowrap"><T>Al Fakhir</T></span>
            </div>
            <span className="hidden sm:block xl:hidden font-label-md text-label-md text-on-surface-variant leading-tight mt-0.5 whitespace-nowrap"><T>Sawangan, Depok • Modern Islamic School</T></span>
          </div>
        </div>
        <nav className="hidden xl:flex items-center gap-1 xl:gap-1.5 bg-surface-container-low p-1.5 rounded-full" aria-label="Navigasi utama">
          {nav.map((n) => {
            const on = n.href === "/sd" ? pathname === "/sd" : pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <SiteLink key={n.href} href={n.href} aria-current={on ? "page" : undefined}
                className={on
                  ? "px-3 py-1.5 rounded-full transition-all bg-primary text-on-primary font-label-md xl:font-title-md text-sm shadow-[0_4px_12px_rgba(184,71,11,0.2)] whitespace-nowrap"
                  : "px-3 py-1.5 rounded-full font-label-md xl:font-title-md text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all whitespace-nowrap"}><T>{n.label}</T></SiteLink>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-space-sm">
          <a aria-label="Hubungi WhatsApp SD Al Fakhir" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary hover:text-on-tertiary transition-all shadow-[0_4px_12px_rgba(0,93,99,0.1)]" href={waLinkFor(contact, undefined, "sd")} target="_blank" rel="noopener noreferrer">
            <span className="material-symbols-outlined text-[20px]">chat</span>
          </a>
          <SiteLink className="inline-flex items-center whitespace-nowrap gap-space-xs px-3.5 sm:px-space-lg py-space-xs bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-full shadow-[0_8px_20px_rgba(184,71,11,0.25)] hover:shadow-none active:translate-y-0.5 transition-all" href="/sd/ppdb">
            <span className="material-symbols-outlined hidden text-[18px] sm:inline">how_to_reg</span>
            <span><T>Daftar Kelas 1</T></span>
          </SiteLink>
          <div className="w-8 h-8 rounded-full bg-primary hidden xl:flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
          <button type="button" aria-label={menu ? "Tutup menu" : "Buka menu"} aria-expanded={menu} onClick={() => setMenu(!menu)}
            className="xl:hidden relative after:absolute after:-inset-2 after:content-[''] w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 active:translate-y-0.5 transition-all">
            <span className="material-symbols-outlined text-[18px]">{menu ? "close" : "menu"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export function HomeFooter() {
  const { contact } = useSettings();
  return (
    <footer className="w-full bg-primary text-on-primary pt-space-xl pb-24">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-space-lg gap-y-space-xl pb-space-xl">
          <div className="space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 bg-on-primary rounded-lg flex items-center justify-center">
                <Img alt="Logo SD Islam Modern Al Fakhir" className="w-8 h-8 object-contain" src="/logo-sd.webp" width={32} height={32} />
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-primary"><T>SD Al Fakhir</T></h3>
                <p className="font-label-md text-label-md text-primary-fixed"><T>Modern Islamic School</T></p>
              </div>
            </div>
            <p className="font-body-md text-body-md text-primary-fixed leading-relaxed"><T>Membentuk generasi Qur&apos;ani, cerdas, dan berakhlak mulia di era digital. Smart Concept, Islamic Identity &amp; Modern Character.</T></p>
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <SocialLinks items={socialsOf(contact.sd)} itemClassName="bg-on-primary/10 hover:bg-on-primary hover:text-primary text-on-primary" />
              <SiteLink aria-label="Pustaka Digital" className="w-9 h-9 rounded-full bg-on-primary/10 hover:bg-on-primary hover:text-primary text-on-primary flex items-center justify-center transition-all" href="/sd/program">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
              </SiteLink>
            </div>
          </div>
          <div className="space-y-space-sm">
            <h4 className="font-title-lg text-title-lg text-primary-fixed flex items-start gap-space-xs">
              <span className="material-symbols-outlined text-secondary-fixed">location_on</span><T>Lokasi &amp; Operasional</T></h4>
            <p className="font-body-md text-body-md text-primary-fixed-dim leading-relaxed">{contact.sd.address}</p>
            <div className="pt-space-xs space-y-space-xs font-label-md text-label-md text-primary-fixed">
              <p className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px]">schedule</span><T>Senin - Jumat: 07.00 - 15.30 WIB</T></p>
              <p className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px]">event_busy</span><T>Sabtu - Ahad &amp; Hari Libur: Tutup</T></p>
              <p className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px]">call</span><a href={waLinkFor(contact, undefined, "sd")} target="_blank" rel="noopener noreferrer" className="hover:text-on-primary transition-colors">{contact.sd.waDisplay}</a></p>
              <p className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px]">mail</span><a href={`mailto:${contact.sd.email}`} className="hover:text-on-primary transition-colors break-all">{contact.sd.email}</a></p>
            </div>
          </div>
          <div className="space-y-space-sm">
            <h4 className="font-title-lg text-title-lg text-primary-fixed flex items-start gap-space-xs">
              <span className="material-symbols-outlined text-secondary-fixed">account_tree</span><T>Ekosistem Pendidikan</T></h4>
            <ul className="space-y-space-xs font-body-md text-body-md text-primary-fixed-dim">
              <li>
                <SiteLink className="hover:text-on-primary transition-colors flex items-center gap-space-xs" href="/yayasan">
                  <span className="material-symbols-outlined text-[16px]">apartment</span><T>Al Fakhir School</T></SiteLink>
              </li>
              <li>
                <SiteLink className="hover:text-on-primary transition-colors flex items-center gap-space-xs" href="/smp">
                  <span className="material-symbols-outlined text-[16px]">school</span><T>SMP Islam Modern Al Fakhir</T></SiteLink>
              </li>
              <li>
                <SiteLink className="hover:text-on-primary transition-colors flex items-center gap-space-xs" href="/">
                  <span className="material-symbols-outlined text-[16px]">domain</span><T>Portal Induk AL FAKHIR</T></SiteLink>
              </li>
              <li>
                <SiteLink className="hover:text-on-primary transition-colors flex items-center gap-space-xs" href="/sd/program">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span><T>Pusat Tahfidz &amp; Literasi Quran</T></SiteLink>
              </li>
            </ul>
          </div>
          <div className="space-y-space-sm">
            <h4 className="font-title-lg text-title-lg text-primary-fixed flex items-start gap-space-xs">
              <span className="material-symbols-outlined text-secondary-fixed">checklist_rtl</span><T>Akses Cepat PPDB</T></h4>
            <p className="font-body-md text-body-md text-primary-fixed-dim"><T>Informasi PPDB Tahun Ajaran 2027/2028 tingkat Kelas 1. Pendaftaran online saat ini belum dibuka; hubungi panitia melalui WhatsApp.</T></p>
            <div className="pt-space-xs">
              <SiteLink className="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-secondary-container hover:bg-secondary text-on-secondary rounded-full font-label-md text-label-md transition-all shadow-[0_4px_12px_rgba(254,112,39,0.3)]" href="/sd/ppdb">
                <span className="material-symbols-outlined text-[18px]">assignment</span><T>Petunjuk Pendaftaran</T></SiteLink>
            </div>
          </div>
        </div>
        <div className="pt-space-lg text-center sm:text-left font-label-md text-label-md text-primary-fixed-dim flex flex-col sm:flex-row items-center justify-between gap-space-xs sm:gap-space-sm">
          <p><T>© 2026 SD Islam Modern Al Fakhir. · Developer by Feri</T></p>
          <p className="text-primary-fixed"><T>Smart Concept • Islamic Identity • Modern Character</T></p>
        </div>
      </div>
    </footer>
  );
}

export function HomeFab() {
  const { contact } = useSettings();
  return (
    <a aria-label="WhatsApp Center SD Al Fakhir" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-space-xs p-3.5 sm:px-space-md sm:py-space-sm rounded-full bg-tertiary-container hover:bg-tertiary text-on-tertiary shadow-[0_16px_36px_-6px_rgba(184,71,11,0.25)] active:translate-y-0.5 transition-all" href={waLinkFor(contact, undefined, "sd")} target="_blank" rel="noopener noreferrer">
      <span className="material-symbols-outlined text-[24px]">chat</span>
      <span className="hidden sm:inline font-label-lg text-label-lg font-bold pr-1"><T>WhatsApp Admin</T></span>
    </a>
  );
}

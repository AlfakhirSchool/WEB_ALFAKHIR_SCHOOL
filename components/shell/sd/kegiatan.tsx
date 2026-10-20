"use client";
import { SiteLink } from "@/components/SiteTransition";
import { T } from "@/components/content/T";
import { useSettings } from "@/components/content/ContentProvider";
import { waLinkFor } from "@/content/settings";
import { SocialLinks, socialsOf } from "@/components/SocialLinks";
import type { HeaderProps } from "../types";
import { useHeaderHeight } from "./useHeaderHeight";
import { Img } from "@/components/content/Img";

/** Stitch "Kegiatan Siswa" chrome (/sd/kegiatan). The design has no floating WhatsApp button. */

const nav = [
  { label: "Beranda", href: "/sd" },
  { label: "Profil SD", href: "/sd/profil" },
  { label: "Program & Kurikulum", href: "/sd/program" },
  { label: "Kegiatan", href: "/sd/kegiatan" },
  { label: "Biaya & PPDB", href: "/sd/ppdb" },
  { label: "Kontak", href: "/sd/kontak" },
];

export function KegiatanHeader({ pathname, menu, setMenu }: HeaderProps) {
  const ref = useHeaderHeight();
  return (
    <header ref={ref} className="md:whitespace-nowrap fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(184,71,11,0.06)]">
      <div className="bg-tertiary text-on-tertiary py-1.5 text-center text-label-md font-medium tracking-wide">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin flex flex-wrap items-center justify-center md:justify-between gap-x-4 gap-y-0.5">
          <span className="text-balance"><T>Situs Terafiliasi: Al Fakhir School • Modern Islamic School</T></span>
          <div className="hidden md:flex items-center gap-4">
            <span><T>Portal Induk AL FAKHIR</T></span>
            <span>•</span>
            <span><T>SMP Islam Modern</T></span>
          </div>
        </div>
      </div>
      <div className="h-20 max-w-7xl mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-4">
        <SiteLink className="flex items-center gap-3 group" href="/sd">
          <Img alt="Logo SD Islam Modern Al Fakhir" className="w-11 h-11 object-contain shrink-0" src="/logo-sd.webp" width={44} height={44} />
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-headline-sm text-title-md sm:text-headline-sm leading-none text-primary"><T>SD Islam Modern</T></span>
              <span className="font-headline-sm text-title-md sm:text-headline-sm leading-none text-secondary-container"><T>Al Fakhir</T></span>
            </div>
            <span className="mt-1 hidden whitespace-nowrap font-label-md text-label-md text-on-surface-variant sm:block xl:hidden"><T>Sawangan, Depok • Modern Islamic School</T></span>
          </div>
        </SiteLink>
        <nav className="hidden xl:flex items-center gap-1.5" aria-label="Navigasi utama">
          {nav.map((n) => {
            const on = n.href === "/sd/kegiatan";
            return (
              <SiteLink key={n.href} href={n.href} aria-current={on ? "page" : undefined}
                className={on
                  ? "transition-colors bg-primary-container text-on-primary-container font-label-md xl:font-label-lg rounded-full px-3 py-1.5 whitespace-nowrap"
                  : "font-label-md xl:font-label-lg text-on-surface-variant hover:text-on-surface px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"}><T>{n.label}</T></SiteLink>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <SiteLink className="hidden sm:inline-flex items-center justify-center font-label-md bg-primary-container text-on-primary rounded-full px-4 py-2 shadow-[0_8px_20px_-4px_rgba(184,71,11,0.35)] active:translate-y-0.5 transition-all whitespace-nowrap" href="/sd/ppdb"><T>Daftar Kelas 1</T></SiteLink>
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

export function KegiatanFooter() {
  const { contact } = useSettings();
  return (
    <footer className="w-full bg-primary text-on-primary pt-space-xl pb-28">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg mb-space-lg">
          <div className="space-y-space-sm">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-on-primary flex items-center justify-center">
                <Img alt="Logo SD Islam Modern Al Fakhir" className="w-7 h-7 object-contain" src="/logo-sd.webp" width={28} height={28} />
              </div>
              <span className="font-headline-sm text-headline-sm text-on-primary"><T>SD Al Fakhir</T></span>
            </div>
            <p className="font-body-md text-on-primary/90"><T>Membentuk generasi Qur&apos;ani, cerdas, dan berakhlak mulia di era digital. Smart Concept, Islamic Identity &amp; Modern Character.</T></p>
          </div>
          <div className="space-y-space-xs">
            <h4 className="font-title-md text-title-md text-secondary-fixed"><T>Alamat Jenjang SD</T></h4>
            <p className="font-body-md text-on-primary/90">{contact.sd.address}</p>
            <p className="font-body-md text-on-primary/90"><T>WhatsApp:</T> <a href={waLinkFor(contact, undefined, "sd")} target="_blank" rel="noopener noreferrer" className="hover:text-on-primary underline-offset-2 hover:underline">{contact.sd.waDisplay}</a></p>
            <p className="font-body-md text-on-primary/90"><T>Email:</T> <a href={`mailto:${contact.sd.email}`} className="break-all hover:text-on-primary underline-offset-2 hover:underline">{contact.sd.email}</a></p>
            <SocialLinks className="pt-space-xs" items={socialsOf(contact.sd)} itemClassName="bg-on-primary/10 hover:bg-on-primary hover:text-primary text-on-primary" />
          </div>
          <div className="space-y-space-xs">
            <h4 className="font-title-md text-title-md text-secondary-fixed"><T>Ekosistem Al Fakhir School</T></h4>
            <ul className="space-y-1 font-body-md text-on-primary/90">
              <li><T>Portal Induk Al Fakhir School</T></li>
              <li><T>SD Islam Modern Al Fakhir</T></li>
              <li><T>SMP Islam Modern Al Fakhir</T></li>
            </ul>
          </div>
          <div className="space-y-space-xs">
            <h4 className="font-title-md text-title-md text-secondary-fixed"><T>Pendidikan &amp; Karakter</T></h4>
            <ul className="space-y-1 font-body-md text-on-primary/90">
              <li><T>Tahfidz &amp; Tahsin Al-Qur&apos;an</T></li>
              <li><T>Bahasa Arab &amp; Inggris</T></li>
              <li><T>Sains &amp; Kreativitas Siswa</T></li>
              <li><T>Pembiasaan Adab &amp; Karakter</T></li>
            </ul>
          </div>
        </div>
        <div className="pt-space-md border-t border-outline-variant/30 text-center font-label-md text-on-primary/80">
          <p className="text-balance"><T>© 2026 SD Islam Modern Al Fakhir. Smart Concept • Islamic Identity • Modern Character · Developer by Feri</T></p>
        </div>
      </div>
    </footer>
  );
}

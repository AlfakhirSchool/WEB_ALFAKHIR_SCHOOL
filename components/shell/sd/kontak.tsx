"use client";
import { SiteLink } from "@/components/SiteTransition";
import { T } from "@/components/content/T";
import { useSettings } from "@/components/content/ContentProvider";
import { waLinkFor } from "@/content/settings";
import { SocialLinks, socialsOf } from "@/components/SocialLinks";
import type { HeaderProps } from "../types";
import { Img } from "@/components/content/Img";

/** Stitch "Kontak & Kunjungan Sekolah" chrome (/sd/kontak). The design has no floating WhatsApp button. */

const nav = [
  { label: "Beranda", href: "/sd" },
  { label: "Profil SD", href: "/sd/profil" },
  { label: "Program & Kurikulum", href: "/sd/program" },
  { label: "Kegiatan Siswa", href: "/sd/kegiatan" },
  { label: "Biaya & PPDB", href: "/sd/ppdb" },
  { label: "Kontak", href: "/sd/kontak" },
];

export function KontakHeader({ pathname, menu, setMenu }: HeaderProps) {
  return (
    <header className="md:whitespace-nowrap fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(184,71,11,0.08)]">
      <div className="w-full bg-surface-container-high/90 text-on-surface-variant">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin h-10 flex items-center justify-between font-label-md text-label-md">
          <div className="hidden sm:flex min-w-0 items-center gap-space-md truncate">
            <span className="font-label-lg text-primary flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[16px]">school</span>{" "}<T>Al Fakhir School</T></span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="hidden md:inline font-body-md text-body-md tracking-[0.24px] text-on-surface-variant"><T>Sawangan, Depok</T></span>
            <span className="hidden lg:inline bg-tertiary-fixed text-on-tertiary-fixed px-space-xs py-0.5 rounded-full font-label-md text-label-md uppercase tracking-wide"><T>Terakreditasi A Unggul</T></span>
          </div>
          <div className="flex shrink-0 items-center gap-space-md whitespace-nowrap max-sm:w-full max-sm:justify-center">
            <SiteLink className="hover:text-primary transition-colors" href="/"><T>Portal Induk AL FAKHIR</T></SiteLink>
            <span className="opacity-40">•</span>
            <SiteLink className="hover:text-primary transition-colors" href="/smp"><T>SMP Islam Modern</T></SiteLink>
          </div>
        </div>
      </div>
      <div className="h-20 max-w-7xl mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-2 sm:gap-space-md">
        <SiteLink className="flex min-w-0 items-center gap-2 sm:gap-space-sm group" href="/sd">
          <Img alt="Logo SD Islam Modern Al Fakhir" className="w-10 h-10 sm:w-11 sm:h-11 object-contain shrink-0 group-hover:scale-105 transition-transform" src="/logo-sd.webp" width={44} height={44} />
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none"><T>AL FAKHIR</T></span>
            <span className="font-label-md text-label-md text-on-surface-variant tracking-wider uppercase"><T>SD Islam Modern</T></span>
          </div>
        </SiteLink>
        <nav className="hidden xl:flex items-center gap-1.5 p-1 rounded-full bg-surface-container-low" aria-label="Navigasi utama">
          {nav.map((n) => {
            const on = n.href === "/sd/kontak";
            return (
              <SiteLink key={n.href} href={n.href} aria-current={on ? "page" : undefined}
                className={on
                  ? "px-3 py-1.5 rounded-full transition-all bg-primary-container text-on-primary font-label-md xl:font-title-md text-sm whitespace-nowrap"
                  : "px-3 py-1.5 rounded-full font-label-md xl:font-title-md text-sm text-on-surface-variant hover:text-on-surface transition-all whitespace-nowrap"}><T>{n.label}</T></SiteLink>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-space-sm">
          <SiteLink className="hidden sm:inline-flex items-center justify-center px-space-md py-space-xs rounded-full bg-surface-container font-label-lg text-label-lg text-primary hover:bg-surface-container-high transition-colors whitespace-nowrap" href="/sd/kontak"><T>Hubungi Kami</T></SiteLink>
          <SiteLink className="inline-flex items-center justify-center px-3.5 sm:px-space-lg py-space-xs rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-[0_4px_14px_rgba(184,71,11,0.25)] hover:bg-primary active:translate-y-[2px] transition-all whitespace-nowrap" href="/sd/ppdb"><T>Daftar PPDB SD</T></SiteLink>
          <div className="w-8 h-8 rounded-full bg-primary hidden xl:flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
          <button type="button" aria-label={menu ? "Tutup menu" : "Buka menu"} aria-expanded={menu} onClick={() => setMenu(!menu)}
            className="xl:hidden relative after:absolute after:-inset-2 after:content-[''] w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 ml-space-xs active:translate-y-0.5 transition-all">
            <span className="material-symbols-outlined text-[18px]">{menu ? "close" : "menu"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export function KontakFooter() {
  const { contact } = useSettings();
  return (
    <footer className="w-full bg-surface-container text-on-surface">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin pt-space-xl pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl">
          <div className="md:col-span-2 lg:col-span-5 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <Img alt="Logo SD Islam Modern Al Fakhir" className="w-10 h-10 object-contain shrink-0" src="/logo-sd.webp" width={40} height={40} />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary leading-tight text-balance"><T>SD ISLAM MODERN AL FAKHIR</T></span>
                <span className="font-label-md text-label-md text-on-surface-variant text-balance"><T>Smart Concept, Islamic Identity &amp; Modern Character</T></span>
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md"><T>Membentuk generasi Qur&apos;ani, cerdas, dan berakhlak mulia di era digital.</T></p>
            <div className="flex items-center gap-space-xs flex-wrap font-label-md text-label-md text-on-surface-variant">
              <span className="bg-surface-container-highest px-space-xs py-0.5 rounded-full"><T>Modern Islamic School</T></span>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed px-space-xs py-0.5 rounded-full"><T>Bright • Brilliant • Faithful</T></span>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-space-sm">
            <h4 className="font-headline-sm text-headline-sm text-on-surface"><T>Sawangan, Depok</T></h4>
            <div className="flex items-start gap-space-xs font-body-md text-body-md text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">location_on</span>
              <span>{contact.sd.address}</span>
            </div>
            <div className="flex items-center gap-space-xs font-body-md text-body-md text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-[20px]">chat</span>
              <span><T>WhatsApp:</T> <a href={waLinkFor(contact, undefined, "sd")} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{contact.sd.waDisplay}</a></span>
            </div>
            <div className="flex items-center gap-space-xs font-body-md text-body-md text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
              <a href={`mailto:${contact.sd.email}`} className="break-all hover:text-primary transition-colors">{contact.sd.email}</a>
            </div>
            <div className="flex items-center gap-space-xs font-body-md text-body-md text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
              <span><T>Senin - Jumat: 07.00 - 15.30 WIB</T></span>
            </div>
            <SocialLinks items={socialsOf(contact.sd)} itemClassName="bg-surface-container-highest text-primary hover:bg-primary hover:text-on-primary" />
          </div>
          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <h4 className="font-headline-sm text-headline-sm text-on-surface"><T>Jejaring Al Fakhir School</T></h4>
            <div className="flex flex-col gap-space-xs font-body-md text-body-md">
              <SiteLink className="text-on-surface-variant hover:text-primary transition-colors" href="/"><T>Portal Induk AL FAKHIR</T></SiteLink>
              <SiteLink className="text-on-surface-variant hover:text-primary transition-colors" href="/smp"><T>SMP Islam Modern Al Fakhir</T></SiteLink>
              <SiteLink className="text-on-surface-variant hover:text-primary transition-colors" href="/sd/kontak"><T>Biro Konseling &amp; Psikologi Anak</T></SiteLink>
              <SiteLink className="text-on-surface-variant hover:text-primary transition-colors" href="/sd/program"><T>Pusat Tahfidz &amp; Quranic Corner</T></SiteLink>
            </div>
          </div>
        </div>
        <div className="mt-space-xl pt-space-lg flex flex-col lg:flex-row items-center justify-between gap-space-xs lg:gap-space-sm text-center lg:text-left font-label-md text-label-md text-on-surface-variant">
          <p><T>© 2026 SD Islam Modern Al Fakhir. Hak Cipta Dilindungi Undang-Undang. · Developer by Feri</T></p>
          <p className="text-primary"><T>SD Islam Modern Al Fakhir • Sawangan, Depok</T></p>
        </div>
      </div>
    </footer>
  );
}

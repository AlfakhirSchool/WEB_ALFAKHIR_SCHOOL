"use client";
import { SiteLink } from "@/components/SiteTransition";
import { JenjangMenu } from "./JenjangMenu";
import { T } from "@/components/content/T";
import type { HeaderProps } from "../types";
import { Img } from "@/components/content/Img";

const ACTIVE = "px-space-md py-space-xs transition-colors bg-primary-container text-on-primary-container font-label-lg text-label-lg rounded-full whitespace-nowrap";
const IDLE = "px-space-md py-space-xs text-on-surface-variant hover:text-on-surface transition-colors font-label-lg text-label-lg rounded-full whitespace-nowrap";

function NavLink({ href, pathname, children }: { href: string; pathname: string; children: React.ReactNode }) {
  const on = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
  return (
    <SiteLink href={href} aria-current={on ? "page" : undefined} className={on ? ACTIVE : IDLE}>
      {children}
    </SiteLink>
  );
}

export function PortalHeader({ pathname, menu, setMenu }: HeaderProps) {
  return (
    <header className="md:whitespace-nowrap fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-surface/85 backdrop-blur-md shadow-[0_1px_8px_rgba(14,106,113,0.06)]">
      <div className="h-20 max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin flex items-center justify-between gap-space-md">
        <SiteLink href="/" className="flex min-w-0 shrink-0 items-center gap-space-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Img alt="Logo SD Islam Modern Al Fakhir" className="h-8 w-auto object-contain" src="/logo-sd.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Img alt="Logo SMP Islam Modern Al Fakhir" className="h-8 w-auto object-contain" src="/logo-smp.png" />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary leading-none whitespace-nowrap max-[400px]:text-[17px]"><T>AL FAKHIR SCHOOL</T></span>
            <span className="font-caption text-caption text-outline tracking-wider uppercase mt-1 whitespace-nowrap"><T>SD &amp; SMP Islam Modern</T></span>
          </div>
        </SiteLink>
        <nav className="hidden xl:flex items-center gap-space-xs" aria-label="Navigasi utama">
          <NavLink href="/" pathname={pathname}><T>Beranda</T></NavLink>
          <NavLink href="/yayasan" pathname={pathname}><T>Tentang Kami</T></NavLink>
          <JenjangMenu pathname={pathname} />
          <NavLink href="/berita" pathname={pathname}><T>Berita</T></NavLink>
          <span className="hidden 2xl:contents">
            <NavLink href="/jurnal" pathname={pathname}><T>Jurnal</T></NavLink>
            <NavLink href="/dokumen" pathname={pathname}><T>Dokumen</T></NavLink>
          </span>
          <NavLink href="/kontak" pathname={pathname}><T>Kontak</T></NavLink>
        </nav>
        <div className="flex shrink-0 items-center gap-space-sm">
          <SiteLink aria-current={pathname === "/ppdb" ? "page" : undefined} className="hidden sm:inline-flex items-center justify-center whitespace-nowrap px-space-md py-space-xs rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg transition-colors shadow-[0_2px_8px_rgba(0,80,86,0.15)]" href="/ppdb"><T>PPDB 2027/2028</T></SiteLink>
          <div className="hidden sm:flex w-8 h-8 rounded-full bg-primary items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
          <button type="button" aria-label={menu ? "Tutup menu" : "Buka menu"} aria-expanded={menu} onClick={() => setMenu(!menu)} className="xl:hidden w-10 h-10 shrink-0 rounded-full bg-surface-container-low text-on-surface flex items-center justify-center hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-[20px]">{menu ? "close" : "menu"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

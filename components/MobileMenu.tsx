"use client";
import { useState } from "react";
import { SiteLink } from "./SiteTransition";
import { Scope, T } from "./content/T";
import { sdNav, smpNav, type NavItem, type SiteKey } from "@/content/site";

const row = "flex min-h-12 items-center rounded-xl px-space-md py-2.5 text-[17px] leading-6 font-medium no-underline";

function Accordion({ title, dot, items, pathname, onClose, defaultOpen = false }: { title: string; dot: string; items: NavItem[]; pathname: string; onClose: () => void; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl bg-surface-container-low">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex min-h-12 w-full items-center gap-space-sm px-space-md py-2.5 text-left text-base leading-6 font-medium text-on-surface">
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dot}`} /><T>{title}</T>
        <span className={`material-symbols-outlined ml-auto transition-transform ${open ? "rotate-180" : ""}`}>expand_more</span>
      </button>
      {open && (
        <ul className="m-0 list-none px-space-sm pb-space-sm">
          {items.map((i) => (
            <li key={i.href}>
              <SiteLink href={i.href} onClick={onClose} className={`flex min-h-11 items-center rounded-lg px-space-md py-2 font-body-md text-body-md no-underline ${pathname === i.href ? "bg-primary-container text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}><T>{i.label}</T></SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function MobileMenu({ open, site, pathname, topClass, onClose }: { open: boolean; site: SiteKey; pathname: string; topClass: string; onClose: () => void }) {
  if (!open) return null;
  const main: NavItem[] = site === "sd" ? sdNav : site === "smp" ? smpNav : [{ label: "Beranda", href: "/" }, { label: "Tentang Kami", href: "/yayasan" }, { label: "Berita", href: "/berita" }, { label: "Jurnal", href: "/jurnal" }, { label: "Dokumen", href: "/dokumen" }, { label: "Kontak", href: "/kontak" }];
  const cta = site === "sd" ? { href: "/sd/ppdb", label: "Daftar Kelas 1" } : site === "smp" ? { href: "/smp/ppdb", label: "Daftar PPDB SMP" } : { href: "/ppdb", label: "PPDB 2027/2028" };
  return (
    <Scope id="shell/menu">
      <div className={`fixed inset-x-0 bottom-0 z-[60] overflow-y-auto overscroll-contain bg-surface px-margin-mobile pb-10 pt-space-md md:px-margin-tablet ${topClass}`} role="dialog" aria-modal="true" aria-label="Menu">
        <nav className="flex flex-col gap-space-xs" aria-label="Menu seluler">
          {main.map((n) => (
            <SiteLink key={n.href} href={n.href} onClick={onClose} aria-current={n.href === pathname ? "page" : undefined}
              className={`${row} ${n.href === pathname ? "bg-primary-container text-on-primary" : "text-on-surface hover:bg-surface-container"}`}><T>{n.label}</T></SiteLink>
          ))}
        </nav>
        <div className="mt-space-lg border-t border-outline-variant pt-space-md">
          <p className="mb-space-xs font-label-md text-label-md uppercase text-outline"><T>{site === "portal" ? "Jenjang" : "Situs Al Fakhir"}</T></p>
          <div className="flex flex-col gap-space-xs">
            {site !== "portal" && (
              <SiteLink href="/" onClick={onClose} className="flex min-h-12 items-center gap-space-sm rounded-xl bg-surface-container-low px-space-md py-2.5 text-base leading-6 font-medium text-on-surface no-underline">
                <span className="material-symbols-outlined text-primary">hub</span><T>Portal Induk AL FAKHIR</T>
              </SiteLink>
            )}
            {site !== "sd" && <Accordion title="SD Islam Modern" dot="bg-secondary-container" items={sdNav} pathname={pathname} onClose={onClose} defaultOpen={site === "portal"} />}
            {site !== "smp" && <Accordion title="SMP Islam Modern" dot="bg-primary-container" items={smpNav} pathname={pathname} onClose={onClose} defaultOpen={site === "portal"} />}
          </div>
        </div>
        <SiteLink href={cta.href} onClick={onClose} className={`mt-space-lg inline-flex min-h-12 w-full items-center justify-center rounded-full ${site === "smp" ? "bg-primary-container text-on-primary" : "bg-secondary-container text-on-secondary-container"} px-space-lg py-space-md text-[15px] font-semibold tracking-wide no-underline`}><T>{cta.label}</T></SiteLink>
      </div>
    </Scope>
  );
}

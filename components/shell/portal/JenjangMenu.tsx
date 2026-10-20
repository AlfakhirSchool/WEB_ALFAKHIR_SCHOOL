"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { SiteLink } from "@/components/SiteTransition";
import { T } from "@/components/content/T";
import { sdNav, smpNav } from "@/content/site";

const groups = [
  { href: "/sd", dot: "bg-secondary-container", title: "SD Islam Modern", titleCls: "text-secondary-container", meta: "Al Fakhir • Kelas 1 - 6", desc: "Pondasi adab, tahfidz qur'an bertahap, dan penguasaan sains eksploratif sejak dini.", links: sdNav, hover: "hover:bg-secondary-fixed/50 hover:text-secondary" },
  { href: "/smp", dot: "bg-primary-container", title: "SMP Islam Modern", titleCls: "text-primary", meta: "Al Fakhir • Kelas 7 - 9", desc: "Akselerasi kepemimpinan islami, riset sains terapan, dan bilingual immersion.", links: smpNav, hover: "hover:bg-primary-fixed/50 hover:text-primary" },
];

/** "Jenjang" mega menu: opens on hover and on click/Enter, closes on Esc, outside click, focus leaving, or navigation. */
export function JenjangMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const byHover = useRef(false);
  const id = useId();
  const active = pathname.startsWith("/sd") || pathname.startsWith("/smp");
  const show = useCallback(() => { clearTimeout(timer.current); setOpen((o) => { if (!o) byHover.current = true; return true; }); }, []);
  const hide = useCallback(() => { clearTimeout(timer.current); if (byHover.current) timer.current = setTimeout(() => { byHover.current = false; setOpen(false); }, 120); }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); root.current?.querySelector("button")?.focus(); } };
    document.addEventListener("pointerdown", onDown); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div ref={root} className="relative" onMouseEnter={show} onMouseLeave={hide}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <button type="button" aria-expanded={open} aria-controls={id} aria-haspopup="true" onClick={() => { if (byHover.current) { byHover.current = false; setOpen(true); } else setOpen((o) => !o); }}
        className={`flex items-center gap-1 rounded-full px-space-md py-space-xs font-label-lg text-label-lg transition-colors ${open || active ? "bg-surface-container text-on-surface" : "text-on-surface-variant hover:text-on-surface"}`}>
        <T>Jenjang</T><span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}>expand_more</span>
      </button>
      <div id={id} className={`absolute left-1/2 top-full w-[660px] -translate-x-1/2 pt-2.5 transition-all duration-200 ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`} aria-hidden={!open}>
        <div className="rounded-2xl border border-primary-container/15 bg-surface-container-lowest/98 backdrop-blur-xl p-3.5 shadow-[0_16px_40px_-6px_rgba(2,46,49,0.18)]">
          <div className="grid grid-cols-2 gap-2">
            {groups.map((g) => (
              <div key={g.href} className="rounded-xl bg-surface/50 p-2.5 flex flex-col">
                <SiteLink href={g.href} tabIndex={open ? 0 : -1} className="group mb-2 flex flex-col rounded-lg p-2.5 no-underline transition-colors hover:bg-surface-container-low">
                  <span className="mb-1.5 flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${g.dot} shrink-0`} />
                    <span className={`font-headline-sm text-headline-sm font-bold ${g.titleCls}`}><T>{g.title}</T></span>
                    <span className="material-symbols-outlined ml-auto text-[18px] text-outline transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </span>
                  <span className="mb-1 font-caption text-caption font-semibold text-outline tracking-wide uppercase"><T>{g.meta}</T></span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed line-clamp-2 min-h-[40px]"><T>{g.desc}</T></span>
                </SiteLink>
                <ul className="m-0 list-none border-t border-outline-variant/40 p-0 pt-2 flex flex-col gap-0.5">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <SiteLink href={l.href} tabIndex={open ? 0 : -1} aria-current={pathname === l.href ? "page" : undefined}
                        className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 font-body-sm text-body-sm no-underline transition-colors ${pathname === l.href ? "bg-primary-container/10 font-bold text-primary" : `text-on-surface-variant ${g.hover}`}`}>
                        <span className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim shrink-0">star</span>
                        <span className="truncate"><T>{l.label}</T></span>
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-2.5 flex items-center justify-between rounded-xl bg-surface-container-low px-4 py-2 border border-outline-variant/20">
            <span className="font-caption text-caption text-on-surface-variant font-medium"><T>Penerimaan peserta didik baru TA 2027/2028 telah dibuka</T></span>
            <SiteLink href="/ppdb" tabIndex={open ? 0 : -1} className="font-label-md text-label-md font-bold text-primary no-underline hover:underline flex items-center gap-1">
              <span><T>Info PPDB</T></span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </SiteLink>
          </div>
        </div>
      </div>
    </div>
  );
}

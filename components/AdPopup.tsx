"use client";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { SiteKey } from "@/content/site";
import type { Popup } from "@/content/settings";
import { useContent } from "@/components/content/ContentProvider";
import { SiteLink } from "./SiteTransition";
import { Star8 } from "./Star8";
import { Img } from "@/components/content/Img";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Popups already opened during this page load (frequency "Setiap kunjungan" = once per load). */
const openedThisLoad = new Set<string>();

/** Local calendar date as YYYY-MM-DD (popup start/end dates are compared as strings). */
export function todayIso(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Storage key that changes whenever the ad itself changes, so an edited ad is shown again. */
function storageKey(p: Popup) {
  const s = JSON.stringify([p.title, p.body, p.image, p.ctaLabel, p.ctaHref]);
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return `alf-popup:${h.toString(36)}`;
}

function alreadySeen(p: Popup, key: string): boolean {
  if (openedThisLoad.has(key)) return true;
  try {
    if (p.frequency === "session") return sessionStorage.getItem(key) === "1";
    if (p.frequency === "daily") return localStorage.getItem(key) === todayIso();
  } catch {}
  return false;
}

function markSeen(p: Popup, key: string) {
  openedThisLoad.add(key);
  try {
    if (p.frequency === "session") sessionStorage.setItem(key, "1");
    if (p.frequency === "daily") localStorage.setItem(key, todayIso());
  } catch {}
}

const THEME: Record<SiteKey, { band: string; cta: string; logos: string[] }> = {
  portal: { band: "from-[#0E6A71] to-[#022E31]", cta: "bg-[#E86116] hover:bg-[#cf540f] focus-visible:ring-[#E86116]/35", logos: ["/logo-sd.webp", "/logo-smp.png"] },
  sd: { band: "from-[#F28C28] to-[#E86116]", cta: "bg-[#E86116] hover:bg-[#cf540f] focus-visible:ring-[#E86116]/35", logos: ["/logo-sd.webp"] },
  smp: { band: "from-[#0E6A71] to-[#022E31]", cta: "bg-[#0E6A71] hover:bg-[#0B585E] focus-visible:ring-[#0E6A71]/35", logos: ["/logo-smp.png"] },
};

/** The popup card itself. Also used by the dashboard for its live preview (`preview` disables the links). */
export function PopupCard({ popup, site, onClose, preview = false, titleId }: { popup: Popup; site: SiteKey; onClose: () => void; preview?: boolean; titleId?: string }) {
  const theme = THEME[site];
  const href = popup.ctaHref;
  const showCta = !!popup.ctaLabel && !!href;
  const ctaCls = `inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold text-white shadow-lg shadow-black/10 transition focus-visible:outline-none focus-visible:ring-4 ${theme.cta}`;
  const cta = (
    <>
      <span className="truncate">{popup.ctaLabel}</span>
      <span aria-hidden="true" className="material-symbols-outlined text-[20px]">{href.startsWith("/") ? "arrow_forward" : "open_in_new"}</span>
    </>
  );

  return (
    <div className="relative w-full overflow-hidden rounded-[28px] bg-white font-[family-name:var(--f-poppins)] shadow-[0_40px_100px_-30px_rgba(2,46,49,0.65)]">
      {popup.image ? (
        <div className="relative overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Img src={popup.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Img src={popup.image} alt={popup.title} className="relative mx-auto block h-auto max-h-[42vh] w-full object-contain sm:max-h-[400px]" />
        </div>
      ) : (
        <div className={`relative flex h-28 items-center justify-center overflow-hidden bg-gradient-to-br ${theme.band}`}>
          <Star8 size={180} className="absolute -left-10 -top-14 text-white/[0.07]" />
          <Star8 size={130} className="absolute -bottom-12 right-6 text-white/[0.08]" />
          <div className="relative flex -space-x-3">
            {theme.logos.map((src) => (
              <span key={src} className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-lg ring-4 ring-white/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Img src={src} alt="" className="h-11 w-11 object-contain" />
              </span>
            ))}
          </div>
        </div>
      )}

      <button type="button" onClick={onClose} aria-label="Tutup"
        className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur transition hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60">
        <span aria-hidden="true" className="material-symbols-outlined text-[22px]">close</span>
      </button>

      <div className="px-6 pb-5 pt-5 sm:px-7 sm:pb-6 sm:pt-6">
        {popup.title && <h2 id={titleId} className="text-[1.3rem] font-bold leading-snug tracking-tight text-[#022E31] sm:text-2xl">{popup.title}</h2>}
        {popup.body && <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-slate-600">{popup.body}</p>}
        <div className="mt-5 flex flex-col items-stretch gap-1">
          {showCta && (preview ? <span className={ctaCls}>{cta}</span>
            : href.startsWith("/") ? <SiteLink href={href} onClick={onClose} className={ctaCls}>{cta}</SiteLink>
            : <a href={href} target="_blank" rel="noopener" onClick={onClose} className={ctaCls}>{cta}</a>)}
          <button type="button" onClick={onClose} className="h-11 rounded-full text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800">
            {showCta ? "Nanti saja" : "Tutup"}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Advertisement popup managed in the dashboard (Popup Iklan). Shows once the splash loader is gone and the
 * configured delay has passed, if enabled for this site, inside its date range, and allowed by its frequency.
 */
export function AdPopup({ site }: { site: SiteKey }) {
  const { settings, editing } = useContent();
  const popup = settings.popup;
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const today = todayIso();
  const eligible =
    popup.enabled && popup.sites.includes(site) && !pathname.startsWith("/admin") && !editing &&
    (!!popup.title || !!popup.body || !!popup.image) &&
    (!popup.startDate || popup.startDate <= today) && (!popup.endDate || popup.endDate >= today);

  useEffect(() => {
    if (!eligible) { setOpen(false); return; }
    const key = storageKey(popup);
    if (alreadySeen(popup, key)) return;
    let timer = 0;
    const arm = () => {
      timer = window.setTimeout(() => { markSeen(popup, key); setOpen(true); }, popup.delay * 1000);
    };
    // First visit: the splash loader covers the page for a few seconds; start counting once it has left.
    const loading = () => !document.documentElement.hasAttribute("data-alf-seen") && document.querySelector(".alf-loader") !== null;
    if (!loading()) { arm(); return () => clearTimeout(timer); }
    const obs = new MutationObserver(() => { if (!loading()) { obs.disconnect(); clearTimeout(safety); arm(); } });
    obs.observe(document.body, { childList: true, subtree: true });
    const safety = window.setTimeout(() => { obs.disconnect(); arm(); }, 8000);
    return () => { obs.disconnect(); clearTimeout(safety); clearTimeout(timer); };
  }, [eligible, popup]);

  // While open: lock page scroll (without layout shift), ESC closes, Tab stays inside, focus returns afterwards.
  useEffect(() => {
    if (!open) return;
    const before = document.activeElement as HTMLElement | null;
    const body = document.body.style;
    const prev = { overflow: body.overflow, paddingRight: body.paddingRight };
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.overflow = "hidden";
    if (gap > 0) body.paddingRight = `${gap}px`;
    panel.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key !== "Tab" || !panel.current) return;
      const items = [...panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      body.overflow = prev.overflow;
      body.paddingRight = prev.paddingRight;
      before?.focus?.({ preventScroll: true });
    };
  }, [open]);

  const close = () => setOpen(false);
  return (
    <AnimatePresence>
      {open && eligible && (
        <motion.div key="ad" className="fixed inset-0 z-[85] overflow-y-auto overscroll-contain" data-lenis-prevent
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
          <div className="fixed inset-0 bg-[#011c1e]/55 backdrop-blur-[6px]" aria-hidden="true" />
          <div className="relative flex min-h-full items-center justify-center p-4 sm:p-6" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
            <motion.div ref={panel} role="dialog" aria-modal="true" aria-labelledby={popup.title ? titleId : undefined} aria-label={popup.title ? undefined : "Pengumuman"}
              tabIndex={-1} className="w-full max-w-[440px] outline-none"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE, delay: 0.05 } }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.25, ease: EASE } }}>
              <PopupCard popup={popup} site={site} onClose={close} titleId={titleId} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

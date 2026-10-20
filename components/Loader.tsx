"use client";
import Image from "@/components/content/Image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LOADER_KEY } from "@/lib/loader";
import { siteOf, type SiteKey } from "@/content/site";

const MIN_MS = 1700;
const MAX_MS = 4500;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * First-visit splash. Server-rendered visible so there is no flash of the page before it appears;
 * the page renders underneath and shows through a frosted, translucent backdrop.
 * Entrance animations are CSS (run before hydration); the exit is a framer-motion fade + de-blur.
 */
export function Loader() {
  return usePathname().startsWith("/admin") ? null : <Splash />;
}

const THEME: Record<SiteKey, { name: string; tagline: string; logo: string | null; accent: string; bg: string; glowA: string; glowB: string }> = {
  portal: { name: "AL FAKHIR SCHOOL", tagline: "SD & SMP Islam Modern", logo: null, accent: "#F9AE2E", bg: "linear-gradient(160deg, #04353a 0%, #0a5a61 55%, #06424a 100%)", glowA: "rgba(232,97,22,0.28)", glowB: "rgba(43,179,163,0.30)" },
  sd: { name: "SD Islam Modern Al Fakhir", tagline: "Joyful Learning · Tahfiz · Adab", logo: "/logo-sd.webp", accent: "#F9AE2E", bg: "linear-gradient(160deg, #3b1a06 0%, #8a3a0c 55%, #5a2508 100%)", glowA: "rgba(249,174,46,0.30)", glowB: "rgba(232,97,22,0.35)" },
  smp: { name: "SMP Islam Modern Al Fakhir", tagline: "Riset · Tahfiz · Kepemimpinan", logo: "/logo-smp.png", accent: "#5FD6C6", bg: "linear-gradient(160deg, #021f2e 0%, #0b4f66 55%, #073a4d 100%)", glowA: "rgba(95,214,198,0.28)", glowB: "rgba(14,106,113,0.45)" },
};

function Splash() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-alf-seen")) { setShow(false); return; }
    try { sessionStorage.setItem(LOADER_KEY, "1"); } catch {}
    const start = performance.now();
    let finished = false;
    const timers: number[] = [];
    const finish = () => {
      if (finished) return;
      finished = true;
      setDone(true);
      timers.push(window.setTimeout(() => setShow(false), 450));
    };
    const onLoad = () => timers.push(window.setTimeout(finish, Math.max(0, MIN_MS - (performance.now() - start))));
    if (document.readyState === "complete") onLoad(); else window.addEventListener("load", onLoad, { once: true });
    timers.push(window.setTimeout(finish, MAX_MS));
    return () => { window.removeEventListener("load", onLoad); timers.forEach(clearTimeout); };
  }, []);
  const site = siteOf(pathname);
  const t = THEME[site];
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="alf-loader fixed inset-0 z-[100] flex items-center justify-center overflow-hidden px-6"
          role="status"
          aria-live="polite"
          aria-label={`Memuat ${t.name}`}
          initial={false}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
          style={{ background: t.bg }}
        >
          <div aria-hidden="true" className="alf-glow absolute -left-32 top-[10%] h-[460px] w-[460px] rounded-[9999px] blur-3xl" style={{ background: t.glowA }} />
          <div aria-hidden="true" className="alf-glow alf-glow-2 absolute -right-32 bottom-[8%] h-[520px] w-[520px] rounded-[9999px] blur-3xl" style={{ background: t.glowB }} />
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <motion.div className="relative flex w-full max-w-sm flex-col items-center text-center" exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.55, ease: EASE } }}>
            <p lang="ar" dir="rtl" className="alf-in text-2xl leading-relaxed sm:text-3xl" style={{ fontFamily: "var(--f-amiri), serif", color: t.accent, animationDelay: "0.05s" }}>
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>

            <div className="relative mt-8 grid h-44 w-44 place-items-center sm:h-52 sm:w-52">
              <span className="alf-halo absolute inset-3 rounded-[9999px]" style={{ background: t.accent }} />
              <span className="alf-ring absolute inset-0 rounded-[9999px]" style={{ background: `conic-gradient(from 0deg, transparent 0%, transparent 55%, ${t.accent} 100%)`, WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))" }} />
              <span className="absolute inset-[10px] rounded-[9999px] border border-white/15" />
              {site === "portal" ? (
                <div className="alf-pop relative flex items-center gap-2" style={{ animationDelay: "0.25s" }}>
                  <span className="grid h-[4.25rem] w-[4.25rem] place-items-center rounded-[9999px] bg-white shadow-xl sm:h-20 sm:w-20">
                    <Image src="/logo-sd.webp" alt="" width={64} height={64} className="h-12 w-12 object-contain sm:h-14 sm:w-14" priority />
                  </span>
                  <span className="grid h-[4.25rem] w-[4.25rem] place-items-center rounded-[9999px] bg-white shadow-xl sm:h-20 sm:w-20">
                    <Image src="/logo-smp.png" alt="" width={64} height={64} className="h-12 w-12 object-contain sm:h-14 sm:w-14" priority />
                  </span>
                </div>
              ) : (
                <span className="alf-pop relative grid h-28 w-28 place-items-center rounded-[9999px] bg-white shadow-2xl sm:h-32 sm:w-32" style={{ animationDelay: "0.25s" }}>
                  <Image src={t.logo!} alt="" width={96} height={96} className="h-[4.75rem] w-[4.75rem] object-contain sm:h-[5.5rem] sm:w-[5.5rem]" priority />
                </span>
              )}
            </div>

            <p className="alf-in mt-8 text-lg font-extrabold uppercase tracking-[0.18em] text-white sm:text-xl" style={{ animationDelay: "0.5s" }}>{t.name}</p>
            <p className="alf-in mt-2 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: t.accent, animationDelay: "0.62s" }}>{t.tagline}</p>

            <div className="alf-in mt-8 h-1 w-full max-w-[200px] overflow-hidden rounded-[9999px] bg-white/15" style={{ animationDelay: "0.7s" }}>
              <div className={`alf-bar h-full rounded-[9999px] ${done ? "alf-bar-done" : ""}`} style={{ background: `linear-gradient(90deg, ${t.accent}, #fff)` }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

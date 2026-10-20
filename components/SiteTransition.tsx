"use client";
import Link from "next/link";
import Image from "@/components/content/Image";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteOf, type SiteKey } from "@/content/site";
import { Star8 } from "./Star8";

type Ctx = { go: (href: string) => void };
/** Time the star needs to cover the screen before navigating. */
const COVER_MS = 750;
const TransitionCtx = createContext<Ctx>({ go: () => {} });

/** Star overlay between sites (portal/SD/SMP). Same-site navigation is a plain link (fade via template). */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [target, setTarget] = useState<SiteKey | null>(null);
  const busy = useRef(false);
  const current = useRef(pathname);
  current.current = pathname;

  const go = useCallback((href: string) => {
    const path = href.split("#")[0] || current.current;
    const to = siteOf(path);
    if (reduce || to === siteOf(current.current) || busy.current) { router.push(href); return; }
    busy.current = true;
    setTarget(to);
    setTimeout(() => router.push(href), COVER_MS);
  }, [reduce, router]);

  useEffect(() => {
    if (!busy.current) return;
    const id = setTimeout(() => { setTarget(null); busy.current = false; }, 250);
    return () => clearTimeout(id);
  }, [pathname]);

  const color = target === "sd" ? "#E86116" : target === "smp" ? "#022E31" : "#0E6A71";
  const logo = target === "sd" ? "/logo-sd.webp" : target === "smp" ? "/logo-smp.png" : null;
  return (
    <TransitionCtx.Provider value={{ go }}>
      {children}
      <AnimatePresence>
        {target && (
          <motion.div key="star" className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center" aria-hidden="true"
            initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}>
            <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 30, rotate: 0 }}
              transition={{ duration: COVER_MS / 1000, ease: [0.83, 0, 0.17, 1] }} style={{ color, willChange: "transform" }}>
              <Star8 size={100} />
            </motion.div>
            {logo && (
              <motion.div className="absolute flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-2xl" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                <Image src={logo} alt="" width={140} height={140} className="h-32 w-32 object-contain" priority />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionCtx.Provider>
  );
}

export function SiteLink({ href, children, className, onClick, ...rest }: Omit<React.ComponentProps<typeof Link>, "href"> & { href: string }) {
  const { go } = useContext(TransitionCtx);
  const pathname = usePathname();
  return (
    <Link href={href} className={className} {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        const to = siteOf(href.split("#")[0] || pathname);
        if (to !== siteOf(pathname)) { e.preventDefault(); go(href); }
      }}>
      {children}
    </Link>
  );
}

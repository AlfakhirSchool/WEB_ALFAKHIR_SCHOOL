"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let lenis: Lenis | null = null;

/** Inertial wheel scrolling (touch stays native). Pauses while something locks `body` overflow (menus, modals). */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      anchors: { offset: -96 },
      prevent: (node) => node.closest?.('[role="dialog"], [aria-modal="true"]') != null,
    });
    let raf = requestAnimationFrame(function loop(time) {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    });
    const lock = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") lenis?.stop(); else lenis?.start();
    });
    lock.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => { cancelAnimationFrame(raf); lock.disconnect(); lenis?.destroy(); lenis = null; };
  }, []);

  // New page: jump to top without easing and re-measure the page height.
  useEffect(() => {
    if (window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true, force: true });
    lenis?.resize();
  }, [pathname]);

  return null;
}

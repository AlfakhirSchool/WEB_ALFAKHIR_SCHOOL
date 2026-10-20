"use client";
import { useEffect, useRef } from "react";

/** The Stitch SD strips wrap at some widths, so the header height varies; publish it as --sd-hdr for <main> offset and the mobile menu. */
export function useHeaderHeight() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const sync = () => root.style.setProperty("--sd-hdr", `${el.getBoundingClientRect().height}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => { ro.disconnect(); root.style.removeProperty("--sd-hdr"); };
  }, []);
  return ref;
}

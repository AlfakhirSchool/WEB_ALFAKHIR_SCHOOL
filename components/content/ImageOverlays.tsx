"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useContent } from "./ContentProvider";

type Box = {
  src: string;
  /** Visible part of the photo, in viewport pixels. */
  l: number; t: number; w: number; h: number;
  /** First y (viewport) where a button can sit without hiding under a fixed site header. */
  y0: number;
  /** How many photos on this page share this src (replacing one changes all). */
  places: number;
};

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif";

/** Visible rectangles of every photo rendered in edit mode (marked with data-alf-img by Image / Img). */
function measure(): Box[] {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const header = document.querySelector("header");
  let headerBottom = 0;
  if (header) {
    const pos = getComputedStyle(header).position;
    if (pos === "fixed" || pos === "sticky") headerBottom = Math.max(0, header.getBoundingClientRect().bottom);
  }
  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("img[data-alf-img]")).filter((el) => !el.closest(".alf-loader"));
  const places: Record<string, number> = {};
  for (const el of imgs) places[el.dataset.alfImg!] = (places[el.dataset.alfImg!] ?? 0) + 1;

  const out: Box[] = [];
  for (const el of imgs) {
    if (typeof el.checkVisibility === "function" && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
    const r = el.getBoundingClientRect();
    let l = Math.max(r.left, 0), t = Math.max(r.top, 0), rt = Math.min(r.right, vw), b = Math.min(r.bottom, vh);
    for (let p = el.parentElement; p && p !== document.documentElement; p = p.parentElement) {
      const cs = getComputedStyle(p);
      if (cs.overflowX === "visible" && cs.overflowY === "visible") continue;
      const pr = p.getBoundingClientRect();
      l = Math.max(l, pr.left); t = Math.max(t, pr.top); rt = Math.min(rt, pr.right); b = Math.min(b, pr.bottom);
    }
    if (rt - l < 12 || b - t < 12) continue;
    const src = el.dataset.alfImg!;
    out.push({ src, l: Math.round(l), t: Math.round(t), w: Math.round(rt - l), h: Math.round(b - t), y0: Math.round(headerBottom), places: places[src] });
  }
  return out;
}

const same = (a: Box[], b: Box[]) =>
  a.length === b.length && a.every((x, i) => x.src === b[i].src && x.l === b[i].l && x.t === b[i].t && x.w === b[i].w && x.h === b[i].h && x.y0 === b[i].y0 && x.places === b[i].places);

/**
 * Edit mode: a dashed outline plus a "Ganti foto" button over every site photo. One fixed, click-through layer
 * (portal) follows the photos' on-screen rectangles, so the page's own markup and layout are never touched.
 * Uploads go to /api/admin/media; the new URL is staged in the ContentProvider and saved with the normal Simpan.
 */
export function ImageOverlays() {
  const { settings, pendingImages, stageImage, reportError } = useContent();
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const target = useRef<string>("");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const next = measure();
      setBoxes((prev) => (same(prev, next) ? prev : next));
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    schedule();
    const interval = window.setInterval(schedule, 400);
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["src", "srcset", "class", "style", "data-alf-img"] });
    window.addEventListener("scroll", schedule, { capture: true, passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearInterval(interval);
      mo.disconnect();
      window.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
    };
  }, []);

  const pick = useCallback((src: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    target.current = src;
    input.current?.click();
  }, []);

  const restore = useCallback((src: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    stageImage(src, null);
  }, [stageImage]);

  async function upload(file: File) {
    const src = target.current;
    if (input.current) input.current.value = "";
    if (!src) return;
    if (file.size > 2 * 1024 * 1024) { reportError("Ukuran foto maksimal 2 MB."); return; }
    setBusy(src);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/media", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (res.status === 401) throw new Error("Sesi login habis. Silakan login ulang di dashboard.");
      if (!res.ok || !data.url) throw new Error(data.error ?? "Gagal mengunggah foto.");
      stageImage(src, data.url);
    } catch (e) {
      reportError(e instanceof Error ? e.message : "Gagal mengunggah foto.");
    } finally {
      setBusy(null);
    }
  }

  return createPortal(
    <div className="alf-img-layer pointer-events-none fixed inset-0 z-40">
      <input ref={input} type="file" accept={ACCEPT} className="sr-only" tabIndex={-1} aria-hidden="true"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) void upload(f); }} />
      {boxes.map((b, i) => {
        const staged = pendingImages.has(b.src);
        const replaced = Boolean(settings.images[b.src]);
        const big = b.w >= 150 && b.h >= 84;
        const working = busy === b.src;
        const hint = b.places > 1 ? `Ganti foto (berlaku di ${b.places} tempat di halaman ini)` : "Ganti foto";
        const top = Math.max(8, b.y0 - b.t + 8);
        return (
          <div key={`${i}-${b.src}`} className="alf-img-box absolute" data-staged={staged ? "" : undefined} style={{ left: b.l, top: b.t, width: b.w, height: b.h }}>
            {big && (replaced || staged) && (
              <span className={`absolute left-2 rounded-full px-2 py-0.5 text-[11px] font-semibold text-white shadow ${staged ? "bg-[#16a34a]" : "bg-[#0E6A71]"}`} style={{ top }}>
                {staged ? "Belum disimpan" : "Diganti"}
              </span>
            )}
            <div className={`pointer-events-auto absolute flex items-center gap-1 ${big ? "right-2" : "left-1/2 -translate-x-1/2 -translate-y-1/2"}`} style={big ? { top } : { top: "50%" }}>
              <button type="button" onClick={(e) => pick(b.src, e)} disabled={working} title={hint} aria-label={hint}
                className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-[#F9AE2E] font-semibold text-[#1e1b16] shadow-lg ring-1 ring-black/15 transition hover:bg-[#ffc14d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-70 ${big ? "h-8 px-3 text-[12px]" : "h-7 w-7"}`}>
                <span aria-hidden="true" className={`material-symbols-outlined leading-none text-[16px] ${working ? "animate-spin" : ""}`}>{working ? "progress_activity" : "add_a_photo"}</span>
                {big && (working ? "Mengunggah…" : "Ganti foto")}
              </button>
              {replaced && (
                <button type="button" onClick={(e) => restore(b.src, e)} disabled={working} title="Kembalikan foto asli" aria-label="Kembalikan foto asli"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1e1b16] shadow-lg ring-1 ring-black/15 transition hover:bg-[#fff3d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F9AE2E] disabled:opacity-60">
                  <span aria-hidden="true" className="material-symbols-outlined text-[16px] leading-none">undo</span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>,
    document.body,
  );
}

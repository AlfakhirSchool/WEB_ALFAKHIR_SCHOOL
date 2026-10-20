"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSettings } from "@/components/content/ContentProvider";

export function VideoModal({ open, onClose, src, poster, title }: { open: boolean; onClose: () => void; src: string; poster: string; title: string }) {
  const { images } = useSettings();
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/85 p-4" role="dialog" aria-modal="true" aria-label={title}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="relative w-full max-w-5xl" initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }} onClick={(e) => e.stopPropagation()}>
            <video className="aspect-video w-full bg-black shadow-2xl" src={src} poster={images[poster] ?? poster} controls autoPlay playsInline preload="auto" />
            <button ref={closeRef} onClick={onClose} aria-label="Tutup video" className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-black">×</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";
import { T } from "@/components/content/T";
import { useSettings } from "@/components/content/ContentProvider";
import { waLinkFor } from "@/content/settings";

export function Fab(_: { pathname: string }) {
  const { contact } = useSettings();
  return (
    <a
      aria-label="Hubungi Layanan WhatsApp PPDB SMP"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-2.5 sm:gap-3 bg-[#25D366] text-white p-3 sm:px-4 sm:py-3.5 rounded-full shadow-[0_10px_25px_-3px_rgba(2,46,49,0.22)] hover:scale-105 active:scale-95 transition-transform"
      href={waLinkFor(contact, "Assalamu'alaikum, saya ingin berkonsultasi mengenai PPDB SMP Islam Modern Al Fakhir.", "smp")}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="material-symbols-outlined text-[24px]">chat</span>
      <span className="font-label-lg text-label-lg font-bold pr-1 hidden sm:inline"><T>Konsultasi PPDB SMP</T></span>
    </a>
  );
}

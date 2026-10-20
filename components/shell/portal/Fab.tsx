"use client";
import { T } from "@/components/content/T";
import { useSettings } from "@/components/content/ContentProvider";
import { waLinkFor } from "@/content/settings";

export function PortalFab() {
  const { contact } = useSettings();
  return (
    <aside className="fixed bottom-4 right-4 sm:bottom-space-lg sm:right-space-lg z-50 flex items-center group">
      <div className="mr-3 px-space-md py-1.5 bg-inverse-surface text-inverse-on-surface font-caption text-caption rounded-full shadow-[0_8px_20px_rgba(2,46,49,0.16)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"><T>Konsultasi PPDB</T></div>
      <a aria-label="Konsultasi PPDB WhatsApp" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-on-primary flex items-center justify-center shadow-[0_10px_25px_-3px_rgba(2,46,49,0.25)] hover:scale-105 transition-transform duration-200" href={waLinkFor(contact, "Assalamu'alaikum, saya ingin konsultasi PPDB Al Fakhir School.")} target="_blank" rel="noopener noreferrer">
        <span className="material-symbols-outlined text-[30px]">chat</span>
      </a>
    </aside>
  );
}

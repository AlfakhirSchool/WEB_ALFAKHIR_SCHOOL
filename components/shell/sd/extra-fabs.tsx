"use client";
import { T } from "@/components/content/T";
import { useSettings } from "@/components/content/ContentProvider";
import { waLinkFor } from "@/content/settings";

/** /sd/kegiatan floating WhatsApp (Stitch kegiatan screen). */
export function KegiatanFab() {
  const { contact } = useSettings();
  return (
    <aside className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      <a className="flex items-center gap-2.5 sm:gap-3 rounded-full bg-tertiary px-3.5 sm:px-5 py-2.5 sm:py-3 text-on-tertiary no-underline shadow-[0_12px_28px_-4px_rgba(0,93,99,0.35)] transition-all hover:bg-tertiary-container hover:text-on-tertiary active:translate-y-0.5"
        href={waLinkFor(contact, "Assalamu'alaikum, saya ingin bertanya tentang SD Islam Modern Al Fakhir.", "sd")} rel="noopener noreferrer" target="_blank">
        <span className="material-symbols-outlined text-[22px] sm:text-[24px]">chat</span>
        <div className="hidden sm:flex flex-col text-left"><span className="font-label-sm"><T>WhatsApp Admin</T></span><span className="font-label-md font-bold">{contact.sd.waDisplay}</span></div>
        <span className="sm:hidden font-label-md font-bold"><T>Admin SD</T></span>
      </a>
    </aside>
  );
}

/** /sd/kontak floating chat button (Stitch kontak screen). */
export function KontakFab() {
  const { contact } = useSettings();
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      <a className="group flex items-center gap-space-xs rounded-full bg-primary-container px-3.5 sm:px-space-md py-2.5 sm:py-3 text-on-primary no-underline shadow-xl transition-all hover:bg-primary active:scale-95"
        href={waLinkFor(contact, "Assalamu'alaikum, saya ingin konsultasi PPDB SD Islam Modern Al Fakhir.", "sd")} target="_blank" rel="noopener noreferrer">
        <span className="material-symbols-outlined text-[24px]">chat</span>
        <span className="hidden font-label-md text-label-md font-bold md:inline"><T>Chat Konsultasi PPDB</T></span>
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
        </span>
      </a>
    </div>
  );
}

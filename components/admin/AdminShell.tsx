"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { logout } from "@/app/admin/actions";
import { Icon } from "./ui";

type NavItem = { href: string; label: string; icon: string };
const HOME: NavItem = { href: "/admin", label: "Ringkasan", icon: "space_dashboard" };
const GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "Konten Website",
    items: [
      { href: "/admin/teks", label: "Editor Halaman", icon: "edit_note" },
      { href: "/admin/foto", label: "Foto Website", icon: "photo_library" },
      { href: "/admin/berita", label: "Berita", icon: "newspaper" },
      { href: "/admin/jurnal", label: "Jurnal Siswa", icon: "menu_book" },
      { href: "/admin/siswa", label: "Profil Siswa", icon: "badge" },
      { href: "/admin/guru", label: "Guru & Staf", icon: "groups" },
    ],
  },
  {
    title: "Data Sekolah",
    items: [
      { href: "/admin/kontak", label: "Kontak & WhatsApp", icon: "call" },
      { href: "/admin/ppdb", label: "PPDB & Biaya", icon: "school" },
      { href: "/admin/data-siswa", label: "Data Siswa & Dokumen", icon: "badge" },
      { href: "/admin/faq", label: "FAQ", icon: "quiz" },
    ],
  },
  { title: "Promosi", items: [{ href: "/admin/popup", label: "Popup Iklan", icon: "campaign" }] },
  { title: "Pengaturan", items: [{ href: "/admin/akun", label: "Akun", icon: "manage_accounts" }] },
];
const NAV: NavItem[] = [HOME, ...GROUPS.flatMap((g) => g.items)];
const isActive = (href: string, pathname: string) => (href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`));

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActive(item.href, pathname);
  return (
    <Link href={item.href} aria-current={active ? "page" : undefined}
      className={`group relative flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9AE2E] lg:min-h-10 ${active ? "bg-white/[0.13] text-white" : "text-white/70 hover:bg-white/[0.07] hover:text-white"}`}>
      {active && <span aria-hidden="true" className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-[#E86116]" />}
      <Icon name={item.icon} className={`text-[21px] ${active ? "text-[#F9AE2E]" : "text-white/55 group-hover:text-white/80"}`} />
      {item.label}
    </Link>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow ring-2 ring-[#022E31]">
          <Image src="/logo-sd.webp" alt="" width={32} height={32} className="h-7 w-7 object-contain" />
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow ring-2 ring-[#022E31]">
          <Image src="/logo-smp.png" alt="" width={32} height={32} className="h-7 w-7 object-contain" />
        </span>
      </div>
      <div className="leading-tight">
        <p className="text-sm font-bold tracking-wide text-white">AL FAKHIR SCHOOL</p>
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">Dashboard Admin</p>
      </div>
    </div>
  );
}

function SidebarBody({ username, pathname, drawer = false }: { username: string; pathname: string; drawer?: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pb-3 pt-5"><Brand /></div>
      <nav aria-label="Menu dashboard" className="flex-1 overflow-y-auto px-3 pb-3" data-lenis-prevent>
        <NavLink item={HOME} pathname={pathname} />
        {GROUPS.map((g) => (
          <div key={g.title} role="group" aria-label={g.title} className="mt-2.5">
            <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">{g.title}</p>
            <ul className="space-y-0.5">
              {g.items.map((item) => <li key={item.href}><NavLink item={item} pathname={pathname} /></li>)}
            </ul>
          </div>
        ))}
      </nav>
      <div className="space-y-1 border-t border-white/10 p-2.5">
        {!drawer && (
          <a href="/" target="_blank" rel="noopener" className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-white/80 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9AE2E]">
            <Icon name="open_in_new" className="text-[20px] text-white/55" /> Lihat Website
          </a>
        )}
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.06] p-2 pl-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E86116] text-sm font-bold uppercase text-white">{username.slice(0, 1)}</span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-semibold text-white">{username}</p>
            <p className="text-[11px] text-white/50">Administrator</p>
          </div>
          <form action={logout}>
            <button type="submit" className="grid h-11 w-11 place-items-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9AE2E]" aria-label="Keluar dari dashboard" title="Keluar">
              <Icon name="logout" className="text-[20px]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/** Dashboard frame: fixed sidebar on desktop, top bar + slide-in drawer on phones. */
export function AdminShell({ username, children }: { username: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = NAV.find((n) => isActive(n.href, pathname));

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  return (
    <div className="min-h-screen bg-[#F3F6F6] font-[family-name:var(--f-poppins)] text-slate-800 antialiased">
      <a href="#konten" className="sr-only z-[60] rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#022E31] shadow-lg focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Lewati ke konten</a>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 bg-[#022E31] lg:block">
        <SidebarBody username={username} pathname={pathname} />
      </aside>

      <div className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-white/10 bg-[#022E31] px-2 text-white lg:hidden">
        <button type="button" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-xl hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9AE2E]" aria-label="Buka menu" aria-expanded={open}>
          <Icon name="menu" className="text-[24px]" />
        </button>
        <p className="min-w-0 flex-1 truncate text-[15px] font-semibold">{current?.label ?? "Dashboard Admin"}</p>
        <a href="/" target="_blank" rel="noopener" className="grid h-11 w-11 place-items-center rounded-xl hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9AE2E]" aria-label="Lihat website (tab baru)">
          <Icon name="open_in_new" className="text-[22px]" />
        </a>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside className="absolute inset-y-0 left-0 w-[min(20rem,86vw)] bg-[#022E31] shadow-2xl"
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 380, damping: 38 }}>
              <button type="button" onClick={() => setOpen(false)} className="absolute right-2 top-4 grid h-11 w-11 place-items-center rounded-xl text-white/70 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9AE2E]" aria-label="Tutup menu">
                <Icon name="close" className="text-[22px]" />
              </button>
              <SidebarBody username={username} pathname={pathname} drawer />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="konten" className="lg:pl-72">
        <div className="mx-auto max-w-5xl px-4 pb-10 pt-6 sm:px-6 sm:pt-8 lg:px-10 lg:pt-10">{children}</div>
      </main>
    </div>
  );
}

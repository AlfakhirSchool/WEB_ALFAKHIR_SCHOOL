"use client";
import { SiteLink } from "@/components/SiteTransition";
import { T } from "@/components/content/T";
import { Img } from "@/components/content/Img";
import { useSettings } from "@/components/content/ContentProvider";
import { SocialLinks, socialsOf } from "@/components/SocialLinks";

type L = { label: string; href: string; icon: string; hover: string };
const ICON = "text-tertiary-fixed";
const HOVER = "hover:text-primary-fixed";

const cols: { title: string; titleCls: string; links: L[] }[] = [
  {
    title: "Al Fakhir School", titleCls: "text-primary-fixed",
    links: [
      { label: "Tentang Al Fakhir School", href: "/yayasan", icon: ICON, hover: HOVER },
      { label: "Visi & Misi", href: "/", icon: ICON, hover: HOVER },
      { label: "Kabar & Prestasi", href: "/berita", icon: ICON, hover: HOVER },
      { label: "Hubungi Kami", href: "/kontak", icon: ICON, hover: HOVER },
    ],
  },
  {
    title: "Jenjang Sekolah", titleCls: "text-secondary-fixed",
    links: [
      { label: "SD Islam Modern", href: "/sd", icon: "text-secondary-container", hover: "hover:text-secondary-fixed" },
      { label: "SMP Islam Modern", href: "/smp", icon: "text-primary-container", hover: HOVER },
      { label: "Kurikulum Terpadu", href: "/", icon: ICON, hover: HOVER },
      { label: "Fasilitas Sekolah", href: "/", icon: ICON, hover: HOVER },
    ],
  },
  {
    title: "Legal & PPDB", titleCls: "text-primary-fixed",
    links: [
      { label: "Pendaftaran Siswa Baru", href: "/ppdb", icon: ICON, hover: HOVER },
      { label: "Jadwal Observasi", href: "/kontak", icon: ICON, hover: HOVER },
      { label: "Legalitas Sekolah", href: "/", icon: ICON, hover: HOVER },
      { label: "Kebijakan Privasi", href: "/", icon: ICON, hover: HOVER },
    ],
  },
];

export function PortalFooter() {
  const { contact } = useSettings();
  return (
    <footer className="w-full bg-[#022E31] text-inverse-on-surface relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
        <span className="whitespace-nowrap font-display-hero text-[min(17vw,220px)] font-extrabold tracking-widest text-primary-fixed"><T>AL FAKHIR</T></span>
      </div>
      <div className="relative max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-xl pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr] xl:grid-cols-5 gap-x-space-lg gap-y-space-lg md:gap-y-space-xl mb-space-xl">
          <div className="md:col-span-3 lg:col-span-1 xl:col-span-2 flex flex-col items-start gap-space-sm">
            <div className="flex items-center gap-space-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Img alt="Logo SD Islam Modern Al Fakhir" className="h-8 w-auto shrink-0 object-contain brightness-0 invert" src="/logo-sd.webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Img alt="Logo SMP Islam Modern Al Fakhir" className="h-8 w-auto shrink-0 object-contain brightness-0 invert" src="/logo-smp.png" />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary-fixed leading-none whitespace-nowrap"><T>AL FAKHIR SCHOOL</T></span>
                <span className="font-caption text-caption text-outline-variant tracking-wider uppercase mt-1"><T>SD &amp; SMP Islam Modern</T></span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-surface-dim max-w-sm mt-2"><T>Membangun insan yang bertakwa, berakhlak mulia, mencintai Al-Qur&apos;an, dan memiliki daya saing tinggi melalui pendidikan Islam modern di Sawangan, Depok.</T></p>
            <div className="flex items-start gap-2 text-surface-dim font-body-sm text-body-sm mt-2">
              <span className="material-symbols-outlined shrink-0 text-tertiary-fixed text-[20px] mt-0.5">location_on</span>
              <span>{contact.address}</span>
            </div>
            <div className="flex items-start gap-2 text-surface-dim font-body-sm text-body-sm">
              <span className="material-symbols-outlined shrink-0 text-tertiary-fixed text-[20px] mt-0.5">mail</span>
              <a href={`mailto:${contact.email}`} className="break-all text-surface-dim hover:text-primary-fixed transition-colors no-underline">{contact.email}</a>
            </div>
            <div className="mt-1 flex flex-col gap-2">
              {([["Al Fakhir", socialsOf(contact)], ["SD", socialsOf(contact.sd, "SD")], ["SMP", socialsOf(contact.smp, "SMP")]] as const).map(([name, items]) =>
                items.length > 0 && (
                  <div key={name} className="flex items-center gap-3">
                    <span className="w-12 font-caption text-caption uppercase tracking-wider text-primary-fixed-dim"><T>{name}</T></span>
                    <SocialLinks items={items} />
                  </div>
                ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className={`font-headline-sm text-headline-sm ${c.titleCls} mb-space-sm text-balance`}><T>{c.title}</T></h4>
              <ul className="m-0 flex list-none flex-col p-0">
                {c.links.map((l) => (
                  <li key={l.label} className="flex items-start gap-2 py-1">
                    <span className={`material-symbols-outlined mt-[5px] shrink-0 text-[14px] ${l.icon}`}>star</span>
                    <SiteLink className={`font-body-sm text-body-sm text-surface-dim ${l.hover} transition-colors`} href={l.href}><T>{l.label}</T></SiteLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-space-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-xs">
          <p className="font-caption text-caption text-surface-dim"><T>© 2027 Al Fakhir School. Seluruh Hak Cipta Dilindungi. · Developer by Feri</T></p>
          <div className="flex flex-wrap items-center gap-x-space-md gap-y-1">
            <span className="font-caption text-caption text-primary-fixed-dim"><T>Bright • Brilliant • Faithful</T></span>
            <span className="font-caption text-caption text-primary-fixed-dim"><T>Tahfiz • Research • Character Building</T></span>
          </div>
        </div>
      </div>
    </footer>
  );
}

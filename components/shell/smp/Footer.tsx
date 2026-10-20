"use client";
import Image from "@/components/content/Image";
import { SiteLink } from "@/components/SiteTransition";
import { T } from "@/components/content/T";
import { useSettings } from "@/components/content/ContentProvider";
import { waLinkFor } from "@/content/settings";
import { SocialLinks, socialsOf } from "@/components/SocialLinks";

const link = "hover:text-surface-container-lowest transition-colors";
const akademik: [string, string][] = [
  ["/smp/akademik", "Kurikulum Merdeka & International Program"],
  ["/smp/akademik", "Tahsin & Tahfiz Al-Qur'an"],
  ["/smp/akademik", "Research Class & Research Contest"],
  ["/smp/kesiswaan", "Ekstrakurikuler: Pramuka, Basket, Taekwondo"],
  ["/smp/kesiswaan", "Prestasi: NSIF, IIF, & ISIF"],
];

export function Footer(_: { pathname: string }) {
  const { contact } = useSettings();
  return (
    <footer className="w-full bg-primary text-on-primary">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin pt-margin pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1.25fr_1.25fr_1fr] gap-x-gutter gap-y-space-lg">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image alt="Logo SMP Islam Modern Al Fakhir" className="h-8 w-8 shrink-0 object-contain" src="/logo-smp.png" width={482} height={512} />
              <span className="font-headline-sm text-headline-sm text-surface-container-lowest font-bold tracking-tight"><T>SMP Islam Modern</T></span>
            </div>
            <p className="font-body-sm text-body-sm text-primary-fixed-dim leading-relaxed"><T>SMP Islam yang mengusung konsep modern, mengadopsi model kelas dan program internasional, namun tetap mengutamakan pendidikan karakter, akhlak, dan nilai-nilai keislaman.</T></p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="whitespace-nowrap font-label-md text-label-md bg-primary-container text-on-primary px-2.5 py-1 rounded-full"><T>Berdiri Oktober 2023</T></span>
              <span className="whitespace-nowrap font-label-md text-label-md bg-tertiary text-tertiary-fixed px-2.5 py-1 rounded-full"><T>Visitasi Akreditasi 2025</T></span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-headline-sm text-[16px] leading-[22px] font-bold text-tertiary-fixed tracking-wide uppercase"><T>Akademik &amp; Riset</T></h4>
            <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-primary-fixed-dim">
              {akademik.map(([href, label]) => (
                <li key={label} className="flex items-start gap-2">
                  <span className="material-symbols-outlined mt-[3px] shrink-0 text-tertiary-fixed text-[14px]">star</span>
                  <SiteLink className={link} href={href}><T>{label}</T></SiteLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-headline-sm text-[16px] leading-[22px] font-bold text-tertiary-fixed tracking-wide uppercase"><T>SMP Islam Modern</T></h4>
            <div className="flex flex-col gap-2 font-body-sm text-body-sm text-primary-fixed-dim">
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-tertiary-fixed text-[18px] shrink-0 mt-0.5">location_on</span>
                <span>{contact.smp.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary-fixed text-[18px] shrink-0">call</span>
                <a href={waLinkFor(contact, undefined, "smp")} target="_blank" rel="noopener noreferrer" className={link}>{contact.smp.waDisplay}</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary-fixed text-[18px] shrink-0">mail</span>
                <a href={`mailto:${contact.smp.email}`} className={`${link} break-all`}>{contact.smp.email}</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary-fixed text-[18px] shrink-0">login</span>
                <a href="https://lms.smpialfakhir.sch.id" target="_blank" rel="noopener noreferrer" className={link}><T>Login LMS</T></a>
              </p>
              <SocialLinks className="pt-1" items={socialsOf(contact.smp)} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-headline-sm text-[16px] leading-[22px] font-bold text-tertiary-fixed tracking-wide uppercase"><T>Layanan &amp; Afiliasi</T></h4>
            <p className="font-body-sm text-body-sm text-primary-fixed-dim leading-relaxed"><T>Dikelola oleh Yayasan Prestasi Belia Indonesia dan bermitra dengan IYSA (Indonesian Young Scientist Association).</T></p>
            <div className="pt-2 flex flex-col gap-2">
              <SiteLink className="font-label-lg text-label-lg bg-surface-container-lowest text-primary hover:bg-surface-container-low px-4 py-2.5 rounded-lg text-center font-bold transition-all shadow-sm" href="/smp/ppdb"><T>Portal Pendaftaran PPDB</T></SiteLink>
              <SiteLink className="font-label-md text-label-md text-center text-tertiary-fixed hover:text-surface-container-lowest transition-colors" href="/smp/kontak"><T>Jadwalkan Kunjungan Sekolah →</T></SiteLink>
            </div>
          </div>
        </div>
        <div className="mt-space-lg pt-space-md border-t border-primary-container/40 flex flex-col lg:flex-row items-center justify-between gap-x-4 gap-y-2 text-center lg:text-left font-label-md text-label-md text-primary-fixed">
          <p className="text-balance"><T>© 2027 SMP Islam Modern Al Fakhir. All rights reserved. · Developer by Feri</T></p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <SiteLink className={link} href="/smp/profil"><T>Profil Sekolah</T></SiteLink>
            <span>·</span>
            <SiteLink className={link} href="/smp/akademik"><T>Kurikulum &amp; Program</T></SiteLink>
            <span>·</span>
            <SiteLink className={link} href="/kontak"><T>Kebijakan Privasi</T></SiteLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

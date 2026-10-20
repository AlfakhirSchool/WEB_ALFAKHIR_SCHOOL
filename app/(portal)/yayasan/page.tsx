import type { Metadata } from "next";
import Image from "@/components/content/Image";
import { SiteLink } from "@/components/SiteTransition";
import { PageHero } from "@/components/pages/portal-shared/PageHero";
import { Eyebrow, StarDivider, StarGlyph, Watermark } from "@/components/pages/portal-shared/Ornaments";
import { StaffCard } from "@/components/pages/portal-shared/StaffCard";
import { Scope, T } from "@/components/content/T";
import { getSettings } from "@/lib/content/store";
import { waLinkFor } from "@/content/settings";

export const metadata: Metadata = { title: "Tentang Al Fakhir School", description: "Profil Al Fakhir School, penaung SD dan SMP Islam Modern Al Fakhir." };

const pillars = [
  { icon: "workspace_premium", tone: "text-primary", title: "Berakhlak Mulia" },
  { icon: "menu_book", tone: "text-secondary", title: "Cinta Al-Qur'an" },
  { icon: "mosque", tone: "text-tertiary", title: "Beribadah dengan Benar" },
  { icon: "public", tone: "text-primary", title: "Berpengetahuan Luas" },
  { icon: "psychology", tone: "text-secondary", title: "Berpikir Kritis & Kreatif" },
  { icon: "favorite", tone: "text-tertiary", title: "Berbadan Sehat" },
];

const jenjang = [
  { href: "/sd", logo: "/logo-sd.webp", tag: "Jenjang Dasar", title: "SD Islam Modern Al Fakhir", desc: "Kelas 1–6. Modern Islamic School — Bright • Brilliant • Faithful.", btn: "bg-secondary-container group-hover:bg-secondary", dot: "bg-secondary-container", label: "Kunjungi Situs SD" },
  { href: "/smp", logo: "/logo-smp.png", tag: "Jenjang Menengah", title: "SMP Islam Modern Al Fakhir", desc: "Kelas 7–9. Islamic School with Modern Education — Tahfiz • Research • Character Building.", btn: "bg-primary-container group-hover:bg-primary", dot: "bg-primary-container", label: "Kunjungi Situs SMP" },
];

const digital = [
  { icon: "sensors", t: "Absensi RFID" },
  { icon: "school", t: "LMS" },
  { icon: "payments", t: "Pembayaran" },
  { icon: "assignment", t: "Rapor online" },
  { icon: "chat", t: "Notifikasi WhatsApp" },
];

export default async function Yayasan() {
  const { contact, staff } = await getSettings();
  return (
    <Scope id="portal/yayasan">
    <div className="w-full bg-surface">
      <PageHero
        eyebrow="Tentang kami"
        title={<><T>Tentang</T><br /><span className="bg-gradient-to-r from-secondary-container via-tertiary-fixed-dim to-primary-container bg-clip-text text-transparent"><T>Al Fakhir School</T></span></>}
        lead={<T>{"Penaung SD dan SMP Islam Modern Al\u00a0Fakhir: satu arah pembinaan untuk generasi Islam yang modern."}</T>}
        aside={
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-lowest p-2">
            <div className="relative h-72 md:h-96 w-full rounded-xl overflow-hidden">
              <Image src="/photos/halaman-atas.jpg" alt="Halaman dalam Al Fakhir School" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" priority />
            </div>
          </div>
        }
      />

      {/* Arah kami */}
      <section className="w-full relative py-space-xl bg-surface-container-lowest overflow-hidden">
        <Watermark className="absolute -left-24 top-1/2 -translate-y-1/2 w-[420px] h-[420px] text-primary" />
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin relative z-10">
          <div className="max-w-3xl mb-space-lg">
            <Eyebrow><T>Arah kami</T></Eyebrow>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-extrabold tracking-tight"><T>Generasi Islam yang modern.</T></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <p className="font-body-lg text-body-lg text-on-surface-variant border-t border-primary-container/15 pt-space-md">
              <T>Tujuan sekolah: ruang formal dalam membentuk generasi Islami Modern yang berpengetahuan luas, berakhlak baik, dan dapat menerapkan ilmu pengetahuan di berbagai aspek kehidupan untuk kesuksesan hidup di dunia dan di akhirat.</T>
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant border-t border-primary-container/15 pt-space-md">
              <T>SMP Islam Modern Al Fakhir didirikan oleh Bpk. Deni Irawan, M.Pd pada Oktober 2023. Al-Fakhir berarti kemuliaan, kebesaran, atau kebanggaan, dengan harapan sekolah ini menjadi sekolah yang besar dan setiap siswanya menjadi sosok yang membanggakan bagi dirinya sendiri, keluarga, dan masyarakat.</T>
            </p>
          </div>
        </div>
      </section>

      {/* Visi & misi pillars */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="text-center max-w-3xl mx-auto mb-space-lg">
            <span className="font-caption text-caption uppercase text-tertiary font-bold tracking-widest"><T>Misi SMP Islam Modern Al Fakhir</T></span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-extrabold tracking-tight mt-2 text-balance"><T>Enam pilar pembinaan siswa.</T></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {pillars.map((p, i) => (
              <div key={p.title} className="bg-surface-container-lowest rounded-xl p-6 md:p-space-lg border border-primary-container/10 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-full bg-surface-container flex items-center justify-center ${p.tone}`}>
                    <span className="material-symbols-outlined text-[24px]">{p.icon}</span>
                  </div>
                  <span className="font-display-hero text-headline-lg font-extrabold text-primary-container/15 leading-none">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-balance"><T>{p.title}</T></h3>
              </div>
            ))}
          </div>
          <StarDivider className="mt-space-xl" />
        </div>
      </section>

      {/* Pengurus */}
      <section className="w-full pb-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-gutter">
          <div className="lg:col-span-5 flex flex-col gap-space-md lg:justify-between">
            <div>
              <Eyebrow dot="bg-secondary-container" className="text-secondary"><T>Kepemimpinan</T></Eyebrow>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-extrabold tracking-tight"><T>Pengurus Al Fakhir School</T></h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-md text-pretty">
                <T>Mengawal satu arah pembinaan bagi SD dan SMP Islam Modern Al&nbsp;Fakhir.</T>
              </p>
            </div>
            <figure className="relative m-0 overflow-hidden rounded-xl bg-surface-container-lowest border border-primary-container/10 p-6 md:p-space-lg">
              <StarGlyph className="absolute -right-6 -bottom-6 w-32 h-32 text-primary-container/[0.06]" />
              <span className="material-symbols-outlined text-[32px] text-secondary-container" aria-hidden="true">format_quote</span>
              <blockquote className="m-0 mt-2 font-subheading text-subheading text-on-surface font-semibold leading-snug text-pretty">
                <T>“Terwujudnya pendidikan yang bermutu tinggi dalam membentuk siswa-siswi yang berakhlak, modern, dan menjadi kebanggaan orang tua, masyarakat, bangsa dan negara.”</T>
              </blockquote>
              <figcaption className="mt-4 font-caption text-caption uppercase text-on-surface-variant font-bold tracking-widest"><T>Visi SMP Islam Modern Al Fakhir</T></figcaption>
            </figure>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-gutter">
            {staff.yayasan.map((s, i) => (
              <StaffCard key={i} person={s} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
        </div>
      </section>

      {/* Dua jenjang */}
      <section className="w-full py-space-xl bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="mb-space-lg">
            <Eyebrow><T>Di bawah naungan kami</T></Eyebrow>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-extrabold tracking-tight"><T>Al Fakhir School, dua jenjang.</T></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {jenjang.map((j) => (
              <SiteLink key={j.href} href={j.href} className="group flex flex-col gap-4 p-6 md:p-space-lg rounded-xl bg-surface border border-primary-container/10 hover:border-primary-container/30 transition-colors no-underline">
                <div className="flex items-center gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-lowest">
                    <Image src={j.logo} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
                  </span>
                  <span className="flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider font-bold text-on-surface-variant">
                    <span className={`w-2 h-2 rounded-full ${j.dot}`} /><T>{j.tag}</T>
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold text-balance"><T>{j.title}</T></h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-pretty"><T>{j.desc}</T></p>
                <span className={`self-start inline-flex items-center gap-3 px-6 py-3 rounded-full text-on-primary font-label-lg text-label-lg uppercase tracking-wider transition-all duration-300 whitespace-nowrap mt-auto ${j.btn}`}>
                  <T>{j.label}</T>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
                </span>
              </SiteLink>
            ))}
          </div>
        </div>
      </section>

      {/* Sekolah digital */}
      <section className="w-full relative bg-[#022E31] text-surface-container-lowest py-space-xl overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none flex items-center justify-between">
          <div className="w-80 h-80 -ml-20 rounded-full bg-primary-fixed-dim blur-3xl" />
          <div className="w-96 h-96 -mr-20 rounded-full bg-secondary-container blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-container/30 text-tertiary-fixed font-label-md text-label-md uppercase tracking-wider font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-pulse" /><T>Sekolah digital</T>
          </div>
          <div className="flex flex-col gap-space-md lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-surface-container-lowest font-extrabold tracking-tight max-w-3xl text-balance">
              <T>Satu aplikasi</T>{" "}<span className="whitespace-nowrap"><T>AL FAKHIR SCHOOL</T></span>{" "}<T>untuk kedua jenjang.</T>
            </h2>
            <div className="flex items-center gap-3 shrink-0" aria-hidden="true">
              <span className="grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-2xl bg-surface-container-lowest shadow-lg">
                <Image src="/logo-sd.webp" alt="" width={64} height={64} className="h-12 w-12 md:h-14 md:w-14 object-contain" />
              </span>
              <span className="flex items-center gap-2">
                <span className="h-px w-6 md:w-10 bg-surface-container-lowest/30" />
                <StarGlyph className="w-5 h-5 text-tertiary-fixed-dim" />
                <span className="h-px w-6 md:w-10 bg-surface-container-lowest/30" />
              </span>
              <span className="grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-2xl bg-surface-container-lowest shadow-lg">
                <Image src="/logo-smp.png" alt="" width={64} height={64} className="h-12 w-12 md:h-14 md:w-14 object-contain" />
              </span>
            </div>
          </div>
          <ul className="m-0 mt-space-lg list-none p-0 border-t border-surface-container-lowest/20 flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-10 xl:justify-between max-sm:divide-y max-sm:divide-surface-container-lowest/15">
            {digital.map((d) => (
              <li key={d.t} className="flex items-center gap-3 py-5 font-subheading text-subheading font-bold leading-snug whitespace-nowrap">
                <span className="material-symbols-outlined text-tertiary-fixed-dim text-[22px] shrink-0">{d.icon}</span><T>{d.t}</T>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div>
            <Eyebrow><T>Silaturahmi</T></Eyebrow>
            <h2 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface font-bold text-balance"><T>Ingin mengenal Al Fakhir School lebih dekat?</T></h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-space-sm">
            <a href={waLinkFor(contact, "Assalamu'alaikum, saya ingin bertanya tentang Al Fakhir School.")} target="_blank" rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg uppercase tracking-wider shadow-md transition-all inline-flex items-center justify-center gap-2 no-underline whitespace-nowrap">
              <span className="material-symbols-outlined text-[18px]">chat</span><T>Hubungi via WhatsApp</T>
            </a>
            <SiteLink href="/kontak" className="px-7 py-3.5 rounded-full border-[1.5px] border-primary text-primary hover:bg-primary-container/5 font-label-lg text-label-lg uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 no-underline whitespace-nowrap">
              <T>Halaman Kontak</T>
            </SiteLink>
          </div>
        </div>
      </section>
    </div>
    </Scope>
  );
}

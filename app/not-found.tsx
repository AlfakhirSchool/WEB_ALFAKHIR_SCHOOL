import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { SiteLink } from "@/components/SiteTransition";
import { Scope, T } from "@/components/content/T";
import { StarGlyph, Watermark } from "@/components/pages/portal-shared/Ornaments";

export const metadata: Metadata = { title: "Halaman tidak ditemukan" };

const links = [
  { href: "/", label: "Beranda", icon: "home" },
  { href: "/sd", label: "SD Islam Modern", icon: "auto_stories" },
  { href: "/smp", label: "SMP Islam Modern", icon: "school" },
  { href: "/ppdb", label: "PPDB 2027/2028", icon: "how_to_reg" },
  { href: "/kontak", label: "Kontak", icon: "chat" },
];

export default function NotFound() {
  return (
    <SiteShell site="portal">
      <Scope id="portal/404">
        <section className="relative w-full overflow-hidden bg-surface-container-low">
        <Watermark className="absolute -right-24 -top-10 w-[420px] h-[420px] text-primary" />
        <Watermark className="absolute -left-32 -bottom-32 w-[460px] h-[460px] text-secondary-container" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-margin-mobile pb-space-xl pt-32 text-center">
          <StarGlyph className="mb-space-sm w-10 h-10 text-tertiary-fixed-dim" />
          <span className="mb-space-md inline-flex items-center gap-2 rounded-full bg-primary-container/10 px-space-md py-1 font-label-md text-label-md font-bold uppercase text-primary"><T>Error 404</T></span>
          <h1 className="font-display-hero text-display-hero-mobile font-extrabold text-primary md:text-display-hero"><T>Halaman tidak ditemukan</T></h1>
          <p className="mt-space-md max-w-xl font-body-lg text-body-lg text-on-surface-variant"><T>Alamat yang Anda tuju tidak ada atau sudah dipindahkan. Silakan lanjut ke salah satu halaman berikut.</T></p>
          <div className="mt-space-lg flex flex-wrap justify-center gap-space-sm">
            {links.map((l) => (
              <SiteLink key={l.href} href={l.href} className="inline-flex items-center gap-2 rounded-full border border-primary-container/20 bg-surface-container-lowest px-space-md py-space-xs font-label-lg text-label-lg text-primary no-underline transition-colors hover:bg-primary-container hover:text-on-primary">
                <span className="material-symbols-outlined text-[18px]">{l.icon}</span><T>{l.label}</T>
              </SiteLink>
            ))}
          </div>
        </div>
        </section>
      </Scope>
    </SiteShell>
  );
}

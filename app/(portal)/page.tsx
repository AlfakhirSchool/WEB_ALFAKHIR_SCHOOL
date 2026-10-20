import type { Metadata } from "next";
import { SiteLink } from "@/components/SiteTransition";
import { Countdown } from "@/components/pages/portal-home/Countdown";
import { TwoDoors } from "@/components/pages/portal-home/TwoDoors";
import { Scope, T } from "@/components/content/T";
import { getSettings } from "@/lib/content/store";
import type { Jenjang } from "@/content/site";
import { Img } from "@/components/content/Img";

export const metadata: Metadata = {
  title: "Al Fakhir School - SD & SMP Islam Modern",
};

const facts = [
  { n: "2", color: "text-secondary-container", title: "Jenjang Terpadu", text: "SD & SMP Islam Modern Al Fakhir di Pasir Putih, Sawangan, Depok." },
  { n: "9", color: "text-primary", title: "Tahun Pembinaan", text: "Siklus holistik pembentukan karakter dan adab islami." },
  { n: "6", color: "text-tertiary-container", title: "Pilar Misi Pembinaan", text: "Berakhlak mulia, cinta Al-Qur'an, beribadah benar, berpengetahuan luas, berpikir kritis & kreatif, berbadan sehat." },
  { n: "9+", color: "text-primary-container", title: "Ekstrakurikuler SMP", text: "Pramuka, taekwondo, basket, panahan, futsal, drumband, jurnalistik, tari, dan hadroh." },
];

const tone: Record<Jenjang, { badge: string; hoverTitle: string; arrow: string }> = {
  SMP: { badge: "bg-primary-container", hoverTitle: "group-hover:text-primary", arrow: "group-hover:bg-primary text-primary" },
  SD: { badge: "bg-secondary-container", hoverTitle: "group-hover:text-secondary-container", arrow: "group-hover:bg-secondary-container text-secondary-container" },
  UMUM: { badge: "bg-tertiary-container", hoverTitle: "group-hover:text-tertiary-container", arrow: "group-hover:bg-tertiary-container text-tertiary font-bold" },
};

export default async function PortalHome() {
  const { news } = await getSettings();
  return (
    <Scope id="portal/home">
    <div className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
      {/* SECTION 1: Editorial Introduction */}
      <section className="relative w-full overflow-hidden pt-space-xl pb-space-lg">
        <div className="absolute -top-16 -right-16 w-96 h-96 pointer-events-none opacity-[0.035] text-primary">
          <svg className="w-full h-full animate-[spin_160s_linear_infinite]" fill="currentColor" viewBox="0 0 200 200">
            <rect height="130" rx="14" width="130" x="35" y="35"></rect>
            <rect height="130" rx="14" transform="rotate(45 100 100)" width="130" x="35" y="35"></rect>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-container/10 mb-space-sm">
            <svg className="w-3.5 h-3.5 text-secondary-container" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L14.7 6.3L19.8 4.2L19.2 9.5L24 12L19.2 14.5L19.8 19.8L14.7 17.7L12 22L9.3 17.7L4.2 19.8L4.8 14.5L0 12L4.8 9.5L4.2 4.2L9.3 6.3L12 2Z"></path>
            </svg>
            <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-widest"><T>Portal Resmi Al Fakhir School</T></span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md lg:gap-space-lg items-center">
            <div className="lg:col-span-6">
              <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero lg:text-[4.5rem] text-primary tracking-tight font-extrabold leading-[1.12]">
                <T>Al Fakhir School,</T><br />
                <span className="bg-gradient-to-r from-secondary-container via-tertiary-fixed-dim to-primary-container bg-clip-text text-transparent"><T>dua jenjang.</T></span>
              </h1>
            </div>
            <div className="lg:col-span-6 lg:border-l-2 lg:border-primary/10 lg:pl-space-lg">
              <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant leading-relaxed text-pretty">
                <strong className="font-semibold text-on-surface"><T>SD dan SMP Islam Modern Al Fakhir</T></strong>{" "}<T>— sembilan tahun pendidikan berkesinambungan yang membentuk generasi Islami modern: berpengetahuan luas, berakhlak baik, dan menjadi kebanggaan keluarga, masyarakat, bangsa, dan negara.</T>
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <SiteLink
                  href="/sd"
                  className="inline-flex items-center gap-2 rounded-full bg-secondary-container/10 px-4 py-2 font-label-md text-label-md font-semibold uppercase tracking-wider text-secondary-container ring-1 ring-secondary-container/20 transition hover:bg-secondary-container hover:text-surface-container-lowest whitespace-nowrap"
                >
                  <span className="h-2 w-2 rounded-full bg-current" />
                  <T>SD · Kelas 1–6</T>
                </SiteLink>
                <SiteLink
                  href="/smp"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-container/10 px-4 py-2 font-label-md text-label-md font-semibold uppercase tracking-wider text-primary ring-1 ring-primary/15 transition hover:bg-primary hover:text-surface-container-lowest whitespace-nowrap"
                >
                  <span className="h-2 w-2 rounded-full bg-current" />
                  <T>SMP · Kelas 7–9</T>
                </SiteLink>
                <span className="inline-flex items-center gap-1.5 px-2 font-label-md text-label-md text-on-surface-variant whitespace-nowrap">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <T>Sawangan, Depok</T>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: "Two Doors" Hero Split Portals */}
      <section className="w-full relative px-margin-mobile md:px-margin-tablet lg:px-margin pb-space-xl">
        <TwoDoors />
      </section>

      {/* SECTION 3: Foundation Impact Statement & Facts Ribbon */}
      <section className="w-full relative py-space-xl bg-surface-container-lowest overflow-hidden">
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none opacity-[0.03] text-primary">
          <svg className="w-full h-full animate-[spin_240s_linear_infinite]" fill="currentColor" viewBox="0 0 200 200">
            <rect height="150" rx="16" width="150" x="25" y="25"></rect>
            <rect height="150" rx="16" transform="rotate(45 100 100)" width="150" x="25" y="25"></rect>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-space-xl">
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary-container/10 mb-4">
              <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
            </div>
            <p className="font-headline-md text-headline-sm md:text-headline-md text-on-surface font-bold leading-snug text-balance">
              <T>“Terwujudnya pendidikan yang bermutu tinggi dalam membentuk siswa-siswi yang</T>{" "}<span className="text-primary underline decoration-tertiary-fixed-dim decoration-wavy underline-offset-8"><T>berakhlak</T></span>, <span className="text-secondary underline decoration-secondary-fixed underline-offset-8"><T>modern</T></span>, <T>dan menjadi</T>{" "}<span className="text-primary-container underline decoration-primary-fixed underline-offset-8"><T>kebanggaan orang tua, masyarakat, bangsa dan negara</T></span>.”
            </p>
            <p className="mt-3 font-label-md text-label-md text-on-surface-variant uppercase tracking-widest"><T>Visi SMP Islam Modern Al Fakhir</T></p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 pt-space-lg">
            {facts.map((f) => (
              <div key={f.title} className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pr-space-md">
                <span className={`font-display-hero text-display-hero-mobile md:text-display-hero font-extrabold ${f.color} leading-none`}><T>{f.n}</T></span>
                <span className="font-subheading text-subheading text-on-surface font-bold mt-2 text-balance"><T>{f.title}</T></span>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-pretty"><T>{f.text}</T></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PPDB 2027/2028 Countdown Band */}
      <section className="w-full relative bg-[#022E31] text-surface-container-lowest py-space-xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none flex items-center justify-between">
          <div className="w-80 h-80 -ml-20 rounded-full bg-primary-fixed-dim blur-3xl"></div>
          <div className="w-96 h-96 -mr-20 rounded-full bg-secondary-container blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin relative z-10">
          <div className="flex justify-center lg:justify-start mb-space-md">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl sm:rounded-full bg-tertiary-container/30 text-tertiary-fixed font-label-md text-label-md uppercase tracking-wider font-semibold text-left leading-snug">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-pulse shrink-0"></span>
              <T>PENERIMAAN PESERTA DIDIK BARU TA 2027/2028</T>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-space-lg">
            <div className="space-y-3 text-center lg:text-left">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-surface-container-lowest font-extrabold tracking-tight text-balance">
                <T>Pendaftaran Gelombang&nbsp;1</T><br className="hidden sm:inline" />{" "}<T>Telah Dibuka</T>
              </h2>
              <p className="font-body-md text-body-md text-surface-dim max-w-lg text-pretty mx-auto lg:mx-0">
                <T>Ikuti observasi calon siswa dan wawancara orang tua untuk tahun akademik 2027/2028.</T>
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-4 min-w-0">
              <Countdown />
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:justify-center">
                <SiteLink className="px-5 py-3.5 rounded-full bg-secondary-container hover:bg-secondary text-surface-container-lowest font-label-lg text-label-lg uppercase tracking-wider text-center transition-all duration-300 shadow-md flex items-center justify-center gap-2 whitespace-nowrap" href="/ppdb">
                  <span><T>Informasi &amp; Prosedur PPDB</T></span>
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </SiteLink>
                <SiteLink className="px-5 py-3.5 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-surface-container-lowest font-label-lg text-label-lg tracking-wide text-center transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 whitespace-nowrap" href="/kontak">
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                  <span><T>Jadwalkan Kunjungan</T></span>
                </SiteLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Berita Terkini & Prestasi */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-md gap-4 pb-4 border-b border-primary-container/15">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider"><T>Warta &amp; Dinamika Civitas</T></span>
              </div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-extrabold tracking-tight text-balance">
                <T>Kabar &amp; Prestasi Al Fakhir</T>
              </h2>
            </div>
            <SiteLink className="group inline-flex items-center gap-2 font-label-lg text-label-lg text-primary hover:text-primary-container transition-colors py-2 whitespace-nowrap" href="/berita">
              <span><T>Lihat Semua Berita</T></span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
            </SiteLink>
          </div>
          <div className="flex flex-col">
            {news.slice(0, 4).map((n) => (
              <div key={n.slug} className="border-b border-primary-container/10 last:border-b-0">
              <SiteLink className="group flex items-center justify-between gap-4 py-space-md hover:bg-surface-container-lowest/70 transition-all duration-200 px-4 -mx-4 rounded-xl" href={`/berita/${n.slug}`}>
                {n.image && (
                  // eslint-disable-next-line @next/next/no-img-element -- dashboard uploads are served from /api/media
                  <Img src={n.image} alt="" loading="lazy" className="hidden sm:block shrink-0 w-24 h-16 lg:w-28 lg:h-20 rounded-lg object-cover bg-surface-container" />
                )}
                <div className="flex-1 min-w-0 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-space-md">
                  <div className="shrink-0 flex items-center gap-3 lg:w-44">
                    <span className={`inline-flex items-center justify-center min-w-[4.75rem] px-3 py-1 rounded-full ${tone[n.jenjang].badge} text-surface-container-lowest font-label-md text-label-md font-bold uppercase tracking-wider whitespace-nowrap`}>
                      {n.jenjang}
                    </span>
                    <span className="font-caption text-caption text-outline whitespace-nowrap">{n.date}</span>
                  </div>
                  <div className="min-w-0 flex-1 max-w-3xl">
                    <h3 className={`font-subheading text-subheading text-on-surface ${tone[n.jenjang].hoverTitle} font-bold transition-colors text-pretty`}>{n.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mt-1">{n.summary}</p>
                  </div>
                </div>
                <div className={`shrink-0 w-10 h-10 rounded-full bg-surface-container ${tone[n.jenjang].arrow} group-hover:text-surface-container-lowest flex items-center justify-center transition-all duration-300 group-hover:rotate-[-45deg] shadow-sm`}>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </div>
              </SiteLink>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </Scope>
  );
}

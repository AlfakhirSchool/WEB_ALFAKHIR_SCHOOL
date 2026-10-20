import Image from "@/components/content/Image";
import { SiteLink } from "@/components/SiteTransition";
import { PageHero } from "@/components/pages/portal-shared/PageHero";
import { Eyebrow, Watermark } from "@/components/pages/portal-shared/Ornaments";
import { CopyButton } from "@/components/pages/portal-kontak/CopyButton";
import { KontakForm } from "@/components/pages/portal-kontak/KontakForm";
import { Scope, T } from "@/components/content/T";
import { getSettings } from "@/lib/content/store";
import { mapsEmbed, mapsLink, waLinkFor } from "@/content/settings";
import { SocialLinks, socialsOf } from "@/components/SocialLinks";

const quick = [
  { icon: "schedule", tone: "text-primary", label: "Jam layanan", value: "Senin – Sabtu, 07.30 – 16.00" },
  { icon: "flag_circle", tone: "text-tertiary", label: "Kunjungan sekolah", value: "Terjadwal via WhatsApp" },
  { icon: "bolt", tone: "text-secondary", label: "Respon chat", value: "Melalui WhatsApp resmi" },
];

const campuses = [
  { href: "/sd/kontak", logo: "/logo-sd.webp", name: "SD Islam Modern Al Fakhir", tag: "Kelas 1 – 6", dot: "bg-secondary-container", btn: "text-secondary" },
  { href: "/smp/kontak", logo: "/logo-smp.png", name: "SMP Islam Modern Al Fakhir", tag: "Kelas 7 – 9", dot: "bg-primary-container", btn: "text-primary" },
];

export default async function Kontak() {
  const { contact } = await getSettings();
  const mapQuery = `Al Fakhir School, ${contact.address}`;
  const socials = [
    { name: "SD Islam Modern", items: socialsOf(contact.sd, "SD") },
    { name: "SMP Islam Modern", items: socialsOf(contact.smp, "SMP") },
    ...(socialsOf(contact).length ? [{ name: "Al Fakhir School", items: socialsOf(contact) }] : []),
  ].filter((s) => s.items.length > 0);
  return (
    <Scope id="portal/kontak">
    <div className="w-full bg-surface">
      <PageHero
        eyebrow="Hubungi kami"
        title={<T>Kontak</T>}
        lead={<T>Silaturahmi dengan kami: tanyakan PPDB, atur kunjungan sekolah SD dan SMP Islam Modern Al Fakhir, atau sampaikan pertanyaan Ayah &amp; Bunda.</T>}
        aside={
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-lowest p-2">
            <div className="relative h-72 md:h-96 w-full rounded-xl overflow-hidden">
              <Image src="/photos/gedung-depan.jpg" alt="Gedung Al Fakhir School, Sawangan, Depok" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" priority />
              <div className="absolute left-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-surface-container-lowest/90 backdrop-blur px-3.5 py-2 font-label-md text-label-md text-on-surface font-semibold">
                <span className="material-symbols-outlined text-[18px] text-secondary-container">location_on</span><T>Sawangan, Depok</T>
              </div>
            </div>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-3 pt-3 items-stretch">
          {quick.map((q) => (
            <div key={q.label} className="flex items-center gap-3 bg-surface-container-lowest p-3.5 rounded-xl border border-primary-container/10 h-full">
              <div className={`w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 ${q.tone}`}>
                <span className="material-symbols-outlined text-[20px]">{q.icon}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-caption text-caption text-outline font-semibold uppercase"><T>{q.label}</T></span>
                <span className="font-label-lg text-label-lg text-on-surface"><T>{q.value}</T></span>
              </div>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container-lowest p-5 md:p-8 rounded-xl border border-primary-container/10 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Eyebrow dot="bg-secondary" className="text-secondary"><T>Agenda kunjungan &amp; pesan</T></Eyebrow>
                <h2 className="font-headline-md text-headline-md text-primary font-bold text-balance"><T>Jadwalkan kunjungan atau kirim pesan</T></h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-pretty"><T>Pilih jenjang tujuan, isi formulir, lalu kirim lewat WhatsApp. Tim kami akan mengonfirmasi jadwal.</T></p>
              </div>
              <KontakForm />
            </div>
          </div>

          {/* Directory */}
          <div className="lg:col-span-5 flex flex-col gap-gutter">
            <dl className="m-0 bg-surface-container-lowest rounded-xl border border-primary-container/10 px-space-md">
              <div className="py-space-sm border-b border-primary-container/10">
                <dt className="font-caption text-caption text-outline font-semibold uppercase tracking-wider"><T>WhatsApp</T></dt>
                <dd className="m-0 mt-1 flex flex-wrap items-center gap-3 font-title-lg text-title-lg text-on-surface font-bold">
                  <a href={waLinkFor(contact)} target="_blank" rel="noopener noreferrer" className="text-on-surface hover:text-primary no-underline">{contact.waDisplay}</a>
                  <CopyButton text={contact.waDisplay} />
                </dd>
              </div>
              <div className="py-space-sm border-b border-primary-container/10">
                <dt className="font-caption text-caption text-outline font-semibold uppercase tracking-wider"><T>Alamat</T></dt>
                <dd className="m-0 mt-1 font-body-md text-body-md text-on-surface">{contact.address}</dd>
              </div>
              <div className="py-space-sm border-b border-primary-container/10">
                <dt className="font-caption text-caption text-outline font-semibold uppercase tracking-wider"><T>Email</T></dt>
                <dd className="m-0 mt-1 font-body-md text-body-md text-on-surface"><a href={`mailto:${contact.email}`} className="text-on-surface hover:text-primary no-underline break-all">{contact.email}</a></dd>
              </div>
              <div className="py-space-sm">
                <dt className="font-caption text-caption text-outline font-semibold uppercase tracking-wider"><T>Jam layanan</T></dt>
                <dd className="m-0 mt-1 font-body-md text-body-md text-on-surface"><T>Senin – Sabtu: 07.30 – 16.00 WIB</T></dd>
              </div>
              {socials.length > 0 && (
                <div className="py-space-sm border-t border-primary-container/10">
                  <dt className="font-caption text-caption text-outline font-semibold uppercase tracking-wider"><T>Media sosial</T></dt>
                  <dd className="m-0 mt-2 flex flex-col gap-2">
                    {socials.map((s) => (
                      <span key={s.name} className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-body-sm text-body-sm text-on-surface-variant"><T>{s.name}</T></span>
                        <SocialLinks items={s.items} itemClassName="border border-primary-container/20 text-primary hover:bg-surface-container" />
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>

            <div className="flex flex-col gap-3">
              {campuses.map((c) => (
                <SiteLink key={c.href} href={c.href} className="group flex items-center gap-4 bg-surface-container-lowest rounded-xl border border-primary-container/10 hover:border-primary-container/30 p-space-sm pr-space-md transition-colors no-underline">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface-container-low">
                    <Image src={c.logo} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-2 font-caption text-caption uppercase tracking-wider font-bold text-on-surface-variant">
                      <span className={`w-2 h-2 rounded-full ${c.dot}`} /><T>{c.tag}</T>
                    </span>
                    <span className="block font-subheading text-subheading text-on-surface font-bold text-balance"><T>{c.name}</T></span>
                  </span>
                  <span className={`material-symbols-outlined ${c.btn} group-hover:translate-x-1 transition-transform duration-200`}>arrow_forward</span>
                </SiteLink>
              ))}
            </div>

            <div className="relative flex-1 overflow-hidden rounded-xl bg-[#022E31] text-surface-container-lowest p-space-md flex flex-col justify-between gap-space-md">
              <Watermark className="absolute -right-16 -bottom-16 w-56 h-56 text-surface-container-lowest" />
              <div className="relative">
                <span className="material-symbols-outlined text-[28px] text-tertiary-fixed-dim">forum</span>
                <p className="m-0 mt-2 font-subheading text-subheading font-bold text-balance"><T>Respon chat melalui WhatsApp resmi</T></p>
                <p className="m-0 mt-1 font-body-sm text-body-sm text-surface-dim"><T>Senin – Sabtu, 07.30 – 16.00 WIB</T></p>
              </div>
              <a href={waLinkFor(contact, "Assalamu'alaikum, saya ingin bertanya tentang Al Fakhir School.")} target="_blank" rel="noopener noreferrer"
                className="relative self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary-container hover:bg-secondary text-surface-container-lowest font-label-lg text-label-lg uppercase tracking-wider shadow-md transition-all no-underline whitespace-nowrap">
                <span className="material-symbols-outlined text-[18px]">chat</span><T>Chat WhatsApp</T>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="w-full pb-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-space-md">
            <div>
              <Eyebrow><T>Lokasi</T></Eyebrow>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-extrabold tracking-tight text-balance"><T>Temukan kami di Sawangan, Depok</T></h2>
            </div>
            <a href={mapsLink(mapQuery)} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-label-lg text-label-lg text-primary hover:text-primary-container transition-colors py-2 no-underline whitespace-nowrap">
              <span><T>Buka di Google Maps</T></span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
            </a>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-primary-container/10 bg-surface-container-low h-[320px] md:h-[420px]">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center" aria-hidden="true">
              <Watermark className="absolute -left-20 -top-20 w-80 h-80 text-primary" />
              <span className="material-symbols-outlined text-[40px] text-secondary-container">location_on</span>
              <span className="font-subheading text-subheading text-on-surface font-bold"><T>Al Fakhir School</T></span>
              <span className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">{contact.address}</span>
            </div>
            <iframe title="Peta lokasi Al Fakhir School, Sawangan, Depok" src={mapsEmbed(mapQuery)} className="relative w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
        </div>
      </section>
    </div>
    </Scope>
  );
}

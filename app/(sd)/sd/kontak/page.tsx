import type { Metadata } from "next";
import { Scope, T } from "@/components/content/T";
import { mapsEmbed, mapsLink, waLinkFor, wazeLink } from "@/content/settings";
import { getSettings } from "@/lib/content/store";
import { Faq } from "@/components/pages/sd-kontak/Faq";
import { ReservationForm } from "@/components/pages/sd-kontak/ReservationForm";
import { Img } from "@/components/content/Img";

export const metadata: Metadata = {
  title: "Kontak & Kunjungan SD Islam Modern Al Fakhir",
  description: "Jadwalkan kunjungan sekolah dan trial class SD Islam Modern Al Fakhir, Sawangan, Depok.",
};

export default async function SdKontak() {
  const { contact } = await getSettings();
  const igHandle = /instagram\.com\/([^/?#]+)/.exec(contact.sd.instagram)?.[1];
  return (
<Scope id="sd/kontak">
<div className="w-full pt-[88px] bg-surface min-h-[calc(100vh-120px)]"><div className="flex flex-col w-full">
<div className="relative w-full overflow-hidden bg-surface-bright">
<div className="absolute -top-40 -left-40 w-96 h-96 bg-secondary-fixed/50 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute top-20 right-0 w-80 h-80 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none"></div>
<section className="relative max-w-7xl mx-auto px-margin-mobile md:px-margin pt-space-xl pb-space-lg">
<div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-space-md">
<div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-2xl sm:rounded-full bg-secondary-fixed text-primary font-label-md text-label-md uppercase tracking-wider shadow-sm text-center leading-snug">
<span className="material-symbols-outlined text-[18px] shrink-0">meeting_room</span>
<span className="text-balance"><T>Pintu Silaturahmi &amp; Konsultasi Wali Murid • Sawangan, Depok</T></span>
</div>
<h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight max-w-3xl text-balance">
          <T>Jelajahi Suasana Belajar Ceria, Rasakan Kehangatan Keluarga Besar</T>{" "}<span className="text-primary-container"><T>SD Islam Modern Al Fakhir</T></span>
</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed text-pretty">
          <T>Kami mengundang Ayah &amp; Bunda bersama ananda tercinta untuk hadir langsung ke sekolah kami di Sawangan. Rasakan denyut keceriaan halaqah Al-Qur&apos;an, kelas eksplorasi sains alamiah, dan lingkungan pembiasaan adab harian yang menyenangkan.</T>
        </p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md w-full pt-space-lg text-left">
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-space-sm group hover:shadow-md transition-shadow h-full">
<div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary-container flex-shrink-0">
<span className="material-symbols-outlined text-[26px]">schedule</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-md text-title-md text-on-surface text-balance"><T>Jam Operasional Front Office</T></span>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
                <span className="xl:whitespace-nowrap"><T>Senin – Jumat 07.30 – 15.30 WIB</T></span><br />
<span className="font-label-md text-label-md text-secondary"><T>Sabtu 08.00 – 13.00 WIB</T></span>
</p>
</div>
</div>
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-space-sm group hover:shadow-md transition-shadow h-full">
<div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary flex-shrink-0">
<span className="material-symbols-outlined text-[26px]">tour</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-md text-title-md text-on-surface text-balance"><T>School Tour Ramah Anak</T></span>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
                <span className="whitespace-nowrap"><T>Sesi Pagi:</T>{" "}<strong><T>08.30 WIB</T></strong></span> • <span className="whitespace-nowrap"><T>Sesi Siang:</T>{" "}<strong><T>10.30 WIB</T></strong></span><br />
                <T>Didampingi langsung oleh Wali Kelas Ramah</T>
              </p>
</div>
</div>
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-space-sm group hover:shadow-md transition-shadow h-full">
<div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-primary-container flex-shrink-0">
<span className="material-symbols-outlined text-[26px]">chat_bubble</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-md text-title-md text-on-surface text-balance"><T>Respons Konsultasi WA</T></span>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
                <T>Rata-rata dibalas dalam kurun waktu</T>{" "}<strong><T>&lt; 10 Menit</T></strong>{" "}<T>selama jam operasional kerja aktif.</T>
              </p>
</div>
</div>
</div>
</section>
<div className="max-w-7xl mx-auto px-margin-mobile md:px-margin mb-space-xl">
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div className="relative h-44 rounded-lg overflow-hidden shadow-sm group">
<Img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Warm modern Islamic elementary school front desk with cheerful Indonesian hijab female teachers greeting parents and children, warm natural light, wooden interior, cheerful ambient" src="/design/sd-kontak/01.jpg" />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-space-sm">
<span className="text-white font-title-md text-title-md flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">verified</span>{" "}<T>Front Office Hangat</T></span>
</div>
</div>
<div className="relative h-44 rounded-lg overflow-hidden shadow-sm group">
<Img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Active Indonesian elementary students exploring green nature garden and hydroponic greenhouse on school grounds, sunny day, joyful atmosphere, teacher guiding them" src="/design/sd-kontak/02.jpg" />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-space-sm">
<span className="text-white font-title-md text-title-md flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">psychology</span>{" "}<T>Edu-Green Nature Spot</T></span>
</div>
</div>
<div className="relative h-44 rounded-lg overflow-hidden shadow-sm group">
<Img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Cozy interactive classroom with colorful cushions, Islamic geometric decals on glass windows, children having interactive storytelling session with smiles" src="/design/sd-kontak/03.jpg" />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-space-sm">
<span className="text-white font-title-md text-title-md flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">auto_stories</span>{" "}<T>Trial Class Interaktif</T></span>
</div>
</div>
</div>
</div>
</div>
<section className="w-full bg-surface-container-low py-space-xl">
<div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-stretch">
<div className="lg:col-span-7 bg-surface-container-lowest p-space-md sm:p-space-lg md:p-space-xl rounded-xl shadow-md">
<div className="flex items-center gap-space-xs text-primary mb-1">
<span className="material-symbols-outlined text-[24px]">event_available</span>
<span className="font-label-md text-label-md uppercase tracking-wider"><T>Reservasi Kunjungan Sekolah</T></span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface text-balance"><T>Formulir Kunjungan Sekolah &amp; Trial Class Siswa</T></h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 mb-space-lg text-pretty">
            <T>Bawa ananda untuk langsung merasakan duduk di kelas interaktif kami, menyapa guru pendamping, dan bermain di taman eksplorasi sains alami.</T>
          </p>
<ReservationForm />
</div>
<div className="lg:col-span-5 flex flex-col space-y-space-lg">
<div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-xl shadow-sm space-y-space-md">
<h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary shrink-0">contacts</span>
              <T>Saluran Komunikasi Resmi</T>
            </h3>
<div className="space-y-space-sm">
<div className="p-space-sm rounded-lg bg-surface-container flex items-center justify-between gap-space-sm hover:bg-surface-container-high transition-colors">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-10 h-10 rounded-full bg-secondary-fixed text-primary-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-[20px]">support_agent</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-on-surface-variant"><T>Hotline Admin PPDB SD</T></span>
<span className="font-title-md text-title-md text-on-surface">{contact.sd.waDisplay}</span>
</div>
</div>
<a className="shrink-0 inline-flex items-center justify-center min-h-10 px-space-md rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm hover:bg-primary transition-all" href={waLinkFor(contact, "Halo Admin PPDB SD Al Fakhir, saya ingin bertanya.", "sd")} target="_blank" rel="noopener noreferrer"><T>Chat</T></a>
</div>
<div className="p-space-sm rounded-lg bg-surface-container flex items-center justify-between gap-space-sm hover:bg-surface-container-high transition-colors">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-10 h-10 rounded-full bg-tertiary-fixed text-tertiary flex-shrink-0 flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">psychology_alt</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-on-surface-variant"><T>Konseling &amp; Psikolog Anak</T></span>
<span className="font-title-md text-title-md text-on-surface">{contact.sd.waDisplay}</span>
</div>
</div>
<a className="shrink-0 inline-flex items-center justify-center min-h-10 px-space-md rounded-full bg-tertiary-container text-on-tertiary font-label-sm text-label-sm hover:bg-tertiary transition-all" href={waLinkFor(contact, "Halo, saya ingin konsultasi dengan Konseling & Psikolog Anak SD Al Fakhir.", "sd")} target="_blank" rel="noopener noreferrer"><T>Tanya</T></a>
</div>
{contact.sd.instagram && (
<a className="p-space-sm rounded-lg bg-surface-container flex items-center gap-space-sm hover:bg-surface-container-high transition-colors" href={contact.sd.instagram} target="_blank" rel="noopener noreferrer">
<div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex-shrink-0 flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">photo_camera</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-on-surface-variant"><T>Instagram Resmi SD</T></span>
<span className="font-title-md text-title-md text-on-surface break-all">{igHandle ? `@${igHandle}` : contact.sd.instagram}</span>
</div>
</a>
)}
<div className="p-space-sm rounded-lg bg-surface-container flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex-shrink-0 flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">mail</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-on-surface-variant"><T>Email Resmi Humas Sekolah</T></span>
<a className="font-title-md text-title-md text-on-surface break-all hover:text-primary transition-colors" href={`mailto:${contact.sd.email}`}>{contact.sd.email}</a>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-xl shadow-sm space-y-space-md">
<h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary-container shrink-0">explore</span>
              <T>3 Tahap Asyik School Tour</T>
            </h3>
<div className="space-y-space-md relative">
<div className="flex items-start gap-space-sm">
<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-title-md text-title-md flex-shrink-0 mt-0.5">
                  <T>1</T>
                </div>
<div className="min-w-0">
<h4 className="font-title-md text-title-md text-on-surface"><T>Mini Safari Sekolah &amp; Kebun Edukasi</T></h4>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                    <T>Berkeliling taman hidroponik, saung baca adab, dan berinteraksi memberi makan di kebun kelinci sekolah yang asri.</T>
                  </p>
</div>
</div>
<div className="flex items-start gap-space-sm">
<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-title-md text-title-md flex-shrink-0 mt-0.5">
                  <T>2</T>
                </div>
<div className="min-w-0">
<h4 className="font-title-md text-title-md text-on-surface"><T>Trial Class 20 Menit Ceria</T></h4>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                    <T>Ananda didampingi guru berpengalaman dalam eksperimen sains mini yang seru, dongeng Islami interaktif, serta kuis santai berhadiah.</T>
                  </p>
</div>
</div>
<div className="flex items-start gap-space-sm">
<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-title-md text-title-md flex-shrink-0 mt-0.5">
                  <T>3</T>
                </div>
<div className="min-w-0">
<h4 className="font-title-md text-title-md text-on-surface"><T>Dialog Hati ke Hati &amp; Psikolog</T></h4>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                    <T>Sesi diskusi privat antara orang tua dengan kepala sekolah dan konselor untuk pemetaan potensi unik dan kesiapan ananda.</T>
                  </p>
</div>
</div>
</div>
</div>
<div className="p-space-md rounded-xl bg-surface-container-highest shadow-sm">
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-primary-container text-[26px] shrink-0">devices</span>
<div className="min-w-0">
<h4 className="font-title-md text-title-md text-on-surface"><T>Layanan Daring untuk Luar Daerah</T></h4>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  <T>Bagi keluarga yang berdomisili di luar Jabodetabek namun berencana pindah tugas ke Depok, kami menyediakan sesi</T>{" "}<em><T>School Virtual Walkthrough</T></em>{" "}<T>via Zoom bersama tim kurikulum.</T>
                </p>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section className="max-w-7xl mx-auto px-margin-mobile md:px-margin py-space-xl">
<div className="text-center max-w-3xl mx-auto mb-space-lg">
<span className="font-label-md text-label-md uppercase tracking-wider text-primary"><T>Aksesibilitas &amp; Lingkungan</T></span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-1 text-balance"><T>Lokasi Strategis &amp; Lingkungan Asri Sawangan, Depok</T></h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-2 text-pretty">
        <T>Kami berlokasi di Sawangan, Kota Depok. Gunakan tombol Google Maps atau Waze di bawah untuk membuka rute dari lokasi Ayah &amp; Bunda.</T>
      </p>
<div className="inline-flex items-center justify-center gap-2 mt-space-sm px-space-md py-1.5 rounded-2xl sm:rounded-full bg-surface-container-high text-on-surface font-body-md text-body-md text-center">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0">pin_drop</span>
<span className="text-balance">{contact.sd.address}</span>
</div>
</div>
<div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-surface-container-highest mb-space-lg">
<div className="w-full h-56 md:h-96 relative" data-location={contact.sd.address}><iframe title="Peta lokasi SD Islam Modern Al Fakhir, Sawangan, Depok" src={mapsEmbed(contact.sd.mapQuery)} className="absolute inset-0 w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
<div className="relative md:absolute md:bottom-6 md:left-6 md:w-96 p-space-md md:rounded-xl bg-surface-bright md:bg-surface-bright/95 md:backdrop-blur-md md:shadow-xl border-none">
<div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-wide">
<span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-ping"></span>
            <T>SD Islam Modern Al Fakhir</T>
          </div>
<h4 className="font-title-lg text-title-lg text-on-surface font-bold mt-1"><T>SD Islam Modern Al Fakhir</T></h4>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
            <T>Gedung Hijau Terpadu • Area Parkir Luas &amp; Drop-off Ramah Anak</T>
          </p>
<div className="mt-space-sm flex flex-wrap items-center gap-space-xs">
<a className="px-space-md py-2 rounded-full bg-primary-container text-on-primary font-label-md text-label-md whitespace-nowrap flex items-center gap-1 hover:bg-primary transition-all" href={mapsLink(contact.sd.mapQuery)} target="_blank" rel="noopener noreferrer">
<span className="material-symbols-outlined text-[18px]">map</span>
              <T>Buka Google Maps</T>
            </a>
<a className="px-space-md py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md whitespace-nowrap flex items-center gap-1 hover:bg-surface-container-highest transition-all" href={wazeLink(contact.sd.mapQuery)} target="_blank" rel="noopener noreferrer">
<span className="material-symbols-outlined text-[18px]">navigation</span>
              <T>Waze Navigasi</T>
            </a>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
<div className="p-space-md sm:p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between h-full">
<div className="space-y-space-xs">
<div className="w-12 h-12 rounded-full bg-secondary-fixed text-primary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[26px]">directions_car</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface font-bold text-balance"><T>Dengan Kendaraan Pribadi</T></h3>
<p className="font-body-md text-body-md text-on-surface-variant text-pretty">
            <T>Masukkan alamat sekolah ke Google Maps atau Waze dan ikuti rute dari lokasi Ayah &amp; Bunda. Alamat lengkap tertera di bagian atas halaman ini.</T>
          </p>
</div>
<div className="mt-space-md pt-space-xs text-primary font-label-md text-label-md flex items-start gap-1">
<span className="material-symbols-outlined text-[18px] shrink-0">navigation</span>{" "}<T>Navigasi via Google Maps atau Waze</T>
        </div>
</div>
<div className="p-space-md sm:p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between h-full">
<div className="space-y-space-xs">
<div className="w-12 h-12 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[26px]">train</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface font-bold text-balance"><T>Dengan Transportasi Umum atau Daring</T></h3>
<p className="font-body-md text-body-md text-on-surface-variant text-pretty">
            <T>Gunakan aplikasi peta, taksi, atau ojek daring dengan alamat sekolah sebagai tujuan, lalu minta turun di depan gerbang SD Islam Modern Al Fakhir.</T>
          </p>
</div>
<div className="mt-space-md pt-space-xs text-tertiary font-label-md text-label-md flex items-start gap-1">
<span className="material-symbols-outlined text-[18px] shrink-0">travel_explore</span>{" "}<T>Cari Rute di Aplikasi Peta</T>
        </div>
</div>
<div className="p-space-md sm:p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between h-full">
<div className="space-y-space-xs">
<div className="w-12 h-12 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[26px]">airport_shuttle</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface font-bold text-balance"><T>Jalur Shuttle Bus Resmi</T></h3>
<p className="font-body-md text-body-md text-on-surface-variant text-pretty">
            <T>Tersedia armada antar-jemput ber-AC terpercaya dengan pengemudi tersertifikasi dan pendamping guru, melayani rute Cinere, Sawangan, Gandul, Kukusan, Beji, dan Cipayung Depok.</T>
          </p>
</div>
<div className="mt-space-md pt-space-xs text-secondary font-label-md text-label-md flex items-start gap-1">
<span className="material-symbols-outlined text-[18px] shrink-0">security</span>{" "}<T>Aman &amp; Terlacak GPS Realtime</T>
        </div>
</div>
</div>
</section>
<section className="w-full bg-surface-container py-space-xl">
<div className="max-w-4xl mx-auto px-margin-mobile md:px-margin">
<div className="text-center mb-space-lg">
<span className="font-label-md text-label-md uppercase tracking-wider text-primary"><T>Tanya Jawab Populer</T></span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-1 text-balance"><T>Seputar Kunjungan Sekolah &amp; Trial Class</T></h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-2 text-pretty">
          <T>Berikut adalah pertanyaan yang paling sering diajukan oleh Ayah &amp; Bunda saat merencanakan silaturahmi ke sekolah kami.</T>
        </p>
</div>
<Faq />
</div>
</section>
<section className="max-w-7xl mx-auto px-margin-mobile md:px-margin py-space-xl">
<div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-container via-secondary-container to-secondary text-on-primary p-space-md sm:p-space-lg md:p-space-xl shadow-xl">
<div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
<svg fill="currentColor" height="320" viewBox="0 0 200 200" width="320">
<path d="M100 0 L130 70 L200 100 L130 130 L100 200 L70 130 L0 100 L70 70 Z"></path>
</svg>
</div>
<div className="relative z-10 max-w-3xl flex flex-col space-y-space-md">
<div className="inline-flex items-center gap-2 px-space-sm py-1 rounded-full bg-white/20 backdrop-blur-sm w-fit font-label-md text-label-md text-white">
<span className="material-symbols-outlined text-[18px] shrink-0">video_chat</span>
<span><T>Konsultasi Fleksibel Dari Rumah</T></span>
</div>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white font-bold leading-tight text-balance">
          <T>Belum Sempat Berkunjung Hari Ini? Konsultasikan Kesiapan Belajar Ananda Bersama Tim Pendidik Kami.</T>
        </h2>
<p className="font-body-lg text-body-lg text-white/90 text-pretty">
          <T>Tim konselor akademik dan kepala sekolah siap meluangkan waktu berdialog secara virtual untuk mendengarkan kebutuhan putra-putri tercinta.</T>
        </p>
<div className="flex flex-col sm:flex-row items-center gap-space-sm pt-space-xs">
<a className="w-full sm:w-auto px-space-md sm:px-space-lg py-3.5 rounded-full bg-surface-bright text-primary font-label-lg text-label-lg text-center shadow-md hover:bg-white active:translate-y-[2px] transition-all flex items-center justify-center gap-space-xs" href={waLinkFor(contact, "Halo Admin SD Al Fakhir, saya ingin jadwalkan konsultasi virtual", "sd")} target="_blank" rel="noopener noreferrer">
<span className="material-symbols-outlined text-[20px] shrink-0">videocam</span>
<span><T>Konsultasi Virtual via Zoom/Meet</T></span>
</a>
<a className="w-full sm:w-auto px-space-md sm:px-space-lg py-3.5 rounded-full bg-white/20 backdrop-blur-sm text-white font-label-lg text-label-lg text-center border-none hover:bg-white/30 active:translate-y-[2px] transition-all flex items-center justify-center gap-space-xs" href={waLinkFor(contact, "Halo Admin SD Al Fakhir, saya ingin berkonsultasi.", "sd")} target="_blank" rel="noopener noreferrer">
<span className="material-symbols-outlined text-[20px] shrink-0">chat</span>
<span><T>Hubungi WhatsApp Care SD</T></span>
</a>
</div>
</div>
</div>
</section>
</div></div>
</Scope>
  );
}

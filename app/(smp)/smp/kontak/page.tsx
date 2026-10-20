import { mapsEmbed, mapsLink, waLinkFor, wazeLink } from "@/content/settings";
import { getSettings } from "@/lib/content/store";
import { Scope, T } from "@/components/content/T";
import { ReservationForm } from "@/components/pages/smp-kontak/ReservationForm";
import { FaqAccordion } from "@/components/pages/smp-kontak/FaqAccordion";
import { Img } from "@/components/content/Img";

export const metadata = { title: "Kontak & Kunjungan SMP Islam Modern Al Fakhir" };

export default async function SmpKontakPage() {
  const { contact } = await getSettings();
  const igHandle = /instagram\.com\/([^/?#]+)/.exec(contact.smp.instagram)?.[1];
  return (
    <Scope id="smp/kontak">
    <div className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]">
    <div className="flex flex-col w-full">
      <section className="relative w-full overflow-hidden bg-surface-container-low py-space-xl">
        <div className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 opacity-[0.04] text-primary select-none">
          <svg className="w-full h-full fill-current" viewBox="0 0 100 100">
            <rect height="70" rx="8" width="70" x="15" y="15">
            </rect>
            <rect height="70" rx="8" transform="rotate(45 50 50)" width="70" x="15" y="15">
            </rect>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-x-12 lg:gap-y-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="inline-flex items-start sm:items-center gap-2 self-start bg-surface-container px-3.5 py-1.5 rounded-2xl sm:rounded-full shadow-sm max-w-full">
              <svg className="w-4 h-4 mt-0.5 sm:mt-0 text-tertiary fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 2l2.6 6.8L22 12l-7.4 3.2L12 22l-2.6-6.8L2 12l7.4-3.2z">
                </path>
              </svg>
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold text-pretty"><T>Hubungi &amp; Kunjungi SMP Islam Modern Al Fakhir · Sawangan, Depok</T></span>
            </div>
            <h1 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight leading-tight text-balance"><T>Silaturahmi, Kenali Sekolah Kami, &amp; Konsultasikan Pendidikan Ananda Bersama Kami.</T></h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed text-pretty"><T>Kami mengundang Ayah &amp; Bunda mengenal langsung lingkungan belajar, pembinaan karakter, dan program Qur&apos;ani di SMP Islam Modern Al Fakhir Sawangan, Depok.</T></p>
          </div>
          <div className="hidden lg:block lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container">
              <Img className="w-full h-[320px] object-cover" src="/photos/gedung-depan.jpg" alt="Gedung SMP Islam Modern Al Fakhir, Sawangan, Depok" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-on-primary flex flex-col gap-1">
                  <span className="font-label-md text-label-md text-tertiary-fixed uppercase tracking-wider font-bold"><T>SMP Islam Modern</T></span>
                  <span className="font-subheading text-subheading font-bold leading-snug">{contact.smp.address}</span>
                </div>
              </div>
            </div>
          </div>
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 bg-surface-container-lowest p-3.5 rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    access_time
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-caption text-caption text-outline font-semibold uppercase"><T>Front Office</T></span>
                  <span className="font-label-lg text-label-lg text-on-surface text-balance"><T>Senin – Sabtu, 07.30 – 16.00</T></span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-lowest p-3.5 rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    flag_circle
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-caption text-caption text-outline font-semibold uppercase"><T>Sesi Tour Terbimbing</T></span>
                  <span className="font-label-lg text-label-lg text-on-surface text-balance"><T>3 Sesi Setiap Hari (Pagi, Siang, Sore)</T></span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-lowest p-3.5 rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    bolt
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-caption text-caption text-outline font-semibold uppercase"><T>Layanan Chat</T></span>
                  <span className="font-label-lg text-label-lg text-on-surface"><T>WhatsApp Resmi Sekolah</T></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
            <div className="xl:col-span-7 flex flex-col">
              <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-sm flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary">
                    </span>
                    <span className="font-caption text-caption uppercase tracking-wider text-secondary font-bold"><T>Agenda Kunjungan Langsung</T></span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-primary font-bold"><T>Formulir Reservasi School Tour &amp; Konsultasi Akademik</T></h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant"><T>Kenali lingkungan belajar, fasilitas, dan program sekolah bersama tim SMP Al Fakhir, serta diskusikan seputar PPDB.</T></p>
                </div>
                <ReservationForm />
              </div>
            </div>
            <div className="xl:col-span-5 flex flex-col gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold"><T>Saluran Komunikasi Cepat</T></h3>
                  <span className="font-label-md text-label-md bg-surface-container text-primary font-bold px-2.5 py-1 rounded-full whitespace-nowrap"><T>Helpdesk Aktif</T></span>
                </div>
                <div className="flex flex-col gap-3">
                  <a className="flex items-center justify-between gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group" href={waLinkFor(contact, "Assalamu'alaikum, saya ingin bertanya seputar pendaftaran (PPDB) SMP Islam Modern Al Fakhir.", "smp")} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-[#25D366]/20 text-[#128C7E] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">
                          chat
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg text-on-surface font-bold leading-snug"><T>Helpdesk PPDB &amp; Pendaftaran</T></span>
                        <span className="font-caption text-caption text-outline break-words">
                          {contact.smp.waDisplay}{" "}<T>(WhatsApp Official)</T></span>
                      </div>
                    </div>
                    <span className="font-label-md text-label-md text-primary font-bold shrink-0 whitespace-nowrap group-hover:translate-x-1 transition-transform"><T>Hubungi →</T></span>
                  </a>
                  <a className="flex items-center justify-between gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group" href={waLinkFor(contact, "Assalamu'alaikum, saya ingin berkonsultasi mengenai program pendidikan untuk calon siswa SMP Islam Modern Al Fakhir.", "smp")} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-surface-container text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">
                          psychology
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg text-on-surface font-bold leading-snug"><T>Konsultasi Program &amp; Kurikulum</T></span>
                        <span className="font-caption text-caption text-outline break-words">
                          {contact.smp.waDisplay}
                        </span>
                      </div>
                    </div>
                    <span className="font-label-md text-label-md text-primary font-bold shrink-0 whitespace-nowrap group-hover:translate-x-1 transition-transform"><T>Chat →</T></span>
                  </a>
                  {contact.smp.instagram && (
                    <a className="flex items-center justify-between gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group" href={contact.smp.instagram} target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-surface-container text-tertiary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[18px]">
                            photo_camera
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-label-lg text-label-lg text-on-surface font-bold leading-snug"><T>Instagram Resmi SMP</T></span>
                          <span className="font-caption text-caption text-outline break-all">{igHandle ? `@${igHandle}` : contact.smp.instagram}</span>
                        </div>
                      </div>
                      <span className="font-label-md text-label-md text-primary font-bold shrink-0 whitespace-nowrap group-hover:translate-x-1 transition-transform"><T>Kunjungi →</T></span>
                    </a>
                  )}
                  <a className="flex items-center justify-between gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group" href="https://lms.smpialfakhir.sch.id" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-surface-container text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">
                          login
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg text-on-surface font-bold leading-snug"><T>Login LMS Siswa &amp; Wali</T></span>
                        <span className="font-caption text-caption text-outline break-all">lms.smpialfakhir.sch.id</span>
                      </div>
                    </div>
                    <span className="font-label-md text-label-md text-primary font-bold shrink-0 whitespace-nowrap group-hover:translate-x-1 transition-transform"><T>Masuk →</T></span>
                  </a>
                  <a className="flex items-center justify-between gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group" href={`mailto:${contact.smp.email}`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-surface-container text-secondary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">
                          alternate_email
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg text-on-surface font-bold leading-snug"><T>Email Resmi SMP</T></span>
                        <span className="font-caption text-caption text-outline break-all">{contact.smp.email}</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-4">
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold"><T>3 Alur Pengalaman School Tour</T></h3>
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-label-md shrink-0 mt-0.5"><T>1</T></div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-label-lg text-label-lg text-on-surface font-bold leading-snug"><T>Sambutan &amp; Pengenalan Sekolah</T></span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant"><T>Disambut tim sekolah dan diperkenalkan dengan program unggulan, lingkungan belajar, ekstrakurikuler, serta pembinaan karakter.</T></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-label-md shrink-0 mt-0.5"><T>2</T></div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-label-lg text-label-lg text-on-surface font-bold leading-snug"><T>School Tour Area Belajar &amp; Fasilitas</T></span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant"><T>Calon siswa diajak berkeliling melihat area belajar, mushola, laboratorium, dan perpustakaan.</T></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-label-md shrink-0 mt-0.5"><T>3</T></div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-label-lg text-label-lg text-on-surface font-bold leading-snug"><T>Dialog Bersama Tim Guru</T></span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant"><T>Orang tua berdiskusi langsung dengan tim guru untuk menyamakan persepsi nilai sekolah dan dukungan terhadap pendidikan anak.</T></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary text-on-primary p-6 rounded-xl shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">
                    timelapse
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-surface-container-lowest font-bold"><T>Jam Operasional Kantor</T></h3>
                </div>
                <div className="flex flex-col gap-2.5 font-body-sm text-body-sm text-primary-fixed-dim">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-4 pb-1">
                    <span><T>Senin – Jumat</T></span>
                    <span className="font-bold text-surface-container-lowest"><T>07.30 – 16.00 WIB</T></span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-4 pb-1">
                    <span><T>Sabtu (Khusus School Tour)</T></span>
                    <span className="font-bold text-surface-container-lowest"><T>08.00 – 14.30 WIB</T></span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-4">
                    <span><T>Ahad &amp; Libur Nasional</T></span>
                    <span className="font-bold text-tertiary-fixed sm:text-right text-balance"><T>Hubungi via WhatsApp</T></span>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="font-caption text-caption text-primary-fixed leading-relaxed"><T>*Kunjungan di luar jam operasional resmi dapat dikomunikasikan secara khusus melalui perjanjian terlebih dahulu via Kepala Sekretariat.</T></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  near_me
                </span>
                <span className="font-caption text-caption uppercase tracking-wider text-secondary font-bold"><T>Aksesibilitas Wilayah</T></span>
              </div>
              <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-bold text-balance"><T>Lokasi Strategis &amp; Akses Mudah Menuju Sekolah Kami di Sawangan</T></h2>
              <p className="font-body-md text-body-md text-on-surface-variant"><T>Kami berlokasi di Sawangan, Kota Depok. Gunakan tombol Google Maps atau Waze untuk membuka rute dari lokasi Ayah &amp; Bunda ke sekolah.</T></p>
            </div>
            <div className="flex flex-col items-start md:items-end md:text-right gap-1 md:max-w-xs shrink-0">
              <span className="font-caption text-caption text-outline font-semibold uppercase"><T>Alamat Sekolah:</T></span>
              <span className="font-label-lg text-label-lg text-primary font-bold text-pretty">{contact.smp.address}</span>
            </div>
          </div>
          <div className="w-full bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="relative w-full h-80 md:h-96">
              <div className="relative w-full h-full">
                <iframe title="Peta lokasi SMP Islam Modern Al Fakhir, Sawangan, Depok" src={mapsEmbed(contact.smp.mapQuery)} className="absolute inset-0 w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              </div>
              <div className="absolute top-4 left-4 md:top-6 md:left-6 max-w-sm bg-surface-container-lowest/95 backdrop-blur-md p-4 rounded-xl shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[22px]">
                      domain
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-[16px] text-primary font-bold truncate"><T>SMP Islam Modern Al Fakhir</T></span>
                    <span className="font-caption text-caption text-on-surface-variant"><T>Modern Islamic Education</T></span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-low px-2.5 py-1.5 rounded-lg text-on-surface">
                  <span className="material-symbols-outlined text-secondary text-[16px]">
                    navigation
                  </span>
                  <span className="font-caption text-caption font-semibold"><T>Buka rute dari lokasi Anda</T></span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <a className="flex-1 text-center bg-primary text-on-primary py-2 px-3 rounded-lg font-label-md text-label-md font-bold hover:bg-primary-container transition-colors" href={mapsLink(contact.smp.mapQuery)} target="_blank" rel="noopener noreferrer"><T>Buka di Google Maps</T></a>
                  <a className="flex-1 text-center bg-surface-container text-primary py-2 px-3 rounded-lg font-label-md text-label-md font-bold hover:bg-surface-variant transition-colors" href={wazeLink(contact.smp.mapQuery)} target="_blank" rel="noopener noreferrer"><T>Navigasi Waze</T></a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8 bg-surface-container-lowest">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5 text-primary">
                  <span className="material-symbols-outlined text-[22px]">
                    directions_car
                  </span>
                  <h4 className="font-headline-sm text-[16px] font-bold"><T>Kendaraan Pribadi</T></h4>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed"><T>Masukkan alamat sekolah ke Google Maps atau Waze dan ikuti rute dari lokasi Ayah &amp; Bunda. Alamat lengkap tertera di atas peta.</T></p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5 text-secondary">
                  <span className="material-symbols-outlined text-[22px]">
                    directions_subway
                  </span>
                  <h4 className="font-headline-sm text-[16px] font-bold"><T>Transportasi Umum atau Daring</T></h4>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed"><T>Gunakan aplikasi peta, taksi, atau ojek daring dengan alamat sekolah sebagai tujuan, lalu minta turun di depan gerbang SMP Islam Modern Al Fakhir.</T></p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5 text-tertiary">
                  <span className="material-symbols-outlined text-[22px]">
                    airport_shuttle
                  </span>
                  <h4 className="font-headline-sm text-[16px] font-bold"><T>Layanan Shuttle Sekolah</T></h4>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed"><T>SMP Islam Modern Al Fakhir mengoperasikan armada antar-jemput resmi ber-AC dengan pengemudi tersertifikasi. Melayani titik jemput strategis area Cinere, Sawangan Baru, Pamulang, Cibubur, dan Jagakarsa.</T></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center text-center lg:items-start lg:text-left gap-3">
            <span className="font-label-md text-label-md bg-surface-container px-3.5 py-1 rounded-full text-primary font-bold uppercase tracking-wider"><T>Tanya Jawab Seputar Reservasi</T></span>
            <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-bold text-balance"><T>Pertanyaan Umum Kunjungan &amp; Konsultasi</T></h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl"><T>Informasi ringkas untuk membantu Ayah &amp; Bunda mempersiapkan agenda kunjungan silaturahmi dengan optimal.</T></p>
          </div>
          <div className="lg:col-span-7">
            <FaqAccordion />
          </div>
        </div>
      </section>
      <section className="w-full py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="relative bg-primary-container text-on-primary rounded-xl p-6 sm:p-8 md:p-12 overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="pointer-events-none absolute -right-16 -bottom-16 w-80 h-80 opacity-10 text-on-primary">
              <svg className="w-full h-full fill-current" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40">
                </circle>
                <polygon points="50,10 62,38 90,38 68,56 76,84 50,68 24,84 32,56 10,38 38,38">
                </polygon>
              </svg>
            </div>
            <div className="flex flex-col gap-3 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 bg-surface-container-lowest/15 backdrop-blur-md px-3 py-1 rounded-full self-start">
                <span className="material-symbols-outlined text-tertiary-fixed text-[16px]">
                  videocam
                </span>
                <span className="font-label-md text-label-md text-surface-container-lowest font-bold"><T>Layanan Daring</T></span>
              </div>
              <h2 className="font-headline-md text-headline-sm md:text-headline-md font-bold text-surface-container-lowest leading-snug text-pretty"><T>Belum Sempat Berkunjung Langsung? Konsultasikan Secara Daring Bersama Tim SMP Al Fakhir.</T></h2>
              <p className="font-body-sm text-body-sm text-primary-fixed-dim leading-relaxed"><T>Hubungi kami melalui WhatsApp resmi untuk bertanya seputar program, kegiatan sekolah, dan proses pendaftaran siswa baru.</T></p>
            </div>
            <div className="flex flex-col gap-3 relative z-10 shrink-0 w-full md:w-auto">
              <a className="flex items-center justify-center gap-2 bg-surface-container-lowest text-primary py-3.5 px-6 max-sm:px-4 rounded-full font-headline-sm text-[16px] max-sm:text-[14px] font-bold text-center md:whitespace-nowrap shadow-md hover:bg-surface-container-low transition-all" href={waLinkFor(contact, "Assalamu'alaikum, saya ingin berkonsultasi online dengan pihak SMP Islam Modern Al Fakhir.", "smp")} target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined text-[20px]">
                  video_call
                </span>
                <span className="text-balance"><T>Konsultasi Online via WhatsApp</T></span>
              </a>
              <a className="flex items-center justify-center gap-2 bg-secondary-container text-on-secondary font-headline-sm text-[16px] max-sm:text-[14px] py-3.5 px-6 max-sm:px-4 rounded-full font-bold text-center md:whitespace-nowrap shadow-md hover:bg-secondary transition-all" href={waLinkFor(contact, "Halo SMP Al Fakhir, saya ingin berkonsultasi secara daring", "smp")} target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined text-[20px]">
                  chat
                </span>
                <span className="text-balance"><T>Chat Tim SMP via WhatsApp</T></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
    </Scope>
  );
}

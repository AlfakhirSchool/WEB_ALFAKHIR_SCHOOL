"use client";
import { useState } from "react";
import { VideoModal } from "@/components/VideoModal";
import { T } from "@/components/content/T";
import { Img } from "@/components/content/Img";

export function VideoSpot() {
  const [open, setOpen] = useState(false);
  return (
    <section className="w-full bg-surface-container-high px-margin-mobile lg:px-margin py-space-xl">
    <div className="max-w-[76rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">

    <div className="lg:col-span-7 relative">
    <div role="button" tabIndex={0} aria-label="Putar video profil kegiatan" onClick={() => setOpen(true)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } }} className="relative w-full aspect-video rounded-[36px] overflow-hidden shadow-[0_20px_48px_-10px_rgba(184,71,11,0.18)] bg-inverse-surface group cursor-pointer">
    <Img alt="Dokumentasi sinematik video suasana kelas SD Islam Modern Al Fakhir, anak-anak tertawa bahagia saat tepuk anak sholeh, guru wanita berkerudung tersenyum tulus mendampingi siswa merakit miniatur tata surya, tone warna hangat keemasan sinematik 4k." className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" src="/design/sd-kegiatan/10.jpg" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

    <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-20 h-20 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-[0_8px_30px_rgba(184,71,11,0.5)] group-hover:scale-110 active:scale-95 transition-transform duration-300">
    <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
    </div>
    </div>

    <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex items-center justify-between gap-2 text-on-primary">
    <div className="flex items-center gap-2 min-w-0">
    <span className="w-3 h-3 rounded-full bg-error animate-pulse shrink-0"></span>
    <span className="font-label-md font-bold tracking-wide truncate"><T>Video Profil Kegiatan 2023/2024</T></span>
    </div>
    <span className="font-label-sm bg-black/50 backdrop-blur-md px-3 py-1 rounded-full whitespace-nowrap shrink-0"><T>03:45 Full HD</T></span>
    </div>
    </div>
    <div className="hidden sm:grid grid-cols-3 gap-space-sm mt-space-md">
      {[
        { src: "/design/sd-kegiatan/02.jpg", label: "Tahfiz", alt: "Santri SD Al Fakhir membaca Al-Qur'an bersama ustadzah di ruang halaqah" },
        { src: "/design/sd-kegiatan/04.jpg", label: "Olahraga Sunnah", alt: "Siswa SD Al Fakhir berlatih panahan di lapangan rumput sekolah" },
        { src: "/design/sd-kegiatan/08.jpg", label: "Adab Lingkungan", alt: "Siswa SD Al Fakhir memanen selada hidroponik di kebun sekolah" },
      ].map((t) => (
        <a key={t.src} href="#galeri" className="group relative block aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_8px_24px_-4px_rgba(184,71,11,0.12)]">
          <Img alt={t.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={t.src} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
          <span className="absolute bottom-2.5 left-3 right-3 font-label-md font-bold text-on-primary truncate"><T>{t.label}</T></span>
        </a>
      ))}
    </div>
    </div>

    <div className="lg:col-span-5 flex flex-col space-y-space-md">
    <div className="inline-flex items-center gap-2 text-tertiary font-label-md font-bold">
    <span className="material-symbols-outlined text-[20px]">videocam</span>
    <span><T>Suasana Kehidupan Sekolah</T></span>
    </div>
    <h3 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary leading-snug text-balance">
              <T>Menit-menit Penuh Senyum di Al Fakhir</T>
            </h3>
    <p className="font-body-md text-on-surface-variant text-pretty">
              <T>Melalui lensa kamera, saksikan bagaimana anak-anak menikmati proses belajar tanpa rasa terbebani. Belajar menjadi petualangan mengasyikkan yang membangkitkan kecerdasan intelek dan kelembutan nurani.</T>
            </p>

    <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(184,71,11,0.06)] relative space-y-3">
    <span className="material-symbols-outlined text-secondary-container text-[36px] opacity-40">format_quote</span>
    <p className="font-body-md text-on-surface italic font-medium" style={{ fontWeight: 400 }}>
                <T>&quot;Melihat ananda pulang sekolah dengan cerita penuh binar dan hafalan juz yang terus bertambah adalah kebahagiaan terbesar kami sebagai orang tua. Lingkungannya sangat suportif.&quot;</T>
              </p>
    <div className="flex items-center gap-3 pt-2">
    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center font-title-md font-bold text-primary">
                  <T>BR</T>
                </div>
    <div>
    <div className="font-title-md text-primary font-bold"><T>Bunda Rahmawati, S.Farm.</T></div>
    <div className="font-label-sm text-on-surface-variant"><T>Ibunda M. Fatih (Siswa Kelas 3 SD)</T></div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <VideoModal open={open} onClose={() => setOpen(false)} src="/video/tour.mp4" poster="/video/poster.jpg" title="Video Profil Kegiatan 2023/2024" />
    </section>
  );
}

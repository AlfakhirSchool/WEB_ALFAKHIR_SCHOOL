/**
 * Every bundled photo/logo the public site renders (through components/content/Image.tsx or Img.tsx), for the
 * dashboard's "Foto Website" page. `src` is the original path under /public and is also the key stored in
 * `Settings.images` when the photo is replaced. Keep in step with the pages when a photo is added or removed.
 */
export type CatalogKind = "foto" | "logo";
export type SiteId = "portal" | "sd" | "smp";

export type CatalogImage = {
  src: string;
  /** Short Indonesian description shown on the card. */
  label: string;
  /** Route paths where the photo appears; the first one is its main page. */
  pages: string[];
  kind: CatalogKind;
};

/** Human page names, in the order the dashboard lists them. */
export const PAGE_LABELS: Record<string, string> = {
  "/": "Beranda Portal",
  "/yayasan": "Tentang Kami",
  "/berita": "Berita",
  "/jurnal": "Jurnal",
  "/kontak": "Kontak Portal",
  "/ppdb": "PPDB Portal",
  "/sd": "Beranda SD",
  "/sd/profil": "Profil SD",
  "/sd/program": "Program SD",
  "/sd/kegiatan": "Kegiatan SD",
  "/sd/ppdb": "PPDB SD",
  "/sd/kontak": "Kontak SD",
  "/smp": "Beranda SMP",
  "/smp/profil": "Profil SMP",
  "/smp/akademik": "Akademik SMP",
  "/smp/kesiswaan": "Kesiswaan SMP",
  "/smp/ppdb": "PPDB SMP",
  "/smp/kontak": "Kontak SMP",
};

export const PAGE_ORDER = Object.keys(PAGE_LABELS);

export const SITE_LABELS: Record<SiteId, string> = { portal: "Portal Al Fakhir School", sd: "SD Islam Modern", smp: "SMP Islam Modern" };

export const siteOfPath = (path: string): SiteId => (path === "/sd" || path.startsWith("/sd/") ? "sd" : path === "/smp" || path.startsWith("/smp/") ? "smp" : "portal");

const PORTAL_PAGES = PAGE_ORDER.filter((p) => siteOfPath(p) === "portal");
const SD_PAGES = PAGE_ORDER.filter((p) => siteOfPath(p) === "sd");
const SMP_PAGES = PAGE_ORDER.filter((p) => siteOfPath(p) === "smp");

const foto = (src: string, label: string, ...pages: string[]): CatalogImage => ({ src, label, pages, kind: "foto" });

export const IMAGE_CATALOG: CatalogImage[] = [
  /* ---------- Logo (dipakai di header, footer, loader, dan popup) ---------- */
  { src: "/logo-sd.webp", label: "Logo SD Islam Modern Al Fakhir", pages: [...PORTAL_PAGES, ...SD_PAGES], kind: "logo" },
  { src: "/logo-smp.png", label: "Logo SMP Islam Modern Al Fakhir", pages: [...PORTAL_PAGES, ...SMP_PAGES], kind: "logo" },

  /* ---------- Portal ---------- */
  foto("/design/beranda-portal/01.jpg", "Kartu jenjang SD: murid belajar di ruang terbuka", "/"),
  foto("/design/beranda-portal/02.jpg", "Kartu jenjang SMP: pelajar presentasi karya riset", "/"),
  foto("/photos/halaman-atas.jpg", "Foto halaman dalam sekolah (sampul Tentang Kami)", "/yayasan"),
  foto("/photos/gedung-depan.jpg", "Gedung depan Al Fakhir School (sampul Kontak)", "/kontak"),
  foto("/photos/kelas.webp", "Suasana kelas (sampul PPDB Portal)", "/ppdb"),

  /* ---------- SD ---------- */
  foto("/design/sd-home/01.jpg", "Anak-anak SD ceria berseragam Islami (sampul beranda)", "/sd"),
  foto("/design/sd-home/02.jpg", "Halaqah Al-Qur'an duduk melingkar di karpet", "/sd"),
  foto("/design/sd-home/03.jpg", "Siswa meneliti tanaman dengan kaca pembesar", "/sd"),
  foto("/design/sd-home/04.jpg", "Ekstrakurikuler memanah di lapangan rumput", "/sd"),
  foto("/design/sd-profil/01.jpg", "Siswa SD belajar di halaman sekolah yang hijau (sampul profil)", "/sd/profil"),
  foto("/photos/sd/musala.jpg", "Fasilitas: musala", "/sd/profil"),
  foto("/photos/sd/aula.jpg", "Fasilitas: aula", "/sd/profil"),
  foto("/photos/sd/gazebo.jpg", "Fasilitas: gazebo bambu", "/sd/profil"),
  foto("/photos/sd/kolam.jpg", "Fasilitas: kolam renang", "/sd/profil"),
  foto("/photos/halaman.webp", "Santri bermain di halaman sekolah", "/sd/profil"),
  foto("/design/sd-program/01.jpg", "Siswa SD belajar interaktif", "/sd/program"),
  foto("/design/sd-kegiatan/01.jpg", "Foto bersama siswa-siswi SD (sampul kegiatan)", "/sd/kegiatan"),
  foto("/photos/sd/observasi.webp", "Galeri: observasi calon siswa (14 Februari 2026)", "/sd/kegiatan"),
  foto("/design/sd-kegiatan/02.jpg", "Galeri: tahfiz bersama ustadzah", "/sd/kegiatan"),
  foto("/design/sd-kegiatan/03.jpg", "Galeri: eksperimen sains berjas lab", "/sd/kegiatan"),
  foto("/design/sd-kegiatan/04.jpg", "Galeri: olahraga memanah", "/sd/kegiatan"),
  foto("/design/sd-kegiatan/05.jpg", "Galeri: pramuka siaga", "/sd/kegiatan"),
  foto("/design/sd-kegiatan/06.jpg", "Galeri: market day di selasar sekolah", "/sd/kegiatan"),
  foto("/design/sd-kegiatan/07.jpg", "Galeri: tampil di pentas seni", "/sd/kegiatan"),
  foto("/design/sd-kegiatan/08.jpg", "Galeri: panen selada hidroponik", "/sd/kegiatan"),
  foto("/design/sd-kegiatan/09.jpg", "Galeri: bercerita kisah Nabi Ibrahim AS", "/sd/kegiatan"),
  foto("/design/sd-kegiatan/10.jpg", "Sampul video profil kegiatan", "/sd/kegiatan"),
  foto("/video/poster.jpg", "Poster pemutar video profil (muncul sebelum video diputar)", "/sd/kegiatan"),
  foto("/photos/kelas2.webp", "Siswa kelas 1 belajar di kelas (PPDB SD)", "/sd/ppdb"),
  foto("/design/sd-kontak/01.jpg", "Meja resepsionis dan guru menyambut orang tua", "/sd/kontak"),
  foto("/design/sd-kontak/02.jpg", "Siswa menjelajah kebun dan rumah kaca", "/sd/kontak"),
  foto("/design/sd-kontak/03.jpg", "Kelas interaktif dengan bantal warna-warni", "/sd/kontak"),
  foto("/design/sd-kontak/04.png", "Peta lokasi sekolah SD", "/sd/kontak"),

  /* ---------- SMP ---------- */
  foto("/design/beranda-smp/01.jpg", "Dua pelajar SMP berseragam blazer (sampul beranda)", "/smp"),
  foto("/design/beranda-smp/02.jpg", "Pelajar membuat sistem irigasi pintar IoT", "/smp"),
  foto("/design/beranda-smp/03.jpg", "Foto penulis testimoni: orang tua murid", "/smp"),
  foto("/design/profil-smp/01.jpg", "Gedung sekolah SMP (sampul profil dan kontak)", "/smp/profil", "/smp/kontak"),
  foto("/design/profil-smp/08.jpg", "Laboratorium sains", "/smp/profil"),
  foto("/design/profil-smp/09.jpg", "Laboratorium robotik dan koding", "/smp/profil"),
  foto("/design/profil-smp/10.jpg", "Interior masjid", "/smp/profil"),
  foto("/design/profil-smp/11.jpg", "Perpustakaan digital dan ruang riset", "/smp/profil"),
  foto("/design/profil-smp/12.jpg", "Auditorium", "/smp/profil"),
  foto("/design/profil-smp/13.jpg", "Rumah kaca hidroponik dan lapangan olahraga", "/smp/profil"),
  foto("/design/smp-akademik/01.jpg", "Pelajar bereksperimen di laboratorium (sampul akademik)", "/smp/akademik"),
  foto("/design/smp-akademik/02.jpg", "Laboratorium biologi dan bioteknologi", "/smp/akademik"),
  foto("/design/smp-akademik/03.jpg", "Makerspace robotik dan IoT", "/smp/akademik"),
  foto("/design/smp-akademik/04.jpg", "Perpustakaan dan ruang belajar digital", "/smp/akademik"),
  foto("/design/smp-kesiswaan/01.jpg", "Karya siswa: irigasi pintar IoT", "/smp/kesiswaan"),
  foto("/design/smp-kesiswaan/02.jpg", "Karya siswa: bioplastik ramah lingkungan", "/smp/kesiswaan"),
  foto("/design/smp-kesiswaan/03.jpg", "Karya siswa: hisab awal bulan dengan sensor cahaya", "/smp/kesiswaan"),
  foto("/design/smp-kesiswaan/04.jpg", "Karya siswa: mesin pemilah sampah robotik", "/smp/kesiswaan"),
  foto("/design/smp-kesiswaan/05.jpg", "Karya siswa: pestisida hayati daun bidara dan mimba", "/smp/kesiswaan"),
  foto("/design/smp-kesiswaan/06.jpg", "Karya siswa: sensor kolam ikan tenaga surya", "/smp/kesiswaan"),
  foto("/design/smp-kesiswaan/07.jpg", "Karya siswa: riset kebiasaan media sosial Gen Alpha", "/smp/kesiswaan"),
  foto("/design/smp-kesiswaan/08.jpg", "Karya siswa: sel bio-voltaik kulit pisang", "/smp/kesiswaan"),
  foto("/design/smp-kesiswaan/09.jpg", "Karya siswa: presensi RFID", "/smp/kesiswaan"),
  foto("/design/smp-kesiswaan/10.jpg", "Sampul Jurnal Cendekiawan Cilik Al Fakhir", "/smp/kesiswaan", "/jurnal"),
  foto("/design/smp-kesiswaan/11.jpg", "Foto penulis testimoni: pelajar SMP", "/smp/kesiswaan"),
  foto("/design/smp-kesiswaan/12.jpg", "Foto penulis testimoni: juri & peneliti", "/smp/kesiswaan"),
  foto("/design/smp-ppdb/01.jpg", "Pelajar bereksperimen STEAM (sampul PPDB SMP)", "/smp/ppdb"),
  foto("/design/kontak-smp/01.png", "Peta lokasi sekolah SMP", "/smp/kontak"),
];

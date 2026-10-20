export type Jenjang = "SD" | "SMP" | "UMUM";
export type SiteKey = "portal" | "sd" | "smp";

export const siteMeta = {
  portal: { name: "AL FAKHIR SCHOOL", home: "/" },
  sd: { name: "SD Islam Modern Al Fakhir", home: "/sd" },
  smp: { name: "SMP Islam Modern Al Fakhir", home: "/smp" },
} as const;

export function siteOf(pathname: string): SiteKey {
  if (pathname === "/sd" || pathname.startsWith("/sd/")) return "sd";
  if (pathname === "/smp" || pathname.startsWith("/smp/")) return "smp";
  return "portal";
}

export type NavItem = { label: string; href: string };

export const portalNav: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/yayasan" },
  { label: "Jenjang", href: "#jenjang" },
  { label: "Berita", href: "/berita" },
  { label: "Jurnal", href: "/jurnal" },
  { label: "Dokumen", href: "/dokumen" },
  { label: "Kontak", href: "/kontak" },
];

export const sdNav: NavItem[] = [
  { label: "Beranda", href: "/sd" },
  { label: "Profil SD", href: "/sd/profil" },
  { label: "Program & Kurikulum", href: "/sd/program" },
  { label: "Kegiatan", href: "/sd/kegiatan" },
  { label: "Biaya & PPDB", href: "/sd/ppdb" },
  { label: "Kontak", href: "/sd/kontak" },
];
export const smpNav: NavItem[] = [
  { label: "Beranda", href: "/smp" },
  { label: "Profil SMP", href: "/smp/profil" },
  { label: "Kurikulum & Riset", href: "/smp/akademik" },
  { label: "Karya & Prestasi", href: "/smp/kesiswaan" },
  { label: "Beasiswa & PPDB", href: "/smp/ppdb" },
  { label: "Kontak", href: "/smp/kontak" },
];

export const smpPrograms = [
  { n: "01", title: "Tahfiz & Tahsin", desc: "Hafalan Al-Qur'an dengan target yang jelas dan perbaikan bacaan terukur." },
  { n: "02", title: "Al Fakhir Enrichment Program", desc: "Pengayaan akademik dan minat bakat di luar kelas reguler." },
  { n: "03", title: "OSIS OSALFA", desc: "Siswa belajar memimpin lewat organisasi, debat kandidat, dan program kerja." },
  { n: "04", title: "Al Fakhir Camp", desc: "Perkemahan karakter: kemandirian, kerja sama, dan kepemimpinan." },
];

export const ekskulSMP = ["Taekwondo", "Basket", "Futsal", "Panahan", "Drumband", "Tari", "Hadroh", "Jurnalistik", "Pramuka", "UKS"];

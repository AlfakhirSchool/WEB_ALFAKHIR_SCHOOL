import type { MetadataRoute } from "next";
const routes = ["", "/yayasan", "/berita", "/jurnal", "/dokumen", "/ppdb", "/kontak", "/sd", "/sd/profil", "/sd/program", "/sd/kegiatan", "/sd/ppdb", "/sd/kontak", "/smp", "/smp/profil", "/smp/akademik", "/smp/kesiswaan", "/smp/ppdb", "/smp/kontak"];
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return routes.map((r) => ({ url: `${base}${r}`, changeFrequency: "weekly", priority: r === "" ? 1 : 0.7 }));
}

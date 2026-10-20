import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { Icon, PageHeader } from "@/components/admin/ui";
import { adminPage } from "../_lib/guard";
import { loadSetting } from "../_lib/settings";

export const metadata: Metadata = { title: "Ringkasan" };

const PAGES: { group: string; color: string; items: { path: string; label: string }[] }[] = [
  {
    group: "Portal Al Fakhir School", color: "bg-[#0E6A71]",
    items: [
      { path: "/", label: "Beranda" }, { path: "/yayasan", label: "Tentang Kami" }, { path: "/berita", label: "Berita" },
      { path: "/jurnal", label: "Jurnal" }, { path: "/dokumen", label: "Dokumen" }, { path: "/kontak", label: "Kontak" }, { path: "/ppdb", label: "PPDB" },
    ],
  },
  {
    group: "SD Islam Modern", color: "bg-[#E86116]",
    items: [
      { path: "/sd", label: "Beranda SD" }, { path: "/sd/profil", label: "Profil" }, { path: "/sd/program", label: "Program" },
      { path: "/sd/kegiatan", label: "Kegiatan" }, { path: "/sd/ppdb", label: "PPDB SD" }, { path: "/sd/kontak", label: "Kontak SD" },
    ],
  },
  {
    group: "SMP Islam Modern", color: "bg-[#022E31]",
    items: [
      { path: "/smp", label: "Beranda SMP" }, { path: "/smp/profil", label: "Profil" }, { path: "/smp/akademik", label: "Akademik" },
      { path: "/smp/kesiswaan", label: "Kesiswaan" }, { path: "/smp/ppdb", label: "PPDB SMP" }, { path: "/smp/kontak", label: "Kontak SMP" },
    ],
  },
];

type Task = { href: string; icon: string; title: string; text: string; tint: string };

export default async function DashboardHome() {
  const admin = await adminPage();
  const [texts, news, popup, contact, images, students, journals, publishedJournals] = await Promise.all([
    db.textOverride.count(),
    loadSetting("news"),
    loadSetting("popup"),
    loadSetting("contact"),
    loadSetting("images"),
    loadSetting("students"),
    db.journal.count(),
    db.journal.count({ where: { published: true } }),
  ]);
  const photos = Object.keys(images.value).length;
  const studentCount = students.value.sd.length + students.value.smp.length;

  const chips: { href: string; icon: string; text: string; on?: boolean }[] = [
    { href: "/admin/teks", icon: "edit_note", text: `${texts} teks diubah` },
    { href: "/admin/foto", icon: "photo_library", text: `${photos} foto diganti` },
    { href: "/admin/berita", icon: "newspaper", text: `${news.value.length} berita` },
    { href: "/admin/siswa", icon: "badge", text: `${studentCount} profil siswa` },
    { href: "/admin/jurnal", icon: "menu_book", text: `${publishedJournals} dari ${journals} jurnal tampil` },
    { href: "/admin/popup", icon: "campaign", text: popup.value.enabled ? "Popup aktif" : "Popup nonaktif", on: popup.value.enabled },
  ];

  const tasks: Task[] = [
    { href: "/admin/teks", icon: "edit_note", title: "Ubah teks halaman", text: "Klik langsung pada tulisan di halaman website.", tint: "bg-[#0E6A71]/10 text-[#0E6A71]" },
    { href: "/admin/foto", icon: "photo_library", title: "Ganti foto", text: "Ganti foto mana pun yang tampil di website.", tint: "bg-[#0E6A71]/10 text-[#0E6A71]" },
    { href: "/admin/berita", icon: "post_add", title: "Tambah berita", text: "Tulis berita atau kegiatan terbaru sekolah.", tint: "bg-[#0E6A71]/10 text-[#0E6A71]" },
    { href: "/admin/siswa", icon: "badge", title: "Unggah profil siswa", text: "Foto, nama, kelas, dan prestasi siswa SD & SMP.", tint: "bg-[#0E6A71]/10 text-[#0E6A71]" },
    { href: "/admin/jurnal", icon: "upload_file", title: "Unggah jurnal siswa", text: "Tambahkan karya tulis siswa dalam bentuk PDF.", tint: "bg-[#0E6A71]/10 text-[#0E6A71]" },
    { href: "/admin/guru", icon: "groups", title: "Ubah data guru & foto", text: "Nama, jabatan, dan foto guru serta pengurus.", tint: "bg-[#0E6A71]/10 text-[#0E6A71]" },
    { href: "/admin/ppdb", icon: "payments", title: "Atur biaya & PPDB", text: "Unggah brosur PPDB, atur jadwal, dan biaya SD & SMP.", tint: "bg-[#E86116]/10 text-[#E86116]" },
    { href: "/admin/kontak", icon: "call", title: "Ubah kontak & WhatsApp", text: `WhatsApp SD ${contact.value.sd.waDisplay} · SMP ${contact.value.smp.waDisplay}`, tint: "bg-[#E86116]/10 text-[#E86116]" },
    { href: "/admin/popup", icon: "campaign", title: "Atur popup iklan", text: popup.value.enabled ? "Popup sedang tampil di website." : "Popup pengumuman saat website dibuka.", tint: "bg-violet-100 text-violet-700" },
  ];

  const steps = [
    { icon: "ads_click", title: "Pilih yang ingin diubah", text: "Klik salah satu kartu di atas atau pilih dari menu." },
    { icon: "edit", title: "Ubah lalu klik Simpan", text: "Ketik teks baru, pilih foto baru, atau isi formulir." },
    { icon: "public", title: "Cek di website", text: "Perubahan langsung tampil. Klik Lihat Website untuk memeriksa." },
  ];

  return (
    <>
      <PageHeader title={`Assalamu'alaikum, ${admin.username}`} description="Selamat datang di dashboard Al Fakhir School. Semua perubahan langsung tampil di website setelah disimpan." />

      <ul className="-mt-2 mb-8 flex flex-wrap gap-2" aria-label="Ringkasan isi website">
        {chips.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0E6A71]/25 ${c.on ? "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"}`}>
              <Icon name={c.icon} className={`text-[18px] ${c.on ? "text-emerald-600" : "text-slate-400"}`} /> {c.text}
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mb-3 text-lg font-semibold text-[#022E31]">Apa yang ingin Anda ubah?</h2>
      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {tasks.map((t) => (
          <li key={t.href} className="flex">
            <Link href={t.href} className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#0E6A71]/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0E6A71]/25 sm:flex-col sm:items-start sm:gap-3 sm:p-5">
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${t.tint}`}><Icon name={t.icon} className="text-[26px]" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold leading-snug text-slate-900">{t.title}</span>
                <span className="mt-1 block text-sm leading-snug text-slate-500">{t.text}</span>
              </span>
              <Icon name="arrow_forward" className="text-[20px] text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#0E6A71] sm:hidden" />
            </Link>
          </li>
        ))}
      </ul>

      <section aria-labelledby="langkah" className="mt-8 rounded-2xl bg-[#0E6A71]/[0.07] p-4 sm:p-6">
        <h2 id="langkah" className="mb-4 text-base font-semibold text-[#022E31]">Cara kerjanya, cukup 3 langkah</h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {steps.map((st, i) => (
            <li key={st.title} className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0E6A71] text-sm font-bold text-white">{i + 1}</span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-900">{st.title}</span>
                <span className="mt-0.5 block text-sm leading-snug text-slate-600">{st.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <h2 className="mb-1 mt-10 text-lg font-semibold text-[#022E31]">Halaman website</h2>
      <p className="mb-3 text-sm text-slate-500">Klik <strong className="font-semibold text-slate-700">Edit</strong> untuk mengubah teks dan foto langsung di halaman, atau <strong className="font-semibold text-slate-700">Lihat</strong> untuk membukanya.</p>
      <div className="space-y-4">
        {PAGES.map((g) => (
          <section key={g.group} className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <h3 className="flex items-center gap-2 border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-800">
              <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${g.color}`} /> {g.group}
            </h3>
            <ul className="grid gap-x-6 p-2 sm:grid-cols-2">
              {g.items.map((p) => (
                <li key={p.path} className="flex items-center gap-1 rounded-xl px-2 py-1 hover:bg-slate-50">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{p.label}</p>
                    <p className="truncate font-mono text-[11px] text-slate-400">{p.path}</p>
                  </div>
                  <Link href={`/admin/teks?halaman=${p.path}`} className="inline-flex min-h-11 items-center gap-1 rounded-lg bg-[#0E6A71]/10 px-3 text-xs font-semibold text-[#0E6A71] transition hover:bg-[#0E6A71]/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0E6A71]/25" aria-label={`Edit halaman ${p.label}`}>
                    <Icon name="edit" className="text-[16px]" /> Edit
                  </Link>
                  <a href={p.path} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-1 rounded-lg px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/50" aria-label={`Lihat halaman ${p.label} (tab baru)`}>
                    <Icon name="visibility" className="text-[16px]" /> Lihat
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

"use client";
import type { Jenjang } from "@/content/site";
import type { NewsItem } from "@/content/settings";
import type { LoadedSetting } from "./types";
import { ImageField } from "./ImageField";
import { ListEditor, SaveBar, useSetting } from "./SettingForm";
import { Card, Field, inputCls } from "./ui";

const JENJANG: { value: Jenjang; label: string }[] = [
  { value: "UMUM", label: "Umum (Al Fakhir School)" },
  { value: "SD", label: "SD" },
  { value: "SMP", label: "SMP" },
];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+/, "").slice(0, 80).replace(/-+$/, "");

function validate(items: NewsItem[]): string | null {
  for (const [i, n] of items.entries()) {
    if (!n.title.trim()) return `Berita #${i + 1}: judul wajib diisi.`;
    if (!/^[a-z0-9-]+$/.test(n.slug)) return `Berita #${i + 1}: slug hanya boleh huruf kecil, angka, dan tanda minus.`;
    if (items.findIndex((x) => x.slug === n.slug) !== i) return `Berita #${i + 1}: slug "${n.slug}" sudah dipakai berita lain.`;
    if (n.url && !/^https:\/\/\S+$/.test(n.url)) return `Berita #${i + 1}: tautan berita harus diawali https:// dan tanpa spasi.`;
  }
  return null;
}

export function NewsForm({ value: initial, custom, updatedAt }: LoadedSetting<"news">) {
  const form = useSetting("news", initial);
  const error = validate(form.value);

  const create = (): NewsItem => {
    const d = new Date();
    return { slug: "", jenjang: "UMUM", title: "", summary: "", date: `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}` };
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.save(error); }}>
      <Card title="Daftar berita" description="Berita teratas tampil paling awal. Slug dibuat otomatis dari judul (dipakai sebagai alamat/penanda berita) dan bisa diubah.">
        <ListEditor<NewsItem>
          items={form.value}
          onChange={form.update}
          create={create}
          addLabel="Tambah berita"
          addAt="start"
          max={200}
          titleOf={(n) => n.title || "Berita baru"}
          empty="Belum ada berita."
          render={(n, set, i) => (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
              <div className="space-y-3">
                <Field label="Judul" htmlFor={`news-title-${i}`}>
                  <input id={`news-title-${i}`} value={n.title} maxLength={300}
                    onChange={(e) => {
                      const title = e.target.value;
                      const auto = !n.slug || n.slug === slugify(n.title);
                      set({ ...n, title, slug: auto ? slugify(title) : n.slug });
                    }}
                    className={inputCls} />
                </Field>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field label="Jenjang" htmlFor={`news-jenjang-${i}`}>
                    <select id={`news-jenjang-${i}`} value={n.jenjang} onChange={(e) => set({ ...n, jenjang: e.target.value as Jenjang })} className={inputCls}>
                      {JENJANG.map((j) => <option key={j.value} value={j.value}>{j.label}</option>)}
                    </select>
                  </Field>
                  <Field label="Tanggal" htmlFor={`news-date-${i}`}>
                    <input id={`news-date-${i}`} value={n.date} maxLength={40} placeholder="mis. 18 Okt 2026" onChange={(e) => set({ ...n, date: e.target.value })} className={inputCls} />
                  </Field>
                  <Field label="Slug" htmlFor={`news-slug-${i}`}>
                    <input id={`news-slug-${i}`} value={n.slug} maxLength={120} spellCheck={false}
                      onChange={(e) => set({ ...n, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-") })}
                      className={`${inputCls} font-mono text-[13px]`} />
                  </Field>
                </div>
                <Field label="Ringkasan" htmlFor={`news-summary-${i}`}>
                  <textarea id={`news-summary-${i}`} value={n.summary} maxLength={2000} rows={3} onChange={(e) => set({ ...n, summary: e.target.value })} className={`${inputCls} resize-y`} />
                </Field>
                <Field label="Isi artikel lengkap (opsional — jika kosong memakai arsip artikel bawaan)" htmlFor={`news-body-${i}`}>
                  <textarea id={`news-body-${i}`} value={n.body ?? ""} maxLength={30000} rows={5} placeholder="Tulis paragraf lengkap berita di sini…"
                    onChange={(e) => {
                      const { body: _, ...rest } = n;
                      const body = e.target.value;
                      set(body ? { ...rest, body } : rest);
                    }}
                    className={`${inputCls} resize-y`} />
                </Field>
                <Field label="Tautan sumber asli (opsional)" htmlFor={`news-url-${i}`}>
                  <input id={`news-url-${i}`} type="url" value={n.url ?? ""} maxLength={500} spellCheck={false} placeholder="https://…"
                    onChange={(e) => {
                      const { url: _, ...rest } = n;
                      const url = e.target.value.trim();
                      set(url ? { ...rest, url } : rest);
                    }}
                    className={inputCls} />
                </Field>
              </div>
              <Field label="Gambar (opsional)" htmlFor={`news-image-${i}`}>
                <ImageField id={`news-image-${i}`} value={n.image ?? ""} onChange={(url) => {
                  const { image: _, ...rest } = n;
                  set(url ? { ...rest, image: url } : rest);
                }} />
              </Field>
            </div>
          )}
        />
      </Card>
      <SaveBar form={form} custom={custom} updatedAt={updatedAt} onSave={() => form.save(error)} />
    </form>
  );
}

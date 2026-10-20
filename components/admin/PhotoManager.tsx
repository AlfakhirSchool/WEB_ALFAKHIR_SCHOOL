"use client";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IMAGE_CATALOG, PAGE_LABELS, PAGE_ORDER, siteOfPath, type CatalogImage, type SiteId } from "@/content/image-catalog";
import type { Settings } from "@/content/settings";
import { EmptyState, Icon, btnSecondary, inputCls } from "./ui";

type Tab = "semua" | SiteId | "logo";
const TABS: { id: Tab; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "portal", label: "Portal" },
  { id: "sd", label: "SD" },
  { id: "smp", label: "SMP" },
  { id: "logo", label: "Logo" },
];

type Note = { kind: "ok" | "error"; text: string };

const matchesTab = (img: CatalogImage, tab: Tab) =>
  tab === "semua" ? true : tab === "logo" ? img.kind === "logo" : img.kind === "foto" && img.pages.some((p) => siteOfPath(p) === tab);

/** Short list of the pages a photo appears on ("Beranda SD", "Profil SMP, Kontak SMP", "12 halaman"). */
function pagesText(img: CatalogImage): string {
  if (img.pages.length > 4) return `${img.pages.length} halaman (header, footer, popup)`;
  return img.pages.map((p) => PAGE_LABELS[p] ?? p).join(", ");
}

/**
 * Dashboard "Foto Website": every bundled photo/logo of the public site with its current state. A replacement is
 * uploaded (≤ 2 MB) and saved immediately to the `images` setting (merged server-side, so nothing else is overwritten).
 */
export function PhotoManager({ initial }: { initial: Settings["images"] }) {
  const router = useRouter();
  const [images, setImages] = useState(initial);
  const [tab, setTab] = useState<Tab>("semua");
  const [query, setQuery] = useState("");
  const [onlyReplaced, setOnlyReplaced] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, Note>>({});
  const input = useRef<HTMLInputElement>(null);
  const target = useRef("");

  const replacedCount = IMAGE_CATALOG.filter((i) => images[i.src]).length;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return IMAGE_CATALOG.filter((i) => {
      if (!matchesTab(i, tab)) return false;
      if (onlyReplaced && !images[i.src]) return false;
      if (!q) return true;
      return `${i.label} ${i.src} ${i.pages.map((p) => PAGE_LABELS[p] ?? "").join(" ")}`.toLowerCase().includes(q);
    });
  }, [tab, query, onlyReplaced, images]);

  const groups = useMemo(() => {
    const byPage = new Map<string, CatalogImage[]>();
    for (const img of visible) {
      const key = img.kind === "logo" ? "logo" : img.pages[0];
      byPage.set(key, [...(byPage.get(key) ?? []), img]);
    }
    return [...byPage.entries()]
      .sort(([a], [b]) => (a === "logo" ? -1 : b === "logo" ? 1 : PAGE_ORDER.indexOf(a) - PAGE_ORDER.indexOf(b)))
      .map(([key, items]) => ({ key, title: key === "logo" ? "Logo sekolah" : PAGE_LABELS[key] ?? key, items }));
  }, [visible]);

  const countFor = (t: Tab) => IMAGE_CATALOG.filter((i) => matchesTab(i, t)).length;

  async function save(src: string, change: { url?: string }, okText: string) {
    const res = await fetch("/api/admin/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(change.url ? { set: { [src]: change.url } } : { clear: [src] }),
    });
    if (res.status === 401) throw new Error("Sesi login habis. Muat ulang halaman dan login kembali.");
    const data = (await res.json().catch(() => ({}))) as { images?: Settings["images"]; error?: string };
    if (!res.ok || !data.images) throw new Error(data.error ?? "Gagal menyimpan foto.");
    setImages(data.images);
    setNotes((n) => ({ ...n, [src]: { kind: "ok", text: okText } }));
    router.refresh();
  }

  async function upload(file: File) {
    const src = target.current;
    if (input.current) input.current.value = "";
    if (!src) return;
    if (file.size > 2 * 1024 * 1024) { setNotes((n) => ({ ...n, [src]: { kind: "error", text: "Ukuran foto maksimal 2 MB." } })); return; }
    setBusy(src);
    setNotes((n) => { const { [src]: _drop, ...rest } = n; return rest; });
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/media", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (res.status === 401) throw new Error("Sesi login habis. Muat ulang halaman dan login kembali.");
      if (!res.ok || !data.url) throw new Error(data.error ?? "Gagal mengunggah foto.");
      await save(src, { url: data.url }, "Foto diganti dan sudah tampil di website.");
    } catch (e) {
      setNotes((n) => ({ ...n, [src]: { kind: "error", text: e instanceof Error ? e.message : "Gagal mengunggah foto." } }));
    } finally {
      setBusy(null);
    }
  }

  async function restore(img: CatalogImage) {
    if (!confirm(`Kembalikan "${img.label}" ke foto asli?`)) return;
    setBusy(img.src);
    setNotes((n) => { const { [img.src]: _drop, ...rest } = n; return rest; });
    try {
      await save(img.src, {}, "Dikembalikan ke foto asli.");
    } catch (e) {
      setNotes((n) => ({ ...n, [img.src]: { kind: "error", text: e instanceof Error ? e.message : "Gagal menyimpan foto." } }));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-5">
      <input ref={input} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="sr-only" tabIndex={-1} aria-hidden="true"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) void upload(f); }} />

      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
        <Icon name="lightbulb" className="mt-0.5 text-[20px] text-amber-600" />
        <div className="space-y-1">
          <p><strong>Tips:</strong> pakai foto dengan perbandingan sisi (rasio) yang sama dengan foto asli agar hasilnya paling pas. Website memotong foto otomatis (object-cover), jadi bagian tepi bisa terpotong. Maksimal 2 MB, format PNG, JPG, WebP, atau GIF.</p>
          <p className="text-amber-800/80">Foto yang sama dipakai di beberapa tempat akan berubah di semua tempat. Video tidak dapat diganti dari sini (hanya gambar poster-nya). Foto guru &amp; pengurus ada di menu <strong>Guru &amp; Staf</strong>, foto berita di menu <strong>Berita</strong>.</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 lg:pb-0" role="tablist" aria-label="Filter foto">
          {TABS.map((t) => (
            <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
              className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition ${tab === t.id ? "bg-[#0E6A71] text-white shadow-sm" : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"}`}>
              {t.label}
              <span className={`rounded-full px-1.5 text-[11px] ${tab === t.id ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>{countFor(t.id)}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center lg:justify-end">
          <label className="relative block sm:w-72">
            <span className="sr-only">Cari foto</span>
            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari foto atau halaman…" className={`${inputCls} pl-10`} />
          </label>
          <label className="flex min-h-10 cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={onlyReplaced} onChange={(e) => setOnlyReplaced(e.target.checked)} className="h-4 w-4 accent-[#0E6A71]" />
            Hanya yang diganti ({replacedCount})
          </label>
        </div>
      </div>

      {groups.length === 0 && <EmptyState icon="image_search" title="Tidak ada foto yang cocok">Ubah kata kunci pencarian atau filter di atas.</EmptyState>}

      {groups.map((g) => (
        <section key={g.key} aria-labelledby={`g-${g.key}`}>
          <h2 id={`g-${g.key}`} className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
            {g.title}
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold normal-case tracking-normal text-slate-500">{g.items.length}</span>
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {g.items.map((img) => {
              const current = images[img.src];
              const working = busy === img.src;
              const note = notes[img.src];
              return (
                <li key={img.src} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                  <div className={`relative ${img.kind === "logo" ? "h-40 bg-[repeating-conic-gradient(#f1f5f9_0%_25%,#fff_0%_50%)] bg-[length:16px_16px]" : "aspect-[4/3] bg-slate-100"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={current ?? img.src} alt={img.label} loading="lazy" className={`h-full w-full ${img.kind === "logo" ? "object-contain p-6" : "object-cover"}`} />
                    {current && <span className="absolute left-2 top-2 rounded-full bg-[#0E6A71] px-2.5 py-1 text-[11px] font-semibold text-white shadow">Diganti</span>}
                    {working && (
                      <div className="absolute inset-0 grid place-items-center bg-white/70 backdrop-blur-[1px]">
                        <Icon name="progress_activity" className="animate-spin text-[32px] text-[#0E6A71]" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-3.5">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug text-slate-900">{img.label}</p>
                      <p className="mt-1 flex items-start gap-1 text-xs leading-relaxed text-slate-500">
                        <Icon name="web" className="mt-px text-[14px]" />
                        <span>{pagesText(img)}</span>
                      </p>
                    </div>
                    <div className="mt-auto flex flex-col gap-2">
                      <button type="button" disabled={working} onClick={() => { target.current = img.src; input.current?.click(); }} className={`${btnSecondary} w-full`}>
                        <Icon name="add_a_photo" className="text-[18px]" /> Ganti foto
                      </button>
                      {current && (
                        <button type="button" disabled={working} onClick={() => void restore(img)} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl px-3 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50">
                          <Icon name="undo" className="text-[18px]" /> Kembalikan ke foto asli
                        </button>
                      )}
                      {note && (
                        <p role={note.kind === "ok" ? "status" : "alert"} className={`flex items-start gap-1.5 text-xs leading-relaxed ${note.kind === "ok" ? "text-emerald-700" : "text-red-600"}`}>
                          <Icon name={note.kind === "ok" ? "check_circle" : "error"} className="mt-px text-[15px]" />
                          <span>{note.text}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

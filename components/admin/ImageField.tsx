"use client";
import { useRef, useState } from "react";
import { Icon, btnDanger, btnSecondary } from "./ui";

/** Image picker: uploads to /api/admin/media (PNG/JPG/WebP/GIF ≤ 2 MB) and stores the returned URL. */
export function ImageField({ value, onChange, id, aspect = "aspect-[16/10]", preview }: {
  value: string; onChange: (url: string) => void; id: string; aspect?: string;
  /** Replaces the default thumbnail (e.g. a crop-focus editor). */
  preview?: (url: string) => React.ReactNode;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setError("");
    if (file.size > 2 * 1024 * 1024) { setError("Ukuran gambar maksimal 2 MB."); return; }
    setBusy(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/media", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (res.status === 401) throw new Error("Sesi login habis. Muat ulang halaman dan login kembali.");
      if (!res.ok || !data.url) throw new Error(data.error ?? "Gagal mengunggah gambar.");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal mengunggah gambar.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <div>
      <input ref={input} id={id} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="sr-only"
        onChange={(e) => { const file = e.target.files?.[0]; if (file) upload(file); }} />
      {value ? (
        <div className="flex flex-col gap-3">
          {preview ? preview(value) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className={`${aspect} w-full max-w-[16rem] rounded-xl border border-slate-200 bg-slate-100 object-cover`} />
          )}
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={busy} onClick={() => input.current?.click()} className={btnSecondary}>
              <Icon name={busy ? "progress_activity" : "upload"} className={`text-[18px] ${busy ? "animate-spin" : ""}`} /> Ganti gambar
            </button>
            <button type="button" disabled={busy} onClick={() => onChange("")} className={btnDanger}>
              <Icon name="delete" className="text-[18px]" /> Hapus gambar
            </button>
          </div>
        </div>
      ) : (
        <button type="button" disabled={busy} onClick={() => input.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-300 bg-white px-4 py-6 text-sm text-slate-500 transition hover:border-[#0E6A71] hover:bg-[#0E6A71]/5 hover:text-[#0E6A71] disabled:opacity-60">
          <Icon name={busy ? "progress_activity" : "add_photo_alternate"} className={`text-[28px] ${busy ? "animate-spin" : ""}`} />
          <span className="font-semibold">{busy ? "Mengunggah…" : "Unggah gambar"}</span>
          <span className="text-xs text-slate-400">PNG, JPG, WebP, atau GIF · maks. 2 MB</span>
        </button>
      )}
      {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

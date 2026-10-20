"use client";
import { useState } from "react";
import { T } from "@/components/content/T";

type Info = { firstName: string; jenjang: string; docs: string[] };
type Doc = { type: "profil" | "ppdb"; title: string; text: string; icon: string };

const DOCS: Doc[] = [
  { type: "profil", title: "Profil Siswa", text: "Identitas, data orang tua, dan prestasi siswa.", icon: "badge" },
  { type: "ppdb", title: "Formulir PPDB", text: "Formulir pendaftaran, status, dan catatan PPDB.", icon: "assignment" },
];

const MESSAGE: Record<number, string> = {
  404: "NIS tidak ditemukan atau dokumen belum tersedia.",
  429: "Terlalu banyak percobaan. Coba lagi beberapa menit lagi.",
};

/** Reads the file name the server chose, e.g. `Profil-Budi-12345.pdf`. */
function fileNameOf(res: Response, fallback: string): string {
  return /filename="([^"]+)"/.exec(res.headers.get("content-disposition") ?? "")?.[1] ?? fallback;
}

export function DokumenForm() {
  const [nis, setNis] = useState("");
  const [info, setInfo] = useState<Info | null>(null);
  const [busy, setBusy] = useState<"" | "cek" | "profil" | "ppdb">("");
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  async function post(url: string, body: object): Promise<Response | null> {
    try {
      return await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), cache: "no-store" });
    } catch {
      setError("Tidak dapat terhubung ke server. Periksa koneksi lalu coba lagi.");
      return null;
    }
  }

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setDone(""); setInfo(null);
    const value = nis.trim();
    if (!value) { setError("NIS wajib diisi."); return; }
    setBusy("cek");
    const res = await post("/api/dokumen/cek", { nis: value });
    setBusy("");
    if (!res) return;
    if (!res.ok) { setError(MESSAGE[res.status] ?? "Terjadi kesalahan. Coba lagi."); return; }
    setInfo((await res.json()) as Info);
  }

  async function download(type: "profil" | "ppdb") {
    setError(""); setDone(""); setBusy(type);
    const res = await post("/api/dokumen", { nis: nis.trim(), type });
    if (!res) { setBusy(""); return; }
    if (!res.ok) {
      setBusy("");
      if (res.status === 404) setInfo(null);
      setError(MESSAGE[res.status] ?? "Terjadi kesalahan. Coba lagi.");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileNameOf(res, `${type}.pdf`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
    setBusy("");
    setDone(type);
  }

  const fieldCls = "block w-full min-h-14 rounded-xl border border-primary-container/25 bg-surface px-4 font-body-lg text-body-lg text-on-surface outline-none placeholder:text-outline focus:border-primary focus:ring-4 focus:ring-primary/10";

  return (
    <div>
      <form onSubmit={lookup} noValidate>
        <label htmlFor="nis" className="block font-label-lg text-label-lg text-on-surface font-bold mb-2"><T>Nomor Induk Siswa (NIS)</T></label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input id="nis" name="nis" inputMode="text" autoComplete="off" autoCapitalize="off" spellCheck={false} maxLength={20}
            value={nis} onChange={(e) => { setNis(e.target.value.replace(/\s/g, "")); setInfo(null); setError(""); setDone(""); }}
            placeholder="Contoh: 2027001" aria-describedby="nis-hint nis-error" aria-invalid={error ? true : undefined} className={fieldCls} />
          <button type="submit" disabled={busy !== ""}
            className="inline-flex items-center justify-center gap-2 min-h-14 px-7 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold uppercase tracking-wider shadow-md hover:bg-primary/90 disabled:opacity-60 transition-colors whitespace-nowrap">
            <span aria-hidden="true" className={`material-symbols-outlined text-[22px] ${busy === "cek" ? "animate-spin" : ""}`}>{busy === "cek" ? "progress_activity" : "search"}</span>
            <T>Cek NIS</T>
          </button>
        </div>
        <p id="nis-hint" className="mt-3 flex items-start gap-2 font-body-sm text-body-sm text-on-surface-variant">
          <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-secondary mt-0.5">lock</span>
          <span><T>Password file PDF = NIS. Simpan NIS Anda; file tidak bisa dibuka tanpanya.</T></span>
        </p>
      </form>

      <div id="nis-error" aria-live="polite">
        {error && (
          <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl bg-error-container/60 px-4 py-3 font-body-md text-body-md text-on-error-container">
            <span aria-hidden="true" className="material-symbols-outlined text-[20px] mt-0.5">error</span>{error}
          </p>
        )}
      </div>

      {info && (
        <div className="mt-6 pt-6 border-t border-primary-container/15">
          <p className="font-body-lg text-body-lg text-on-surface">
            <T>Halo,</T> <span className="font-bold text-primary">{info.firstName}</span> <span className="text-on-surface-variant">· {info.jenjang}</span>
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1"><T>Pilih dokumen yang ingin diunduh.</T></p>
          <div className="grid gap-3 sm:grid-cols-2 mt-4">
            {DOCS.filter((d) => info.docs.includes(d.type)).map((d) => (
              <button key={d.type} type="button" disabled={busy !== ""} onClick={() => download(d.type)}
                className="group flex items-center gap-4 text-left min-h-20 rounded-2xl border border-primary-container/20 bg-surface-container-low hover:bg-primary-container/10 hover:border-primary/40 p-4 transition-colors disabled:opacity-60">
                <span aria-hidden="true" className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-primary text-on-primary">
                  <span className={`material-symbols-outlined text-[24px] ${busy === d.type ? "animate-spin" : ""}`}>{busy === d.type ? "progress_activity" : d.icon}</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-label-lg text-label-lg text-primary font-bold"><T>{d.title}</T></span>
                  <span className="block font-caption text-caption text-on-surface-variant"><T>{d.text}</T></span>
                </span>
                <span aria-hidden="true" className="material-symbols-outlined text-[22px] text-secondary">download</span>
              </button>
            ))}
          </div>
          {done && (
            <p role="status" className="mt-4 flex items-start gap-2 font-body-sm text-body-sm text-primary">
              <span aria-hidden="true" className="material-symbols-outlined text-[18px] mt-0.5">check_circle</span>
              <span><T>Unduhan dimulai. Buka file PDF dan masukkan NIS sebagai password.</T></span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

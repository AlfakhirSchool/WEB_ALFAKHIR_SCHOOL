"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { EditorCommandMessage, EditorStateMessage } from "@/components/content/ContentProvider";
import { Icon, PageHeader, btnPrimary, btnSecondary, inputCls } from "./ui";
import { TextsManager, type TextRow } from "./TextsManager";

export const EDITOR_PAGES: { group: string; dot: string; items: { path: string; label: string }[] }[] = [
  {
    group: "Portal Al Fakhir School", dot: "bg-[#0E6A71]",
    items: [
      { path: "/", label: "Beranda" }, { path: "/yayasan", label: "Tentang Kami" }, { path: "/berita", label: "Berita" },
      { path: "/jurnal", label: "Jurnal" }, { path: "/dokumen", label: "Dokumen" }, { path: "/kontak", label: "Kontak" }, { path: "/ppdb", label: "PPDB" },
    ],
  },
  {
    group: "SD Islam Modern", dot: "bg-[#E86116]",
    items: [
      { path: "/sd", label: "Beranda" }, { path: "/sd/profil", label: "Profil" }, { path: "/sd/program", label: "Program" },
      { path: "/sd/kegiatan", label: "Kegiatan" }, { path: "/sd/ppdb", label: "PPDB" }, { path: "/sd/kontak", label: "Kontak" },
    ],
  },
  {
    group: "SMP Islam Modern", dot: "bg-[#022E31]",
    items: [
      { path: "/smp", label: "Beranda" }, { path: "/smp/profil", label: "Profil" }, { path: "/smp/akademik", label: "Akademik" },
      { path: "/smp/kesiswaan", label: "Kesiswaan" }, { path: "/smp/ppdb", label: "PPDB" }, { path: "/smp/kontak", label: "Kontak" },
    ],
  },
];

const DEVICES = [
  { id: "desktop", label: "Desktop", icon: "desktop_windows", width: 1440 },
  { id: "tablet", label: "Tablet", icon: "tablet_mac", width: 768 },
  { id: "hp", label: "HP", icon: "smartphone", width: 390 },
] as const;
type DeviceId = (typeof DEVICES)[number]["id"];

const ALL_PATHS = EDITOR_PAGES.flatMap((g) => g.items.map((i) => i.path));
const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
const frameSrc = (path: string) => `${path}?edit=1&no-loader`;

/** Dashboard "Editor Halaman": the live site in an iframe with Mode Edit on, plus the list of saved text changes. */
export function PageEditor({ rows, initialPath }: { rows: TextRow[]; initialPath?: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<"editor" | "list">("editor");
  const start = initialPath && ALL_PATHS.includes(normalize(initialPath)) ? normalize(initialPath) : "/";
  const [srcPath, setSrcPath] = useState(start);
  const [livePath, setLivePath] = useState(start);
  const [reloadKey, setReloadKey] = useState(0);
  const [device, setDevice] = useState<DeviceId>("desktop");
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState({ pending: 0, saving: false, error: "" });
  const [notice, setNotice] = useState("");
  const [box, setBox] = useState({ w: 0, h: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const savedRef = useRef(0);

  // Phones start in the HP preview: a 1440px page scaled into 350px is unreadable.
  useEffect(() => { if (window.innerWidth < 640) setDevice("hp"); else if (window.innerWidth < 1024) setDevice("tablet"); }, []);

  // Fit: the iframe keeps the real device width (so the site's own breakpoints apply) and is scaled down to the stage.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    // Ignore the 0×0 reading while the tab is hidden, so the iframe (and its unsaved edits) stays mounted.
    const ro = new ResizeObserver(([e]) => { if (e.contentRect.width > 0) setBox({ w: Math.floor(e.contentRect.width), h: Math.floor(e.contentRect.height) }); });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent<EditorStateMessage>) => {
      if (e.origin !== location.origin || e.source !== frameRef.current?.contentWindow || e.data?.type !== "alf-edit") return;
      const m = e.data;
      setLivePath(normalize(m.path));
      setState({ pending: m.pending, saving: m.saving, error: m.error });
      if (m.saved > savedRef.current) {
        setNotice("Tersimpan. Perubahan sudah tampil di website.");
        router.refresh();
      }
      savedRef.current = m.saved;
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

  useEffect(() => {
    if (!state.pending) return;
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [state.pending]);

  const send = useCallback((cmd: EditorCommandMessage["cmd"]) => {
    setNotice("");
    const msg: EditorCommandMessage = { type: "alf-edit-cmd", cmd };
    frameRef.current?.contentWindow?.postMessage(msg, location.origin);
  }, []);

  const leaveOk = () => !state.pending || confirm("Ada perubahan yang belum disimpan. Buang perubahan?");
  const openPage = (path: string) => {
    if (path !== livePath && !leaveOk()) return;
    setNotice("");
    setLoaded(false);
    setState({ pending: 0, saving: false, error: "" });
    savedRef.current = 0;
    setSrcPath(path);
    setLivePath(path);
    setReloadKey((k) => k + 1);
    setTab("editor");
  };
  const reload = () => { if (leaveOk()) openPage(livePath); };

  const dev = DEVICES.find((d) => d.id === device)!;
  const scale = box.w ? Math.min(1, box.w / dev.width) : 1;
  const framed = device !== "desktop";
  const viewH = framed ? box.h - 24 : box.h;
  const pageLabel = useMemo(() => {
    for (const g of EDITOR_PAGES) { const it = g.items.find((i) => i.path === livePath); if (it) return `${g.group.split(" ")[0]} · ${it.label}`; }
    return livePath;
  }, [livePath]);

  return (
    <div className="lg:relative lg:left-1/2 lg:w-[min(calc(100vw-21rem),1700px)] lg:-translate-x-1/2">
      <PageHeader title="Editor Halaman" description="Ubah teks dan foto website langsung di halaman aslinya, atau lihat daftar teks yang sudah diubah.">
        <Link href="/admin/foto" className={btnSecondary}>
          <Icon name="photo_library" className="text-[18px]" /> Semua Foto Website
        </Link>
      </PageHeader>

      <div role="tablist" aria-label="Editor Halaman" className="mb-4 inline-flex rounded-xl bg-slate-200/70 p-1">
        {([["editor", "Editor Visual", "ads_click"], ["list", `Daftar Teks Diubah${rows.length ? ` (${rows.length})` : ""}`, "edit_note"]] as const).map(([id, label, icon]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
            className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3.5 text-sm font-semibold transition sm:px-4 ${tab === id ? "bg-white text-[#022E31] shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
            <Icon name={icon} className="text-[18px]" /> {label}
          </button>
        ))}
      </div>

      <div hidden={tab !== "editor"}>
        {/* Page picker */}
        <div className="mb-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-4">
          <label className="block md:hidden">
            <span className="mb-1 block text-xs font-semibold text-slate-500">Halaman</span>
            <select value={ALL_PATHS.includes(livePath) ? livePath : ""} onChange={(e) => openPage(e.target.value)} className={`${inputCls} h-12`} aria-label="Pilih halaman">
              {!ALL_PATHS.includes(livePath) && <option value="">{livePath}</option>}
              {EDITOR_PAGES.map((g) => (
                <optgroup key={g.group} label={g.group}>
                  {g.items.map((i) => <option key={i.path} value={i.path}>{i.label} ({i.path})</option>)}
                </optgroup>
              ))}
            </select>
          </label>
          <div className="hidden space-y-2 md:block">
            {EDITOR_PAGES.map((g) => (
              <div key={g.group} className="flex items-center gap-3">
                <p className="flex w-40 shrink-0 items-center gap-2 text-xs font-semibold text-slate-700"><span className={`inline-block h-2.5 w-2.5 rounded-full ${g.dot}`} />{g.group}</p>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((i) => {
                    const on = i.path === livePath;
                    return (
                      <button key={i.path} type="button" onClick={() => openPage(i.path)} aria-pressed={on}
                        className={`min-h-9 rounded-lg px-3 text-[13px] font-medium transition ${on ? "bg-[#0E6A71] text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                        {i.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device, tools, save */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Ukuran layar" className="inline-flex rounded-xl border border-slate-300 bg-white p-0.5 shadow-sm">
            {DEVICES.map((d) => (
              <button key={d.id} type="button" aria-pressed={device === d.id} onClick={() => setDevice(d.id)} title={`${d.label} (${d.width}px)`}
                className={`inline-flex min-h-10 items-center gap-1.5 rounded-[10px] px-2.5 text-[13px] font-semibold transition sm:px-3 ${device === d.id ? "bg-[#0E6A71] text-white" : "text-slate-600 hover:bg-slate-100"}`}>
                <Icon name={d.icon} className="text-[18px]" /> <span>{d.label}</span>
              </button>
            ))}
          </div>
          <button type="button" onClick={reload} className={`${btnSecondary} min-h-10 px-3`} title="Muat ulang halaman">
            <Icon name="refresh" className="text-[18px]" /> <span className="hidden sm:inline">Muat ulang</span>
          </button>
          <a href={frameSrc(livePath).replace("&no-loader", "")} target="_blank" rel="noopener" className={`${btnSecondary} min-h-10 px-3`} title="Buka di tab baru">
            <Icon name="open_in_new" className="text-[18px]" /> <span className="hidden sm:inline">Tab baru</span>
          </a>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-xs font-medium text-slate-500 lg:inline">{state.pending ? `${state.pending} perubahan belum disimpan` : pageLabel}</span>
            {state.pending > 0 && (
              <button type="button" onClick={() => send("discard")} disabled={state.saving} className={`${btnSecondary} min-h-10 px-3`}>Batal</button>
            )}
            <button type="button" onClick={() => send("save")} disabled={!state.pending || state.saving} className={`${btnPrimary} min-h-10 px-4`}>
              <Icon name="save" className="text-[18px]" /> {state.saving ? "Menyimpan…" : `Simpan${state.pending ? ` (${state.pending})` : ""}`}
            </button>
          </div>
        </div>

        <div className="mb-3 flex items-start gap-2.5 rounded-xl bg-amber-50 px-3.5 py-2.5 text-[13px] leading-relaxed text-amber-900" role="status">
          <Icon name="ads_click" className="mt-0.5 text-[18px] text-amber-600" />
          <p>
            Klik teks bertitik oranye lalu ketik, atau klik tombol <strong>Ganti foto</strong> pada gambar; tekan <strong>Simpan</strong> di toolbar.{" "}
            <span className="text-amber-800/80">Perubahan yang belum disimpan ditandai hijau. Nomor WA, biaya, FAQ, berita, guru, jurnal, dan popup diubah lewat menu samping.</span>
          </p>
        </div>
        {state.error && <p className="mb-3 rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700" role="alert">{state.error}</p>}
        {notice && !state.error && <p className="mb-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-800" role="status"><Icon name="check_circle" className="text-[18px]" /> {notice}</p>}

        {/* Stage */}
        <div ref={stageRef} className="relative h-[max(480px,calc(100dvh-14rem))] overflow-hidden rounded-2xl border border-slate-200 bg-[repeating-linear-gradient(45deg,#e8eeee,#e8eeee_10px,#eef2f2_10px,#eef2f2_20px)]">
          {box.w > 0 && (
            <div className={`absolute left-1/2 -translate-x-1/2 overflow-hidden bg-white ${framed ? "rounded-[22px] shadow-2xl ring-1 ring-slate-300" : ""}`}
              style={{ width: dev.width * scale, height: viewH, top: framed ? 12 : 0 }}>
              <iframe
                key={reloadKey}
                ref={frameRef}
                src={frameSrc(srcPath)}
                title={`Editor halaman ${pageLabel}`}
                onLoad={() => setLoaded(true)}
                className="block origin-top-left border-0 bg-white"
                style={{ width: dev.width, height: viewH / scale, transform: `scale(${scale})` }}
              />
              {!loaded && <div className="absolute inset-0 grid place-items-center bg-white/80 text-sm font-medium text-slate-500" aria-live="polite">Memuat halaman…</div>}
            </div>
          )}
        </div>
        <p className="mt-2 text-xs text-slate-500">Tampilan {dev.label} ({dev.width}px){scale < 1 ? ` · diperkecil ${Math.round(scale * 100)}% agar muat` : ""}.</p>
      </div>

      <div hidden={tab !== "list"}>
        <TextsManager rows={rows} onOpenPage={openPage} />
      </div>
    </div>
  );
}

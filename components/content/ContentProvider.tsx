"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Settings } from "@/content/settings";
import { overrideKey, type OverrideMap } from "@/lib/content/keys";
import { ADMIN_HINT_COOKIE } from "@/lib/auth/session-cookies";
import { usePathname, useRouter } from "next/navigation";
import { EditToolbar } from "./EditToolbar";
import { ImageOverlays } from "./ImageOverlays";

export type PendingEdit = { scope: string; source: string; value: string };
/** Staged photo changes: original src → new URL, or null = back to the original photo. */
export type PendingImages = ReadonlyMap<string, string | null>;

type Ctx = {
  overrides: OverrideMap;
  /** `images` already includes photo changes staged in edit mode, so pages preview them live. */
  settings: Settings;
  /** True while a logged-in admin has edit mode on: every <T> becomes editable in place. */
  editing: boolean;
  pending: Map<string, PendingEdit>;
  stage: (edit: PendingEdit) => void;
  /** Photo replacements as last saved (without staged changes). */
  savedImages: Settings["images"];
  pendingImages: PendingImages;
  stageImage: (src: string, url: string | null) => void;
  reportError: (message: string) => void;
};

const ContentCtx = createContext<Ctx | null>(null);
const EDIT_FLAG = "alf-edit-mode";

function useContentCtx(): Ctx {
  const ctx = useContext(ContentCtx);
  if (!ctx) throw new Error("ContentProvider missing (app/layout.tsx)");
  return ctx;
}

/** Live dashboard settings (contact, fees, FAQ, news, popup) for client components. */
export const useSettings = (): Settings => useContentCtx().settings;
export const useContent = useContentCtx;

/**
 * Root provider: text overrides + settings loaded on the server (lib/content/store.ts), plus in-page edit mode
 * for admins. Edit mode turns on with the toolbar or `?edit=1` (only when the admin hint cookie is present;
 * saving is still authorized server-side).
 */
/** Messages between the dashboard's visual editor (parent window) and the page inside its iframe. Same origin only. */
export type EditorStateMessage = { type: "alf-edit"; path: string; pending: number; saving: boolean; /** Counts successful saves since the page loaded. */ saved: number; error: string };
export type EditorCommandMessage = { type: "alf-edit-cmd"; cmd: "save" | "discard" };

/** True when this page is the preview iframe of the dashboard editor (parent is same-origin /admin). */
function isEditorFrame(): boolean {
  if (window.parent === window) return false;
  try { return window.parent.location.pathname.startsWith("/admin"); } catch { return false; }
}

export function ContentProvider({ overrides, settings, children }: { overrides: OverrideMap; settings: Settings; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [embedded, setEmbedded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useState<Map<string, PendingEdit>>(() => new Map());
  const [pendingImages, setPendingImages] = useState<PendingImages>(() => new Map());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const admin = document.cookie.split("; ").some((c) => c === `${ADMIN_HINT_COOKIE}=1`);
    setIsAdmin(admin);
    if (!admin) return;
    if (isEditorFrame()) { setEmbedded(true); setEditing(true); return; }
    const fromUrl = new URLSearchParams(location.search).get("edit") === "1";
    if (!fromUrl) sessionStorage.removeItem(EDIT_FLAG);
    setEditing(fromUrl);
  }, []);

  const stage = useCallback((edit: PendingEdit) => {
    setPending((prev) => {
      const next = new Map(prev);
      const key = overrideKey(edit.scope, edit.source);
      const current = overrides[key] ?? edit.source;
      if (edit.value === current) next.delete(key); else next.set(key, edit);
      return next;
    });
  }, [overrides]);

  const stageImage = useCallback((src: string, url: string | null) => {
    setPendingImages((prev) => {
      const next = new Map(prev);
      const saved = settings.images[src] ?? null;
      if (url === saved) next.delete(src); else next.set(src, url);
      return next;
    });
    setError("");
  }, [settings.images]);

  const changes = pending.size + pendingImages.size;

  const toggle = useCallback((on: boolean) => {
    setEditing(on);
    if (on) sessionStorage.setItem(EDIT_FLAG, "1"); else { sessionStorage.removeItem(EDIT_FLAG); setPending(new Map()); setPendingImages(new Map()); }
  }, []);

  const discard = useCallback(() => {
    setPending(new Map());
    setPendingImages(new Map());
    setError("");
  }, []);

  const save = useCallback(async () => {
    if (!changes || saving) return;
    setSaving(true);
    setError("");
    const post = async (url: string, body: unknown) => {
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.status === 401) throw new Error("Sesi login habis. Silakan login ulang di dashboard.");
      if (!res.ok) throw new Error("Gagal menyimpan. Coba lagi.");
    };
    try {
      if (pending.size) {
        await post("/api/admin/texts", { items: [...pending.values()] });
        setPending(new Map());
      }
      if (pendingImages.size) {
        const set: Record<string, string> = {};
        const clear: string[] = [];
        for (const [src, url] of pendingImages) { if (url) set[src] = url; else clear.push(src); }
        await post("/api/admin/images", { set, clear });
        setPendingImages(new Map());
      }
      setSaved((n) => n + 1);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  }, [changes, pending, pendingImages, saving, router]);

  // Editor iframe: report state to the dashboard, obey its Simpan / Batal buttons.
  useEffect(() => {
    if (!embedded) return;
    const msg: EditorStateMessage = { type: "alf-edit", path: pathname, pending: changes, saving, saved, error };
    window.parent.postMessage(msg, location.origin);
  }, [embedded, pathname, changes, saving, saved, error]);
  useEffect(() => {
    if (!embedded) return;
    const onMessage = (e: MessageEvent<EditorCommandMessage>) => {
      if (e.origin !== location.origin || e.source !== window.parent || e.data?.type !== "alf-edit-cmd") return;
      if (e.data.cmd === "save") void save();
      if (e.data.cmd === "discard") discard();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [embedded, save, discard]);

  // Edit mode: a click on editable text places the caret instead of following the surrounding link/button;
  // other links keep working, but never silently drop unsaved edits or navigate the editor frame off the site.
  useEffect(() => {
    if (!editing) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.("[data-alf-edit]")) { e.preventDefault(); e.stopPropagation(); return; }
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) {
        if (embedded && /^https?:$/.test(url.protocol)) { e.preventDefault(); e.stopPropagation(); window.open(url.href, "_blank", "noopener"); }
        return;
      }
      if (url.pathname === location.pathname) return;
      if (changes && !confirm("Ada perubahan yang belum disimpan. Pindah halaman dan buang perubahan?")) { e.preventDefault(); e.stopPropagation(); }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [editing, embedded, changes]);

  useEffect(() => {
    if (!editing || embedded || !changes) return;
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [editing, embedded, changes]);

  // Photos staged in edit mode show live on the page; `savedImages` stays what is stored.
  const liveSettings = useMemo<Settings>(() => {
    if (!pendingImages.size) return settings;
    const images = { ...settings.images };
    for (const [src, url] of pendingImages) { if (url) images[src] = url; else delete images[src]; }
    return { ...settings, images };
  }, [settings, pendingImages]);

  const reportError = useCallback((message: string) => setError(message), []);
  const value = useMemo<Ctx>(
    () => ({ overrides, settings: liveSettings, editing, pending, stage, savedImages: settings.images, pendingImages, stageImage, reportError }),
    [overrides, liveSettings, settings.images, editing, pending, stage, pendingImages, stageImage, reportError],
  );
  return (
    <ContentCtx.Provider value={value}>
      {children}
      {editing && <ImageOverlays />}
      {isAdmin && !embedded && <EditToolbar editing={editing} onToggle={toggle} changes={changes} onDiscard={discard} onSave={save} saving={saving} error={error} />}
    </ContentCtx.Provider>
  );
}

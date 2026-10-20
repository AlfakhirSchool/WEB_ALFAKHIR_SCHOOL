"use client";
import { createContext, useContext } from "react";
import { overrideKey } from "@/lib/content/keys";
import { useContent } from "./ContentProvider";

const ScopeCtx = createContext("global");

/**
 * Names the area an edited text belongs to. Wrap each page's root (scope = route, e.g. "sd/ppdb") and each
 * shared chrome (e.g. "shell/sd"). The same sentence in two scopes can be edited independently.
 */
export function Scope({ id, children }: { id: string; children: React.ReactNode }) {
  return <ScopeCtx.Provider value={id}>{children}</ScopeCtx.Provider>;
}

/**
 * Editable text. `children` is the default text written in the code; an override saved from the dashboard or
 * in-page edit mode replaces it. Renders no wrapper element unless edit mode is on.
 * Children must be a single string: `<T>Daftar Sekarang</T>`, `<T>{item.title}</T>`, `<T>{`Kelas ${n}`}</T>`.
 */
export function T({ children }: { children: string }) {
  const scope = useContext(ScopeCtx);
  const { overrides, editing, pending, stage } = useContent();
  const key = overrideKey(scope, children);
  const value = pending.get(key)?.value ?? overrides[key] ?? children;
  if (!editing) return <>{value}</>;
  return (
    <span
      data-alf-edit=""
      data-dirty={pending.has(key) ? "" : undefined}
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      spellCheck={false}
      title="Klik untuk mengubah teks"
      onBlur={(e) => stage({ scope, source: children, value: (e.currentTarget.textContent ?? "").replace(/\s+/g, " ").trim() || children })}
      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); e.currentTarget.blur(); } if (e.key === "Escape") { e.currentTarget.textContent = value; e.currentTarget.blur(); } }}
    >
      {value}
    </span>
  );
}

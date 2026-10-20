"use client";
import { useEffect, useState } from "react";

/** Shared dashboard styling. Plain Tailwind colors (the dashboard sits outside the site's token themes). */
export const inputCls =
  "block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#0E6A71] focus:ring-4 focus:ring-[#0E6A71]/15 disabled:bg-slate-100 sm:text-sm";
export const btnPrimary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0E6A71] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B585E] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0E6A71]/30 disabled:cursor-not-allowed disabled:opacity-50";
export const btnSecondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/50 disabled:cursor-not-allowed disabled:opacity-50";
export const btnDanger =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200 disabled:cursor-not-allowed disabled:opacity-50";
export const iconBtn =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/50 disabled:pointer-events-none disabled:opacity-30";

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  return <span aria-hidden="true" className={`material-symbols-outlined inline-block h-[1em] w-[1em] select-none overflow-hidden whitespace-nowrap leading-none ${className}`}>{name}</span>;
}

export function PageHeader({ title, description, children }: { title: string; description?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-[#022E31] sm:text-[1.75rem]">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-600">{description}</p>}
      </div>
      {children && <div className="flex shrink-0 flex-wrap gap-2">{children}</div>}
    </header>
  );
}

/** External button in PageHeader that opens the corresponding public page in a new tab. */
export function ViewLink({ href, label = "Lihat di website" }: { href: string; label?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={btnSecondary}>
      <Icon name="open_in_new" className="text-[18px]" /> {label}
    </a>
  );
}

export function Card({ title, description, children, className = "", actions }: { title?: string; description?: React.ReactNode; children: React.ReactNode; className?: string; actions?: React.ReactNode }) {
  return (
    <section className={`rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 ${className}`}>
      {(title || actions) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3 sm:mb-5">
          <div className="min-w-0">
            {title && <h2 className="text-base font-semibold text-slate-900">{title}</h2>}
            {description && <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function Field({ label, hint, children, htmlFor, className = "" }: { label: string; hint?: React.ReactNode; children: React.ReactNode; htmlFor?: string; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{hint}</p>}
    </div>
  );
}

/** Friendly placeholder for lists with nothing in them yet. */
export function EmptyState({ icon = "inbox", title, children }: { icon?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-white/60 px-4 py-8 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400"><Icon name={icon} className="text-[26px]" /></span>
      <p className="mt-3 text-sm font-semibold text-slate-700">{title}</p>
      {children && <p className="mt-1 max-w-sm text-sm leading-relaxed text-slate-500">{children}</p>}
    </div>
  );
}

export type Status = { kind: "ok" | "error"; text: string } | null;

export function StatusMessage({ status }: { status: Status }) {
  if (!status) return null;
  const ok = status.kind === "ok";
  return (
    <p role={ok ? "status" : "alert"} className={`flex items-start gap-2 rounded-xl px-3.5 py-2.5 text-sm ${ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}>
      <Icon name={ok ? "check_circle" : "error"} className="mt-px text-[18px]" />
      <span>{status.text}</span>
    </p>
  );
}

/** Toggle switch (button role=switch). */
export function Switch({ checked, onChange, label, id }: { checked: boolean; onChange: (v: boolean) => void; label: string; id?: string }) {
  return (
    <button type="button" role="switch" id={id} aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition before:absolute before:-inset-x-1 before:-inset-y-2 before:content-[''] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0E6A71]/25 ${checked ? "bg-[#0E6A71]" : "bg-slate-300"}`}>
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

/** Warns before leaving the page with unsaved edits. */
export function useUnsavedGuard(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);
}

/** Relative "x menit lalu" label, computed after mount to avoid hydration mismatch. */
export function TimeAgo({ iso }: { iso: string }) {
  const [label, setLabel] = useState("");
  useEffect(() => {
    const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
    setLabel(
      s < 60 ? "baru saja"
        : s < 3600 ? `${Math.floor(s / 60)} menit lalu`
        : s < 86400 ? `${Math.floor(s / 3600)} jam lalu`
        : new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    );
  }, [iso]);
  return <time dateTime={iso}>{label}</time>;
}

"use client";
import { useState } from "react";
import { T } from "@/components/content/T";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button type="button" aria-label={`Salin ${text}`}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-container/10 text-primary hover:bg-primary-container/20 font-label-md text-label-md font-bold transition-colors"
      onClick={() => { navigator.clipboard?.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
      <span className="material-symbols-outlined text-[16px]">{copied ? "check" : "content_copy"}</span>
      {copied ? <T>Tersalin</T> : <T>Salin</T>}
    </button>
  );
}

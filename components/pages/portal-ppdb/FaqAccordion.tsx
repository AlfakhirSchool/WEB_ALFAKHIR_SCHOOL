"use client";
import { useState } from "react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col gap-3">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={i} className={`rounded-xl border transition-colors ${on ? "bg-surface-container-lowest border-primary-container/30 shadow-sm" : "bg-surface-container-lowest/60 border-primary-container/10"}`}>
            <button type="button" id={`faq-q-${i}`} aria-expanded={on} aria-controls={`faq-a-${i}`} onClick={() => setOpen(on ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-space-md py-4 text-left">
              <span className={`font-subheading text-subheading font-bold ${on ? "text-primary" : "text-on-surface"}`}>{it.q}</span>
              <span className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${on ? "bg-primary text-on-primary rotate-45" : "bg-surface-container text-primary"}`}>
                <span className="material-symbols-outlined text-[20px]">add</span>
              </span>
            </button>
            <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!on}>
              <p className="px-space-md pb-5 font-body-md text-body-md text-on-surface-variant max-w-2xl">{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

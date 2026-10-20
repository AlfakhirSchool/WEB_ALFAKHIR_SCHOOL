/** Rub el Hizb (8-pointed star) glyph, as used in the Serene design chips. */
export function StarGlyph({ className = "w-3.5 h-3.5 text-secondary-container" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2L14.7 6.3L19.8 4.2L19.2 9.5L24 12L19.2 14.5L19.8 19.8L14.7 17.7L12 22L9.3 17.7L4.2 19.8L4.8 14.5L0 12L4.8 9.5L4.2 4.2L9.3 6.3L12 2Z" />
    </svg>
  );
}

/** Large, slowly rotating Rub el Hizb watermark (4% opacity). */
export function Watermark({ className = "absolute -top-16 -right-16 w-96 h-96 text-primary" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none opacity-[0.035] ${className}`} aria-hidden="true">
      <svg className="w-full h-full animate-[spin_160s_linear_infinite]" fill="currentColor" viewBox="0 0 200 200">
        <rect height="130" rx="14" width="130" x="35" y="35" />
        <rect height="130" rx="14" transform="rotate(45 100 100)" width="130" x="35" y="35" />
      </svg>
    </div>
  );
}

/** Hairline rule interrupted by a centred Rub el Hizb ornament. */
export function StarDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} role="presentation">
      <span className="h-px flex-1 bg-primary-container/15" />
      <StarGlyph className="w-4 h-4 text-tertiary-fixed-dim" />
      <span className="h-px flex-1 bg-primary-container/15" />
    </div>
  );
}

/** Eyebrow label with a dot, used above section headlines. */
export function Eyebrow({ children, dot = "bg-primary-container", className = "text-primary" }: { children: React.ReactNode; dot?: string; className?: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
      <span className={`font-label-md text-label-md font-bold uppercase tracking-wider ${className}`}>{children}</span>
    </div>
  );
}

/** Client-safe journal types and limits (shared by the dashboard, the public page and the API routes). */
export const JOURNAL_JENJANG = ["SD", "SMP"] as const;
export type JournalJenjang = (typeof JOURNAL_JENJANG)[number];

/** Vercel rejects request bodies above 4.5 MB, so uploads stay safely below that. */
export const JOURNAL_MAX_BYTES = 4 * 1024 * 1024;

export const JOURNAL_LIMITS = { title: 200, author: 120, className: 40, year: 20, abstract: 2000 } as const;

/** A journal without its PDF bytes. Dates are ISO strings so it can cross the server/client boundary. */
export type JournalItem = {
  id: string;
  title: string;
  author: string;
  className: string;
  jenjang: JournalJenjang;
  year: string;
  abstract: string;
  fileName: string;
  fileSize: number;
  published: boolean;
  createdAt: string;
};

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

/** Current Indonesian school year label, e.g. "2026/2027" (the year starts in July). */
export function currentSchoolYear(now = new Date()): string {
  const y = now.getFullYear();
  const start = now.getMonth() >= 6 ? y : y - 1;
  return `${start}/${start + 1}`;
}

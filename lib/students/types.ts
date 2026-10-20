/** Client-safe types, limits and constants for student records (dashboard, public page and API routes). */
export const STUDENT_JENJANG = ["SD", "SMP"] as const;
export type StudentJenjang = (typeof STUDENT_JENJANG)[number];

export const STUDENT_GENDERS = ["Laki-laki", "Perempuan"] as const;
export const PPDB_STATUSES = ["Terdaftar", "Diterima", "Cadangan", "Ditolak"] as const;
export type PpdbStatus = (typeof PPDB_STATUSES)[number];

/** 3–20 letters/digits. It is the public lookup key and the PDF open-password, so no spaces or symbols. */
export const NIS_RE = /^[A-Za-z0-9]{3,20}$/;

export const STUDENT_LIMITS = {
  name: 120, className: 40, birthPlace: 80, address: 400, religion: 30, parentName: 120, parentPhone: 30, parentJob: 80,
  previousSchool: 120, ppdbYear: 20, ppdbWave: 40, ppdbNotes: 1000, achievement: 1500,
} as const;

/** Shape of a student record in the dashboard (dates as ISO strings so it can cross the server/client boundary). */
export type StudentItem = {
  id: string;
  nis: string;
  name: string;
  jenjang: StudentJenjang;
  className: string;
  gender: string;
  birthPlace: string;
  birthDate: string;
  address: string;
  religion: string;
  photo: string;
  parentName: string;
  parentPhone: string;
  parentJob: string;
  previousSchool: string;
  ppdbYear: string;
  ppdbWave: string;
  ppdbStatus: string;
  ppdbNotes: string;
  achievement: string;
  enabled: boolean;
  updatedAt: string;
};

/** Editable fields (everything except id and timestamps). */
export type StudentInput = Omit<StudentItem, "id" | "updatedAt">;

export type StudentDocType = "profil" | "ppdb";
export const DOC_TYPES: readonly StudentDocType[] = ["profil", "ppdb"];

export const DOC_LABEL: Record<StudentDocType, string> = { profil: "Profil Siswa", ppdb: "Formulir PPDB" };

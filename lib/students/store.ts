import "server-only";
import { Prisma, type StudentRecord } from "@prisma/client";
import { db } from "@/lib/db";
import {
  NIS_RE, PPDB_STATUSES, STUDENT_GENDERS, STUDENT_JENJANG, STUDENT_LIMITS,
  type StudentInput, type StudentItem, type StudentJenjang,
} from "./types";

export function toStudentItem(r: StudentRecord): StudentItem {
  return {
    id: r.id, nis: r.nis, name: r.name, jenjang: r.jenjang === "SMP" ? "SMP" : "SD", className: r.className, gender: r.gender,
    birthPlace: r.birthPlace, birthDate: r.birthDate, address: r.address, religion: r.religion, photo: r.photo,
    parentName: r.parentName, parentPhone: r.parentPhone, parentJob: r.parentJob, previousSchool: r.previousSchool,
    ppdbYear: r.ppdbYear, ppdbWave: r.ppdbWave, ppdbStatus: r.ppdbStatus, ppdbNotes: r.ppdbNotes, achievement: r.achievement,
    enabled: r.enabled, updatedAt: r.updatedAt.toISOString(),
  };
}

export async function listStudents(): Promise<StudentItem[]> {
  const rows = await db.studentRecord.findMany({ orderBy: [{ jenjang: "asc" }, { name: "asc" }] });
  return rows.map(toStudentItem);
}

const MEDIA_URL_RE = /^\/api\/media\/[a-z0-9]{10,40}$/i;
const MULTILINE: ReadonlySet<string> = new Set(["address", "ppdbNotes", "achievement"]);

/** Valid YYYY-MM-DD that is a real calendar date, not in the future, and not before 1990. */
function validDate(s: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return false;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const dt = new Date(Date.UTC(y, mo - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === mo - 1 && dt.getUTCDate() === d && y >= 1990 && dt.getTime() <= Date.now();
}

type Result = { ok: true; data: StudentInput } | { ok: false; error: string };

/** Server-side validation of a create/update body. Trims, normalizes whitespace and enforces required fields and limits. */
export function parseStudentInput(raw: unknown): Result {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { ok: false, error: "Permintaan tidak valid." };
  const o = raw as Record<string, unknown>;
  const str = (k: string): string => {
    const v = o[k];
    if (v === undefined || v === null) return "";
    if (typeof v !== "string") throw new Error(`Isian "${k}" tidak valid.`);
    return MULTILINE.has(k) ? v.replace(/\r\n/g, "\n").replace(/[ \t]+/g, " ").trim() : v.replace(/\s+/g, " ").trim();
  };
  try {
    const d = {
      nis: str("nis"), name: str("name"), className: str("className"), gender: str("gender"), birthPlace: str("birthPlace"),
      birthDate: str("birthDate"), address: str("address"), religion: str("religion") || "Islam", photo: str("photo"),
      parentName: str("parentName"), parentPhone: str("parentPhone"), parentJob: str("parentJob"), previousSchool: str("previousSchool"),
      ppdbYear: str("ppdbYear"), ppdbWave: str("ppdbWave"), ppdbStatus: str("ppdbStatus"), ppdbNotes: str("ppdbNotes"), achievement: str("achievement"),
    };
    const jenjang = str("jenjang");
    const required: [string, string][] = [
      [d.nis, "NIS"], [d.name, "Nama lengkap"], [jenjang, "Jenjang"], [d.className, "Kelas"], [d.gender, "Jenis kelamin"],
      [d.birthPlace, "Tempat lahir"], [d.birthDate, "Tanggal lahir"], [d.address, "Alamat"], [d.parentName, "Nama orang tua/wali"],
      [d.parentPhone, "No. HP orang tua/wali"], [d.ppdbYear, "Tahun ajaran PPDB"], [d.ppdbWave, "Gelombang PPDB"], [d.ppdbStatus, "Status PPDB"],
    ];
    for (const [v, label] of required) if (!v) return { ok: false, error: `${label} wajib diisi.` };
    if (!NIS_RE.test(d.nis)) return { ok: false, error: "NIS harus 3–20 karakter, hanya huruf dan angka (tanpa spasi)." };
    if (!(STUDENT_JENJANG as readonly string[]).includes(jenjang)) return { ok: false, error: "Jenjang harus SD atau SMP." };
    if (!(STUDENT_GENDERS as readonly string[]).includes(d.gender)) return { ok: false, error: "Jenis kelamin tidak valid." };
    if (!(PPDB_STATUSES as readonly string[]).includes(d.ppdbStatus)) return { ok: false, error: "Status PPDB tidak valid." };
    if (!validDate(d.birthDate)) return { ok: false, error: "Tanggal lahir tidak valid (format TTTT-BB-HH, tidak boleh di masa depan)." };
    if (!/^\d{4}\/\d{4}$/.test(d.ppdbYear)) return { ok: false, error: "Tahun ajaran PPDB harus berformat 2027/2028." };
    if (!/^[0-9+()\- ]{6,30}$/.test(d.parentPhone)) return { ok: false, error: "No. HP hanya boleh berisi angka, spasi, +, - dan tanda kurung." };
    if (d.photo && !MEDIA_URL_RE.test(d.photo)) return { ok: false, error: "Foto harus diunggah lewat tombol unggah." };
    for (const k of Object.keys(STUDENT_LIMITS) as (keyof typeof STUDENT_LIMITS)[]) {
      if (d[k].length > STUDENT_LIMITS[k]) return { ok: false, error: `Isian "${k}" maksimal ${STUDENT_LIMITS[k]} karakter.` };
    }
    const enabled = o.enabled === undefined ? true : o.enabled === true;
    return { ok: true, data: { ...d, jenjang: jenjang as StudentJenjang, enabled } };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Permintaan tidak valid." };
  }
}

export const isDuplicateNis = (e: unknown) => e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002";
export const isMissing = (e: unknown) => e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025";

/** `Profil-Budi-Santoso-12345.pdf`: ASCII-only, safe for headers and file systems. */
export function docFileName(kind: "Profil" | "PPDB", name: string, nis: string): string {
  const slug = name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "Siswa";
  return `${kind}-${slug}-${nis}.pdf`;
}

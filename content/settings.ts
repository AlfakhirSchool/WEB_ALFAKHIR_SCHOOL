/**
 * Structured site data editable from the dashboard (/admin). Client-safe: types, defaults and validation only.
 * Server code reads the live values with `getSettings()` (lib/content/store.ts);
 * client components with `useSettings()` (components/content/ContentProvider.tsx).
 * Defaults below are what the site shows when the database has no saved value (or is unreachable).
 */
import type { Jenjang, SiteKey } from "./site";
import { defaultNews } from "./default-news";

/** Contact data of one school (SD or SMP). Empty `facebook`/`youtube`/`instagram` hide the corresponding link. */
export type SchoolContact = {
  /** WhatsApp number in international format without "+" or spaces, e.g. 6285281752123 */
  waNumber: string;
  /** How the number is printed on the site, e.g. +62 852-8175-2123 */
  waDisplay: string;
  email: string;
  /** Street address printed on the site */
  address: string;
  /** Profile URL (https://…) or "" */
  instagram: string;
  facebook?: string;
  youtube?: string;
  /** Text sent to Google Maps / Waze for the map embed and "Buka di Google Maps" links */
  mapQuery: string;
};

export type Contact = {
  /** Portal-level WhatsApp number (international format without "+" or spaces) */
  waNumber: string;
  /** How the portal number is printed on the site */
  waDisplay: string;
  email: string;
  address: string;
  instagram: string;
  facebook?: string;
  youtube?: string;
  sd: SchoolContact;
  smp: SchoolContact;
};

export type PpdbBrochure = {
  /** Label shown on the brochure card/button, e.g. "Brosur & Panduan PPDB SD 2027/2028" */
  title: string;
  /** File URL (/api/media/<id> or /photos/...); empty = not uploaded */
  url: string;
  /** "pdf" | "image" */
  kind?: "pdf" | "image";
  /** Original file name */
  fileName?: string;
};

export type Ppdb = {
  /** ISO date (YYYY-MM-DD) Gelombang 1 closes; drives the countdown. Empty = countdown shows placeholder. */
  deadline: string;
  /** Optional general PPDB brochure / pamflet on /ppdb */
  brochurePortal?: PpdbBrochure;
  /** Optional SD PPDB brochure / pamflet on /sd/ppdb and /sd/profil */
  brochureSd?: PpdbBrochure;
  /** Optional SMP PPDB brochure / pamflet on /smp/ppdb */
  brochureSmp?: PpdbBrochure;
};

export type FeeSd = { item: string; value: string };
export type FeeSmp = { wave: string; period: string; fee: string };
export type Fees = { sd: FeeSd[]; smp: FeeSmp[] };

export type FaqItem = { q: string; a: string };

export type NewsItem = {
  slug: string;
  jenjang: Jenjang;
  title: string;
  summary: string;
  /** Optional full article text shown on /berita/[slug] (falls back to bundled newsArticles[slug].body) */
  body?: string;
  /** Display date, e.g. "18 Okt 2026" */
  date: string;
  /** Optional image URL (/api/media/<id> for uploads, or /photos/... for bundled images) */
  image?: string;
  /** Optional link to the original publication (https only) */
  url?: string;
};

export type PopupFrequency = "session" | "daily" | "always";

export type Popup = {
  enabled: boolean;
  title: string;
  body: string;
  /** Image URL (/api/media/<id> or /photos/...); empty = text-only popup */
  image: string;
  ctaLabel: string;
  /** Internal path (/sd/ppdb) or full URL (https://...); empty = no button */
  ctaHref: string;
  /** Which sites show the popup */
  sites: SiteKey[];
  frequency: PopupFrequency;
  /** Seconds after the page is ready before the popup appears */
  delay: number;
  /** Optional ISO dates (YYYY-MM-DD); empty = no limit */
  startDate: string;
  endDate: string;
};

export type Person = {
  name: string;
  role: string;
  /** Optional specialty badge / short tag, e.g. "Kepala Sekolah", "Koordinator Tahfiz" */
  badge?: string;
  /** Optional short biography or description */
  bio?: string;
  /** Optional credential / alma mater / certification, e.g. "Al-Azhar Cairo · UIN Jakarta" */
  credential?: string;
  /** Photo URL (/api/media/<id> for uploads, or /photos/... for bundled images); empty = placeholder */
  img?: string;
  /** CSS object-position for the photo crop, e.g. "50% 25%" */
  pos?: string;
};
export type StaffGroup = "yayasan" | "sd" | "smp";
export type Staff = Record<StaffGroup, Person[]>;
export const STAFF_GROUPS: StaffGroup[] = ["yayasan", "sd", "smp"];

export type StudentProfile = {
  name: string;
  /** e.g. "Kelas 5 SD" or "Kelas 9 SMP" */
  className: string;
  /** Achievement / predicate / role, e.g. "Medali Emas ISRF 2025" */
  achievement: string;
  /** Optional short profile description or quote */
  quote?: string;
  /** Photo URL (/api/media/<id> for uploads, or /photos/... for bundled images); empty = placeholder */
  img?: string;
  /** CSS object-position for the photo crop, e.g. "50% 25%" */
  pos?: string;
};
export type StudentGroup = "sd" | "smp";
export type Students = Record<StudentGroup, StudentProfile[]>;
export const STUDENT_GROUPS: StudentGroup[] = ["sd", "smp"];

/** Replaced site photos: original src (e.g. "/photos/kelas.webp") → new URL ("/api/media/<id>"). */
export type ImageOverrides = Record<string, string>;

export type Settings = {
  contact: Contact;
  images: ImageOverrides;
  staff: Staff;
  students: Students;
  ppdb: Ppdb;
  fees: Fees;
  faq: FaqItem[];
  news: NewsItem[];
  popup: Popup;
};

export type SettingKey = keyof Settings;
export const SETTING_KEYS: SettingKey[] = ["contact", "images", "staff", "students", "ppdb", "fees", "faq", "news", "popup"];

export const defaultSettings: Settings = {
  contact: {
    waNumber: "6285281752123",
    waDisplay: "+62 852-8175-2123",
    email: "smpialfakhir@gmail.com",
    address: "Jl. Kemang, Pasir Putih, Kec. Sawangan, Kota Depok, Jawa Barat 16519",
    instagram: "",
    facebook: "",
    youtube: "",
    sd: {
      waNumber: "628139526221",
      waDisplay: "+62 813-9526-221",
      email: "sdialfakhir@gmail.com",
      address: "Jl. Kemang, Pasir Putih, Kec. Sawangan, Kota Depok, Jawa Barat 16519",
      instagram: "https://www.instagram.com/sdialfakhir/",
      facebook: "",
      youtube: "https://www.youtube.com/@alfakhirdepok",
      mapQuery: "SD Islam Al Fakhir, Jl. Kemang, Pasir Putih, Kec. Sawangan, Kota Depok, Jawa Barat 16519",
    },
    smp: {
      waNumber: "6285281752123",
      waDisplay: "+62 852-8175-2123",
      email: "smpialfakhir@gmail.com",
      address: "Jl. Kemang No.48, Pasir Putih, Kec. Sawangan, Kota Depok, Jawa Barat 16519",
      instagram: "https://www.instagram.com/smpi.alfakhir/",
      facebook: "https://www.facebook.com/profile.php?id=61556239838524",
      youtube: "https://www.youtube.com/channel/UCywwH3nFH8zBB5rLq8_PKRA",
      mapQuery: "SMP Islam Al Fakhir, Jl. Kemang No.48, Pasir Putih, Kec. Sawangan, Kota Depok, Jawa Barat 16519",
    },
  },
  images: {},
  staff: {
    yayasan: [
      {
        name: "Deni Irawan, M.Pd",
        role: "Ketua Yayasan",
        badge: "Pendiri",
        bio: "Pendiri SMP Islam Modern Al Fakhir (Oktober 2023).",
        img: "/photos/deni.jpg",
        pos: "42% 30%",
      },
      {
        name: "Anggraini",
        role: "Deputi Litbang & SDM",
        img: "/photos/anggraini.jpg",
        pos: "50% 25%",
      },
    ],
    sd: [
      { name: "Royan Dharuriat, S.Pd", role: "Tenaga Pendidik · S1 Pendidikan Agama Islam", img: "/photos/staff/royan-dharuriat.webp", pos: "50% 15%" },
      { name: "Wulan Apriningtyas, S.Pd", role: "Tenaga Pendidik · S1 Pendidikan Biologi", img: "/photos/staff/wulan-apriningtyas.webp", pos: "50% 15%" },
      { name: "Nur Faidah Djaelani, S.Pd", role: "Tenaga Pendidik · S1 Manajemen Pendidikan", img: "/photos/staff/nur-faidah-djaelani.webp", pos: "50% 15%" },
      { name: "Lulu Luthfiyah, S.Pd", role: "Tenaga Pendidik · S1 Manajemen Pendidikan Islam", img: "/photos/staff/lulu-luthfiyah.webp", pos: "50% 15%" },
      { name: "Muhammad Faisal, S.Sos", role: "Tenaga Pendidik · S1 Manajemen Dakwah", img: "/photos/staff/muhammad-faisal.webp", pos: "50% 15%" },
      { name: "Nurlaili Muharram, S.Pd", role: "Tenaga Pendidik · S1 Pendidikan IPS", img: "/photos/staff/nurlaili-muharram.webp", pos: "50% 15%" },
      { name: "Aini Febiyanti, S.Pd", role: "Tenaga Pendidik · S1 Pendidikan Bahasa Inggris", img: "/photos/staff/aini-febiyanti.webp", pos: "50% 15%" },
      { name: "Thio Pratama, S.Kom", role: "Staff IT · S1 Sistem Informasi", img: "/photos/staff/thio-pratama.webp", pos: "50% 15%" },
      { name: "Feriman, S.Kom", role: "Staff IT · S1 Teknik Komputer", img: "/photos/staff/feriman.webp", pos: "50% 15%" },
      { name: "Giar Hermawan, S.Kom", role: "Staff Operator Sekolah · S1 Teknik Informatika", img: "/photos/staff/giar-hermawan.webp", pos: "50% 15%" },
      { name: "Nurhidayati, S.Pd", role: "Staff Administrasi · S1 Pendidikan Ekonomi", img: "/photos/staff/nurhidayati.webp", pos: "50% 15%" },
      { name: "Mia Andini Caniago, S.Ak", role: "Staff Administrasi · S1 Akuntansi", img: "/photos/staff/mia-andini-caniago.webp", pos: "50% 15%" },
      { name: "Arini Nurhidayati", role: "Staff Humas", img: "/photos/staff/arini-nurhidayati.webp", pos: "50% 15%" },
      { name: "Alya Nabila", role: "Staff Humas", img: "/photos/staff/alya-nabila.webp", pos: "50% 15%" },
    ],
    smp: [
      { name: "Denny Rahmat", role: "Kepala Sekolah", img: "/photos/staff/denny-rahmat.webp", pos: "50% 20%" },
    ],
  },
  /** Source: blog posts on https://www.smpialfakhir.sch.id/blog. The SD site publishes no student achievements, so that group is empty (its sections hide). */
  students: {
    sd: [],
    smp: [
      {
        name: "Amr Wahyu & Gendis",
        className: "",
        achievement: "Medali Emas · ISIF 2025",
        quote: "Delegasi Al Fakhir di International Science Innovation Fair (ISIF) 2025, Bali, 11–16 November 2025.",
      },
      {
        name: "Faiqah Kamilah & Hafidzah Nur Radhwa",
        className: "",
        achievement: "Medali Perak · NSIF 2024",
        quote: "National Science & Innovation Fair, Denpasar, Bali (6–10 November 2024). Karya: “Analisis Pemahaman Konsep Matematika di Era Society 5.0”.",
      },
      {
        name: "Azizah, Nindi, Matine, Nada, Zavier & Zidan",
        className: "",
        achievement: "Medali Silver · IIF 2025",
        quote: "Invention and Innovation Fair 2025 (daring, 10–12 Maret 2025). Karya: “Potensi Buah Bit (Beta Vulgaris) sebagai Alternatif Alami untuk Mengatasi Hiperpigmentasi Bibir”.",
      },
      {
        name: "Faiqah Kamilah Ramadhani",
        className: "",
        achievement: "Siswa Terbaik Peringkat 1 · TP 2024/2025",
        quote: "Diumumkan saat pengambilan rapor semester genap, 26 Juni 2025.",
      },
      {
        name: "Dzakira Nurul Matine",
        className: "",
        achievement: "Siswa Terbaik Peringkat 2 · TP 2024/2025",
        quote: "Diumumkan saat pengambilan rapor semester genap, 26 Juni 2025.",
      },
      {
        name: "Leonita Finola Agustina",
        className: "",
        achievement: "Siswa Terbaik Peringkat 3 · TP 2024/2025",
        quote: "Diumumkan saat pengambilan rapor semester genap, 26 Juni 2025.",
      },
    ],
  },
  ppdb: { deadline: "" },
  fees: {
    sd: [
      { item: "Uang pangkal", value: "Rp 14.500.000" },
      { item: "SPP bulanan", value: "Rp 1.150.000" },
      { item: "Seragam & buku", value: "Rp 1.950.000" },
    ],
    smp: [
      { wave: "Gelombang 1", period: "1 Okt – 30 Nov 2026", fee: "Rp 19.500.000 (Early Bird)" },
      { wave: "Gelombang 2", period: "1 Des 2026 – 28 Feb 2027", fee: "Rp 22.500.000" },
      { wave: "Gelombang 3", period: "1 Mar – 30 Mei 2027", fee: "Rp 22.500.000" },
    ],
  },
  faq: [
    { q: "Kapan pendaftaran dibuka?", a: "Gelombang 1 PPDB TA 2027/2028 dibuka mulai 1 Oktober 2026 hingga 30 November 2026 (atau hingga kuota terpenuhi)." },
    { q: "Berkas apa saja yang perlu disiapkan?", a: "Fotokopi Akta Kelahiran, Kartu Keluarga (KK), KTP Orang Tua/Wali, Pas Foto 3x4 (3 lembar), dan surat keterangan lulus/rapor dari sekolah asal." },
    { q: "Apakah ada tes masuk?", a: "Untuk jenjang SD dilaksanakan observasi kematangan dan kesiapan belajar. Untuk jenjang SMP dilaksanakan uji nalar skolastik, tes bacaan Al-Qur'an, dan wawancara komitmen orang tua." },
    { q: "Bagaimana rincian biaya?", a: "Rincian biaya investasi pendidikan transparan dapat dilihat pada menu Biaya & PPDB di halaman masing-masing jenjang atau menghubungi panitia melalui WhatsApp resmi." },
  ],
  news: defaultNews,
  popup: {
    enabled: false,
    title: "PPDB 2027/2028 Telah Dibuka",
    body: "Daftarkan putra-putri Anda di SD & SMP Islam Modern Al Fakhir. Kuota terbatas.",
    image: "",
    ctaLabel: "Daftar Sekarang",
    ctaHref: "/ppdb",
    sites: ["portal", "sd", "smp"],
    frequency: "session",
    delay: 2,
    startDate: "",
    endDate: "",
  },
};

/** WhatsApp deep link; `site` picks the school's own number ("portal" = portal-level number). */
export const waLinkFor = (contact: Contact, text?: string, site: SiteKey = "portal") => {
  const num = site === "sd" ? contact.sd.waNumber : site === "smp" ? contact.smp.waNumber : contact.waNumber;
  return `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
};

/** Google Maps link for a school's `mapQuery` (or any free text). */
export const mapsLink = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
/** Embeddable Google Maps URL for `query`. */
export const mapsEmbed = (query: string) => `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
/** Waze navigation link for `query`. */
export const wazeLink = (query: string) => `https://waze.com/ul?q=${encodeURIComponent(query)}&navigate=yes`;

/* ---------- validation (used when saving and when reading stored JSON) ---------- */

const str = (v: unknown, max = 5000): string | null => (typeof v === "string" && v.length <= max ? v : null);
const isDate = (v: string) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v);
const JENJANG: Jenjang[] = ["SD", "SMP", "UMUM"];
const SITES: SiteKey[] = ["portal", "sd", "smp"];
const FREQ: PopupFrequency[] = ["session", "daily", "always"];

function list<T>(v: unknown, item: (x: Record<string, unknown>) => T | null, max = 200): T[] | null {
  if (!Array.isArray(v) || v.length > max) return null;
  const out: T[] = [];
  for (const x of v) {
    if (!x || typeof x !== "object") return null;
    const parsed = item(x as Record<string, unknown>);
    if (!parsed) return null;
    out.push(parsed);
  }
  return out;
}

const URL_HTTPS = /^https:\/\/[^\s]+$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates the fields shared by the portal and a school (WhatsApp, email, address, social URLs); undefined → default. */
function parseContactFields(r: Record<string, unknown>, def: Omit<SchoolContact, "mapQuery">) {
  const waNumber = r.waNumber === undefined ? def.waNumber : str(r.waNumber, 20);
  const waDisplay = r.waDisplay === undefined ? def.waDisplay : str(r.waDisplay, 40)?.trim();
  const email = r.email === undefined ? def.email : str(r.email, 120)?.trim();
  const address = r.address === undefined ? def.address : str(r.address, 300)?.trim();
  const url = (v: unknown, fallback: string | undefined): string | null => {
    if (v === undefined) return fallback ?? "";
    const s = str(v, 300)?.trim();
    return s === undefined || (s !== "" && !URL_HTTPS.test(s)) ? null : s;
  };
  const instagram = url(r.instagram, def.instagram), facebook = url(r.facebook, def.facebook), youtube = url(r.youtube, def.youtube);
  if (!waNumber || !/^\d{8,15}$/.test(waNumber) || !waDisplay || !email || !EMAIL.test(email) || !address) return null;
  if (instagram === null || facebook === null || youtube === null) return null;
  return { waNumber, waDisplay, email, address, instagram, facebook, youtube };
}

function parseBrochure(v: unknown): PpdbBrochure | undefined | null {
  if (v === undefined || v === null) return undefined;
  if (typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const url = str(o.url ?? "", 500);
  const title = str(o.title ?? "", 200);
  const fileName = o.fileName === undefined || o.fileName === "" ? undefined : str(o.fileName, 200);
  const kind = o.kind === undefined || o.kind === "" ? undefined : o.kind === "pdf" || o.kind === "image" ? o.kind : null;
  if (url === null || title === null || fileName === null || kind === null) return null;
  if (!url) return undefined;
  if (!/^\/(api\/media\/|photos\/|design\/)/.test(url)) return null;
  return { title: title || "Brosur PPDB", url, ...(kind ? { kind } : {}), ...(fileName ? { fileName } : {}) };
}

const validators: { [K in SettingKey]: (v: unknown) => Settings[K] | null } = {
  contact(v) {
    if (!v || typeof v !== "object") return null;
    const o = v as Record<string, unknown>;
    const d = defaultSettings.contact;
    // Stored rows written before per-school contacts existed lack `sd`/`smp`/email/…: missing fields fall back to defaults.
    const school = (raw: unknown, def: SchoolContact): SchoolContact | null => {
      if (raw !== undefined && (!raw || typeof raw !== "object" || Array.isArray(raw))) return null;
      const r = (raw ?? {}) as Record<string, unknown>;
      const f = parseContactFields(r, def);
      const mapQuery = r.mapQuery === undefined ? def.mapQuery : str(r.mapQuery, 300)?.trim();
      if (!f || !mapQuery) return null;
      return { ...f, mapQuery };
    };
    const base = parseContactFields(o, d);
    const sd = school(o.sd, d.sd), smp = school(o.smp, d.smp);
    if (!base || !sd || !smp) return null;
    return { ...base, sd, smp };
  },
  images(v) {
    if (!v || typeof v !== "object" || Array.isArray(v)) return null;
    const entries = Object.entries(v as Record<string, unknown>);
    if (entries.length > 500) return null;
    const out: ImageOverrides = {};
    for (const [k, val] of entries) {
      if (!k.startsWith("/") || k.length > 300 || typeof val !== "string" || val.length > 500 || !/^\/(api\/media\/|photos\/|design\/|logo)/.test(val)) return null;
      out[k] = val;
    }
    return out;
  },
  staff(v) {
    if (!v || typeof v !== "object") return null;
    const o = v as Record<string, unknown>;
    const person = (x: Record<string, unknown>): Person | null => {
      const name = str(x.name, 200), role = str(x.role, 200);
      const badge = x.badge === undefined || x.badge === "" ? undefined : str(x.badge, 120);
      const bio = x.bio === undefined || x.bio === "" ? undefined : str(x.bio, 1000);
      const credential = x.credential === undefined || x.credential === "" ? undefined : str(x.credential, 200);
      const img = x.img === undefined || x.img === "" ? undefined : str(x.img, 500);
      const pos = x.pos === undefined || x.pos === "" ? undefined : str(x.pos, 40);
      if (!name || role === null || badge === null || bio === null || credential === null || img === null || pos === null) return null;
      if (pos && !/^\d{1,3}% \d{1,3}%$/.test(pos)) return null;
      return {
        name,
        role,
        ...(badge ? { badge } : {}),
        ...(bio ? { bio } : {}),
        ...(credential ? { credential } : {}),
        ...(img ? { img } : {}),
        ...(pos ? { pos } : {}),
      };
    };
    const yayasan = list(o.yayasan, person, 60), sd = list(o.sd, person, 60), smp = list(o.smp, person, 60);
    if (!yayasan || !sd || !smp) return null;
    const isOldSd = sd.length === 3 && sd.every((p) => !p.img) && sd[0]?.name.startsWith("Ustazah Fatimah");
    const isOldSmp = smp.length === 3 && smp.every((p) => !p.img) && smp[0]?.name === "Denny Rahmat";
    return {
      yayasan,
      sd: isOldSd ? structuredClone(defaultSettings.staff.sd) : sd,
      smp: isOldSmp ? structuredClone(defaultSettings.staff.smp) : smp,
    };
  },
  students(v) {
    if (!v || typeof v !== "object") return null;
    const o = v as Record<string, unknown>;
    const student = (x: Record<string, unknown>): StudentProfile | null => {
      const name = str(x.name, 200);
      const className = str(x.className ?? "", 100);
      const achievement = str(x.achievement, 300);
      const quote = x.quote === undefined || x.quote === "" ? undefined : str(x.quote, 1000);
      const img = x.img === undefined || x.img === "" ? undefined : str(x.img, 500);
      const pos = x.pos === undefined || x.pos === "" ? undefined : str(x.pos, 40);
      if (!name || className === null || !achievement || quote === null || img === null || pos === null) return null;
      if (pos && !/^\d{1,3}% \d{1,3}%$/.test(pos)) return null;
      return {
        name,
        className,
        achievement,
        ...(quote ? { quote } : {}),
        ...(img ? { img } : {}),
        ...(pos ? { pos } : {}),
      };
    };
    const sd = list(o.sd, student, 60), smp = list(o.smp, student, 60);
    return sd && smp ? { sd, smp } : null;
  },
  ppdb(v) {
    if (!v || typeof v !== "object") return null;
    const o = v as Record<string, unknown>;
    const deadline = str(o.deadline ?? "", 10);
    if (deadline === null || !isDate(deadline)) return null;
    const brochurePortal = parseBrochure(o.brochurePortal);
    const brochureSd = parseBrochure(o.brochureSd);
    const brochureSmp = parseBrochure(o.brochureSmp);
    if (brochurePortal === null || brochureSd === null || brochureSmp === null) return null;
    return {
      deadline,
      ...(brochurePortal ? { brochurePortal } : {}),
      ...(brochureSd ? { brochureSd } : {}),
      ...(brochureSmp ? { brochureSmp } : {}),
    };
  },
  fees(v) {
    if (!v || typeof v !== "object") return null;
    const o = v as Record<string, unknown>;
    const sd = list(o.sd, (x) => {
      const item = str(x.item, 200), value = str(x.value, 200);
      return item && value !== null ? { item, value } : null;
    }, 30);
    const smp = list(o.smp, (x) => {
      const wave = str(x.wave, 200), period = str(x.period, 200), fee = str(x.fee, 200);
      return wave && period !== null && fee !== null ? { wave, period, fee } : null;
    }, 30);
    return sd && smp ? { sd, smp } : null;
  },
  faq(v) {
    return list(v, (x) => {
      const q = str(x.q, 500), a = str(x.a, 3000);
      return q && a ? { q, a } : null;
    }, 50);
  },
  news(v) {
    return list(v, (x) => {
      const slug = str(x.slug, 120), title = str(x.title, 300), summary = str(x.summary, 2000), date = str(x.date, 40);
      const body = x.body === undefined || x.body === "" ? undefined : str(x.body, 30000);
      const jenjang = JENJANG.find((j) => j === x.jenjang);
      const image = x.image === undefined || x.image === "" ? undefined : str(x.image, 500);
      const url = x.url === undefined || x.url === "" ? undefined : str(x.url, 500);
      if (!slug || !/^[a-z0-9-]+$/.test(slug) || !title || summary === null || body === null || date === null || !jenjang || image === null || url === null) return null;
      if (url && !/^https:\/\/[^\s]+$/.test(url)) return null;
      return { slug, jenjang, title, summary, ...(body ? { body } : {}), date, ...(image ? { image } : {}), ...(url ? { url } : {}) };
    }, 200);
  },
  popup(v) {
    if (!v || typeof v !== "object") return null;
    const o = v as Record<string, unknown>;
    const title = str(o.title, 200), body = str(o.body, 2000), image = str(o.image, 500);
    const ctaLabel = str(o.ctaLabel, 80), ctaHref = str(o.ctaHref, 500);
    const startDate = str(o.startDate, 10), endDate = str(o.endDate, 10);
    const frequency = FREQ.find((f) => f === o.frequency);
    const sites = Array.isArray(o.sites) ? SITES.filter((s) => (o.sites as unknown[]).includes(s)) : null;
    const delay = typeof o.delay === "number" && o.delay >= 0 && o.delay <= 60 ? o.delay : null;
    if (typeof o.enabled !== "boolean" || title === null || body === null || image === null || ctaLabel === null || ctaHref === null) return null;
    if (ctaHref && !/^(\/|https?:\/\/)/.test(ctaHref)) return null;
    if (!frequency || !sites || delay === null || startDate === null || endDate === null || !isDate(startDate) || !isDate(endDate)) return null;
    return { enabled: o.enabled, title, body, image, ctaLabel, ctaHref, sites, frequency, delay, startDate, endDate };
  },
};

/** Returns the validated value, or null when `value` does not match the shape for `key`. */
export function parseSetting<K extends SettingKey>(key: K, value: unknown): Settings[K] | null {
  return validators[key](value) as Settings[K] | null;
}

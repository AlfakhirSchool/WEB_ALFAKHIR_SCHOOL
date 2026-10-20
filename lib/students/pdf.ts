import "server-only";
import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import sharp from "sharp";
import { db } from "@/lib/db";
import type { StudentDocType } from "./types";

/** The fields a document needs. A superset of nothing: the student's own record, no extra data. */
export type PdfStudent = {
  nis: string; name: string; jenjang: string; className: string; gender: string; birthPlace: string; birthDate: string;
  address: string; religion: string; photo: string; parentName: string; parentPhone: string; parentJob: string;
  previousSchool: string; ppdbYear: string; ppdbWave: string; ppdbStatus: string; ppdbNotes: string; achievement: string;
};

const TEAL = "#0E6A71";
const TEAL_DARK = "#0A4F55";
const TEAL_SOFT = "#EAF4F4";
const ORANGE = "#E86116";
const INK = "#0F172A";
const MUTED = "#64748B";
const LINE = "#D9E3E5";
const ZEBRA = "#F6FAFA";

const W = 595.28;
const H = 841.89;
const M = 42;
const CW = W - M * 2;
const FOOT = 56;
const BOTTOM = H - FOOT;

const root = process.cwd();
const fontCache: Record<string, Buffer> = {};
const assetCache: Record<string, Buffer> = {};

function font(name: string): Buffer {
  return (fontCache[name] ??= readFileSync(path.join(root, "assets", "fonts", `Poppins-${name}.ttf`)));
}

/** School logo as PNG (pdfkit cannot embed WebP). */
async function logo(jenjang: string): Promise<Buffer> {
  const file = jenjang === "SMP" ? "logo-smp.png" : "logo-sd.webp";
  return (assetCache[file] ??= await sharp(readFileSync(path.join(root, "public", file))).resize(240, 240, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer());
}

/** The student's photo as a cropped 3:4 JPEG, from the Media table. Anything unreadable gives null (the document is still produced). */
async function photoOf(url: string): Promise<Buffer | null> {
  const m = /^\/api\/media\/([a-z0-9]+)$/i.exec(url);
  if (!m) return null;
  try {
    const row = await db.media.findUnique({ where: { id: m[1] }, select: { data: true } });
    if (!row) return null;
    return await sharp(Buffer.from(row.data)).rotate().resize(330, 440, { fit: "cover", position: "attention" }).flatten({ background: "#ffffff" }).jpeg({ quality: 86 }).toBuffer();
  } catch {
    return null;
  }
}

const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

/** "2015-08-17" → "17 Agustus 2015". Anything else is returned unchanged. */
export function idDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1] ?? m[2]} ${m[1]}` : iso;
}

/** Print date in Jakarta time, e.g. "20 Oktober 2026". */
function today(): string {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return idDate(p);
}

type Doc = InstanceType<typeof PDFDocument>;
type Ctx = { doc: Doc; logo: Buffer; jenjang: string; clean: (s: string) => string };

const schoolLine = (jenjang: string) => `${jenjang} Islam Modern Al Fakhir`;

function drawHeader(c: Ctx, slim: boolean) {
  const { doc } = c;
  const h = slim ? 56 : 92;
  doc.rect(0, 0, W, h).fill(TEAL);
  doc.rect(0, h, W, 4).fill(ORANGE);
  const r = slim ? 19 : 31;
  doc.circle(M + r, h / 2, r).fill("#ffffff");
  doc.image(c.logo, M + r - (r - 4), h / 2 - (r - 4), { fit: [(r - 4) * 2, (r - 4) * 2], align: "center", valign: "center" });
  const tx = M + r * 2 + 14;
  doc.fillColor("#ffffff").font("B").fontSize(slim ? 13 : 20).text("AL FAKHIR SCHOOL", tx, slim ? 14 : 27, { lineBreak: false });
  doc.fillColor("#CDE6E8").font("R").fontSize(slim ? 8.5 : 10).text(schoolLine(c.jenjang), tx, slim ? 33 : 54, { lineBreak: false });
  doc.y = h + 4 + (slim ? 20 : 22);
  doc.x = M;
}

function newPage(c: Ctx) {
  c.doc.addPage();
  drawHeader(c, true);
}

const need = (c: Ctx, h: number) => {
  if (c.doc.y + h > BOTTOM) newPage(c);
};

/** `keep` = height of the section body, so a heading and its table stay on the same page whenever they fit on one. */
function sectionTitle(c: Ctx, title: string, keep: number) {
  const { doc } = c;
  need(c, 32 + Math.min(keep, BOTTOM - 150));
  const y = doc.y + 6;
  doc.rect(M, y, 4, 15).fill(ORANGE);
  doc.fillColor(TEAL).font("SB").fontSize(10.5).text(title.toUpperCase(), M + 12, y + 2, { lineBreak: false, characterSpacing: 0.6 });
  doc.moveTo(M, y + 21).lineTo(M + CW, y + 21).lineWidth(0.8).strokeColor(TEAL).stroke();
  doc.y = y + 26;
  doc.x = M;
}

const LABEL_W = 150;
const PAD = 5;

const VALUE_W = CW - LABEL_W - 14;

function rowHeight(c: Ctx, label: string, value: string): number {
  c.doc.font("M").fontSize(9.5);
  const lh = c.doc.heightOfString(label, { width: LABEL_W - 10 });
  c.doc.font("R").fontSize(10);
  return Math.max(lh, c.doc.heightOfString(value, { width: VALUE_W })) + PAD * 2;
}

const rowsHeight = (c: Ctx, rows: [string, string][]) => rows.reduce((sum, [l, v]) => sum + rowHeight(c, l, c.clean(v) || "—"), 6);

function table(c: Ctx, rows: [string, string][]) {
  const { doc } = c;
  let i = 0;
  for (const [label, raw] of rows) {
    const value = c.clean(raw) || "—";
    const vw = VALUE_W;
    const h = rowHeight(c, label, value);
    need(c, h);
    const y = doc.y;
    if (i % 2 === 0) doc.rect(M, y, CW, h).fill(ZEBRA);
    doc.moveTo(M, y + h).lineTo(M + CW, y + h).lineWidth(0.5).strokeColor(LINE).stroke();
    doc.fillColor(MUTED).font("M").fontSize(9.5).text(label, M + 8, y + PAD + 0.5, { width: LABEL_W - 10 });
    doc.fillColor(INK).font("R").fontSize(10).text(value, M + LABEL_W + 4, y + PAD, { width: vw });
    doc.y = y + h;
    doc.x = M;
    i++;
  }
  doc.y += 6;
}

function textHeight(c: Ctx, raw: string): number {
  c.doc.font("R").fontSize(10);
  return c.doc.heightOfString(c.clean(raw) || "—", { width: CW - 20, lineGap: 2 }) + 24;
}

function textBlock(c: Ctx, raw: string) {
  const { doc } = c;
  const value = c.clean(raw) || "—";
  doc.font("R").fontSize(10);
  // Input limits keep this well under one page, so the block moves to the next page as a whole.
  const h = textHeight(c, raw) - 6;
  need(c, h);
  const y = doc.y;
  doc.roundedRect(M, y, CW, h, 6).fill(ZEBRA);
  doc.fillColor(INK).text(value, M + 10, y + 9, { width: CW - 20, lineGap: 2 });
  doc.y = y + h + 6;
  doc.x = M;
}

function photoFrame(c: Ctx, photo: Buffer | null, x: number, y: number, w: number, h: number, emptyLabel: string | null) {
  const { doc } = c;
  if (photo) {
    doc.save().roundedRect(x, y, w, h, 6).clip().image(photo, x, y, { width: w, height: h }).restore();
    doc.roundedRect(x, y, w, h, 6).lineWidth(1).strokeColor("#ffffff").stroke();
  } else if (emptyLabel) {
    doc.roundedRect(x, y, w, h, 6).lineWidth(0.8).dash(3, { space: 3 }).strokeColor(MUTED).stroke().undash();
    doc.fillColor(MUTED).font("R").fontSize(8).text(emptyLabel, x, y + h / 2 - 9, { width: w, align: "center", lineBreak: true });
  }
}

function pill(c: Ctx, text: string, x: number, y: number, color: string) {
  const { doc } = c;
  doc.font("SB").fontSize(8.5);
  const w = doc.widthOfString(text) + 20;
  doc.roundedRect(x, y, w, 18, 9).fill(color);
  doc.fillColor("#ffffff").text(text, x + 10, y + 5, { lineBreak: false });
  return w;
}

const STATUS_COLOR: Record<string, string> = { Diterima: "#15803D", Terdaftar: TEAL, Cadangan: "#B45309", Ditolak: "#B91C1C" };

function titleBlock(c: Ctx, title: string, sub: string) {
  const { doc } = c;
  doc.fillColor(TEAL_DARK).font("B").fontSize(19).text(title, M, doc.y, { width: CW });
  doc.fillColor(MUTED).font("R").fontSize(9.5).text(sub, M, doc.y + 1, { width: CW });
  doc.y += 12;
}

/** The summary card at the top of page 1: photo (or initial), name, NIS, class and badges. */
function summaryCard(c: Ctx, s: PdfStudent, photo: Buffer | null, opts: { status?: boolean; frameIfEmpty?: boolean }) {
  const { doc } = c;
  const y = doc.y;
  const h = 120;
  doc.roundedRect(M, y, CW, h, 10).fill(TEAL_SOFT);
  doc.rect(M, y + 10, 4, h - 20).fill(ORANGE);
  const pw = 74;
  const ph = 98;
  const px = M + CW - pw - 14;
  const py = y + 12;
  if (photo || opts.frameIfEmpty) {
    photoFrame(c, photo, px, py, pw, ph, opts.frameIfEmpty ? "Pas foto\n3 × 4" : null);
  } else {
    doc.roundedRect(px, py, pw, ph, 8).fill(TEAL);
    const initial = c.clean(s.name).trim().charAt(0).toUpperCase() || "?";
    doc.fillColor("#ffffff").font("B").fontSize(40).text(initial, px, py + ph / 2 - 32, { width: pw, align: "center", lineBreak: false });
  }
  const tx = M + 20;
  const tw = px - tx - 14;
  doc.fillColor(TEAL_DARK).font("B").fontSize(15);
  const name = c.clean(s.name);
  const nh = doc.heightOfString(name, { width: tw });
  doc.text(name, tx, y + 16, { width: tw });
  let ty = y + 16 + nh + 4;
  doc.fillColor(MUTED).font("M").fontSize(9.5).text(`NIS  ${s.nis}`, tx, ty, { width: tw, lineBreak: false });
  ty += 15;
  doc.text(`Kelas  ${c.clean(s.className)}`, tx, ty, { width: tw, lineBreak: false });
  ty += 20;
  const w1 = pill(c, s.jenjang, tx, ty, s.jenjang === "SMP" ? TEAL : ORANGE);
  if (opts.status) pill(c, c.clean(s.ppdbStatus), tx + w1 + 6, ty, STATUS_COLOR[s.ppdbStatus] ?? TEAL);
  doc.y = y + h + 8;
  doc.x = M;
}

function signatures(c: Ctx, s: PdfStudent) {
  const { doc } = c;
  need(c, 130);
  const y = doc.y + 10;
  const colW = (CW - 40) / 2;
  doc.fillColor(MUTED).font("R").fontSize(9).text(`Tanggal cetak: ${today()}`, M, y, { width: CW, align: "right" });
  const top = y + 22;
  doc.fillColor(INK).font("M").fontSize(9.5);
  doc.text("Orang Tua / Wali Calon Siswa", M, top, { width: colW, align: "center" });
  doc.text("Panitia PPDB Al Fakhir School", M + colW + 40, top, { width: colW, align: "center" });
  const ly = top + 62;
  doc.lineWidth(0.8).strokeColor(INK).moveTo(M + 10, ly).lineTo(M + colW - 10, ly).stroke();
  doc.moveTo(M + colW + 50, ly).lineTo(M + CW - 10, ly).stroke();
  doc.fillColor(INK).font("R").fontSize(9.5).text(c.clean(s.parentName), M + 10, ly + 4, { width: colW - 20, align: "center" });
  doc.y = ly + 24;
}

function drawFooters(c: Ctx, kind: string) {
  const { doc } = c;
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    // Footer text sits inside the bottom margin; zero it so pdfkit does not open a new page.
    const saved = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;
    doc.moveTo(M, H - 50).lineTo(M + CW, H - 50).lineWidth(0.6).strokeColor(LINE).stroke();
    doc.fillColor(ORANGE).font("SB").fontSize(8).text("Dokumen rahasia — dikunci dengan NIS", M, H - 43, { lineBreak: false });
    doc.fillColor(MUTED).font("R").fontSize(8).text(`${kind} · Dibuat otomatis pada ${today()}`, M, H - 31, { lineBreak: false });
    doc.text(`Halaman ${i - range.start + 1} dari ${range.count}`, M, H - 31, { width: CW, align: "right", lineBreak: false });
    doc.page.margins.bottom = saved;
  }
}

/**
 * Builds the encrypted PDF (AES-256, open-password = the student's NIS). A4, branded.
 * The owner password is random and discarded, so permissions cannot be lifted by anyone.
 */
export async function buildStudentPdf(type: StudentDocType, s: PdfStudent): Promise<Buffer> {
  const [logoPng, photo] = await Promise.all([logo(s.jenjang), photoOf(s.photo)]);
  const kind = type === "profil" ? "Profil Siswa" : "Formulir Pendaftaran PPDB";
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: M, bottom: FOOT, left: M, right: M },
    bufferPages: true,
    pdfVersion: "1.7ext3",
    userPassword: s.nis,
    ownerPassword: randomBytes(24).toString("hex"),
    permissions: { printing: "highResolution", copying: true, contentAccessibility: true, modifying: false, annotating: false, fillingForms: false, documentAssembly: false },
    info: { Title: `${kind} - ${s.name}`, Author: "Al Fakhir School", Subject: kind, Creator: "Al Fakhir School" },
  });
  const chunks: Buffer[] = [];
  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on("data", (b: Buffer) => chunks.push(b));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  doc.registerFont("R", font("Regular"));
  doc.registerFont("M", font("Medium"));
  doc.registerFont("SB", font("SemiBold"));
  doc.registerFont("B", font("Bold"));
  doc.font("R");
  // Characters the font has no glyph for (e.g. emoji, Arabic script) would print as empty boxes: show "?" instead.
  // pdfkit does not type its internal fontkit instance; it is only read for glyph coverage.
  const fk = (doc as unknown as { _font?: { font?: { hasGlyphForCodePoint?: (cp: number) => boolean } } })._font?.font;
  const clean = (str: string) => {
    if (!fk?.hasGlyphForCodePoint) return str;
    let out = "";
    for (const ch of str.normalize("NFC")) {
      const cp = ch.codePointAt(0)!;
      out += cp === 10 || cp === 32 || fk.hasGlyphForCodePoint(cp) ? ch : "?";
    }
    return out.replace(/\?{2,}/g, "?");
  };

  const c: Ctx = { doc, logo: logoPng, jenjang: s.jenjang, clean };
  drawHeader(c, false);
  const birth = `${clean(s.birthPlace)}, ${idDate(s.birthDate)}`;
  const identity: [string, string][] = [
    ["Nama Lengkap", s.name], ["Nomor Induk Siswa (NIS)", s.nis], ["Jenjang", s.jenjang], ["Kelas", s.className],
    ["Jenis Kelamin", s.gender], ["Tempat, Tanggal Lahir", birth], ["Agama", s.religion], ["Alamat", s.address],
  ];
  const parents: [string, string][] = [["Nama Orang Tua / Wali", s.parentName], ["No. HP / WhatsApp", s.parentPhone], ["Pekerjaan", s.parentJob]];

  const rowsSection = (title: string, rows: [string, string][]) => {
    sectionTitle(c, title, rowsHeight(c, rows));
    table(c, rows);
  };
  const textSection = (title: string, text: string) => {
    sectionTitle(c, title, textHeight(c, text));
    textBlock(c, text);
  };

  if (type === "profil") {
    titleBlock(c, "PROFIL SISWA", `${schoolLine(s.jenjang)} · Data peserta didik`);
    summaryCard(c, s, photo, {});
    rowsSection("Identitas Siswa", [...identity, ["Asal Sekolah", s.previousSchool]]);
    rowsSection("Data Orang Tua / Wali", parents);
    textSection("Prestasi & Catatan", s.achievement);
  } else {
    titleBlock(c, "FORMULIR PENDAFTARAN PPDB", `Penerimaan Peserta Didik Baru · Tahun Ajaran ${s.ppdbYear}`);
    summaryCard(c, s, photo, { status: true, frameIfEmpty: true });
    rowsSection("Informasi Pendaftaran", [
      ["Tahun Ajaran", s.ppdbYear], ["Gelombang Pendaftaran", s.ppdbWave], ["Jenjang Tujuan", `${s.jenjang} — Kelas ${s.className}`],
      ["Status Pendaftaran", s.ppdbStatus], ["Nomor Induk Siswa (NIS)", s.nis],
    ]);
    rowsSection("Data Calon Siswa", [
      ["Nama Lengkap", s.name], ["Jenis Kelamin", s.gender], ["Tempat, Tanggal Lahir", birth], ["Agama", s.religion], ["Alamat", s.address],
    ]);
    rowsSection("Data Orang Tua / Wali", parents);
    rowsSection("Asal Sekolah", [["Sekolah Sebelumnya", s.previousSchool]]);
    textSection("Catatan PPDB", s.ppdbNotes);
    signatures(c, s);
  }

  drawFooters(c, kind);
  doc.end();
  return done;
}

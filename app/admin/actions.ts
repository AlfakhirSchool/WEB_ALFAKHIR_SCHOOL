"use server";
import { pruneMedia } from "@/lib/content/media";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { checkCredentials, endSession, hashPassword, requireAdmin, startSession, Unauthorized } from "@/lib/auth/server";
import type { Session } from "@/lib/auth/session";
import { contentChanged } from "@/lib/content/store";
import { SETTING_KEYS, defaultSettings, parseSetting, type SettingKey } from "@/content/settings";
import { clearFailures, recordFailure, retryAfter } from "./_lib/throttle";
import { safeNext } from "./_lib/guard";

export type ActionResult = { ok: true; message: string } | { ok: false; error: string };
export type LoginState = { error?: string; username?: string };

const SESSION_EXPIRED = "Sesi login habis. Muat ulang halaman dan login kembali.";

/** Runs `fn` for a logged-in admin; an expired session becomes a friendly error instead of a crash. */
async function asAdmin(fn: (admin: Session) => Promise<ActionResult>): Promise<ActionResult> {
  let admin: Session;
  try {
    admin = await requireAdmin();
  } catch (e) {
    if (e instanceof Unauthorized) return { ok: false, error: SESSION_EXPIRED };
    throw e;
  }
  return fn(admin);
}

/* ---------------- login / logout ---------------- */

async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  const username = String(form.get("username") ?? "").trim().slice(0, 64);
  const password = String(form.get("password") ?? "").slice(0, 200);
  const next = safeNext(form.get("next"));
  if (!username || !password) return { error: "Isi username dan password.", username };

  const ip = await clientIp();
  const userKey = `user:${ip}|${username.toLowerCase()}`;
  const keys: Parameters<typeof retryAfter>[0] = [["user", userKey], ["ip", `ip:${ip}`]];
  const wait = retryAfter(keys);
  if (wait > 0) return { error: `Terlalu banyak percobaan gagal. Coba lagi dalam ${Math.ceil(wait / 60_000)} menit.`, username };

  const session = await checkCredentials(username, password);
  if (!session) {
    recordFailure(keys);
    return { error: "Username atau password salah.", username };
  }
  clearFailures(userKey);
  await startSession(session);
  redirect(next);
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

/* ---------------- settings ---------------- */

const INVALID: Record<SettingKey, string> = {
  contact: "Kontak belum valid: nomor WhatsApp harus 8–15 digit angka diawali kode negara (mis. 62812…), email harus berformat benar, alamat dan teks peta wajib diisi, dan tautan Instagram/Facebook/YouTube harus diawali https:// (boleh dikosongkan).",
  images: "Daftar foto tidak valid.",
  staff: "Setiap orang wajib memiliki nama dan jabatan (maks. 60 orang per kelompok); posisi foto berformat \"50% 25%\".",
  students: "Setiap profil siswa wajib memiliki nama dan prestasi/predikat (maks. 60 siswa per jenjang); posisi foto berformat \"50% 25%\".",
  ppdb: "Data PPDB atau brosur tidak valid.",
  fees: "Setiap baris biaya wajib memiliki nama item / gelombang (maks. 30 baris per jenjang).",
  faq: "Setiap FAQ wajib memiliki pertanyaan dan jawaban (maks. 50 item).",
  news: "Setiap berita wajib memiliki judul, jenjang, dan slug (huruf kecil, angka, tanda minus).",
  popup: "Data popup tidak valid. Tautan tombol harus diawali / atau https://, jeda 0–60 detik.",
};

export async function saveSetting(key: string, value: unknown): Promise<ActionResult> {
  return asAdmin(async () => {
    const k = SETTING_KEYS.find((s) => s === key);
    if (!k) return { ok: false, error: "Pengaturan tidak dikenal." };
    const parsed = parseSetting(k, value);
    if (!parsed) return { ok: false, error: INVALID[k] };
    if (k === "news") {
      const slugs = (parsed as { slug: string }[]).map((n) => n.slug);
      const dup = slugs.find((s, i) => slugs.indexOf(s) !== i);
      if (dup) return { ok: false, error: `Slug "${dup}" dipakai lebih dari satu berita. Setiap berita harus memiliki slug unik.` };
    }
    if (k === "popup") {
      const p = parsed as typeof defaultSettings.popup;
      if (p.startDate && p.endDate && p.endDate < p.startDate) return { ok: false, error: "Tanggal selesai tidak boleh sebelum tanggal mulai." };
      if (p.enabled && !p.sites.length) return { ok: false, error: "Pilih minimal satu website untuk menampilkan popup." };
      if (p.enabled && !p.title && !p.body && !p.image) return { ok: false, error: "Popup aktif harus memiliki judul, isi, atau gambar." };
      if (p.ctaLabel && !p.ctaHref) return { ok: false, error: "Isi tautan tombol, atau kosongkan label tombol." };
    }
    await db.setting.upsert({ where: { key: k }, create: { key: k, value: parsed }, update: { value: parsed } });
    await contentChanged();
    await pruneMedia();
    return { ok: true, message: "Perubahan disimpan dan sudah tampil di website." };
  });
}

export async function resetSetting(key: string): Promise<ActionResult> {
  return asAdmin(async () => {
    const k = SETTING_KEYS.find((s) => s === key);
    if (!k) return { ok: false, error: "Pengaturan tidak dikenal." };
    await db.setting.deleteMany({ where: { key: k } });
    await contentChanged();
    await pruneMedia();
    return { ok: true, message: "Dikembalikan ke nilai bawaan." };
  });
}

/* ---------------- page texts ---------------- */

export async function saveText(id: string, value: string): Promise<ActionResult> {
  return asAdmin(async () => {
    if (typeof id !== "string" || typeof value !== "string" || value.length > 5000) return { ok: false, error: "Teks terlalu panjang (maks. 5000 karakter)." };
    const row = await db.textOverride.findUnique({ where: { id } });
    if (!row) return { ok: false, error: "Teks tidak ditemukan (mungkin sudah dihapus)." };
    const v = value.trim();
    if (!v || v === row.source) {
      await db.textOverride.delete({ where: { id } });
      await contentChanged();
      return { ok: true, message: "Sama dengan teks asli — perubahan dihapus." };
    }
    await db.textOverride.update({ where: { id }, data: { value: v } });
    await contentChanged();
    return { ok: true, message: "Teks disimpan." };
  });
}

export async function resetText(id: string): Promise<ActionResult> {
  return asAdmin(async () => {
    await db.textOverride.deleteMany({ where: { id: String(id) } });
    await contentChanged();
    return { ok: true, message: "Teks dikembalikan ke aslinya." };
  });
}

/* ---------------- accounts ---------------- */

const USERNAME_RE = /^[a-zA-Z0-9._-]{3,32}$/;

export async function changePassword(_prev: ActionResult | null, form: FormData): Promise<ActionResult> {
  return asAdmin(async (admin) => {
    const current = String(form.get("current") ?? "");
    const next = String(form.get("next") ?? "");
    const confirm = String(form.get("confirm") ?? "");
    if (next.length < 8) return { ok: false, error: "Password baru minimal 8 karakter." };
    if (next.length > 200) return { ok: false, error: "Password baru terlalu panjang." };
    if (next !== confirm) return { ok: false, error: "Konfirmasi password tidak sama." };
    const row = await db.admin.findUnique({ where: { id: admin.sub } });
    if (!row || !(await bcrypt.compare(current, row.passwordHash))) return { ok: false, error: "Password saat ini salah." };
    await db.admin.update({ where: { id: row.id }, data: { passwordHash: await hashPassword(next) } });
    return { ok: true, message: "Password berhasil diganti." };
  });
}

export async function addAdmin(_prev: ActionResult | null, form: FormData): Promise<ActionResult> {
  return asAdmin(async () => {
    const username = String(form.get("username") ?? "").trim();
    const password = String(form.get("password") ?? "");
    if (!USERNAME_RE.test(username)) return { ok: false, error: "Username 3–32 karakter: huruf, angka, titik, minus, atau garis bawah." };
    if (password.length < 8 || password.length > 200) return { ok: false, error: "Password minimal 8 karakter." };
    if (await db.admin.findUnique({ where: { username } })) return { ok: false, error: `Username "${username}" sudah dipakai.` };
    await db.admin.create({ data: { username, passwordHash: await hashPassword(password) } });
    return { ok: true, message: `Admin "${username}" ditambahkan.` };
  });
}

export async function deleteAdmin(id: string): Promise<ActionResult> {
  return asAdmin(async (admin) => {
    if (id === admin.sub) return { ok: false, error: "Anda tidak dapat menghapus akun sendiri." };
    if ((await db.admin.count()) <= 1) return { ok: false, error: "Minimal harus ada satu admin." };
    const { count } = await db.admin.deleteMany({ where: { id: String(id) } });
    return count ? { ok: true, message: "Admin dihapus." } : { ok: false, error: "Admin tidak ditemukan." };
  });
}

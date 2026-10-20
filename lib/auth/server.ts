import "server-only";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { SESSION_MAX_AGE, signSession, verifySession, type Session } from "./session";
import { ADMIN_HINT_COOKIE, SESSION_COOKIE } from "./session-cookies";

export class Unauthorized extends Error {
  constructor() { super("Unauthorized"); }
}

export const hashPassword = (password: string) => bcrypt.hash(password, 12);

/**
 * Checks credentials. When no admin exists yet and ADMIN_USERNAME/ADMIN_PASSWORD are set,
 * the first matching login creates that account (bootstrap for a fresh database).
 */
export async function checkCredentials(username: string, password: string): Promise<Session | null> {
  const admin = await db.admin.findUnique({ where: { username } });
  if (admin) return (await bcrypt.compare(password, admin.passwordHash)) ? { sub: admin.id, username: admin.username } : null;

  const bootUser = process.env.ADMIN_USERNAME;
  const bootPass = process.env.ADMIN_PASSWORD;
  if (!bootUser || !bootPass || username !== bootUser || password !== bootPass) return null;
  if ((await db.admin.count()) > 0) return null;
  const created = await db.admin.create({ data: { username, passwordHash: await hashPassword(password) } });
  return { sub: created.id, username: created.username };
}

export async function startSession(session: Session) {
  const jar = await cookies();
  const secure = process.env.NODE_ENV === "production";
  jar.set(SESSION_COOKIE, await signSession(session), { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: SESSION_MAX_AGE });
  jar.set(ADMIN_HINT_COOKIE, "1", { httpOnly: false, secure, sameSite: "lax", path: "/", maxAge: SESSION_MAX_AGE });
}

export async function endSession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  jar.delete(ADMIN_HINT_COOKIE);
}

/** Current admin, or null. Also rejects tokens of deleted accounts. */
export async function currentAdmin(): Promise<Session | null> {
  const session = await verifySession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return null;
  const exists = await db.admin.findUnique({ where: { id: session.sub }, select: { id: true } });
  return exists ? session : null;
}

/** Use at the top of every server action / admin API handler. Throws `Unauthorized` when not logged in. */
export async function requireAdmin(): Promise<Session> {
  const session = await currentAdmin();
  if (!session) throw new Unauthorized();
  return session;
}

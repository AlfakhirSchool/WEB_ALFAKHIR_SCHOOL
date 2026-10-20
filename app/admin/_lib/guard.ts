import "server-only";
import { redirect } from "next/navigation";
import { requireAdmin, Unauthorized } from "@/lib/auth/server";
import type { Session } from "@/lib/auth/session";

/** For admin pages/layouts: the logged-in admin, or a redirect to the login page. */
export async function adminPage(): Promise<Session> {
  try {
    return await requireAdmin();
  } catch (e) {
    if (e instanceof Unauthorized) redirect("/admin/login");
    throw e;
  }
}

/** Only same-origin dashboard paths are accepted as a post-login destination. */
export function safeNext(next: unknown): string {
  if (typeof next !== "string" || !next.startsWith("/admin") || next.startsWith("//") || next.includes("\\")) return "/admin";
  try {
    const url = new URL(next, "http://local");
    if (url.origin !== "http://local" || !(url.pathname === "/admin" || url.pathname.startsWith("/admin/"))) return "/admin";
    if (url.pathname === "/admin/login") return "/admin";
    return url.pathname + url.search;
  } catch {
    return "/admin";
  }
}

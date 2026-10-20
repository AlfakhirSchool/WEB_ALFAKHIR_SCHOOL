import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/auth/server";
import { LoginForm } from "@/components/admin/LoginForm";
import { Icon } from "@/components/admin/ui";
import { safeNext } from "../_lib/guard";

export const metadata: Metadata = { title: "Masuk" };
export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string | string[] }> }) {
  const raw = (await searchParams).next;
  const next = safeNext(Array.isArray(raw) ? raw[0] : raw);
  if (await currentAdmin()) redirect(next);
  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#022E31] px-4 py-10 font-[family-name:var(--f-poppins)]">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#0E6A71]/60 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-24 h-[30rem] w-[30rem] rounded-full bg-[#E86116]/25 blur-3xl" />
      <div className="relative w-full max-w-[420px]">
        <div className="rounded-[28px] bg-white p-6 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:p-9">
          <div className="flex items-center justify-center gap-2">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
              <Image src="/logo-sd.webp" alt="Logo SD Al Fakhir" width={44} height={44} className="h-10 w-10 object-contain" priority />
            </span>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
              <Image src="/logo-smp.png" alt="Logo SMP Al Fakhir" width={44} height={44} className="h-10 w-10 object-contain" priority />
            </span>
          </div>
          <p className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E86116]">Al Fakhir School</p>
          <h1 className="mt-1 text-center text-2xl font-bold tracking-tight text-[#022E31]">Dashboard Admin</h1>
          <p className="mt-1.5 text-center text-sm leading-relaxed text-slate-500">Masuk untuk mengubah teks, foto, berita, dan data website sekolah.</p>
          <LoginForm next={next} />
        </div>
        <p className="mt-6 text-center">
          <a href="/" className="inline-flex min-h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-white/75 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9AE2E]">
            <Icon name="arrow_back" className="text-[18px]" /> Kembali ke website
          </a>
        </p>
      </div>
    </main>
  );
}

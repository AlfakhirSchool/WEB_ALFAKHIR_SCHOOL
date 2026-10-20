"use client";
import { Scope, T } from "@/components/content/T";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Scope id="shell/common">
      <div data-site="portal" className="flex min-h-screen items-center justify-center bg-surface px-margin-mobile text-center font-body-md text-on-surface">
        <div className="max-w-md">
          <span className="material-symbols-outlined text-[48px] text-secondary-container">error</span>
          <h1 className="mt-space-sm font-headline-md text-headline-md font-bold text-primary"><T>Terjadi kendala</T></h1>
          <p className="mt-space-sm text-on-surface-variant"><T>Halaman ini gagal dimuat. Coba muat ulang, atau kembali ke beranda.</T></p>
          <div className="mt-space-md flex flex-wrap justify-center gap-space-sm">
            <button type="button" onClick={reset} className="min-h-11 rounded-full bg-primary px-space-lg py-space-xs font-label-lg text-label-lg text-on-primary hover:bg-primary-container"><T>Coba lagi</T></button>
            <a href="/" className="inline-flex min-h-11 items-center rounded-full border border-primary-container/30 px-space-lg py-space-xs font-label-lg text-label-lg text-primary no-underline hover:bg-surface-container"><T>Ke beranda</T></a>
          </div>
        </div>
      </div>
    </Scope>
  );
}

"use client";
import { useActionState, useState } from "react";
import { login, type LoginState } from "@/app/admin/actions";
import { Icon, btnPrimary, inputCls } from "./ui";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  const [show, setShow] = useState(false);
  return (
    <form action={action} className="mt-7 space-y-4" noValidate>
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-slate-700">Username</label>
        <div className="relative">
          <Icon name="person" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400" />
          <input id="username" name="username" autoComplete="username" autoCapitalize="none" spellCheck={false} required defaultValue={state.username}
            className={`${inputCls} h-12 pl-10`} />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
        <div className="relative">
          <Icon name="lock" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400" />
          <input id="password" name="password" type={show ? "text" : "password"} autoComplete="current-password" required
            className={`${inputCls} h-12 pl-10 pr-12`} />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-0.5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0E6A71]/25"
            aria-label={show ? "Sembunyikan password" : "Tampilkan password"} aria-pressed={show}>
            <Icon name={show ? "visibility_off" : "visibility"} className="text-[20px]" />
          </button>
        </div>
      </div>
      {state.error && (
        <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          <Icon name="error" className="mt-px text-[18px]" /> {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={`${btnPrimary} h-12 w-full text-[15px]`}>
        {pending ? <Icon name="progress_activity" className="animate-spin text-[20px]" /> : <Icon name="login" className="text-[20px]" />}
        {pending ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}

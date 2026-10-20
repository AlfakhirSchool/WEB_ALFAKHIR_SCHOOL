"use client";
import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addAdmin, changePassword, deleteAdmin, type ActionResult } from "@/app/admin/actions";
import { Card, Field, Icon, StatusMessage, btnDanger, btnPrimary, inputCls, type Status } from "./ui";

type AdminRow = { id: string; username: string; createdAt: string };

const toStatus = (r: ActionResult | null): Status => (r ? (r.ok ? { kind: "ok", text: r.message } : { kind: "error", text: r.error }) : null);

export function AccountForms({ me, admins }: { me: string; admins: AdminRow[] }) {
  const router = useRouter();
  const [pwState, pwAction, pwPending] = useActionState(changePassword, null);
  const [addState, addAction, addPending] = useActionState(addAdmin, null);
  const [delStatus, setDelStatus] = useState<Status>(null);
  const [deleting, startDelete] = useTransition();
  const pwForm = useRef<HTMLFormElement>(null);
  const addForm = useRef<HTMLFormElement>(null);

  useEffect(() => { if (pwState?.ok) pwForm.current?.reset(); }, [pwState]);
  useEffect(() => { if (addState?.ok) { addForm.current?.reset(); router.refresh(); } }, [addState, router]);

  const remove = (a: AdminRow) => {
    if (!confirm(`Hapus admin "${a.username}"? Akun ini tidak bisa login lagi.`)) return;
    startDelete(async () => {
      const res = await deleteAdmin(a.id);
      setDelStatus(toStatus(res));
      if (res.ok) router.refresh();
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="Ganti password" description="Minimal 8 karakter. Gunakan kombinasi yang sulit ditebak.">
        <form ref={pwForm} action={pwAction} className="space-y-4">
          <input type="text" name="username" autoComplete="username" value={admins.find((a) => a.id === me)?.username ?? ""} readOnly hidden />
          <Field label="Password saat ini" htmlFor="pw-current">
            <input id="pw-current" name="current" type="password" autoComplete="current-password" required className={inputCls} />
          </Field>
          <Field label="Password baru" htmlFor="pw-next">
            <input id="pw-next" name="next" type="password" autoComplete="new-password" minLength={8} required className={inputCls} />
          </Field>
          <Field label="Ulangi password baru" htmlFor="pw-confirm">
            <input id="pw-confirm" name="confirm" type="password" autoComplete="new-password" minLength={8} required className={inputCls} />
          </Field>
          <StatusMessage status={toStatus(pwState)} />
          <button type="submit" disabled={pwPending} className={`${btnPrimary} w-full sm:w-auto`}>
            <Icon name="key" className="text-[20px]" /> {pwPending ? "Menyimpan…" : "Ganti password"}
          </button>
        </form>
      </Card>

      <div className="space-y-6">
        <Card title="Daftar admin" description="Semua akun di bawah ini dapat mengubah isi website.">
          <ul className="divide-y divide-slate-100">
            {admins.map((a) => (
              <li key={a.id} className="flex items-center gap-3 py-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0E6A71]/10 text-sm font-bold uppercase text-[#0E6A71]">{a.username.slice(0, 1)}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {a.username}
                    {a.id === me && <span className="ml-2 rounded-full bg-[#E86116]/10 px-2 py-0.5 text-[11px] font-semibold text-[#E86116]">Anda</span>}
                  </p>
                  <p className="text-xs text-slate-500">Dibuat {new Date(a.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
                {a.id !== me && (
                  <button type="button" disabled={deleting || admins.length <= 1} onClick={() => remove(a)} className={`${btnDanger} px-3`} aria-label={`Hapus admin ${a.username}`}>
                    <Icon name="person_remove" className="text-[20px]" /><span className="hidden sm:inline">Hapus</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
          {delStatus && <div className="mt-3"><StatusMessage status={delStatus} /></div>}
        </Card>

        <Card title="Tambah admin">
          <form ref={addForm} action={addAction} className="space-y-4">
            <Field label="Username" htmlFor="new-username" hint="3–32 karakter: huruf, angka, titik, minus, garis bawah.">
              <input id="new-username" name="username" autoComplete="off" autoCapitalize="none" spellCheck={false} required pattern="[a-zA-Z0-9._\-]{3,32}" className={inputCls} />
            </Field>
            <Field label="Password" htmlFor="new-password" hint="Minimal 8 karakter. Berikan kepada admin baru secara langsung.">
              <input id="new-password" name="password" type="password" autoComplete="new-password" minLength={8} required className={inputCls} />
            </Field>
            <StatusMessage status={toStatus(addState)} />
            <button type="submit" disabled={addPending} className={`${btnPrimary} w-full sm:w-auto`}>
              <Icon name="person_add" className="text-[20px]" /> {addPending ? "Menyimpan…" : "Tambah admin"}
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}

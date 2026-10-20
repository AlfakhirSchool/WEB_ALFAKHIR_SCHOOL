"use client";
import { useRef, useState } from "react";
import { STAFF_GROUPS, type Person, type Staff, type StaffGroup } from "@/content/settings";
import type { LoadedSetting } from "./types";
import { ImageField } from "./ImageField";
import { ListEditor, SaveBar, useSetting } from "./SettingForm";
import { Card, Field, inputCls } from "./ui";

const GROUPS: Record<StaffGroup, { label: string; description: string; page: string; addLabel: string }> = {
  yayasan: { label: "Al Fakhir School", description: "Pengurus Al Fakhir School, tampil di halaman Tentang Kami.", page: "/yayasan", addLabel: "Tambah pengurus" },
  sd: { label: "Guru SD", description: "Kepala sekolah, guru, dan tenaga pendidik SD, tampil di Profil SD.", page: "/sd/profil", addLabel: "Tambah guru SD" },
  smp: { label: "Guru SMP", description: "Kepala sekolah, guru, dan tenaga pendidik SMP, tampil di Profil SMP.", page: "/smp/profil", addLabel: "Tambah guru SMP" },
};

function validate(staff: Staff): string | null {
  for (const g of STAFF_GROUPS) {
    for (const [i, p] of staff[g].entries()) {
      if (!p.name.trim()) return `${GROUPS[g].label} #${i + 1}: nama wajib diisi.`;
      if (!p.role.trim()) return `${GROUPS[g].label} #${i + 1}: jabatan wajib diisi.`;
    }
  }
  return null;
}

const clamp = (n: number) => Math.min(100, Math.max(0, Math.round(n)));
function parsePos(pos: string | undefined): [number, number] {
  const m = pos?.match(/^(\d{1,3})% (\d{1,3})%$/);
  return m ? [clamp(+m[1]), clamp(+m[2])] : [50, 50];
}

/** Click/drag on the full photo to choose the crop focus, with live previews of how the cards crop it. */
function FocusEditor({ id, name, url, pos, onPos }: { id: string; name: string; url: string; pos: string | undefined; onPos: (pos: string) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const [x, y] = parsePos(pos);
  const set = (nx: number, ny: number) => onPos(`${clamp(nx)}% ${clamp(ny)}%`);
  const fromPointer = (e: React.PointerEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (r && r.width > 0 && r.height > 0) set(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
  };
  const cropStyle = { objectPosition: `${x}% ${y}%` };

  return (
    <div className="space-y-3">
      <div>
        <p className="mb-1.5 text-xs font-medium text-slate-600">Klik atau geser pada foto untuk memilih bagian yang dipertahankan saat dipotong</p>
        <div ref={box} className="relative w-full max-w-xs cursor-crosshair touch-none select-none overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
          onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); fromPointer(e); }}
          onPointerMove={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) fromPointer(e); }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={`Foto ${name || "baru"}`} draggable={false} className="block h-auto max-h-80 w-full object-contain" />
          <span aria-hidden="true" className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#E86116]/80 shadow-[0_0_0_2px_rgba(0,0,0,.35)]" style={{ left: `${x}%`, top: `${y}%` }} />
        </div>
      </div>
      <div className="grid max-w-xs grid-cols-2 gap-3">
        <Field label={`Horizontal ${x}%`} htmlFor={`${id}-x`}>
          <input id={`${id}-x`} type="range" min={0} max={100} value={x} onChange={(e) => set(+e.target.value, y)} className="w-full accent-[#0E6A71]" />
        </Field>
        <Field label={`Vertikal ${y}%`} htmlFor={`${id}-y`}>
          <input id={`${id}-y`} type="range" min={0} max={100} value={y} onChange={(e) => set(x, +e.target.value)} className="w-full accent-[#0E6A71]" />
        </Field>
      </div>
      <div>
        <p className="mb-1.5 text-xs font-medium text-slate-600">Pratinjau tampilan di situs</p>
        <div className="flex items-end gap-3">
          <div className="aspect-[4/5] w-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-full w-full object-cover" style={cropStyle} />
          </div>
          <div className="aspect-square w-14 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-full w-full object-cover" style={cropStyle} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function StaffForm({ value: initial, custom, updatedAt }: LoadedSetting<"staff">) {
  const form = useSetting("staff", initial);
  const [group, setGroup] = useState<StaffGroup>("yayasan");
  const error = validate(form.value);
  const g = GROUPS[group];

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.save(error); }}>
      <div role="tablist" aria-label="Kelompok" className="mb-4 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        {STAFF_GROUPS.map((k) => {
          const active = k === group;
          return (
            <button key={k} type="button" role="tab" id={`tab-${k}`} aria-selected={active} aria-controls="staff-panel" onClick={() => setGroup(k)}
              className={`min-h-11 flex-1 whitespace-nowrap rounded-lg px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0E6A71]/30 ${active ? "bg-[#0E6A71] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}>
              {GROUPS[k].label} <span className={`ml-1 rounded-full px-1.5 py-0.5 text-xs ${active ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>{form.value[k].length}</span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id="staff-panel" aria-labelledby={`tab-${group}`}>
        <Card title={g.label} description={<>{g.description} Urutan teratas tampil paling awal. Daftar kosong menyembunyikan bagian ini dari halaman <code className="font-mono text-[13px]">{g.page}</code>.</>}>
          <ListEditor<Person>
            items={form.value[group]}
            onChange={(items) => form.update({ ...form.value, [group]: items })}
            create={() => ({ name: "", role: "" })}
            addLabel={g.addLabel}
            max={60}
            titleOf={(p) => p.name || "Orang baru"}
            empty="Belum ada data. Bagian ini tidak tampil di situs."
            render={(p, set, i) => {
              const id = `staff-${group}-${i}`;
              return (
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
                  <div className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Nama" htmlFor={`${id}-name`}>
                        <input id={`${id}-name`} value={p.name} maxLength={200} placeholder="mis. Ustaz Ahmad Rifai, S.Pd" onChange={(e) => set({ ...p, name: e.target.value })} className={inputCls} />
                      </Field>
                      <Field label="Label singkat (opsional)" htmlFor={`${id}-badge`} hint="Mis. Kepala Sekolah, Wakasek Kurikulum">
                        <input id={`${id}-badge`} value={p.badge ?? ""} maxLength={120} placeholder="mis. Kepala Sekolah" onChange={(e) => {
                          const v = e.target.value;
                          const { badge: _b, ...rest } = p;
                          set(v ? { ...rest, badge: v } : rest);
                        }} className={inputCls} />
                      </Field>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Jabatan / Bidang" htmlFor={`${id}-role`}>
                        <input id={`${id}-role`} value={p.role} maxLength={200} placeholder="mis. Guru Kelas & Koord. Kurikulum" onChange={(e) => set({ ...p, role: e.target.value })} className={inputCls} />
                      </Field>
                      <Field label="Kualifikasi / Sertifikasi (opsional)" htmlFor={`${id}-credential`} hint="Mis. Al-Azhar Cairo · UIN Jakarta">
                        <input id={`${id}-credential`} value={p.credential ?? ""} maxLength={200} placeholder="mis. Hafizhah 30 Juz Bersanad" onChange={(e) => {
                          const v = e.target.value;
                          const { credential: _c, ...rest } = p;
                          set(v ? { ...rest, credential: v } : rest);
                        }} className={inputCls} />
                      </Field>
                    </div>
                    <Field label="Profil singkat (opsional)" htmlFor={`${id}-bio`}>
                      <textarea id={`${id}-bio`} rows={2} value={p.bio ?? ""} maxLength={1000} placeholder="Ringkasan pengalaman mengajar, riset, atau latar belakang pendidikan…" onChange={(e) => {
                        const v = e.target.value;
                        const { bio: _b, ...rest } = p;
                        set(v ? { ...rest, bio: v } : rest);
                      }} className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Foto (opsional)" htmlFor={`${id}-img`} hint="PNG, JPG, atau WebP, maks. 2 MB. Tanpa foto, kartu menampilkan ornamen bintang.">
                    <ImageField id={`${id}-img`} value={p.img ?? ""} aspect="aspect-[4/5]"
                      onChange={(url) => {
                        const { img: _i, pos: _p, ...rest } = p;
                        set(url ? { ...rest, img: url } : rest);
                      }}
                      preview={(url) => <FocusEditor id={id} name={p.name} url={url} pos={p.pos} onPos={(pos) => set({ ...p, pos })} />} />
                  </Field>
                </div>
              );
            }}
          />
        </Card>
      </div>
      <SaveBar form={form} custom={custom} updatedAt={updatedAt} onSave={() => form.save(error)} />
    </form>
  );
}

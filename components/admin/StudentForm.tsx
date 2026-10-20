"use client";
import { useRef, useState } from "react";
import { STUDENT_GROUPS, type StudentGroup, type StudentProfile, type Students } from "@/content/settings";
import type { LoadedSetting } from "./types";
import { ImageField } from "./ImageField";
import { ListEditor, SaveBar, useSetting } from "./SettingForm";
import { Card, Field, inputCls } from "./ui";

const GROUPS: Record<StudentGroup, { label: string; description: string; pages: string; addLabel: string; classHint: string; achHint: string }> = {
  sd: {
    label: "Siswa SD",
    description: "Profil & prestasi siswa SD Islam Modern Al Fakhir.",
    pages: "/sd/profil & /sd/kegiatan",
    addLabel: "Tambah profil siswa SD",
    classHint: "mis. Kelas 5 SD",
    achHint: "mis. Hafizah Juz 30 & Juara 1 Sains Cilik",
  },
  smp: {
    label: "Siswa SMP",
    description: "Profil, karya riset & prestasi santri SMP Islam Modern Al Fakhir.",
    pages: "/smp/kesiswaan & /smp/profil",
    addLabel: "Tambah profil siswa SMP",
    classHint: "mis. Kelas 9 SMP",
    achHint: "mis. Medali Emas ISRF 2025 & Pemilik Hak Cipta IoT",
  },
};

function validate(students: Students): string | null {
  for (const g of STUDENT_GROUPS) {
    for (const [i, s] of students[g].entries()) {
      if (!s.name.trim()) return `${GROUPS[g].label} #${i + 1}: nama siswa wajib diisi.`;
      if (!s.achievement.trim()) return `${GROUPS[g].label} #${i + 1}: prestasi / predikat wajib diisi.`;
    }
  }
  return null;
}

const clamp = (n: number) => Math.min(100, Math.max(0, Math.round(n)));
function parsePos(pos: string | undefined): [number, number] {
  const m = pos?.match(/^(\d{1,3})% (\d{1,3})%$/);
  return m ? [clamp(+m[1]), clamp(+m[2])] : [50, 30];
}

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
        <p className="mb-1.5 text-xs font-medium text-slate-600">Klik atau geser pada foto untuk memilih fokus wajah saat dipotong</p>
        <div ref={box} className="relative w-full max-w-xs cursor-crosshair touch-none select-none overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
          onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); fromPointer(e); }}
          onPointerMove={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) fromPointer(e); }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={`Foto ${name || "siswa"}`} draggable={false} className="block h-auto max-h-80 w-full object-contain" />
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

export function StudentForm({ value: initial, custom, updatedAt }: LoadedSetting<"students">) {
  const form = useSetting("students", initial);
  const [group, setGroup] = useState<StudentGroup>("sd");
  const error = validate(form.value);
  const g = GROUPS[group];

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.save(error); }}>
      <div role="tablist" aria-label="Jenjang siswa" className="mb-4 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        {STUDENT_GROUPS.map((k) => {
          const active = k === group;
          return (
            <button key={k} type="button" role="tab" id={`tab-${k}`} aria-selected={active} aria-controls="student-panel" onClick={() => setGroup(k)}
              className={`min-h-11 flex-1 whitespace-nowrap rounded-lg px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0E6A71]/30 ${active ? "bg-[#0E6A71] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}>
              {GROUPS[k].label} <span className={`ml-1 rounded-full px-1.5 py-0.5 text-xs ${active ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>{form.value[k].length}</span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id="student-panel" aria-labelledby={`tab-${group}`}>
        <Card title={g.label} description={<>{g.description} Urutan teratas tampil paling awal di halaman <code className="font-mono text-[13px]">{g.pages}</code>.</>}>
          <ListEditor<StudentProfile>
            items={form.value[group]}
            onChange={(items) => form.update({ ...form.value, [group]: items })}
            create={() => ({ name: "", className: group === "sd" ? "Kelas 5 SD" : "Kelas 8 SMP", achievement: "", quote: "" })}
            addLabel={g.addLabel}
            max={60}
            titleOf={(s) => (s.name ? `${s.name}${s.className ? ` · ${s.className}` : ""}` : "Siswa baru")}
            empty="Belum ada profil siswa. Bagian ini tidak tampil di situs."
            render={(s, set, i) => {
              const id = `student-${group}-${i}`;
              return (
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
                  <div className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Nama siswa" htmlFor={`${id}-name`}>
                        <input id={`${id}-name`} value={s.name} maxLength={200} placeholder="mis. Aisyah Humaira" onChange={(e) => set({ ...s, name: e.target.value })} className={inputCls} />
                      </Field>
                      <Field label="Kelas / Angkatan" htmlFor={`${id}-class`}>
                        <input id={`${id}-class`} value={s.className} maxLength={100} placeholder={g.classHint} onChange={(e) => set({ ...s, className: e.target.value })} className={inputCls} />
                      </Field>
                    </div>
                    <Field label="Prestasi / Predikat" htmlFor={`${id}-ach`}>
                      <input id={`${id}-ach`} value={s.achievement} maxLength={300} placeholder={g.achHint} onChange={(e) => set({ ...s, achievement: e.target.value })} className={inputCls} />
                    </Field>
                    <Field label="Deskripsi singkat / Kutipan (opsional)" htmlFor={`${id}-quote`} hint="Cerita singkat tentang karya, hafalan, atau kesan belajar siswa.">
                      <textarea id={`${id}-quote`} rows={3} value={s.quote ?? ""} maxLength={1000} placeholder="mis. Aktif merakit proyek sains terapan dan menjaga hafalan Al-Qur'an..." onChange={(e) => set({ ...s, quote: e.target.value })} className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Foto siswa (opsional)" htmlFor={`${id}-img`} hint="PNG, JPG, atau WebP, maks. 2 MB. Tanpa foto, kartu menampilkan ornamen bintang.">
                    <ImageField id={`${id}-img`} value={s.img ?? ""} aspect="aspect-[4/5]"
                      onChange={(url) => {
                        const { img: _i, pos: _p, ...rest } = s;
                        set(url ? { ...rest, img: url } : rest);
                      }}
                      preview={(url) => <FocusEditor id={id} name={s.name} url={url} pos={s.pos} onPos={(pos) => set({ ...s, pos })} />} />
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

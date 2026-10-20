"use client";
import type { FaqItem } from "@/content/settings";
import type { LoadedSetting } from "./types";
import { ListEditor, SaveBar, useSetting } from "./SettingForm";
import { Card, Field, inputCls } from "./ui";

export function FaqForm({ value: initial, custom, updatedAt }: LoadedSetting<"faq">) {
  const form = useSetting("faq", initial);
  const error = form.value.some((x) => !x.q.trim() || !x.a.trim()) ? "Setiap FAQ wajib memiliki pertanyaan dan jawaban." : null;
  return (
    <form onSubmit={(e) => { e.preventDefault(); form.save(error); }}>
      <Card title="Daftar pertanyaan" description="Tampil berurutan seperti di bawah. Gunakan panah untuk mengubah urutan.">
        <ListEditor<FaqItem>
          items={form.value}
          onChange={form.update}
          create={() => ({ q: "", a: "" })}
          addLabel="Tambah pertanyaan"
          max={50}
          titleOf={(x) => x.q || "Pertanyaan baru"}
          empty="Belum ada FAQ. Bagian FAQ tidak tampil di website."
          render={(x, set, i) => (
            <div className="space-y-3">
              <Field label="Pertanyaan" htmlFor={`faq-q-${i}`}>
                <input id={`faq-q-${i}`} value={x.q} maxLength={500} onChange={(e) => set({ ...x, q: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Jawaban" htmlFor={`faq-a-${i}`}>
                <textarea id={`faq-a-${i}`} value={x.a} maxLength={3000} rows={3} onChange={(e) => set({ ...x, a: e.target.value })} className={`${inputCls} resize-y`} />
              </Field>
            </div>
          )}
        />
      </Card>
      <SaveBar form={form} custom={custom} updatedAt={updatedAt} onSave={() => form.save(error)} />
    </form>
  );
}

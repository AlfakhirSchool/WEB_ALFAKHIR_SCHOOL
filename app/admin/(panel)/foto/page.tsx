import type { Metadata } from "next";
import Link from "next/link";
import { Icon, PageHeader, btnSecondary } from "@/components/admin/ui";
import { PhotoManager } from "@/components/admin/PhotoManager";
import { adminPage } from "../../_lib/guard";
import { loadSetting } from "../../_lib/settings";

export const metadata: Metadata = { title: "Foto Website" };

export default async function FotoPage() {
  await adminPage();
  const { value } = await loadSetting("images");
  return (
    <>
      <PageHeader title="Foto Website" description="Ganti foto dan logo yang tampil di website. Perubahan langsung tampil setelah foto diunggah, dan foto asli bisa dikembalikan kapan saja.">
        <Link href="/admin/teks" className={btnSecondary}>
          <Icon name="edit_square" className="text-[18px]" /> Ganti lewat Editor Halaman
        </Link>
      </PageHeader>
      <PhotoManager initial={value} />
    </>
  );
}

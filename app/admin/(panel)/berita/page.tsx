import type { Metadata } from "next";
import { PageHeader, ViewLink } from "@/components/admin/ui";
import { NewsForm } from "@/components/admin/NewsForm";
import { adminPage } from "../../_lib/guard";
import { loadSetting } from "../../_lib/settings";

export const metadata: Metadata = { title: "Berita" };

export default async function BeritaPage() {
  await adminPage();
  const setting = await loadSetting("news");
  return (
    <>
      <PageHeader title="Berita" description="Berita dan kegiatan yang tampil di halaman Berita portal. Urutan paling atas tampil paling awal.">
        <ViewLink href="/berita" />
      </PageHeader>
      <NewsForm {...setting} />
    </>
  );
}

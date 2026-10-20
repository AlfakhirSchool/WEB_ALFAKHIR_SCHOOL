import type { Metadata } from "next";
import { PageHeader, ViewLink } from "@/components/admin/ui";
import { JournalManager } from "@/components/admin/JournalManager";
import { listAllJournals } from "@/lib/content/journals";
import { adminPage } from "../../_lib/guard";

export const metadata: Metadata = { title: "Jurnal Siswa" };
export const dynamic = "force-dynamic";

export default async function JurnalPage() {
  await adminPage();
  const journals = await listAllJournals();
  return (
    <>
      <PageHeader title="Jurnal Siswa" description="Unggah karya tulis atau jurnal siswa dalam format PDF. Jurnal yang berstatus tampil muncul di halaman Jurnal portal.">
        <ViewLink href="/jurnal" />
      </PageHeader>
      <JournalManager initial={journals} />
    </>
  );
}

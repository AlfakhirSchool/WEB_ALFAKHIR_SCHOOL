import type { Metadata } from "next";
import { PageHeader, ViewLink } from "@/components/admin/ui";
import { PpdbForm } from "@/components/admin/PpdbForm";
import { adminPage } from "../../_lib/guard";
import { loadSetting } from "../../_lib/settings";

export const metadata: Metadata = { title: "PPDB & Biaya" };

export default async function PpdbPage() {
  await adminPage();
  const [ppdb, fees] = await Promise.all([loadSetting("ppdb"), loadSetting("fees")]);
  return (
    <>
      <PageHeader title="PPDB & Biaya" description="Unggah brosur/pamflet PPDB (gambar atau PDF), atur tanggal penutupan gelombang, dan rincian biaya SD & SMP.">
        <ViewLink href="/ppdb" label="PPDB Portal" />
        <ViewLink href="/sd/ppdb" label="PPDB SD" />
        <ViewLink href="/smp/ppdb" label="PPDB SMP" />
      </PageHeader>
      <PpdbForm ppdb={ppdb} fees={fees} />
    </>
  );
}

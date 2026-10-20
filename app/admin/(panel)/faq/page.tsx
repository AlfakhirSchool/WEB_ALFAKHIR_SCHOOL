import type { Metadata } from "next";
import { PageHeader, ViewLink } from "@/components/admin/ui";
import { FaqForm } from "@/components/admin/FaqForm";
import { adminPage } from "../../_lib/guard";
import { loadSetting } from "../../_lib/settings";

export const metadata: Metadata = { title: "FAQ" };

export default async function FaqPage() {
  await adminPage();
  const setting = await loadSetting("faq");
  return (
    <>
      <PageHeader title="FAQ" description="Pertanyaan yang sering diajukan beserta jawabannya pada halaman PPDB.">
        <ViewLink href="/ppdb#faq" />
      </PageHeader>
      <FaqForm {...setting} />
    </>
  );
}

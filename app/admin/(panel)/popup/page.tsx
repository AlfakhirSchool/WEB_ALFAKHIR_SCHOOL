import type { Metadata } from "next";
import { PageHeader, ViewLink } from "@/components/admin/ui";
import { PopupForm } from "@/components/admin/PopupForm";
import { adminPage } from "../../_lib/guard";
import { loadSetting } from "../../_lib/settings";

export const metadata: Metadata = { title: "Popup Iklan" };

export default async function PopupPage() {
  await adminPage();
  const setting = await loadSetting("popup");
  return (
    <>
      <PageHeader title="Popup Iklan" description="Popup pengumuman atau promosi yang muncul saat pengunjung membuka website.">
        <ViewLink href="/" />
      </PageHeader>
      <PopupForm {...setting} />
    </>
  );
}

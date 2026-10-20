import type { Metadata } from "next";
import { PageHeader, ViewLink } from "@/components/admin/ui";
import { ContactForm } from "@/components/admin/ContactForm";
import { adminPage } from "../../_lib/guard";
import { loadSetting } from "../../_lib/settings";

export const metadata: Metadata = { title: "Kontak & WhatsApp" };

export default async function KontakPage() {
  await adminPage();
  const setting = await loadSetting("contact");
  return (
    <>
      <PageHeader title="Kontak & WhatsApp" description="Nomor WhatsApp, email, alamat, peta, dan akun media sosial untuk portal, SD, dan SMP. Dipakai di semua tombol, halaman Kontak, footer, dan data pencarian Google.">
        <ViewLink href="/kontak" />
      </PageHeader>
      <ContactForm {...setting} />
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader, ViewLink } from "@/components/admin/ui";
import { StaffForm } from "@/components/admin/StaffForm";
import { adminPage } from "../../_lib/guard";
import { loadSetting } from "../../_lib/settings";

export const metadata: Metadata = { title: "Guru & Staf" };

export default async function GuruPage() {
  await adminPage();
  const setting = await loadSetting("staff");
  return (
    <>
      <PageHeader title="Guru & Staf" description="Nama, jabatan, dan foto pengurus Al Fakhir School serta guru SD dan SMP. Tampil di halaman Tentang Kami, Profil SD, dan Profil SMP.">
        <ViewLink href="/yayasan" label="Tentang Kami" />
        <ViewLink href="/sd/profil#guru-staf" label="Profil SD" />
        <ViewLink href="/smp/profil#guru-staf" label="Profil SMP" />
      </PageHeader>
      <StaffForm {...setting} />
    </>
  );
}

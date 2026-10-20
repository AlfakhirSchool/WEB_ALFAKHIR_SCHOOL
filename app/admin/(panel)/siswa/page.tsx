import type { Metadata } from "next";
import { PageHeader, ViewLink } from "@/components/admin/ui";
import { StudentForm } from "@/components/admin/StudentForm";
import { adminPage } from "../../_lib/guard";
import { loadSetting } from "../../_lib/settings";

export const metadata: Metadata = { title: "Profil Siswa" };

export default async function SiswaPage() {
  await adminPage();
  const setting = await loadSetting("students");
  return (
    <>
      <PageHeader title="Profil & Prestasi Siswa" description="Unggah foto, nama, kelas, dan capaian prestasi atau karya siswa SD dan SMP. Tampil di halaman Profil & Kegiatan SD serta Kesiswaan & Profil SMP.">
        <ViewLink href="/sd/kegiatan#profil-siswa" label="Kegiatan SD" />
        <ViewLink href="/sd/profil#profil-siswa" label="Profil SD" />
        <ViewLink href="/smp/kesiswaan#profil-siswa" label="Kesiswaan SMP" />
      </PageHeader>
      <StudentForm {...setting} />
    </>
  );
}

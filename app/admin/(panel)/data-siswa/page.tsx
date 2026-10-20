import type { Metadata } from "next";
import { PageHeader, ViewLink } from "@/components/admin/ui";
import { StudentManager } from "@/components/admin/StudentManager";
import { listStudents } from "@/lib/students/store";
import { adminPage } from "../../_lib/guard";

export const metadata: Metadata = { title: "Data Siswa & Dokumen" };
export const dynamic = "force-dynamic";

export default async function DataSiswaPage() {
  await adminPage();
  const students = await listStudents();
  return (
    <>
      <PageHeader title="Data Siswa & Dokumen" description="Isi data siswa sekali, lalu PDF Profil Siswa dan Formulir PPDB dibuat otomatis. Siswa atau orang tua mengunduhnya sendiri di halaman Dokumen dengan memasukkan NIS.">
        <ViewLink href="/dokumen" label="Lihat halaman unduhan" />
      </PageHeader>
      <StudentManager initial={students} />
    </>
  );
}

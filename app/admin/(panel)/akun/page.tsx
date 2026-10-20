import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/admin/ui";
import { AccountForms } from "@/components/admin/AccountForms";
import { adminPage } from "../../_lib/guard";

export const metadata: Metadata = { title: "Akun" };

export default async function AccountPage() {
  const admin = await adminPage();
  const admins = await db.admin.findMany({ orderBy: { createdAt: "asc" }, select: { id: true, username: true, createdAt: true } });
  return (
    <>
      <PageHeader title="Akun" description="Ganti password Anda dan kelola siapa saja yang dapat masuk ke dashboard." />
      <AccountForms me={admin.sub} admins={admins.map((a) => ({ id: a.id, username: a.username, createdAt: a.createdAt.toISOString() }))} />
    </>
  );
}

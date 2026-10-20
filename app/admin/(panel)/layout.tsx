import { AdminShell } from "@/components/admin/AdminShell";
import { adminPage } from "../_lib/guard";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await adminPage();
  return <AdminShell username={admin.username}>{children}</AdminShell>;
}

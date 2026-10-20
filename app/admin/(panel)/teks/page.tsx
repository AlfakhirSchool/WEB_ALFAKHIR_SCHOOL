import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PageEditor } from "@/components/admin/PageEditor";
import { adminPage } from "../../_lib/guard";

export const metadata: Metadata = { title: "Editor Halaman" };

export default async function TextsPage({ searchParams }: { searchParams: Promise<{ halaman?: string }> }) {
  await adminPage();
  const [{ halaman }, rows] = await Promise.all([
    searchParams,
    db.textOverride.findMany({ orderBy: [{ scope: "asc" }, { updatedAt: "desc" }] }),
  ]);
  return (
    <PageEditor
      initialPath={halaman}
      rows={rows.map((r) => ({ id: r.id, scope: r.scope, source: r.source, value: r.value, updatedAt: r.updatedAt.toISOString() }))}
    />
  );
}

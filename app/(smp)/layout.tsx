import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  description: "SMP Islam Modern Al Fakhir, Sawangan, Depok: sekolah Islam dengan pendidikan modern, Tahfiz, Research, dan Character Building.",
  openGraph: { description: "SMP Islam Modern Al Fakhir, Sawangan, Depok: sekolah Islam dengan pendidikan modern, Tahfiz, Research, dan Character Building.", images: ["/logo-smp.png"], locale: "id_ID", type: "website", siteName: "AL FAKHIR SCHOOL" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell site="smp">{children}</SiteShell>;
}

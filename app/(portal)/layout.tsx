import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  description: "Portal resmi AL FAKHIR SCHOOL: SD dan SMP Islam Modern di Sawangan, Depok.",
  openGraph: { description: "Portal resmi AL FAKHIR SCHOOL: SD dan SMP Islam Modern di Sawangan, Depok.", images: ["/logo-smp.png"], locale: "id_ID", type: "website", siteName: "AL FAKHIR SCHOOL" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell site="portal">{children}</SiteShell>;
}

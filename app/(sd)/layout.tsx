import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  description: "SD Islam Modern Al Fakhir, Sawangan, Depok: Smart Concept, Islamic Identity & Modern Character. Membentuk generasi Qur'ani, cerdas, dan berakhlak mulia di era digital.",
  openGraph: { description: "SD Islam Modern Al Fakhir, Sawangan, Depok: Smart Concept, Islamic Identity & Modern Character. Membentuk generasi Qur'ani, cerdas, dan berakhlak mulia di era digital.", images: ["/logo-sd.webp"], locale: "id_ID", type: "website", siteName: "AL FAKHIR SCHOOL" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell site="sd">{children}</SiteShell>;
}

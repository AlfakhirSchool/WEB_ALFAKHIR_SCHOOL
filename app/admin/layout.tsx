import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Dashboard Al Fakhir School", template: "%s · Dashboard Al Fakhir School" },
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

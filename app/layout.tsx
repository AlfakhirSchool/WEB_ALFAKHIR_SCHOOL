import type { Metadata, Viewport } from "next";
import { Amiri, Poppins } from "next/font/google";
import { Loader } from "@/components/Loader";
import { TransitionProvider } from "@/components/SiteTransition";
import { Analytics } from "@/components/Analytics";
import { SmoothScroll } from "@/components/SmoothScroll";
import { loaderBootScript } from "@/lib/loader";
import { ContentProvider } from "@/components/content/ContentProvider";
import { getOverrides, getSettings } from "@/lib/content/store";
import "./globals.css";

const amiri = Amiri({ subsets: ["arabic"], weight: "400", variable: "--f-amiri", display: "swap", preload: false });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--f-poppins", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "AL FAKHIR SCHOOL", template: "%s · AL FAKHIR SCHOOL" },
  description: "SD dan SMP Islam Modern Al Fakhir, Sawangan, Depok.",
  openGraph: { siteName: "AL FAKHIR SCHOOL", locale: "id_ID", type: "website", images: ["/logo-smp.png"] },
};
export const viewport: Viewport = { themeColor: "#0E6A71" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [overrides, settings] = await Promise.all([getOverrides(), getSettings()]);
  return (
    <html lang="id" className={`${amiri.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderBootScript }} />
      </head>
      <body>
        <Analytics />
        <SmoothScroll />
        <ContentProvider overrides={overrides} settings={settings}>
          <Loader />
          <TransitionProvider>{children}</TransitionProvider>
        </ContentProvider>
      </body>
    </html>
  );
}

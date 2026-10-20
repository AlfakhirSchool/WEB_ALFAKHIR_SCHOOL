"use client";
import { usePathname } from "next/navigation";
import { chromes } from "./index";
import type { SiteKey } from "@/content/site";

/** <main> wrapper: pads for header height beyond the 80px each design page already reserves. */
export function MainOffset({ site, children }: { site: SiteKey; children: React.ReactNode }) {
  const pathname = usePathname();
  return <main className={chromes[site].extraTop(pathname)}>{children}</main>;
}

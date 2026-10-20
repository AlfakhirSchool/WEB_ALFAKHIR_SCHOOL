"use client";
import { usePathname } from "next/navigation";
import { Scope } from "./content/T";
import { chromes } from "./shell";
import type { SiteKey } from "@/content/site";

export function Footer({ site }: { site: SiteKey }) {
  const pathname = usePathname();
  const F = chromes[site].Footer;
  return <Scope id={`shell/${site}`}><F pathname={pathname} /></Scope>;
}

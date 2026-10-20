"use client";
import { usePathname } from "next/navigation";
import { Scope } from "./content/T";
import { chromes } from "./shell";
import type { SiteKey } from "@/content/site";

export function WhatsAppFab({ site }: { site: SiteKey }) {
  const pathname = usePathname();
  const F = chromes[site].Fab;
  return <Scope id={`shell/${site}`}><F pathname={pathname} /></Scope>;
}

"use client";
import { createContext, useContext } from "react";
import type { SiteKey } from "@/content/site";

const Ctx = createContext<SiteKey>("portal");
export function SiteProvider({ site, children }: { site: SiteKey; children: React.ReactNode }) {
  return <Ctx.Provider value={site}>{children}</Ctx.Provider>;
}
export const useSite = () => useContext(Ctx);

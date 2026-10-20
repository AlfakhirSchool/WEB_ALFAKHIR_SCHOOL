"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { Scope } from "./content/T";
import { chromes } from "./shell";
import type { SiteKey } from "@/content/site";

export function Header({ site }: { site: SiteKey }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  useEffect(() => { setMenu(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = menu ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menu]);
  const { Header: H, menuTop } = chromes[site];
  return (
    <>
      <Scope id={`shell/${site}`}><H pathname={pathname} menu={menu} setMenu={setMenu} /></Scope>
      <MobileMenu open={menu} site={site} pathname={pathname} topClass={menuTop(pathname)} onClose={() => setMenu(false)} />
    </>
  );
}

import { HomeFab, HomeFooter, HomeHeader } from "./home";
import { KegiatanFooter, KegiatanHeader } from "./kegiatan";
import { KontakFooter, KontakHeader } from "./kontak";
import { KegiatanFab, KontakFab } from "./extra-fabs";
import type { Chrome } from "../types";

const variant = (pathname: string) => (pathname === "/sd/kegiatan" ? "kegiatan" : pathname === "/sd/kontak" ? "kontak" : "home");

/** SD chrome per Stitch screen: home/profil/program(+ppdb) · kegiatan · kontak. */
export const sdChrome: Chrome = {
  Header: (p) => {
    const v = variant(p.pathname);
    return v === "kegiatan" ? <KegiatanHeader {...p} /> : v === "kontak" ? <KontakHeader {...p} /> : <HomeHeader {...p} />;
  },
  Footer: ({ pathname }) => {
    const v = variant(pathname);
    return v === "kegiatan" ? <KegiatanFooter /> : v === "kontak" ? <KontakFooter /> : <HomeFooter />;
  },
  Fab: ({ pathname }) => { const v = variant(pathname); return v === "kegiatan" ? <KegiatanFab /> : v === "kontak" ? <KontakFab /> : <HomeFab />; },
  extraTop: (pathname) => ({ home: "pt-[calc(var(--sd-hdr,104px)-80px)]", kegiatan: "pt-[calc(var(--sd-hdr,116px)-80px)]", kontak: "pt-10" })[variant(pathname)],
  menuTop: (pathname) => ({ home: "top-[var(--sd-hdr,104px)]", kegiatan: "top-[var(--sd-hdr,116px)]", kontak: "top-[120px]" })[variant(pathname)],
};

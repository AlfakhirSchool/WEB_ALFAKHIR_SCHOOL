import type { ComponentType } from "react";

export type HeaderProps = { pathname: string; menu: boolean; setMenu: (v: boolean) => void };

/** Contract each site chrome (components/shell/<site>/index.tsx) exports. Variants are chosen per pathname to mirror the Stitch screens. */
export type Chrome = {
  Header: ComponentType<HeaderProps>;
  Footer: ComponentType<{ pathname: string }>;
  Fab: ComponentType<{ pathname: string }>;
  /** Tailwind padding-top class added to <main> for header height above the design's 80px (e.g. "pt-8"), or "" */
  extraTop: (pathname: string) => string;
  /** Tailwind `top-*` class where the mobile menu panel starts (header bottom edge) */
  menuTop: (pathname: string) => string;
};

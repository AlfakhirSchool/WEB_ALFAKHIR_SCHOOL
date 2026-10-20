import type { Chrome } from "../types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Fab } from "./Fab";

/** Header height is measured at runtime (useHeaderHeight → --sd-hdr) since the strip wraps by width. Fallbacks: <md 144px, md+ 106px. Pages reserve 80px themselves (mobile +8px breathing room). */
export const smpChrome: Chrome = {
  Header,
  Footer,
  Fab,
  extraTop: () => "pt-[calc(var(--sd-hdr,144px)-72px)] md:pt-[calc(var(--sd-hdr,106px)-80px)]",
  menuTop: () => "top-[var(--sd-hdr,144px)] md:top-[var(--sd-hdr,106px)]",
};

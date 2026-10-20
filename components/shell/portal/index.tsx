import type { Chrome } from "../types";
import { PortalHeader } from "./Header";
import { PortalFooter } from "./Footer";
import { PortalFab } from "./Fab";

export const portalChrome: Chrome = {
  Header: PortalHeader,
  Footer: PortalFooter,
  Fab: PortalFab,
  extraTop: () => "",
  menuTop: () => "top-[80px]",
};

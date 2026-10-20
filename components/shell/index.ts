import { portalChrome } from "./portal";
import { sdChrome } from "./sd";
import { smpChrome } from "./smp";
import type { SiteKey } from "@/content/site";
import type { Chrome } from "./types";

export const chromes: Record<SiteKey, Chrome> = { portal: portalChrome, sd: sdChrome, smp: smpChrome };

import { Header } from "./Header";
import { Footer } from "./Footer";
import { SiteProvider } from "./SiteProvider";
import { WhatsAppFab } from "./WhatsAppFab";
import { JsonLd } from "./JsonLd";
import { MainOffset } from "./shell/MainOffset";
import { AdPopup } from "./AdPopup";
import type { SiteKey } from "@/content/site";

/** Shared page shell; `data-site` selects the token theme in app/theme.css (portal/smp = serene, sd = warm). */
export function SiteShell({ site, children }: { site: SiteKey; children: React.ReactNode }) {
  return (
    <SiteProvider site={site}>
      <div data-site={site} className="min-h-screen overflow-x-clip bg-surface font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
        <JsonLd site={site} />
        <Header site={site} />
        <MainOffset site={site}>{children}</MainOffset>
        <Footer site={site} />
        <WhatsAppFab site={site} />
        <AdPopup site={site} />
      </div>
    </SiteProvider>
  );
}

import type { SiteKey } from "@/content/site";
import { getSettings } from "@/lib/content/store";
import { socialsOf } from "@/components/SocialLinks";

export async function JsonLd({ site }: { site: SiteKey }) {
  const { contact } = await getSettings();
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const c = site === "sd" ? contact.sd : site === "smp" ? contact.smp : contact;
  const shared = {
    telephone: c.waDisplay,
    email: c.email,
    address: { "@type": "PostalAddress", streetAddress: c.address, addressCountry: "ID" },
    sameAs: (site === "portal" ? [...socialsOf(contact), ...socialsOf(contact.sd), ...socialsOf(contact.smp)] : socialsOf(c)).map((s) => s.href),
  };
  const data =
    site === "portal"
      ? { "@type": "EducationalOrganization", name: "AL FAKHIR SCHOOL", url: base, logo: `${base}/logo-smp.png`, ...shared }
      : { "@type": "School", name: site === "sd" ? "SD Islam Modern Al Fakhir" : "SMP Islam Modern Al Fakhir", url: `${base}/${site}`, logo: `${base}/${site === "sd" ? "logo-sd.webp" : "logo-smp.png"}`, parentOrganization: { "@type": "EducationalOrganization", name: "AL FAKHIR SCHOOL" }, ...shared };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...data }) }} />;
}

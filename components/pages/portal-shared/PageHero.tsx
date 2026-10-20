import { T } from "@/components/content/T";
import { StarGlyph, Watermark } from "./Ornaments";

/** Serene page header: eyebrow chip, Poppins headline, lead copy, optional actions and aside. `eyebrow` is editable text; wrap `title`/`lead` text in <T>. */
export function PageHero({ eyebrow, title, lead, children, aside }: {
  eyebrow: string; title: React.ReactNode; lead?: React.ReactNode; children?: React.ReactNode; aside?: React.ReactNode;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-surface-container-low pt-28 md:pt-32 pb-space-xl">
      <Watermark />
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin relative z-10">
        <div className={aside ? "grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center" : ""}>
          <div className={`flex flex-col gap-5 ${aside ? "lg:col-span-7" : "max-w-5xl"}`}>
            <div className="inline-flex items-center gap-2 self-start bg-primary-container/10 px-3.5 py-1.5 rounded-full">
              <StarGlyph />
              <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-widest"><T>{eyebrow}</T></span>
            </div>
            <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-primary tracking-tight font-extrabold">{title}</h1>
            {lead && <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl text-pretty">{lead}</p>}
            {children}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

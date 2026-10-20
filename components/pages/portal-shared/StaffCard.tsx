import Image from "@/components/content/Image";
import type { Person } from "@/content/settings";
import { StarGlyph } from "./Ornaments";

const BLOB_SHAPES = [
  "rounded-[48%_52%_42%_58%/55%_45%_55%_45%] bg-primary-fixed",
  "rounded-[52%_48%_58%_42%/45%_55%_45%_55%] bg-tertiary-fixed",
  "rounded-[45%_55%_48%_52%/52%_42%_58%_48%] bg-secondary-fixed",
  "rounded-[58%_42%_52%_48%/48%_55%_45%_52%] bg-surface-container-highest",
];

/** Staff / teacher card shared by /yayasan, /sd/profil and /smp/profil. Name and role are dashboard-managed (no <T>). */
export function StaffCard({ person, sizes }: { person: Person; sizes: string }) {
  return (
    <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-primary-container/10 shadow-sm hover:shadow-md transition-all flex flex-col">
      <div className="relative aspect-[4/3] sm:aspect-[4/4.2] w-full bg-surface-container overflow-hidden">
        {person.img ? (
          <Image src={person.img} alt={`${person.name}, ${person.role}`} fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: person.pos || "50% 20%" }} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-primary-container/25">
            <StarGlyph className="w-24 h-24" />
          </div>
        )}
        {person.badge && (
          <span className="absolute top-3 left-3 bg-primary/95 backdrop-blur-sm text-on-primary font-caption text-caption px-3 py-1 rounded-full font-semibold shadow-sm">
            {person.badge}
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1 justify-between border-t border-primary-container/10">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold text-balance">{person.name}</h3>
          <p className="font-caption text-caption text-secondary font-bold uppercase tracking-wider mt-1">{person.role}</p>
          {person.bio && (
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 leading-relaxed text-pretty">
              {person.bio}
            </p>
          )}
        </div>
        {person.credential && (
          <div className="mt-4 pt-3 border-t border-surface-container flex items-center gap-2 text-caption text-on-surface-variant font-medium">
            <span className="material-symbols-outlined text-[16px] text-primary shrink-0">school</span>
            <span>{person.credential}</span>
          </div>
        )}
      </div>
    </article>
  );
}

function BlobStaffCard({ person, index, sizes }: { person: Person; index: number; sizes: string }) {
  const shape = BLOB_SHAPES[index % BLOB_SHAPES.length];
  return (
    <article className="flex flex-col items-center text-center group">
      <div className={`relative w-52 h-56 ${shape} overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-500 mb-space-md`}>
        {person.img ? (
          <Image src={person.img} alt={`${person.name}, ${person.role}`} fill sizes={sizes} className="object-cover" style={{ objectPosition: person.pos || "50% 15%" }} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-primary/30">
            <StarGlyph className="w-20 h-20" />
          </div>
        )}
      </div>
      {person.badge && (
        <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary-container font-bold uppercase tracking-wide">
          {person.badge}
        </span>
      )}
      <h3 className="font-title-lg text-title-lg text-primary mt-1 text-balance">{person.name}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 text-balance">{person.role}</p>
      {person.bio && (
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 max-w-xs leading-relaxed text-pretty">{person.bio}</p>
      )}
      {person.credential && (
        <div className="inline-flex items-center gap-1 text-tertiary font-label-sm text-label-sm mt-space-xs bg-surface-container px-3 py-1 rounded-full">
          <span className="material-symbols-outlined text-[14px]">verified</span>
          <span>{person.credential}</span>
        </div>
      )}
    </article>
  );
}

/** Heading + card grid; renders nothing when the dashboard list is empty. */
export function StaffSection({ people, eyebrow, title, lead, variant = "card", className = "bg-surface" }: {
  people: Person[];
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  variant?: "card" | "blob";
  className?: string;
}) {
  if (people.length === 0) return null;
  if (variant === "blob") {
    return (
      <section className={`w-full py-space-xl ${className}`} id="guru-staf">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
          <div className="flex flex-col items-center text-center mb-space-xl">
            <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md mb-space-sm">
              <span className="material-symbols-outlined text-[16px]">groups</span>
              <span>{eyebrow}</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary tracking-tight text-balance">{title}</h2>
            {lead && <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-xs text-pretty">{lead}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {people.map((p, i) => (
              <BlobStaffCard key={i} person={p} index={i} sizes="(min-width: 1024px) 240px, (min-width: 640px) 50vw, 240px" />
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className={`w-full py-space-xl ${className}`} id="guru-staf">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-3xl mb-space-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container" />
            <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-primary">{eyebrow}</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-extrabold tracking-tight text-balance">{title}</h2>
          {lead && <p className="font-body-lg text-body-lg text-on-surface-variant mt-3 text-pretty">{lead}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {people.map((p, i) => (
            <StaffCard key={i} person={p} sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
          ))}
        </div>
      </div>
    </section>
  );
}

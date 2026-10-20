import Image from "@/components/content/Image";
import type { StudentProfile } from "@/content/settings";
import { StarGlyph } from "./Ornaments";

/** Student profile / achievement card shared by SD and SMP pages. Managed from /admin/siswa. */
export function StudentCard({ student, sizes }: { student: StudentProfile; sizes: string }) {
  return (
    <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-primary-container/10 shadow-sm hover:shadow-md transition-all flex flex-col">
      <div className="relative aspect-square sm:aspect-[4/5] w-full bg-surface-container overflow-hidden">
        {student.img ? (
          <Image
            src={student.img}
            alt={`${student.name}${student.className ? `, ${student.className}` : ""}`}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ objectPosition: student.pos }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-primary-container/25">
            <StarGlyph className="w-24 h-24" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />
        {student.className && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-surface-container-lowest/95 backdrop-blur px-3 py-1 font-label-sm text-label-sm font-bold text-primary shadow-sm">
            <span className="material-symbols-outlined text-[15px] text-secondary-container">school</span>
            {student.className}
          </span>
        )}
      </div>
      <div className="p-space-md flex flex-col gap-2 flex-1 border-t border-primary-container/10">
        <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-secondary-fixed/60 px-3 py-1 font-label-sm text-label-sm font-bold text-secondary">
          <span className="material-symbols-outlined text-[15px]">workspace_premium</span>
          <span>{student.achievement}</span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-balance mt-0.5">{student.name}</h3>
        {student.quote && (
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-pretty">{student.quote}</p>
        )}
      </div>
    </article>
  );
}

/** Heading + student profile card grid; renders nothing when the dashboard list for the jenjang is empty. */
export function StudentSection({
  students,
  eyebrow,
  title,
  lead,
  className = "bg-surface",
}: {
  students: StudentProfile[];
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}) {
  if (students.length === 0) return null;
  return (
    <section className={`w-full py-space-xl ${className} scroll-mt-24`} id="profil-siswa">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-3xl mb-space-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
            <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-primary">{eyebrow}</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-extrabold tracking-tight text-balance">{title}</h2>
          {lead && <p className="font-body-lg text-body-lg text-on-surface-variant mt-3 text-pretty">{lead}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {students.map((s, i) => (
            <StudentCard key={`${s.name}-${i}`} student={s} sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
          ))}
        </div>
      </div>
    </section>
  );
}

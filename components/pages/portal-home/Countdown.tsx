"use client";
import { Fragment, useEffect, useState } from "react";
import { T } from "@/components/content/T";
import { useSettings } from "@/components/content/ContentProvider";

type Time = { days: number; hours: number; minutes: number; seconds: number };

/** Gelombang 1 closes at the end of the deadline day, Western Indonesia Time. */
const closesAt = (deadline: string) => new Date(`${deadline}T23:59:59+07:00`).getTime();

function remaining(end: number): Time {
  const s = Math.max(0, Math.floor((end - Date.now()) / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}

/** Counts down to the PPDB deadline set in the dashboard; shows "--" when no deadline is set (and before hydration). */
export function Countdown() {
  const { ppdb } = useSettings();
  const deadline = ppdb.deadline || undefined;
  const [v, setV] = useState<Time | null>(null);

  useEffect(() => {
    if (!deadline) {
      setV(null);
      return;
    }
    const end = closesAt(deadline);
    setV(remaining(end));
    const id = setInterval(() => setV(remaining(end)), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const units = [
    { label: "Hari", value: v?.days, color: "text-tertiary-fixed" },
    { label: "Jam", value: v?.hours, color: "text-surface-container-lowest" },
    { label: "Menit", value: v?.minutes, color: "text-surface-container-lowest" },
    { label: "Detik", value: v?.seconds, color: "text-secondary-fixed-dim" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 bg-[#012224]/80 p-4 sm:p-6 rounded-2xl backdrop-blur-md" role="timer">
      {units.map((u, i) => (
        <Fragment key={u.label}>
          {i > 0 && <span className="font-headline-md text-surface-dim/40 -mt-4" aria-hidden="true">:</span>}
          <div className="flex flex-col items-center min-w-[64px] sm:min-w-[80px]">
            <span className={`font-display-hero text-headline-lg md:text-display-hero font-extrabold ${u.color} tracking-tight`}>
              {u.value === undefined ? "--" : String(u.value).padStart(2, "0")}
            </span>
            <span className="font-caption text-caption text-surface-dim uppercase tracking-widest mt-1"><T>{u.label}</T></span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

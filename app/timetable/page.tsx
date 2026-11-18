import type { Metadata } from "next";
import settings from "@/data/settings.json";
import { db } from "@/lib/db";
import type { TimetableEntry } from "@/lib/types";

export const metadata: Metadata = {
  title: "Class Timetable & Schedule",
  description:
    "Check the latest class timetable for Grades 6–13 ICT courses at TopBright Academy. Browse physical Batticaloa and online weekly session schedules.",
  alternates: {
    canonical: "/timetable",
  },
};
// Force Next.js to fetch fresh Redis data on every page visit
export const dynamic = "force-dynamic";
export const revalidate = 0;

const DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MODE_COLOR: Record<string, string> = {
  Online: "bg-[#8a00c2]/25 text-[#d880ff] border border-[#8a00c2]/50",
  Physical: "bg-[#f0822b]/20 text-[#f0822b] border border-[#f0822b]/40",
  Group: "bg-[#1e032d] text-slate-200 border border-[#8a00c2]/30",
  "One-to-One": "bg-slate-800/80 text-slate-300 border border-slate-700",
};

// Converts time strings like "03:30 PM – 04:30 PM" to minutes from midnight for ascending sorting
function parseStartTimeMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const startTime = timeStr.split(/[-–]/)[0].trim();
  const match = startTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return 0;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const ampm = match[3]?.toUpperCase();

  if (ampm === "PM" && hours < 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

export default async function TimetablePage() {
  const timetable: TimetableEntry[] = await db.timetable.all();

  const grouped = DAY_ORDER.map((day) => {
    const entries = (timetable || [])
      .filter((t) => t.day === day)
      .sort(
        (a, b) =>
          parseStartTimeMinutes(a.time) - parseStartTimeMinutes(b.time)
      );

    return {
      day,
      entries,
    };
  }).filter((g) => g.entries.length > 0);

  return (
    <div className="min-h-screen bg-[#0d0114] select-none">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-[#8a00c2]/30 bg-[#0d0114]">
        <div className="absolute -left-20 -top-20 h-80 w-80 animate-pulse rounded-full bg-[#8a00c2]/25 blur-[120px]" />
        <div className="container-page relative z-10 py-16">
          <p className="font-mono text-sm font-medium text-[#f0822b]">
            Class Schedule
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">
            Class Time Tables
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            Explore the complete weekly class schedule for TopBright ICT Academy across Grades 6 through 13. Our structured timetable accommodates both physical classroom batches held in Batticaloa and live interactive online sessions for students islandwide. Review session timings, subject modules, and study modes below, or contact us directly on WhatsApp to confirm availability and reserve your individual student slot.
          </p>
        </div>
      </section>

      {/* Timetable List */}
      <section className="container-page relative z-10 py-14">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-8">
          Weekly Lecture &amp; Practical Schedule
        </h2>

        {grouped.length > 0 ? (
          <div className="space-y-10">
            {grouped.map((g) => (
              <div key={g.day}>
                <h3 className="font-display text-lg font-bold text-[#f0822b] flex items-center gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full bg-[#8a00c2]" />
                  {g.day}
                </h3>
                <div className="overflow-x-auto rounded-lg border border-[#8a00c2]/30 bg-[#160221]/90 shadow-lg backdrop-blur">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-[#8a00c2]/30 bg-[#1e032d]/80 font-mono text-xs uppercase tracking-wider text-slate-400">
                        <th scope="col" className="py-3 px-4 sm:w-52">Time</th>
                        <th scope="col" className="py-3 px-4">Subject Topic</th>
                        <th scope="col" className="py-3 px-4 sm:w-36">Grade</th>
                        <th scope="col" className="py-3 px-4 sm:w-32">Class Mode</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#8a00c2]/20">
                      {g.entries.map((e) => (
                        <tr
                          key={e.id}
                          className="transition-colors hover:bg-[#1e032d]/60"
                        >
                          <td className="py-3.5 px-4 font-mono text-sm text-slate-400 whitespace-nowrap">
                            {e.time}
                          </td>
                          <td className="py-3.5 px-4 text-sm font-medium text-white">
                            {e.topic}
                          </td>
                          <td className="py-3.5 px-4 text-sm text-slate-300 whitespace-nowrap">
                            {e.grade}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                MODE_COLOR[e.mode] ||
                                "bg-slate-800 text-slate-300 border border-slate-700"
                              }`}
                            >
                              {e.mode}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#8a00c2]/30 bg-[#160221]/50 p-12 text-center text-slate-400">
            No class schedules are available at the moment.
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 rounded-lg border border-[#8a00c2]/30 bg-[#160221] p-6 text-sm text-slate-300 backdrop-blur">
          Want a one-to-one session outside these times? Message{" "}
          <a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#f0822b] transition-colors hover:underline"
          >
            {settings.phone}
          </a>{" "}
          on WhatsApp to arrange a time.
        </div>
      </section>
    </div>
  );
}
import type { Metadata } from "next";
import timetable from "@/data/timetable.json";
import settings from "@/data/settings.json";

export const metadata: Metadata = { title: "Timetable | TopBright Academy" };

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const modeColor: Record<string, string> = {
  Online: "bg-[#8a00c2]/25 text-[#d880ff] border border-[#8a00c2]/50",
  Physical: "bg-[#f0822b]/20 text-[#f0822b] border border-[#f0822b]/40",
  Group: "bg-[#1e032d] text-slate-200 border border-[#8a00c2]/30",
  "One-to-One": "bg-slate-800/80 text-slate-300 border border-slate-700",
};

export default function TimetablePage() {
  const grouped = dayOrder
    .map((day) => ({
      day,
      entries: timetable.filter((t) => t.day === day),
    }))
    .filter((g) => g.entries.length > 0);

  return (
    <div className="min-h-screen bg-[#0d0114]">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-[#8a00c2]/30 bg-[#0d0114]">
        <div className="absolute -left-20 -top-20 h-80 w-80 animate-pulse rounded-full bg-[#8a00c2]/25 blur-[120px]" />
        <div className="container-page relative z-10 py-16">
          <p className="font-mono text-sm font-medium text-[#f0822b]">Class Schedule</p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">
            Class Time Tables
          </h1>
          <p className="mt-3 max-w-xl text-slate-300">
            Times are subject to change during school exam periods. Message on WhatsApp to confirm
            a slot or to arrange a one-to-one session at a time that suits you.
          </p>
        </div>
      </section>

      {/* Timetable List */}
      <section className="container-page relative z-10 py-14">
        <div className="space-y-10">
          {grouped.map((g) => (
            <div key={g.day}>
              <h2 className="font-display text-lg font-semibold text-white">{g.day}</h2>
              <div className="mt-4 divide-y divide-[#8a00c2]/20 rounded-lg border border-[#8a00c2]/30 bg-[#160221]/90 shadow-lg backdrop-blur">
                {g.entries.map((e) => (
                  <div
                    key={e.id}
                    className="grid grid-cols-1 items-center gap-2 p-4 transition-colors hover:bg-[#1e032d]/60 sm:grid-cols-[140px_1fr_130px_110px]"
                  >
                    <span className="font-mono text-sm text-slate-400">{e.time}</span>
                    <span className="text-sm font-medium text-white">{e.topic}</span>
                    <span className="text-sm text-slate-300">{e.grade}</span>
                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${modeColor[e.mode] || "bg-slate-800 text-slate-300"}`}
                    >
                      {e.mode}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

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
"use client";

import Link from "next/link";
import settings from "@/data/settings.json";

function CodeIcon() {
  return (
    <svg className="w-5 h-5 text-[#f0822b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg className="w-5 h-5 text-[#8a00c2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 015.25 4.5h13.5a2.25 2.25 0 012.25 2.25v5.25a2.25 2.25 0 01-2.25 2.25m-13.5 0a2.25 2.25 0 00-2.25 2.25v5.25a2.25 2.25 0 002.25 2.25h13.5a2.25 2.25 0 002.25-2.25v-5.25a2.25 2.25 0 00-2.25-2.25M6.75 8.25h.008v.008H6.75V8.25zm0 9h.008v.008H6.75v-.008z" />
    </svg>
  );
}

function AcademicCapIcon() {
  return (
    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 fill-current text-[#27c93f]" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

const roadmaps = [
  {
    stage: "Stage 01",
    grades: "Grades 6 – 9",
    title: "Junior ICT Foundation",
    badge: "Early Start",
    badgeColor: "bg-[#f0822b]/10 border-[#f0822b]/30 text-[#f0822b]",
    desc: "Builds essential computational thinking and computer literacy long before national exams begin.",
    topics: [
      "Computer Fundamentals & Hardware",
      "Block Coding & Logic Thinking",
      "Office Productivity Suites",
      "Safe Internet & Cyber Ethics",
    ],
    icon: CodeIcon,
  },
  {
    stage: "Stage 02",
    grades: "Grades 10 – 11",
    title: "O/Level Masterclass",
    badge: "Core Syllabus",
    badgeColor: "bg-[#8a00c2]/20 border-[#8a00c2]/40 text-purple-300",
    desc: "Targeted national syllabus preparation designed to convert complex theory into guaranteed 'A' passes.",
    topics: [
      "Number Systems & Binary Logic",
      "Python Programming & Algorithms",
      "Database Design & SQL Queries",
      "Structured Past Paper Drilling",
    ],
    icon: ServerIcon,
  },
  {
    stage: "Stage 03",
    grades: "Grades 12 – 13",
    title: "A/Level Advanced ICT",
    badge: "Top Ranking",
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    desc: "Rigorous academic training for high A/L ranks, university computing pathways, and system architecture.",
    topics: [
      "Data Structures & Algorithm Complexity",
      "IP Networking & Routing Protocols",
      "System Engineering & ER Diagrams",
      "Data Security & Encryption",
    ],
    icon: AcademicCapIcon,
  },
];

export default function AcademicRoadmapSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white border-b border-slate-800 select-none">
      {/* Background Soft Glows */}
      <div className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#8a00c2]/20 blur-[150px]" />
      <div className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#f0822b]/15 blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-[#8a00c2]/20 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-purple-200 uppercase shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#f0822b] animate-ping" />
            Curriculum Structure
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
            A Clear Roadmap From <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#8a00c2] via-purple-300 to-[#f0822b] bg-clip-text text-transparent">
              Grade 6 to A/Level Success.
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed font-medium max-w-2xl mx-auto">
            Step-by-step academic progressions ensuring zero knowledge gaps as your child moves from secondary school into national board examinations.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.stage}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 p-7 sm:p-8 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#8a00c2]/60 hover:bg-slate-900"
              >
                {/* Background Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8a00c2] to-[#f0822b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Stage & Badge Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-extrabold text-[#f0822b] uppercase tracking-wider">
                      {item.stage} · {item.grades}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                      <Icon />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-[#f0822b] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {/* Key Topic Bullet Points */}
                  <div className="space-y-2.5 border-t border-white/10 pt-5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block mb-1">
                      Core Syllabus Focus:
                    </span>
                    {item.topics.map((tp) => (
                      <div key={tp} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f0822b] shrink-0" />
                        <span>{tp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Status */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Batch Availability</span>
                  <span className="text-emerald-400 font-bold">Enrolling Now</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Bar for Parents */}
        <div className="mt-12 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-[#8a00c2]/20 via-slate-900 to-[#f0822b]/20 p-6 sm:p-8 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl">
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider">
              Unsure Which Batch Fits Your Child?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Speak with Lavanya Teacher directly to discuss your child&apos;s current grade, school syllabus, and recommended timetable slot.
            </p>
          </div>

          <a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 shrink-0 rounded-xl bg-[#27c93f] px-6 py-3.5 text-xs font-extrabold text-slate-950 shadow-lg shadow-[#27c93f]/20 transition-all hover:bg-[#22b538] hover:scale-105"
          >
            <WhatsAppIcon />
            <span>Consult on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
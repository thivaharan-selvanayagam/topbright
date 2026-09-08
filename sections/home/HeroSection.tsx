"use client";

import { useState } from "react";
import Link from "next/link";
import settings from "@/data/settings.json";

export default function HeroSection() {
  const [hoveredGrade, setHoveredGrade] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden border-b border-[#8a00c2]/10 bg-gradient-to-b from-[#fdf8ff] via-white to-slate-50">
      <div className="absolute -left-20 -top-20 h-96 w-96 animate-pulse rounded-full bg-[#8a00c2]/10 blur-[120px]" />
      <div className="absolute -bottom-20 right-10 h-96 w-96 animate-pulse rounded-full bg-[#f0822b]/15 blur-[120px]" style={{ animationDuration: "6s" }} />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-15" />

      <div className="container-page relative z-20 grid gap-12 py-20 md:grid-cols-[1.15fr_1fr] md:py-28">
        <div>
          <p className="font-mono text-sm font-semibold text-[#8a00c2]">
            ICT Classes · Grade 6 – 12 · Batticaloa
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] text-slate-900 sm:text-5xl">
            Learn ICT the way it&apos;s actually examined —
            <span className="text-[#f0822b]"> with Lavanya.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600">
            Live online classes and physical classes in Batticaloa, one-to-one or in a group.
            Watch lesson videos, download model papers and tutes, and sit online exams that
            mark themselves the second you submit.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/timetable" className="group relative overflow-hidden rounded-md bg-[#8a00c2] px-6 py-3 text-sm font-medium text-white shadow-md shadow-[#8a00c2]/20 transition hover:bg-[#7200a3] focus-ring">
              <span className="relative z-10">View class timetable</span>
            </Link>
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="rounded-md border border-[#8a00c2]/30 bg-white px-6 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-[#f0822b] hover:text-[#f0822b] focus-ring">
              Message on WhatsApp
            </a>
          </div>

          <div className="mt-10 flex items-center gap-2 font-mono text-xs text-slate-500">
            <span className="flex h-2 w-2 animate-ping rounded-full bg-[#f0822b]" />
            Grades taught {hoveredGrade ? `(Grade ${hoveredGrade} Selected)` : ""}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-1">
            {["6", "7", "8", "9", "10", "11", "12"].map((g, i) => (
              <div key={g} className="flex items-center">
                <button
                  onMouseEnter={() => setHoveredGrade(g)}
                  onMouseLeave={() => setHoveredGrade(null)}
                  className={`flex h-9 w-9 items-center justify-center rounded-md border font-mono text-sm transition-all duration-200 ${
                    hoveredGrade === g ? "scale-110 border-[#f0822b] bg-[#f0822b] text-white shadow-md shadow-[#f0822b]/30" : "border-[#8a00c2]/20 bg-white text-slate-700 hover:border-[#8a00c2] hover:text-[#8a00c2]"
                  }`}
                >
                  {g}
                </button>
                {i < 6 && <span className="h-px w-3 bg-[#8a00c2]/20" />}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="group overflow-hidden rounded-lg border border-[#8a00c2]/20 bg-white shadow-xl shadow-purple-900/5 transition-all duration-300 hover:border-[#f0822b]/50">
            <div className="flex items-center gap-1.5 border-b border-[#8a00c2]/10 bg-[#fdf8ff] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f0822b]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-slate-500">student_dashboard.ts</span>
            </div>
            <div className="space-y-3 p-6 font-mono text-[13px] leading-relaxed">
              <p className="text-slate-400">// Grade 11 · Number Systems Quiz</p>
              <p>
                <span className="font-semibold text-[#8a00c2]">const</span> <span className="text-slate-800">student</span> ={" "}
                <span className="text-[#f0822b]">&quot;ICT2026001&quot;</span>;
              </p>
              <p>
                <span className="font-semibold text-[#8a00c2]">const</span> <span className="text-slate-800">result</span> ={" "}
                <span className="font-semibold text-[#8a00c2]">await</span> submitExam(student);
              </p>
              <div className="mt-4 rounded-md border border-[#8a00c2]/20 bg-[#fcf8ff] p-4 transition duration-300 group-hover:border-[#f0822b]/40">
                <p className="text-slate-500">score</p>
                <p className="mt-1 font-display text-3xl font-semibold text-[#f0822b]">9 / 10</p>
                <p className="mt-1 text-slate-400">submitted just now</p>
              </div>
              <p className="font-medium text-emerald-600">✓ Marks saved to your Student ID</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
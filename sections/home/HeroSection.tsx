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

      <div className="container-page relative z-20 grid gap-12 py-20 md:grid-cols-[1.15fr_1fr] md:py-28 items-center">
        {/* LEFT COLUMN: HERO CONTENT */}
        <div>
          <p className="font-mono text-sm font-semibold text-[#8a00c2]">
            ICT Classes · Grade 6 – 13 · Batticaloa
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
            <Link 
              href="/timetable" 
              className="group relative overflow-hidden rounded-md bg-[#8a00c2] px-6 py-3 text-sm font-medium text-white shadow-md shadow-[#8a00c2]/20 transition hover:bg-[#7200a3] focus-ring"
            >
              <span className="relative z-10">View class timetable</span>
            </Link>
            <a 
              href={`https://wa.me/${settings.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rounded-md border border-[#8a00c2]/30 bg-white px-6 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-[#f0822b] hover:text-[#f0822b] focus-ring"
            >
              Message on WhatsApp
            </a>
          </div>

          <div className="mt-10 flex items-center gap-2 font-mono text-xs text-slate-500">
            <span className="flex h-2 w-2 animate-ping rounded-full bg-[#f0822b]" />
            Grades taught {hoveredGrade ? `(Grade ${hoveredGrade} Selected)` : ""}
          </div>
          
          <div className="mt-3 flex flex-wrap items-center gap-1">
            {["6", "7", "8", "9", "10", "11", "12", "13"].map((g, i) => (
              <div key={g} className="flex items-center">
                <button
                  onMouseEnter={() => setHoveredGrade(g)}
                  onMouseLeave={() => setHoveredGrade(null)}
                  className={`flex h-9 w-9 items-center justify-center rounded-md border font-mono text-sm transition-all duration-200 ${
                    hoveredGrade === g 
                      ? "scale-110 border-[#f0822b] bg-[#f0822b] text-white shadow-md shadow-[#f0822b]/30" 
                      : "border-[#8a00c2]/20 bg-white text-slate-700 hover:border-[#8a00c2] hover:text-[#8a00c2]"
                  }`}
                >
                  {g}
                </button>
                {i < 7 && <span className="h-px w-3 bg-[#8a00c2]/20" />}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: EDUCATOR PROFILE WINDOW CARD */}
        <div className="relative">
          <div className="group overflow-hidden rounded-2xl border border-[#8a00c2]/20 bg-white shadow-2xl shadow-purple-900/10 transition-all duration-300 hover:border-[#f0822b]/50">
            
            {/* WINDOW TOP BAR */}
            <div className="flex items-center justify-between border-b border-[#8a00c2]/10 bg-[#fdf8ff] px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f0822b]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-3 font-mono text-xs font-semibold text-slate-500">Top Bright Academy</span>
              </div>
              <span className="rounded-full bg-[#8a00c2]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#8a00c2] uppercase tracking-wider">
                Lead Educator
              </span>
            </div>

            {/* LAVANYA PHOTO CONTAINER */}
            <div className="relative h-[380px] sm:h-[420px] w-full overflow-hidden bg-gradient-to-b from-[#8a00c2]/5 to-slate-100">
              <img
                src="/topbright_hero.webp"
                alt="Lavanya - Lead ICT Educator"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Gradient overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/10 via-slate-950/20 to-transparent" />

              {/* FLOATING OVERLAY BADGE */}
              {/* <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-white/90 p-4 backdrop-blur-md shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900">Lavanya</h3>
                    <p className="text-xs font-medium text-[#8a00c2]">Lead ICT Educator · Batticaloa</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0822b] text-white shadow-md shadow-[#f0822b]/30">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div> */}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
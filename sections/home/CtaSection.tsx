"use client";

import Link from "next/link";
import settings from "@/data/settings.json";

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg className="w-4 h-4 text-[#f0822b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  );
}

export default function CtaSection() {
  return (
    <section className="relative min-h-screen w-full bg-slate-950 text-white flex flex-col justify-center items-center overflow-hidden border-b border-slate-800 py-20 select-none">
      
      {/* Glowing Ambient Background Blurs */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] sm:h-[700px] sm:w-[700px] rounded-full bg-gradient-to-tr from-[#8a00c2]/30 to-[#f0822b]/20 blur-[150px] opacity-70" />
      
      {/* Background Dot Grid Effect */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center flex flex-col items-center my-auto">
        
        {/* Top Tag */}
        <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-[#8a00c2]/20 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-purple-200 uppercase shadow-lg shadow-[#8a00c2]/20 mb-8 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#f0822b] animate-ping" />
          Enrollment Open For 2026 Batches
        </span>

        {/* Hero Display Headline */}
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[1.08] max-w-4xl">
          Ready to achieve your target <br />
          <span className="bg-gradient-to-r from-[#8a00c2] via-purple-300 to-[#f0822b] bg-clip-text text-transparent">
            A Grade in ICT?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl font-medium leading-relaxed">
          Message Lavanya Teacher directly to inquire about class schedules, online &amp; physical batch openings, and enrollment details.
        </p>

        {/* Main CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Primary WhatsApp Button */}
          <a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-3 w-full sm:w-auto rounded-2xl bg-[#8a00c2] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#8a00c2]/30 transition-all duration-300 hover:bg-[#7200a3] hover:scale-105 active:scale-95 ring-2 ring-purple-400/30"
          >
            <WhatsAppIcon />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Secondary Contact / Timetable Link */}
          <Link
            href="/contact"
            className="group flex items-center justify-center gap-3 w-full sm:w-auto rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-white hover:text-slate-900 hover:border-white hover:scale-105 active:scale-95"
          >
            <span>Contact Page</span>
            <ArrowRightIcon />
          </Link>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-mono text-slate-300 font-semibold">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon />
            <span>Grades 6–13 Syllabus</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheckIcon />
            <span>Batticaloa &amp; Online Live</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheckIcon />
            <span>24/7 Student Portal Access</span>
          </div>
        </div>

      </div>
    </section>
  );
}
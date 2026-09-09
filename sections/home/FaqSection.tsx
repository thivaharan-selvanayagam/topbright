"use client";

import { useState } from "react";
import settings from "@/data/settings.json";

function HelpIcon() {
  return (
    <svg className="w-5 h-5 text-[#8a00c2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 18h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#8a00c2]" : "text-slate-400"}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

const faqs = [
  {
    q: "How do I enroll and receive my Student ID?",
    a: "Contact Lavanya Teacher directly via WhatsApp or phone. Once registered, your custom Student ID credentials will be generated for immediate portal access, video archives, and automated tests.",
  },
  {
    q: "Can I switch between physical and online classes?",
    a: "Yes! Both physical classes in Batticaloa and live online interactive streams follow the exact same syllabus pacing and weekly lesson schedule, allowing seamless flexibility.",
  },
  {
    q: "Are lesson recordings available immediately after class?",
    a: "Recordings are processed in high definition and uploaded to the Student Portal within 24 hours of each live session for 24/7 on-demand revision.",
  },
  {
    q: "How do online auto-marked exams work?",
    a: "Log in with your Student ID, navigate to 'My Exams', complete your timed MCQ or theory paper, and receive instant score breakdowns with step-by-step logic explanations.",
  },
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-slate-50/80 py-24 border-b border-slate-200">
      {/* Background Soft Ambient Lights */}
      <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#8a00c2]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#f0822b]/5 blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8a00c2]/20 bg-[#8a00c2]/5 px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-[#8a00c2] uppercase">
            <HelpIcon />
            FAQ &amp; Support
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            Frequently Asked <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#8a00c2] to-[#f0822b] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium">
            Everything you need to know about enrollment, class modes, student ID access, and online exam portals.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#8a00c2] bg-white shadow-lg shadow-[#8a00c2]/5 ring-1 ring-[#8a00c2]/20"
                    : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                {/* Active Left Accent Line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${
                    isOpen ? "bg-[#8a00c2]" : "bg-transparent"
                  }`}
                />

                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className={`font-display text-base sm:text-lg font-bold pr-4 transition-colors ${
                    isOpen ? "text-[#8a00c2]" : "text-slate-900 group-hover:text-[#8a00c2]"
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isOpen ? "bg-[#8a00c2]/10" : "bg-slate-100 group-hover:bg-slate-200"
                  }`}>
                    <ChevronIcon isOpen={isOpen} />
                  </div>
                </button>

                {/* Animated Dropdown Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Quick Help Prompt */}
        <div className="mt-12 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-display text-sm font-bold text-slate-900">Have a question not listed here?</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Message Lavanya Teacher directly for fee structures and batch openings.</p>
          </div>
          <a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 shrink-0 rounded-xl bg-[#f0822b] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#f0822b]/20 transition-all hover:bg-[#e07522] hover:-translate-y-0.5"
          >
            <WhatsAppIcon />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
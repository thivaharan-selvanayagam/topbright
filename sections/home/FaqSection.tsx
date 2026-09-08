"use client";

import { useState } from "react";

const faqs = [
  { q: "How do I enroll and receive my Student ID?", a: "Contact Lavanya directly via WhatsApp. Once registered, your custom credentials will be created for video and exam access." },
  { q: "Can I switch between physical and online classes?", a: "Yes! Both physical classes in Batticaloa and live online streams follow the identical syllabus and schedule." },
  { q: "Are lesson recordings available immediately after class?", a: "Recordings are uploaded to the Student Portal within 24 hours of each session for 24/7 access." },
  { q: "How do online auto-marked exams work?", a: "Log in with your Student ID, navigate to 'My Exams', complete the timed paper, and receive instant score breakdowns." },
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden border-b border-[#8a00c2]/10 bg-slate-50 py-20">
      <div className="container-page relative z-20 max-w-3xl">
        <div className="text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#f0822b]">
            FAQ
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, idx) => (
            <div key={faq.q} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="flex w-full items-center justify-between p-5 text-left font-display text-base font-semibold text-slate-900"
              >
                <span>{faq.q}</span>
                <span className="ml-4 font-mono text-lg text-[#8a00c2]">
                  {openFaq === idx ? "−" : "+"}
                </span>
              </button>
              {openFaq === idx && (
                <div className="border-t border-slate-100 p-5 pt-0 text-sm leading-relaxed text-slate-600">
                  <p className="pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
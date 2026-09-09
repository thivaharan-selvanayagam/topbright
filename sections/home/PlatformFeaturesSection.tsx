"use client";

import { useState } from "react";

export default function PlatformFeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: "marking",
      step: "01",
      badge: "Instant Evaluation",
      title: "Smart Auto-Marking",
      desc: "Submit your online MCQs and immediately get scored with detailed step-by-step logic breakdowns so you never repeat the same mistake.",
      accent: "#8a00c2",
      renderMockup: () => (
        <div className="w-full h-full bg-slate-950 rounded-2xl border border-purple-500/30 p-5 sm:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#8a00c2]/25 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-100">Grade 11 · Boolean Logic Quiz</span>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-400/40">
              PASSED
            </span>
          </div>

          {/* Question Mock */}
          <div className="my-4 space-y-3">
            <p className="text-xs font-mono text-slate-200 font-medium">Q3. Evaluate output for AND gate when A=1, B=0:</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-white/10 border border-white/15 text-slate-200">A) Output = 1</div>
              <div className="p-3 rounded-lg bg-emerald-500/25 border border-emerald-400/60 text-emerald-200 font-bold flex items-center justify-between">
                <span>B) Output = 0</span>
                <span className="text-emerald-300 font-extrabold">✓</span>
              </div>
            </div>
          </div>

          {/* Score Display Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#8a00c2]/40 via-purple-900/30 to-slate-900 border border-[#8a00c2]/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-purple-200 font-semibold block uppercase tracking-wider">Automated Score</span>
              <span className="text-2xl font-extrabold text-white">98 / 100</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-mono text-emerald-300 font-bold block">98% Accuracy</span>
              <span className="text-[10px] font-mono text-slate-300">Logged to Student ID</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "analytics",
      step: "02",
      badge: "Real-time Tracking",
      title: "Topic-by-Topic Analytics",
      desc: "Your portal automatically maps scores across all syllabus units. Visually inspect strength curves and know precisely which chapter to revise next.",
      accent: "#f0822b",
      renderMockup: () => (
        <div className="w-full h-full bg-slate-950 rounded-2xl border border-orange-500/30 p-5 sm:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-[#f0822b]/25 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <span className="text-xs font-mono font-bold text-slate-100">Syllabus Mastery Index</span>
            <span className="text-[11px] font-mono text-[#f0822b] font-extrabold bg-[#f0822b]/10 px-2 py-0.5 rounded border border-[#f0822b]/30">
              +14% vs Last Month
            </span>
          </div>

          {/* Skill Bars */}
          <div className="my-3 space-y-3.5">
            {[
              { subject: "Python Programming", score: 92, color: "bg-[#8a00c2]" },
              { subject: "Logic Gates & Circuits", score: 85, color: "bg-[#f0822b]" },
              { subject: "Database Management (SQL)", score: 78, color: "bg-emerald-400" },
            ].map((item) => (
              <div key={item.subject} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-200 font-medium">{item.subject}</span>
                  <span className="text-white font-extrabold">{item.score}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/10">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/15 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300">Recommended Focus:</span>
            <span className="text-[#f0822b] font-extrabold hover:underline cursor-pointer">Networking & IP Routing →</span>
          </div>
        </div>
      ),
    },
    {
      id: "qa",
      step: "03",
      badge: "Direct Guidance",
      title: "Direct Teacher Q&A",
      desc: "Never remain stuck on a past paper question. Send doubts straight to Lavanya Teacher via your dashboard or WhatsApp for direct assistance.",
      accent: "#8a00c2",
      renderMockup: () => (
        <div className="w-full h-full bg-slate-950 rounded-2xl border border-purple-500/30 p-5 sm:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#8a00c2] text-white text-xs font-extrabold flex items-center justify-center ring-2 ring-purple-300">
                LT
              </div>
              <div>
                <span className="text-xs font-bold text-white block leading-none">Lavanya Teacher</span>
                <span className="text-[10px] font-mono text-emerald-300 font-semibold">Online & Answering</span>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-white/15 text-slate-100 font-bold px-2 py-1 rounded border border-white/10">
              Fast Reply
            </span>
          </div>

          {/* Chat Messages */}
          <div className="my-3 space-y-3 font-sans">
            <div className="bg-slate-800 border border-white/10 text-slate-100 p-3 rounded-xl rounded-tl-none max-w-[88%] shadow-sm">
              <p className="text-xs leading-relaxed">Teacher, how do I calculate 2&apos;s complement for negative numbers in Q4?</p>
              <span className="text-[9px] font-mono text-slate-300 block text-right mt-1">10:14 AM</span>
            </div>
            <div className="bg-[#8a00c2]/40 border border-[#8a00c2]/60 text-white p-3 rounded-xl rounded-tr-none max-w-[88%] ml-auto shadow-sm">
              <p className="text-xs leading-relaxed font-medium">Invert all bits first (1&apos;s complement), then add 1 to the LSB! Here is the step-by-step PDF...</p>
              <span className="text-[9px] font-mono text-purple-200 block text-right mt-1 font-semibold">10:16 AM · Verified Answer</span>
            </div>
          </div>

          {/* Input Bar Mock */}
          <div className="p-2 rounded-lg bg-slate-900 border border-white/20 flex items-center justify-between text-xs text-slate-300 font-mono">
            <span className="pl-2">Type a question or attach past paper...</span>
            <span className="h-7 px-3 rounded bg-[#f0822b] text-white font-extrabold flex items-center justify-center text-[11px] shadow-md shadow-[#f0822b]/30">
              SEND
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28 text-white border-b border-slate-800">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[#8a00c2]/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/3 h-96 w-96 rounded-full bg-[#f0822b]/20 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8a00c2]/40 bg-[#8a00c2]/20 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-purple-200 uppercase shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#f0822b] animate-ping" />
            Inside The Platform
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
            A Dashboard Engineered For <span className="text-[#f0822b]">Top Marks.</span>
          </h2>
          <p className="mt-4 text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Eliminate exam uncertainty with an intelligent learning workspace designed specifically for Sri Lankan ICT syllabi.
          </p>
        </div>

        {/* Desktop Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Feature Selectors */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {features.map((feat, idx) => {
              const isSelected = activeFeature === idx;
              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveFeature(idx)}
                  className={`text-left p-6 rounded-2xl transition-all duration-300 border relative overflow-hidden ${
                    isSelected
                      ? "bg-slate-900 border-[#8a00c2] shadow-xl shadow-[#8a00c2]/20 translate-x-1 ring-1 ring-[#8a00c2]"
                      : "bg-slate-900/40 border-white/10 hover:border-white/25 hover:bg-slate-900/80"
                  }`}
                >
                  {/* Left Accent Bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${
                      isSelected ? "bg-[#f0822b]" : "bg-transparent"
                    }`}
                  />

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-extrabold text-[#f0822b]">{feat.step}</span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-200 px-2.5 py-0.5 rounded bg-white/10 border border-white/10">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold font-display transition-colors ${isSelected ? "text-white" : "text-slate-100"}`}>
                    {feat.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {feat.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Preview */}
          <div className="lg:col-span-7 h-[380px] sm:h-[420px] w-full">
            {features[activeFeature].renderMockup()}
          </div>

        </div>

      </div>
    </section>
  );
}
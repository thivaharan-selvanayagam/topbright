"use client";

import { useState } from "react";

// Strictly constrained SVG Icons
function BookIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 3m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18.75V5.25A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25v13.5A2.25 2.25 0 005.25 21z" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-[#27c93f] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

const offerings = [
  {
    id: "olevel",
    number: "01",
    badge: "Foundation & Core",
    title: "O/Level Core Syllabus",
    desc: "A step-by-step masterclass structured around the official national curriculum. We break down complex algorithmic thinking and theory into digestible modules.",
    points: [
      "Number Systems & Boolean Logic",
      "Database Management & SQL",
      "Python & Pascal Programming",
      "Past-Paper Breakdowns",
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    icon: BookIcon,
  },
  {
    id: "alevel",
    number: "02",
    badge: "Advanced Level",
    title: "A/Level Advanced ICT",
    desc: "Rigorous academic preparation designed for high-ranking A/Level results. We focus heavily on logical reasoning, system design, and advanced software concepts.",
    points: [
      "Data Structures & Algorithms",
      "IP Networking & Web Architecture",
      "Software Engineering & ER Diagrams",
      "Data Security & Cyber Laws",
    ],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    icon: TerminalIcon,
  },
  {
    id: "portal",
    number: "03",
    badge: "Self-Paced Learning",
    title: "Interactive Student Portal",
    desc: "Every enrolled student gets custom credentials to access automated mock exams, performance diagnostics, downloadable tutes, and class video archives.",
    points: [
      "Auto-marked MCQ Tests",
      "Unit-by-unit Diagnostics",
      "24/7 HD Class Recordings",
      "Downloadable Model Papers",
    ],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80",
    icon: LaptopIcon,
  },
];

export default function WhatWeOfferSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = offerings[activeTab];
  const IconComponent = current.icon;

  return (
    <section className="relative w-full bg-slate-50 border-b border-slate-200 
      /* Viewport constraints for desktop - locks it to screen height */
      lg:h-[calc(100vh-80px)] lg:max-h-[850px] lg:min-h-[650px] 
      flex flex-col py-10 lg:py-12"
    >
      <div className="container-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col h-full">
        
        {/* HEADER ROW - Takes up minimal space */}
        <div className="flex-shrink-0 mb-6 lg:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8a00c2]/20 bg-[#8a00c2]/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#8a00c2]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f0822b]" />
              What We Offer
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl uppercase">
              Comprehensive ICT Pathways
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md md:text-right font-medium leading-relaxed">
            Tailored learning streams engineered to take students from core computer literacy to top-tier national examination ranks.
          </p>
        </div>

        {/* MAIN STAGE GRID - Fills the remaining viewport height perfectly */}
        <div className="flex-1 grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-12 min-h-0">
          
          {/* TAB BUTTONS (LEFT - 4 COLS) */}
          <div className="lg:col-span-4 flex flex-col gap-3 lg:h-full lg:overflow-y-auto overflow-x-hidden pr-1 pb-1">
            {offerings.map((item, index) => {
              const isActive = activeTab === index;
              const ItemIcon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(index)}
                  className={`group relative flex items-center justify-between rounded-2xl p-4 lg:p-5 text-left transition-all duration-300 border flex-1 ${
                    isActive
                      ? "border-[#8a00c2] bg-[#fdf8ff] shadow-md shadow-[#8a00c2]/5 scale-[1.01]"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isActive
                          ? "bg-[#8a00c2] text-white shadow-sm"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                      }`}
                    >
                      <ItemIcon />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] font-bold text-[#f0822b]">
                          {item.number}
                        </span>
                        <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          {item.badge}
                        </span>
                      </div>
                      <h3
                        className={`font-display text-sm lg:text-base font-bold transition-colors ${
                          isActive ? "text-[#8a00c2]" : "text-slate-800"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className={`transition-colors ${isActive ? "text-[#8a00c2]" : "text-slate-300 group-hover:text-slate-400"}`}>
                    <ChevronRightIcon />
                  </div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE CONTENT DISPLAY (RIGHT - 8 COLS) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/50 bg-slate-900 lg:h-full h-[500px]">
            
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full">
              <img
                key={current.id}
                src={current.image}
                alt={current.title}
                className="absolute inset-0 h-full w-full object-cover animate-image-fade opacity-80 mix-blend-overlay"
                loading="lazy"
              />
              {/* Dark Gradient Overlay to make text readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0114] via-[#0d0114]/60 to-transparent" />
            </div>

            {/* Content Displayed ON TOP of the image */}
            <div className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-end z-10 text-white animate-content-fade">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8a00c2] shadow-lg">
                    <IconComponent />
                  </span>
                  <span className="rounded-md bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-[#f0822b] uppercase">
                    {current.badge}
                  </span>
                </div>

                <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
                  {current.title}
                </h3>
                
                <p className="text-sm lg:text-base leading-relaxed text-slate-300 mb-6 max-w-xl">
                  {current.desc}
                </p>

                {/* 2-Column Grid for Feature Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {current.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-2.5 text-xs lg:text-sm text-slate-200 font-medium">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white/10">
                        <CheckIcon />
                      </div>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Call to Action Button */}
                <a
                  href="/timetable"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#f0822b] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#f0822b]/20 transition-all hover:bg-[#e07522] hover:-translate-y-0.5"
                >
                  <span>Explore Timetable & Batches</span>
                  <ChevronRightIcon />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Smooth CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes imageFade {
          0% { opacity: 0.3; transform: scale(1.03); filter: blur(2px); }
          100% { opacity: 0.8; transform: scale(1); filter: blur(0px); }
        }
        @keyframes contentFade {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-image-fade {
          animation: imageFade 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-content-fade {
          animation: contentFade 0.4s ease-out 0.1s forwards;
        }
      `}} />
    </section>
  );
}
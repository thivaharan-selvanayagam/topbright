"use client";

import { useState } from "react";

// --- Native SVG Icons ---
function BookIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 3m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18.75V5.25A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25v13.5A2.25 2.25 0 005.25 21z" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
  );
}

// --- Content Data ---
const offerings = [
  {
    id: "olevel",
    num: "01",
    title: "O/Level Core Syllabus",
    shortTitle: "O/LEVEL SYLLABUS",
    description: "Master Number Systems, Boolean Logic, Database Management, and basic programming to secure your 'A' grade. We build strong theoretical foundations.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    icon: BookIcon,
  },
  {
    id: "alevel",
    num: "02",
    title: "A/Level Advanced ICT",
    shortTitle: "A/LEVEL ADVANCED",
    description: "Deep dive into Data Structures, Algorithm Design, Networking, and Systems Analysis tailored for national Advanced Level examination standards.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    icon: TerminalIcon,
  },
  {
    id: "practical",
    num: "03",
    title: "Interactive Student Portal",
    shortTitle: "EXAM VAULT & PORTAL",
    description: "Sit auto-marked online tests with your custom Student ID, track unit-by-unit score analytics, and watch 24/7 recorded lesson revisions.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop",
    icon: LaptopIcon,
  },
];

export default function WhatWeOfferSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = offerings[activeIdx];
  const ActiveIcon = activeItem.icon;

  return (
    <section className="bg-white py-20 lg:py-28 select-none border-b border-slate-100">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* HEADER AREA */}
        <div className="mb-14 lg:mb-16">
          <span className="inline-block rounded-full border border-[#8a00c2]/20 bg-[#8a00c2]/5 px-4 py-1.5 text-[11px] font-bold tracking-widest text-[#8a00c2] uppercase mb-5">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-slate-900 tracking-tight uppercase leading-tight mb-4">
            COMPREHENSIVE ICT LEARNING PATHWAYS
          </h2>
          <p className="text-slate-500 max-w-2xl text-sm md:text-base font-medium leading-relaxed">
            From Grade 6 fundamentals to A/Level examination mastery, explore our structured learning modules designed for top academic results.
          </p>
        </div>

        {/* 3-COLUMN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 lg:h-[500px]">
          
          {/* COLUMN 1: Description (Left) */}
          <div className="lg:w-[25%] flex flex-col justify-end pb-4 order-2 lg:order-1">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8a00c2] shadow-lg shadow-[#8a00c2]/30">
              <ActiveIcon />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
              {activeItem.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed pr-4 font-medium">
              {activeItem.description}
            </p>
          </div>

          {/* COLUMN 2: Main Image with Cutout (Center) */}
          <div className="lg:w-[60%] relative h-[400px] lg:h-full rounded-[2.5rem] overflow-hidden order-1 lg:order-2 bg-slate-900 shadow-xl border border-slate-100">
            {/* Image (With background color fallback if image fails to load) */}
            <img 
              key={activeItem.id}
              src={activeItem.image} 
              alt={activeItem.title}
              className="absolute inset-0 w-full h-full object-cover opacity-90 animate-fade-in"
            />
            
            {/* The Bottom-Right Cutout Box */}
            <div className="absolute bottom-0 right-0 bg-white rounded-tl-[2rem] pl-8 pt-8 pr-8 pb-6 flex items-center gap-4 z-20">
              
              {/* Top Smooth Corner */}
              <div className="absolute bottom-full right-0 w-8 h-8 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-transparent rounded-full shadow-[20px_20px_0_0_white]" />
              </div>
              
              {/* Left Smooth Corner */}
              <div className="absolute bottom-0 right-full w-8 h-8 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-transparent rounded-full shadow-[20px_20px_0_0_white]" />
              </div>

              {/* Cutout Content */}
              <span className="text-5xl font-light text-[#8a00c2] tracking-tight">
                {activeItem.num}
              </span>
              <span className="text-sm font-bold text-slate-900 w-[120px] leading-tight">
                {activeItem.title}
              </span>
            </div>
          </div>

          {/* COLUMN 3: Vertical Navigation Pills (Right) */}
          <div className="lg:w-[15%] flex flex-row lg:flex-row justify-end gap-3 lg:gap-4 order-3 h-[100px] lg:h-full">
            {offerings.map((item, idx) => {
              if (idx === activeIdx) return null; // Hide the active item from the side pills
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  className="group relative flex flex-col items-center justify-between py-6 w-full lg:w-[72px] h-full rounded-2xl lg:rounded-full border border-slate-200 bg-white hover:border-[#8a00c2] hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Top Arrow Icon */}
                  <svg className="w-5 h-5 text-slate-300 group-hover:text-[#8a00c2] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>

                  {/* Bulletproof Vertical Text Container */}
                  <div className="hidden lg:flex flex-1 relative w-full items-center justify-center">
                    <span className="absolute -rotate-90 whitespace-nowrap text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] group-hover:text-slate-800 transition-colors">
                      {item.shortTitle}
                    </span>
                  </div>

                  {/* Mobile Fallback Text */}
                  <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase">
                    {item.shortTitle}
                  </span>

                  {/* Bottom Number */}
                  <span className="text-2xl lg:text-3xl font-light text-slate-300 group-hover:text-[#f0822b] transition-colors">
                    {item.num}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Simple Image Crossfade Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes basicFadeIn {
          from { opacity: 0.5; filter: blur(4px); }
          to { opacity: 0.9; filter: blur(0px); }
        }
        .animate-fade-in {
          animation: basicFadeIn 0.5s ease-out forwards;
        }
      `}} />
    </section>
  );
}
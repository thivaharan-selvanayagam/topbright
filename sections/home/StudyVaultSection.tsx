"use client";

import Link from "next/link";

function VaultFolderIcon() {
  return (
    <svg className="w-6 h-6 text-[#8a00c2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}

function PdfFileIcon() {
  return (
    <svg className="w-5 h-5 text-[#8a00c2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function InteractiveTestIcon() {
  return (
    <svg className="w-5 h-5 text-[#f0822b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.037-.502.082-.75.136M9.75 3.104l-2.03-1.015a.75.75 0 00-1.045.335L4.5 6.75M9.75 8.818l7.5-3.75M12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

const sampleResources = [
  {
    title: "Grade 11 ICT Model Paper 2026",
    type: "Model Paper",
    format: "PDF Document",
    size: "2.4 MB",
    badgeBg: "bg-[#8a00c2]/10 text-[#8a00c2] border-[#8a00c2]/20",
    icon: PdfFileIcon,
    link: "/downloads",
  },
  {
    title: "Python Programming Quick Summary",
    type: "Study Tute",
    format: "PDF Handbook",
    size: "1.8 MB",
    badgeBg: "bg-[#f0822b]/10 text-[#f0822b] border-[#f0822b]/20",
    icon: PdfFileIcon,
    link: "/downloads",
  },
  {
    title: "Number Systems Practice Revision",
    type: "Past Paper",
    format: "Interactive Test",
    size: "Online Mock",
    badgeBg: "bg-[#8a00c2]/10 text-[#8a00c2] border-[#8a00c2]/20",
    icon: InteractiveTestIcon,
    link: "/downloads",
  },
];

export default function StudyVaultSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 border-b border-slate-800 text-white select-none">
      {/* Background Soft Glows - Adjusted for Dark Mode */}
      <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#8a00c2]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#f0822b]/10 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-800 bg-purple-950 px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-[#8a00c2] uppercase">
              <VaultFolderIcon />
              Study Vault
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              Recent Model Papers <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#8a00c2] to-[#f0822b] bg-clip-text text-transparent">
                &amp; Study Tutes.
              </span>
            </h2>
          </div>

          <Link
            href="/downloads"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-900/50 transition-all hover:bg-purple-700 hover:-translate-y-0.5"
          >
            <span>View All Downloads</span>
            <ArrowRightIcon />
          </Link>
        </div>

        {/* Resources Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sampleResources.map((res) => {
            const IconComponent = res.icon;
            return (
              <div
                key={res.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-2xl shadow-slate-950/20 transition-all duration-300 hover:-translate-y-2 hover:border-purple-800 hover:shadow-purple-950/30"
              >
                {/* Dynamic gradient background effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-800/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${res.badgeBg}`}>
                      <IconComponent />
                      {res.type}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-500">
                      {res.size}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-white leading-snug">
                    {res.title}
                  </h3>

                  {/* Format Subtitle */}
                  <p className="mt-2 font-mono text-xs text-slate-400 font-medium">
                    Format: <span className="text-slate-200 font-semibold">{res.format}</span>
                  </p>
                </div>

                {/* Bottom CTA Button Line */}
                <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between relative z-10">
                  <Link
                    href={res.link}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#8a00c2] group-hover:text-[#f0822b] transition-colors"
                  >
                    <span>Download Resource</span>
                    <DownloadIcon />
                  </Link>

                  <div className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-[#f0822b] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
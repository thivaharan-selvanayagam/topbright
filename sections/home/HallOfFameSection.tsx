"use client";

function TrophyIcon() {
  return (
    <svg className="w-5 h-5 text-[#f0822b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 017.5 15.375V18.75m9 0h-9M3.75 6h16.5M3.75 6A2.25 2.25 0 001.5 8.25v1.5a4.5 4.5 0 004.5 4.5h.375m12.375-10.5A2.25 2.25 0 0121 8.25v1.5a4.5 4.5 0 01-4.5 4.5h-.375M3.75 6h16.5M7.5 12h9" />
    </svg>
  );
}

function SchoolIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#f0822b]" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

const topAchievers = [
  {
    name: "M. Nithusha",
    exam: "O/L ICT Batch",
    score: "A Grade",
    school: "Vembadi Girls High School",
    initials: "MN",
    highlight: "Top Performance",
  },
  {
    name: "K. Abinesh",
    exam: "O/L ICT Batch",
    score: "A Grade",
    school: "St. Michael's College",
    initials: "KA",
    highlight: "Distinction",
  },
  {
    name: "R. Shalini",
    exam: "A/L ICT Batch",
    score: "A Grade",
    school: "Cecilia's Girls' College",
    initials: "RS",
    highlight: "High Achiever",
  },
];

export default function HallOfFameSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50/80 py-24 border-b border-slate-200">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#8a00c2]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#f0822b]/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8a00c2]/20 bg-[#8a00c2]/5 px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-[#8a00c2] uppercase">
            <TrophyIcon />
            National Results
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            Hall of <span className="bg-gradient-to-r from-[#8a00c2] to-[#f0822b] bg-clip-text text-transparent">Fame</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium">
            Celebrating our top achievers who have secured outstanding A-grade results in national examinations.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {topAchievers.map((student) => (
            <div
              key={student.name}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#8a00c2]/40 hover:shadow-xl hover:shadow-[#8a00c2]/5"
            >
              {/* Background Trophy Watermark */}
              <div className="pointer-events-none absolute -right-6 -bottom-6 opacity-5 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-10 text-[#8a00c2]">
                <svg className="w-36 h-36" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                </svg>
              </div>

              <div>
                {/* Top Badge & Score Row */}
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#f0822b]/10 px-2.5 py-1 font-mono text-[10px] font-bold text-[#f0822b] uppercase tracking-wider">
                    <StarIcon />
                    {student.highlight}
                  </span>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 font-mono text-xs font-extrabold text-emerald-600">
                    {student.score}
                  </span>
                </div>

                {/* Avatar & Info */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8a00c2] to-purple-900 text-white font-mono font-extrabold text-lg shadow-md shadow-[#8a00c2]/20 ring-4 ring-purple-50 transition-transform group-hover:scale-105">
                    {student.initials}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-[#8a00c2]">
                      {student.name}
                    </h3>
                    <p className="font-mono text-xs font-semibold text-[#f0822b] mt-0.5">
                      {student.exam}
                    </p>
                  </div>
                </div>
              </div>

              {/* School Tag Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                <SchoolIcon />
                <span className="truncate">{student.school}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
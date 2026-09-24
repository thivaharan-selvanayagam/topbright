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
    <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
    image: "/1.webp",
    highlight: "Top Performance",
  },
  {
    name: "K. Abinesh",
    exam: "O/L ICT Batch",
    score: "A Grade",
    school: "St. Michael's College",
    image: "/3.webp",
    highlight: "Distinction",
  },
  {
    name: "R. Shalini",
    exam: "A/L ICT Batch",
    score: "A Grade",
    school: "Cecilia's Girls' College",
    image: "/2.webp",
    highlight: "High Achiever",
  },
];

export default function HallOfFameSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 border-b border-white/5 select-none">
      
      {/* Dynamic Background Glows */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#8a00c2]/15 blur-[160px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#f0822b]/10 blur-[160px]" />
      
      {/* Dot Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-purple-300 uppercase shadow-lg shadow-purple-900/20 backdrop-blur-md">
            <TrophyIcon />
            National Results
          </span>
          <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-tight">
            Hall of <span className="bg-gradient-to-r from-[#8a00c2] via-purple-300 to-[#f0822b] bg-clip-text text-transparent">Fame</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-slate-400 font-medium max-w-xl leading-relaxed">
            Celebrating our top achievers who have secured outstanding A-grade results in their national examinations.
          </p>
        </div>

        {/* Glowing Plaque Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {topAchievers.map((student) => (
            <div
              key={student.name}
              className="group relative rounded-3xl p-[1px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#8a00c2]/20"
            >
              {/* Animated Gradient Border Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent transition-all duration-500 group-hover:from-[#8a00c2]/80 group-hover:via-[#f0822b]/50 group-hover:to-transparent" />
              
              {/* Inner Card Content */}
              <div className="relative flex h-full flex-col justify-between rounded-[23px] bg-slate-900/90 backdrop-blur-xl p-8 overflow-hidden">
                
                {/* Decorative Background Icon */}
                <div className="pointer-events-none absolute -right-8 -bottom-8 text-white transition-transform duration-700 opacity-[0.02] group-hover:scale-110 group-hover:opacity-[0.05] group-hover:text-[#f0822b] group-hover:rotate-12">
                  <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                  </svg>
                </div>

                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f0822b]/10 border border-[#f0822b]/20 px-3 py-1.5 font-mono text-[10px] font-bold text-[#f0822b] uppercase tracking-widest shadow-sm">
                      <StarIcon />
                      {student.highlight}
                    </span>
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-400/30 px-3.5 py-1 font-mono text-xs font-extrabold text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                      {student.score}
                    </span>
                  </div>

                  {/* Profile Image Section */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-5">
                      {/* Image Glow Ring */}
                      <div className="absolute inset-0 rounded-full bg-[#8a00c2] blur-md opacity-30 transition-opacity duration-300 group-hover:opacity-75" />
                      
                      {/* Student Image */}
                      <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-white/10 shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:border-[#f0822b]/50">
                        <img
                          src={student.image}
                          alt={student.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#f0822b]">
                      {student.name}
                    </h3>
                    <p className="font-mono text-xs font-semibold text-[#8a00c2] mt-1.5 uppercase tracking-widest bg-[#8a00c2]/10 px-3 py-1 rounded-full inline-block border border-[#8a00c2]/20">
                      {student.exam}
                    </p>
                  </div>
                </div>

                {/* Footer / School */}
                <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-center gap-2.5 text-xs font-medium text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  <SchoolIcon />
                  <span className="truncate">{student.school}</span>
                </div>
                
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
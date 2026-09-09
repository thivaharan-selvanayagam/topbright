"use client";

function IdCardIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3m-3 3h3m-3 3h3M3 6h18a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2z" />
    </svg>
  );
}

function ClassIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function LibraryIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function ExamIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const steps = [
  {
    n: "01",
    title: "Get your Student ID",
    body: "Lavanya sets up a unique login credential for your custom portal access when you join.",
    icon: IdCardIcon,
    color: "#8a00c2",
  },
  {
    n: "02",
    title: "Attend your classes",
    body: "Online live sessions or physical classes in Batticaloa, choose one-to-one or group modes.",
    icon: ClassIcon,
    color: "#f0822b",
  },
  {
    n: "03",
    title: "Study with materials",
    body: "Replay HD lesson video archives, download past papers, model tutes, and reference books.",
    icon: LibraryIcon,
    color: "#8a00c2",
  },
  {
    n: "04",
    title: "Sit exams & get marks",
    body: "Log into the portal, complete timed MCQ tests, and see your score and logic answers instantly.",
    icon: ExamIcon,
    color: "#f0822b",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50/80 py-24 border-b border-slate-200/80">
      {/* Background Ambient Accents */}
      <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#8a00c2]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#f0822b]/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8a00c2]/20 bg-[#8a00c2]/5 px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-[#8a00c2] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f0822b]" />
            Four Simple Steps
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            From your first class to <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#8a00c2] to-[#f0822b] bg-clip-text text-transparent">
              your first exam mark.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium">
            A seamless structured workflow designed to guide students effortlessly through learning and self-assessment.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Gradient Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-1 bg-gradient-to-r from-[#8a00c2] via-[#f0822b] to-[#8a00c2] opacity-20 rounded-full z-0" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.n}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#8a00c2]/40 hover:shadow-xl hover:shadow-[#8a00c2]/5"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white font-mono text-base font-extrabold shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#8a00c2]">
                        {s.n}
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors duration-300 group-hover:bg-[#f0822b]/10 group-hover:text-[#f0822b]">
                        <Icon />
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-bold text-slate-900 transition-colors duration-200 group-hover:text-[#8a00c2]">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
                      {s.body}
                    </p>
                  </div>

                  {/* Accent Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Step {s.n}
                    </span>
                    <div
                      className="h-1 w-8 rounded-full transition-all duration-300 group-hover:w-16"
                      style={{ backgroundColor: s.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
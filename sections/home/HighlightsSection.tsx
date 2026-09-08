function HighlightIcon({ id }: { id: string }) {
  if (id === "classes") {
    return (
      <svg className="h-6 w-6 text-[#8a00c2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    );
  }
  if (id === "flexibility") {
    return (
      <svg className="h-6 w-6 text-[#f0822b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  }
  if (id === "resources") {
    return (
      <svg className="h-6 w-6 text-[#8a00c2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6 text-[#f0822b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const highlights = [
  { id: "classes", badge: "Class Modes", title: "Online & physical classes", body: "Join live from anywhere, or attend in person in Batticaloa — same syllabus, same pace.", accentColor: "#8a00c2", bgTint: "bg-[#8a00c2]/10" },
  { id: "flexibility", badge: "Flexibility", title: "One-to-one & group sessions", body: "Personal attention when you need it, or learn alongside classmates in small groups.", accentColor: "#f0822b", bgTint: "bg-[#f0822b]/10" },
  { id: "resources", badge: "Study Resources", title: "Videos, papers & tutes", body: "Recorded lessons, model papers, past papers and books — all in one place, ready to download.", accentColor: "#8a00c2", bgTint: "bg-[#8a00c2]/10" },
  { id: "exams", badge: "Assessments", title: "Online exams, instant marks", body: "Sit a test with your own Student ID and see your score the moment you submit — no waiting.", accentColor: "#f0822b", bgTint: "bg-[#f0822b]/10" },
];

export default function HighlightsSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#8a00c2]/10 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-24">
      <div className="container-page relative z-20">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8a00c2]/20 bg-[#8a00c2]/5 px-3 py-1 text-xs font-semibold text-[#8a00c2]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f0822b]" />
            Complete Learning Platform
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need for ICT, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#8a00c2] to-[#f0822b] bg-clip-text text-transparent">
              in one place.
            </span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#8a00c2]/30 hover:shadow-xl hover:shadow-[#8a00c2]/5">
              <div className="absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ backgroundColor: h.accentColor }} />
              <div>
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${h.bgTint}`}>
                    <HighlightIcon id={h.id} />
                  </div>
                  <span className="font-mono text-[11px] font-medium tracking-wider text-slate-400 uppercase">{h.badge}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-slate-900 transition-colors group-hover:text-[#8a00c2]">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{h.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
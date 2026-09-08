function HighlightIcon({ id }: { id: string }) {
  if (id === "classes") {
    return (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    );
  }
  if (id === "flexibility") {
    return (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  }
  if (id === "resources") {
    return (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const highlights = [
  {
    id: "classes",
    badge: "Class Modes",
    title: "Online & physical classes",
    body: "Join live from anywhere, or attend in person in Batticaloa — same syllabus, same pace.",
    accentColor: "#8a00c2",
    iconBg: "bg-[#8a00c2]",
    // Grade 6-11 classroom environment
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "flexibility",
    badge: "Flexibility",
    title: "One-to-one & group sessions",
    body: "Personal attention when you need it, or learn alongside classmates in small groups.",
    accentColor: "#f0822b",
    iconBg: "bg-[#f0822b]",
    // Secondary school students studying together
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "resources",
    badge: "Study Resources",
    title: "Videos, papers & tutes",
    body: "Recorded lessons, model papers, past papers and books — all in one place, ready to download.",
    accentColor: "#8a00c2",
    iconBg: "bg-[#8a00c2]",
    // Young school student writing notes & reviewing papers
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "exams",
    badge: "Assessments",
    title: "Online exams, instant marks",
    body: "Sit a test with your own Student ID and see your score the moment you submit — no waiting.",
    accentColor: "#f0822b",
    iconBg: "bg-[#f0822b]",
    // High school student taking an online test on a laptop
    image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=800&auto=format&fit=crop",
  },
];

export default function HighlightsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50/80 py-24 border-b border-slate-100">
      <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-[#8a00c2]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-[#f0822b]/5 blur-3xl" />

      <div className="container-page relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8a00c2]/20 bg-[#8a00c2]/5 px-3.5 py-1 text-xs font-semibold text-[#8a00c2]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f0822b]" />
            Complete Learning Platform
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need for ICT, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#8a00c2] to-[#f0822b] bg-clip-text text-transparent">
              in one place.
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
            A unified digital ecosystem combining interactive lectures, revision vaults, and instant assessment feedback.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#8a00c2]/40 hover:shadow-xl hover:shadow-[#8a00c2]/5"
            >
              {/* Card Header Image */}
              <div className="relative h-40 w-full overflow-hidden rounded-t-2xl bg-slate-100">
                <img
                  src={h.image}
                  alt={h.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                <div className="absolute top-3 right-3">
                  <span className="rounded-md border border-slate-200/80 bg-white/90 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-slate-700 uppercase shadow-sm backdrop-blur-sm">
                    {h.badge}
                  </span>
                </div>
              </div>

              {/* Floating Icon Badge (Placed Outside Image Wrapper) */}
              <div className="relative px-6">
                <div className={`absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-xl ${h.iconBg} shadow-md shadow-[#8a00c2]/20 ring-4 ring-white z-10`}>
                  <HighlightIcon id={h.id} />
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-6 pt-8">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-[#8a00c2]">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {h.body}
                  </p>
                </div>

                <div
                  className="mt-6 h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: h.accentColor }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
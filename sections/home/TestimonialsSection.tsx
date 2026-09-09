"use client";

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-[#f0822b]" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg className="w-8 h-8 text-[#8a00c2]/15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

const testimonials = [
  {
    quote: "Teacher's explanation of Number Systems made O/L ICT effortless. The instant online quizzes helped me get my 'A' pass!",
    name: "S. Kaviraj",
    grade: "Grade 11 Student",
    result: "A Grade in O/L ICT",
    initials: "SK",
    avatarBg: "from-[#8a00c2] to-purple-800",
  },
  {
    quote: "Having access to recorded lessons whenever I miss a class saved my term test scores. The tutes are very detailed.",
    name: "F. Ayesha",
    grade: "Grade 12 Student",
    result: "Top Batch Ranker",
    initials: "FA",
    avatarBg: "from-[#f0822b] to-amber-700",
  },
  {
    quote: "The one-to-one sessions fixed all my weaknesses in Python programming. Highly recommend TopBright Academy!",
    name: "T. Dilakshan",
    grade: "Grade 10 Student",
    result: "Score: 94/100",
    initials: "TD",
    avatarBg: "from-[#8a00c2] to-[#f0822b]",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50/80 py-24 border-b border-slate-200">
      {/* Background Soft Glows */}
      <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#8a00c2]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#f0822b]/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f0822b]/30 bg-[#f0822b]/10 px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-[#f0822b] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8a00c2]" />
            Student Stories
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            Trusted across <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#8a00c2] to-[#f0822b] bg-clip-text text-transparent">
              Batticaloa & Online
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium">
            Real feedback from students who transformed their ICT understanding and examination ranks.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#8a00c2]/40 hover:shadow-xl hover:shadow-[#8a00c2]/5"
            >
              {/* Background Quote Watermark */}
              <div className="absolute top-6 right-6 transition-transform duration-300 group-hover:scale-110">
                <QuoteIcon />
              </div>

              <div className="relative z-10">
                {/* 5 Star Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base leading-relaxed text-slate-700 font-medium italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Footer / Student Info */}
              <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${t.avatarBg} text-white font-mono font-bold text-sm shadow-md ring-2 ring-slate-100`}>
                    {t.initials}
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-slate-900 group-hover:text-[#8a00c2] transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-xs font-mono font-medium text-slate-400">
                      {t.grade}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full border border-[#8a00c2]/20 bg-[#8a00c2]/5 px-3 py-1 font-mono text-[11px] font-bold text-[#8a00c2] shadow-sm">
                  {t.result}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
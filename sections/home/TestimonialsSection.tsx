const testimonials = [
  {
    quote: "Teacher's explanation of Number Systems made O/L ICT effortless. The instant online quizes helped me get my 'A' pass!",
    name: "S. Kaviraj",
    grade: "Grade 11 Student",
    result: "A Grade in O/L ICT",
  },
  {
    quote: "Having access to recorded lessons whenever I miss a class saved my term test scores. The tutes are very detailed.",
    name: "F. Ayesha",
    grade: "Grade 12 Student",
    result: "Top Batch Ranker",
  },
  {
    quote: "The one-to-one sessions fixed all my weaknesses in Python programming. Highly recommend TopBright Academy!",
    name: "T. Dilakshan",
    grade: "Grade 10 Student",
    result: "Score: 94/100",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#8a00c2]/10 bg-white py-20">
      <div className="container-page relative z-20">
        <div className="text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#f0822b]">
            Student Stories
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
            Trusted by students across Batticaloa &amp; online.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50 p-8 shadow-sm">
              <svg className="absolute top-6 right-6 w-8 h-8 text-slate-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="relative z-10 text-sm italic leading-relaxed text-slate-700">&quot;{t.quote}&quot;</p>
              <div className="relative z-10 mt-8 flex items-center justify-between border-t border-slate-200 pt-4">
                <div>
                  <h4 className="font-display text-sm font-semibold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.grade}</p>
                </div>
                <span className="rounded-full border border-[#8a00c2]/20 bg-[#8a00c2]/10 px-2.5 py-1 font-mono text-xs font-semibold text-[#8a00c2]">
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
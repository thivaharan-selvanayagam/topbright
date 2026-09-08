import Link from "next/link";

const whyChooseUs = [
  { title: "Tailored Exam Strategy", desc: "We dissect past national papers to teach exactly what examiners are looking for.", stat: "98%", statLabel: "Exam Pass Rate" },
  { title: "24/7 Recorded Revisions", desc: "Every live class is archived in HD. Revisit complex topics anytime before term tests.", stat: "500+", statLabel: "Video Hours" },
  { title: "Instant Diagnostic Marks", desc: "Get instant automated breakdowns for your online exams to spot weak units instantly.", stat: "Live", statLabel: "Test Analytics" },
];

export default function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#8a00c2]/10 bg-white py-24">
      {/* Abstract Background SVG Wave */}
      <svg className="absolute top-0 right-0 text-[#8a00c2]/5 w-[600px] h-auto -translate-y-20 translate-x-32" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.1,-46.1C90.4,-33.1,96.1,-16.5,95.5,-0.3C94.9,15.9,88.1,31.8,78.3,45.4C68.5,59,55.8,70.2,41.2,77.7C26.5,85.2,10,88.9,-5.3,86.5C-20.6,84,-34.7,75.3,-48.5,65.8C-62.3,56.3,-75.8,45.9,-83.4,32.3C-91,18.7,-92.7,1.8,-88.9,-13.7C-85.1,-29.2,-75.7,-43.3,-63.5,-52.8C-51.3,-62.3,-36.3,-67.2,-22.4,-72.6C-8.5,-78.1,4.3,-84,17.4,-82.5C30.5,-81,43.6,-72.2,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>

      <div className="container-page relative z-20">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#f0822b]">
              Why TopBright Academy
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
              Built specifically for Sri Lankan ICT syllabus excellence.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              We don&apos;t just teach computer literacy. We prepare students for national examination standards with structured revision modules, real-time diagnostic testing, and active tutor guidance to ensure an &quot;A&quot; grade is always within reach.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link href="/about" className="inline-flex items-center gap-2 rounded-lg bg-[#8a00c2]/10 px-5 py-2.5 text-sm font-semibold text-[#8a00c2] transition hover:bg-[#8a00c2]/20">
                Read teacher&apos;s profile
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {whyChooseUs.map((w, i) => (
              <div key={w.title} className={`group relative flex items-start gap-5 rounded-2xl border border-slate-100 bg-[#fdf8ff] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8a00c2]/30 hover:shadow-lg hover:shadow-[#8a00c2]/5 ${i % 2 !== 0 ? "lg:ml-12" : ""}`}>
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 group-hover:border-[#f0822b]/40 transition-colors">
                  <span className="font-display text-lg font-bold text-[#f0822b]">{w.stat}</span>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-slate-900 transition-colors group-hover:text-[#8a00c2]">
                    {w.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
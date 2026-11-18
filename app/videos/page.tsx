import type { Metadata } from "next";
import { db } from "@/lib/db";
import VideoGrid from "@/components/VideoGrid";

export const metadata: Metadata = {
  title: "Video Lessons & Tutorials",
  description:
    "Watch on-demand ICT lesson video recordings and topic tutorials for Grades 6–13 students from TopBright ICT Academy's digital learning archive.",
  alternates: {
    canonical: "/videos",
  },
};

// Force Next.js to fetch fresh Redis videos on every visit
export const dynamic = "force-dynamic";
export const revalidate = 0;

const videoFaqs = [
  {
    q: "How soon are class recordings uploaded after live lectures?",
    a: "Live online session recordings are processed in 1080p high definition and made available in the student portal within 24 hours of class completion.",
  },
  {
    q: "Can students re-watch video lessons unlimited times?",
    a: "Yes, enrolled students have unlimited 24/7 access to review past lecture recordings, topic tutorials, and practical walk-throughs throughout the academic year.",
  },
  {
    q: "Are video tutorials available for practical software tools?",
    a: "Yes, we provide dedicated video walkthroughs for Python programming, database SQL commands, spreadsheet formulas, and HTML web design practicals.",
  },
];

export default async function VideosPage() {
  const videos = await db.videos.all();

  const videosJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: videoFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#0d0114] select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videosJsonLd) }}
      />
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-[#8a00c2]/30 bg-[#0d0114]">
        <div className="absolute -left-20 -top-20 h-80 w-80 animate-pulse rounded-full bg-[#8a00c2]/25 blur-[120px]" />
        <div className="container-page relative z-10 py-16">
          <p className="font-mono text-sm font-medium text-[#f0822b]">Videos</p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">
            Lesson recordings, whenever you need them
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            Access high-definition recorded lessons and video tutorials from TopBright ICT Academy covering key Grade 6 through 13 computer science topics. Whether revising complex algorithms, reviewing practical spreadsheet formulas, or catching up on missed live classes, our curated video library delivers clear, step-by-step instruction accessible around the clock for every enrolled student.
          </p>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="container-page relative z-10 py-14">
        <div className="mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Available Class Video Lectures &amp; Practical Guides
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Browse our video collection by grade level and subject category.
          </p>
        </div>
        <VideoGrid videos={videos as any} />

        {/* Video Curriculum Matrix Table */}
        <div className="mt-16 overflow-hidden rounded-xl border border-[#8a00c2]/30 bg-[#160221]/90 shadow-2xl backdrop-blur">
          <div className="border-b border-[#8a00c2]/30 bg-[#1e032d]/80 px-6 py-4">
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              Video Lesson Modules &amp; Coverage
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Available video lecture series, practical demos, and topic deep-dives.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#8a00c2]/30 bg-[#1e032d] font-mono text-[11px] uppercase tracking-wider text-[#f0822b]">
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Curriculum Track</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Key Lecture Content</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Language</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Video Resolution</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Access Window</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#8a00c2]/20 text-slate-300">
                <tr className="hover:bg-[#1e032d]/50 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-bold text-white whitespace-nowrap">Junior ICT (Grades 6–9)</td>
                  <td className="py-4 px-4 sm:px-6">Scratch logic, computer hardware concepts &amp; productivity suites</td>
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">Tamil &amp; English</td>
                  <td className="py-4 px-4 sm:px-6 font-mono text-xs">1080p Full HD</td>
                  <td className="py-4 px-4 sm:px-6 text-emerald-400 font-semibold whitespace-nowrap">Full Academic Year</td>
                </tr>
                <tr className="hover:bg-[#1e032d]/50 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-bold text-white whitespace-nowrap">G.C.E. O/L (Grades 10–11)</td>
                  <td className="py-4 px-4 sm:px-6">Binary math, logic gates, database SQL queries &amp; paper reviews</td>
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">Tamil &amp; English</td>
                  <td className="py-4 px-4 sm:px-6 font-mono text-xs">1080p Full HD</td>
                  <td className="py-4 px-4 sm:px-6 text-emerald-400 font-semibold whitespace-nowrap">Full Academic Year</td>
                </tr>
                <tr className="hover:bg-[#1e032d]/50 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-bold text-white whitespace-nowrap">G.C.E. A/L (Grades 12–13)</td>
                  <td className="py-4 px-4 sm:px-6">Python programming, network routing, systems design &amp; models</td>
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">Tamil &amp; English</td>
                  <td className="py-4 px-4 sm:px-6 font-mono text-xs">1080p Full HD</td>
                  <td className="py-4 px-4 sm:px-6 text-emerald-400 font-semibold whitespace-nowrap">Full Academic Year</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Video Study Tips List */}
        <div className="mt-12 rounded-xl border border-[#8a00c2]/30 bg-[#160221]/90 p-6 sm:p-8 backdrop-blur">
          <h3 className="font-display text-lg font-bold text-white mb-4">
            Recommended Video Learning Practice
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f0822b] mt-2 shrink-0" />
              <span><strong>Code alongside the instructor:</strong> Pause the video and write the Python or SQL code in your editor to build muscle memory.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f0822b] mt-2 shrink-0" />
              <span><strong>Take active notes:</strong> Summarize algorithm steps and flowchart logic into your lecture notebook.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f0822b] mt-2 shrink-0" />
              <span><strong>Attempt online unit MCQs right after:</strong> Complete portal auto-marked quizzes immediately following video completion.</span>
            </li>
          </ul>
        </div>

        {/* Video Archive FAQs */}
        <div className="mt-12 max-w-4xl">
          <h3 className="font-display text-lg font-bold text-white mb-4">
            Video Archive FAQs
          </h3>
          <div className="space-y-4">
            {videoFaqs.map((faq, idx) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-[#8a00c2]/30 bg-[#160221]/90 p-5 transition-all duration-300 hover:border-[#8a00c2]/60"
                open={idx === 0}
              >
                <summary className="flex cursor-pointer items-center justify-between font-display text-sm sm:text-base font-bold text-white group-hover:text-[#f0822b]">
                  <span>{faq.q}</span>
                  <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-xs text-[#f0822b] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
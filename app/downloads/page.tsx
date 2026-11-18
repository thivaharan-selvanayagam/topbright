import type { Metadata } from "next";
import { db } from "@/lib/db";
import DownloadsList from "@/components/DownloadsList";
import type { DownloadItem } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Study Vault & Past Papers",
  description:
    "Download free G.C.E. O/L and A/L ICT past papers, model exam papers, unit notes, and school syllabus textbooks from TopBright Academy's Study Vault.",
  alternates: {
    canonical: "/downloads",
  },
};

const downloadsFaqs = [
  {
    q: "Are the study materials and past papers in the Study Vault free?",
    a: "Yes, all past examination papers, provincial model papers, and syllabus guide PDFs in the public Study Vault are free for all students to download.",
  },
  {
    q: "Which mediums and grades are supported for downloads?",
    a: "Our downloads archive includes resources in both Tamil and English medium, structured across Grades 6 through 13 according to the Sri Lankan NIE curriculum.",
  },
  {
    q: "How can enrolled students access private unit exam papers?",
    a: "Enrolled academy students receive private login credentials to the TopBright student portal, where confidential unit-by-unit assessment papers and auto-marked exams are published.",
  },
];

export default async function DownloadsPage() {
  // Fetch files dynamically from database storage
  const allDownloads = await db.downloads.all().catch(() => []);

  // Filter out internal student materials (Unit Exams & Unit Notes)
  const publicItems = (allDownloads as DownloadItem[]).filter(
    (item) => item.category !== "Unit Exams" && item.category !== "Unit Notes"
  );

  const downloadsJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: downloadsFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white select-none relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(downloadsJsonLd) }}
      />
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#8a00c2]/20 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#f0822b]/15 blur-[150px]" />

      {/* Header Banner */}
      <section className="relative border-b border-white/10 pt-20 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-[#8a00c2]/20 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-purple-200 uppercase shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#f0822b] animate-ping" />
            Resource Library
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-tight">
            Study Vault &amp; <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#8a00c2] via-purple-300 to-[#f0822b] bg-clip-text text-transparent">
              Downloads.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            Welcome to TopBright Academy&apos;s Study Vault, a free digital resource library for school students and ICT candidates. Download official G.C.E. O/L and A/L past papers, provincial model papers, school term tests, and unit revision notes in Tamil and English medium. Select your grade below to access high-quality educational materials curated to support your exam preparation.
          </p>
        </div>
      </section>

      {/* Downloads List Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Available Study Materials &amp; Past Papers
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Filter by study category or grade level to download syllabus PDFs and past paper discussions.
          </p>
        </div>
        <DownloadsList items={publicItems} />

        {/* Study Vault Resource Matrix Table */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl">
          <div className="border-b border-white/10 bg-white/5 px-6 py-4">
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              Curriculum Resource &amp; Material Index
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Available document categories, language mediums, and distribution formats across grades.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950 font-mono text-[11px] uppercase tracking-wider text-[#f0822b]">
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Grade Stage</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Resource Category</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Medium</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Material Format</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Access Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-bold text-white whitespace-nowrap">Junior ICT (Grades 6–9)</td>
                  <td className="py-4 px-4 sm:px-6">Unit notes, term test papers &amp; practical guides</td>
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">Tamil &amp; English</td>
                  <td className="py-4 px-4 sm:px-6 font-mono text-xs">PDF Documents</td>
                  <td className="py-4 px-4 sm:px-6 text-emerald-400 font-semibold whitespace-nowrap">Public Free Access</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-bold text-white whitespace-nowrap">G.C.E. O/L (Grades 10–11)</td>
                  <td className="py-4 px-4 sm:px-6">National past papers, model papers &amp; answer schemes</td>
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">Tamil &amp; English</td>
                  <td className="py-4 px-4 sm:px-6 font-mono text-xs">PDF Papers &amp; Tutes</td>
                  <td className="py-4 px-4 sm:px-6 text-emerald-400 font-semibold whitespace-nowrap">Public Free Access</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-bold text-white whitespace-nowrap">G.C.E. A/L (Grades 12–13)</td>
                  <td className="py-4 px-4 sm:px-6">A/L past papers, Python code sheets &amp; revision models</td>
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">Tamil &amp; English</td>
                  <td className="py-4 px-4 sm:px-6 font-mono text-xs">Structured PDF Vault</td>
                  <td className="py-4 px-4 sm:px-6 text-emerald-400 font-semibold whitespace-nowrap">Public Free Access</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Study Vault Instructions List */}
        <div className="mt-12 rounded-xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur">
          <h3 className="font-display text-lg font-bold text-white mb-4">
            How To Effectively Use Study Vault Materials
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f0822b] mt-2 shrink-0" />
              <span><strong>Attempt under timed conditions:</strong> Solve G.C.E. past papers with an active timer matching official exam time limits.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f0822b] mt-2 shrink-0" />
              <span><strong>Review marking schemes carefully:</strong> Cross-check your structured essay responses with published national answer schemes.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f0822b] mt-2 shrink-0" />
              <span><strong>Practice code implementations:</strong> Run Python and database SQL examples on your computer rather than purely memorizing syntax.</span>
            </li>
          </ul>
        </div>

        {/* Downloads FAQs */}
        <div className="mt-12 max-w-4xl">
          <h3 className="font-display text-lg font-bold text-white mb-4">
            Study Vault FAQs
          </h3>
          <div className="space-y-4">
            {downloadsFaqs.map((faq, idx) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-white/10 bg-slate-900/80 p-5 transition-all duration-300 hover:border-purple-500/40"
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
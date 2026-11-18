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

export default async function DownloadsPage() {
  // Fetch files dynamically from database storage
  const allDownloads = await db.downloads.all().catch(() => []);

  // Filter out internal student materials (Unit Exams & Unit Notes)
  const publicItems = (allDownloads as DownloadItem[]).filter(
    (item) => item.category !== "Unit Exams" && item.category !== "Unit Notes"
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white select-none relative overflow-hidden">
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
      </section>
    </div>
  );
}
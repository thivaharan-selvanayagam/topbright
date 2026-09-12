import type { Metadata } from "next";
import { db } from "@/lib/db";
import DownloadsList from "@/components/DownloadsList";
import type { DownloadItem } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = { title: "Study Vault | TopBright Academy" };

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
            Access official past papers, school term test papers, model questions, and revision books. Filter by grade or category below.
          </p>
        </div>
      </section>

      {/* Downloads List Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <DownloadsList items={publicItems} />
      </section>
    </div>
  );
}
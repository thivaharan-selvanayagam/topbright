import type { Metadata } from "next";
import downloads from "@/data/downloads.json";
import DownloadsList from "@/components/DownloadsList";

export const metadata: Metadata = { title: "Downloads | TopBright Academy" };

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-[#0d0114]">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-[#8a00c2]/30 bg-[#0d0114]">
        <div className="absolute -left-20 -top-20 h-80 w-80 animate-pulse rounded-full bg-[#8a00c2]/25 blur-[120px]" />
        <div className="container-page relative z-10 py-16">
          <p className="font-mono text-sm font-medium text-[#f0822b]">Downloads</p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">
            Exam papers, model papers, books & tutes
          </h1>
          <p className="mt-3 max-w-xl text-slate-300">
            Free to view and download — filter by grade or by resource type below.
          </p>
        </div>
      </section>

      {/* Downloads List Section */}
      <section className="container-page relative z-10 py-14">
        <DownloadsList items={downloads as any} />
      </section>
    </div>
  );
}
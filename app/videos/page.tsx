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

export default async function VideosPage() {
  const videos = await db.videos.all();

  return (
    <div className="min-h-screen bg-[#0d0114] select-none">
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
      </section>
    </div>
  );
}
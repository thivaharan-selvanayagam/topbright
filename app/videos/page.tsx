import type { Metadata } from "next";
import videos from "@/data/videos.json";
import VideoGrid from "@/components/VideoGrid";

export const metadata: Metadata = { title: "Videos | TopBright Academy" };

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-[#0d0114]">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-[#8a00c2]/30 bg-[#0d0114]">
        <div className="absolute -left-20 -top-20 h-80 w-80 animate-pulse rounded-full bg-[#8a00c2]/25 blur-[120px]" />
        <div className="container-page relative z-10 py-16">
          <p className="font-mono text-sm font-medium text-[#f0822b]">Videos</p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">
            Lesson recordings, whenever you need them
          </h1>
          <p className="mt-3 max-w-xl text-slate-300">
            Catch up on a class you missed, or revise a topic before a test.
          </p>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="container-page relative z-10 py-14">
        <VideoGrid videos={videos as any} />
      </section>
    </div>
  );
}
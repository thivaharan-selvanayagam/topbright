"use client";

import { useMemo, useState } from "react";
import type { Video } from "@/lib/types";

export default function VideoGrid({ videos }: { videos: Video[] }) {
  const grades = useMemo(() => ["All", ...Array.from(new Set(videos.map((v) => v.grade)))], [videos]);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? videos : videos.filter((v) => v.grade === active);

  return (
    <div>
      {/* Grade Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {grades.map((g) => (
          <button
            key={g}
            onClick={() => setActive(g)}
            className={`rounded-full border px-4 py-1.5 text-sm transition focus-ring ${
              active === g
                ? "border-[#8a00c2] bg-[#8a00c2] font-medium text-white shadow-md shadow-[#8a00c2]/30"
                : "border-[#8a00c2]/30 bg-[#160221] text-slate-300 hover:border-[#8a00c2] hover:text-white"
            }`}
          >
            {g === "All" ? "All Grades" : g}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((v) => (
          <div
            key={v.id}
            className="group overflow-hidden rounded-lg border border-[#8a00c2]/30 bg-[#160221]/90 shadow-lg backdrop-blur transition-all duration-300 hover:border-[#f0822b]/60 hover:bg-[#1e032d]"
          >
            <div className="aspect-video w-full bg-[#0d0114]">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${v.youtubeId}`}
                title={v.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full border border-[#8a00c2]/30 bg-[#1e032d] px-2.5 py-0.5 font-medium text-[#f0822b]">
                  {v.grade}
                </span>
                <span className="text-slate-400">{v.category}</span>
              </div>
              <h3 className="mt-2.5 font-display text-base font-semibold text-white transition-colors group-hover:text-[#f0822b]">
                {v.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{v.description}</p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-slate-400">
            No videos in this grade yet — check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
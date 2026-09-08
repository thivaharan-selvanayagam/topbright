"use client";

import { useMemo, useState } from "react";
import type { DownloadItem } from "@/lib/types";

const typeIcon: Record<string, string> = {
  "Exam Paper": "📄",
  "Model Paper": "📝",
  Book: "📘",
  Tute: "📚",
  Other: "🗂️",
};

export default function DownloadsList({ items }: { items: DownloadItem[] }) {
  const grades = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.grade)))], [items]);
  const types = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.type)))], [items]);
  const [grade, setGrade] = useState("All");
  const [type, setType] = useState("All");

  const filtered = items.filter(
    (i) => (grade === "All" || i.grade === grade) && (type === "All" || i.type === type)
  );

  return (
    <div>
      {/* Filter Buttons Header */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        {/* Grade Filters */}
        <div className="flex flex-wrap gap-2">
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition focus-ring ${
                grade === g
                  ? "border-[#8a00c2] bg-[#8a00c2] font-medium text-white shadow-md shadow-[#8a00c2]/30"
                  : "border-[#8a00c2]/30 bg-[#160221] text-slate-300 hover:border-[#8a00c2] hover:text-white"
              }`}
            >
              {g === "All" ? "All Grades" : g}
            </button>
          ))}
        </div>

        {/* Resource Type Filters */}
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition focus-ring ${
                type === t
                  ? "border-[#f0822b] bg-[#f0822b] font-medium text-slate-950 shadow-md shadow-[#f0822b]/30"
                  : "border-[#8a00c2]/30 bg-[#160221] text-slate-300 hover:border-[#f0822b] hover:text-[#f0822b]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Downloads Item List */}
      <div className="mt-8 divide-y divide-[#8a00c2]/20 rounded-lg border border-[#8a00c2]/30 bg-[#160221]/90 shadow-lg backdrop-blur">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 p-5 transition-colors hover:bg-[#1e032d]/60 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl">{typeIcon[item.type] || "🗂️"}</span>
              <div>
                <h3 className="font-display text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{item.description}</p>
                <div className="mt-2.5 flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="rounded-full border border-[#8a00c2]/30 bg-[#1e032d] px-2.5 py-0.5">
                    {item.type}
                  </span>
                  <span className="rounded-full border border-[#8a00c2]/30 bg-[#1e032d] px-2.5 py-0.5">
                    {item.grade}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 gap-2 sm:ml-4">
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[#8a00c2]/50 px-4 py-2 text-sm text-slate-200 transition hover:border-[#f0822b] hover:text-[#f0822b] focus-ring"
              >
                View
              </a>
              <a
                href={item.fileUrl}
                download={item.fileName}
                className="rounded-md bg-[#8a00c2] px-4 py-2 text-sm font-medium text-white shadow-md shadow-[#8a00c2]/30 transition hover:bg-[#7200a3] focus-ring"
              >
                Download
              </a>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="p-10 text-center text-sm text-slate-400">Nothing matches these filters yet.</p>
        )}
      </div>
    </div>
  );
}
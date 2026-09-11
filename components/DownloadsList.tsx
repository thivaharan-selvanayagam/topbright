"use client";

import { useMemo, useState } from "react";

export interface DownloadItem {
  id: string;
  title: string;
  description?: string;
  category: "Past Papers" | "Model Papers" | "School Exam Papers" | "Unit Papers" | "Books";
  subCategory?: "Term 1" | "Term 2" | "Term 3"; // Applicable for School Exam Papers
  grade: string; // e.g. "Grade 6", "Grade 11", "Grade 12", "Grade 13"
  fileUrl: string;
  fileName?: string;
  fileSize?: string;
  updatedAt?: string;
}

const ALL_CATEGORIES = [
  "Past Papers",
  "Model Papers",
  "School Exam Papers",
  "Unit Papers",
  "Books",
] as const;

const SCHOOL_TERMS = ["Term 1", "Term 2", "Term 3"] as const;

function FolderIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={`w-5 h-5 transition-colors ${active ? "text-[#f0822b]" : "text-[#8a00c2]"}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-19.5 0A2.25 2.25 0 004.5 15h15a2.25 2.25 0 002.25-2.25m-19.5 0v.243a2.25 2.25 0 001.07 1.916l7.5 4.615a2.25 2.25 0 002.36 0l7.5-4.615a2.25 2.25 0 001.07-1.916V12.75"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function ViewIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function EmptyVaultIcon() {
  return (
    <svg className="w-12 h-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}

export default function DownloadsList({ items = [] }: { items: DownloadItem[] }) {
  // 1. Filter out categories that have NO uploaded items
  const availableCategories = useMemo(() => {
    return ALL_CATEGORIES.filter((cat) => items.some((item) => item.category === cat));
  }, [items]);

  const [activeCategory, setActiveCategory] = useState<string>(
    availableCategories[0] || ALL_CATEGORIES[0]
  );
  const [activeSubCategory, setActiveSubCategory] = useState<string>("All");
  const [activeGrade, setActiveGrade] = useState<string>("All");

  // Keep active category synced if items change dynamically
  const currentCategory = availableCategories.includes(activeCategory as any)
    ? activeCategory
    : availableCategories[0] || ALL_CATEGORIES[0];

  // 2. Subcategories (Only for "School Exam Papers" & only terms that contain items)
  const availableSubCategories = useMemo(() => {
    if (currentCategory !== "School Exam Papers") return [];
    const existingTerms = SCHOOL_TERMS.filter((term) =>
      items.some(
        (i) => i.category === "School Exam Papers" && i.subCategory === term
      )
    );
    return existingTerms.length > 0 ? ["All", ...existingTerms] : [];
  }, [items, currentCategory]);

  // 3. Filter grades for the currently selected category & subcategory
  const availableGrades = useMemo(() => {
    const categoryItems = items.filter((i) => {
      if (i.category !== currentCategory) return false;
      if (
        currentCategory === "School Exam Papers" &&
        activeSubCategory !== "All" &&
        i.subCategory !== activeSubCategory
      ) {
        return false;
      }
      return true;
    });

    const uniqueGrades = Array.from(new Set(categoryItems.map((i) => i.grade)));
    
    // Sort numerically or by standard grade order
    uniqueGrades.sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, "")) || 0;
      const numB = parseInt(b.replace(/\D/g, "")) || 0;
      return numA - numB;
    });

    return uniqueGrades.length > 0 ? ["All", ...uniqueGrades] : ["All"];
  }, [items, currentCategory, activeSubCategory]);

  // 4. Final Filtered Items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (item.category !== currentCategory) return false;
      if (
        currentCategory === "School Exam Papers" &&
        activeSubCategory !== "All" &&
        item.subCategory !== activeSubCategory
      ) {
        return false;
      }
      if (activeGrade !== "All" && item.grade !== activeGrade) {
        return false;
      }
      return true;
    });
  }, [items, currentCategory, activeSubCategory, activeGrade]);

  // Handle Category Change
  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setActiveSubCategory("All");
    setActiveGrade("All");
  };

  if (availableCategories.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-12 text-center backdrop-blur-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-4">
          <EmptyVaultIcon />
        </div>
        <h3 className="font-display text-lg font-bold text-white">No Downloads Available</h3>
        <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto font-medium">
          ICT study materials, past papers, and model tutes will appear here as soon as they are published.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 select-none">
      
      {/* 1. CATEGORY FOLDER TABS (Only Visible Folders Show) */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4">
        {availableCategories.map((cat) => {
          const isActive = currentCategory === cat;
          const count = items.filter((i) => i.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`group relative flex items-center gap-2.5 rounded-2xl border px-5 py-3 text-xs sm:text-sm font-bold transition-all duration-300 ${
                isActive
                  ? "border-[#8a00c2] bg-gradient-to-r from-[#8a00c2]/30 to-purple-950/80 text-white shadow-lg shadow-[#8a00c2]/20 ring-1 ring-[#8a00c2]/50"
                  : "border-white/10 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <FolderIcon active={isActive} />
              <span>{cat}</span>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-extrabold transition-colors ${
                  isActive
                    ? "bg-[#f0822b] text-slate-950"
                    : "bg-white/5 text-slate-500 group-hover:bg-white/10 group-hover:text-slate-300"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. SUB-CATEGORY & GRADE FILTERS BAR */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-md">
        
        {/* Subcategories (Only for School Exam Papers) */}
        {currentCategory === "School Exam Papers" && availableSubCategories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
              Term:
            </span>
            {availableSubCategories.map((sub) => {
              const isSubActive = activeSubCategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => {
                    setActiveSubCategory(sub);
                    setActiveGrade("All");
                  }}
                  className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-bold transition-all ${
                    isSubActive
                      ? "bg-[#f0822b] text-slate-950 shadow-md shadow-[#f0822b]/20"
                      : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {sub === "All" ? "All Terms" : sub}
                </button>
              );
            })}
          </div>
        )}

        {/* Grade Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
            Grade:
          </span>
          {availableGrades.map((g) => {
            const isGradeActive = activeGrade === g;
            return (
              <button
                key={g}
                onClick={() => setActiveGrade(g)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                  isGradeActive
                    ? "bg-[#8a00c2] text-white shadow-md shadow-[#8a00c2]/30"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {g === "All" ? "All Grades" : g}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. DOWNLOAD ITEMS GRID */}
      {filteredItems.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#8a00c2]/50 hover:bg-slate-900"
            >
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-[#8a00c2]/20 border border-[#8a00c2]/30 px-2.5 py-1 font-mono text-[10px] font-bold text-purple-300 uppercase">
                      {item.grade}
                    </span>
                    {item.subCategory && (
                      <span className="rounded-lg bg-[#f0822b]/10 border border-[#f0822b]/30 px-2.5 py-1 font-mono text-[10px] font-bold text-[#f0822b] uppercase">
                        {item.subCategory}
                      </span>
                    )}
                  </div>
                  {item.fileSize && (
                    <span className="font-mono text-[11px] text-slate-500 font-semibold">
                      {item.fileSize}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="font-display text-base font-bold text-white transition-colors group-hover:text-[#f0822b] leading-snug">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-2 text-xs text-slate-400 font-medium leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Actions Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-bold text-slate-300 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <ViewIcon />
                  <span>Preview</span>
                </a>

                <a
                  href={item.fileUrl}
                  download={item.fileName || item.title}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#8a00c2] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#8a00c2]/20 transition-all hover:bg-[#7200a3] hover:scale-105"
                >
                  <DownloadIcon />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty Filter Results State */
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur-md">
          <p className="font-mono text-xs font-semibold text-slate-400">
            No downloadable materials match the selected grade or term filter.
          </p>
        </div>
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

export default function TeacherSubmissionsView() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/unit-submissions")
      .then((r) => r.json())
      .then((data) => setSubmissions(data.submissions || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 font-mono text-xs text-slate-500">Loading student answer sheets...</div>;

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-bold text-white">Student Unit Exam Submissions</h2>
      <p className="text-xs text-slate-400">Student upload files are automatically purged 30 days after upload.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {submissions.map((sub) => (
          <div key={sub.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-display text-base font-bold text-white">{sub.studentName}</h4>
                <p className="text-xs font-mono text-[#f0822b]">ID: {sub.studentId} · {sub.grade}</p>
              </div>
              <span className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-[10px] text-slate-300">
                {sub.submittedAt}
              </span>
            </div>

            <p className="text-xs font-bold text-slate-200 mt-3">{sub.examTitle}</p>

            <div className="mt-4 border-t border-white/10 pt-3">
              <span className="font-mono text-[10px] uppercase text-slate-400 font-bold block mb-2">
                Attached Files ({sub.fileUrls.length}):
              </span>
              <div className="flex flex-wrap gap-2">
                {sub.fileUrls.map((url: string, idx: number) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-purple-500/40 bg-[#8a00c2]/20 px-3 py-1 font-mono text-xs font-bold text-purple-200 hover:bg-[#8a00c2]/40"
                  >
                    View Page {idx + 1}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { compressImage } from "@/lib/compressor";

export default function StudentDashboardClient({
  session,
  student,
  practiceExams,
  myResults,
  unitExams,
  unitNotes,
  mySubmissions = [],
}: any) {
  const [activeTab, setActiveTab] = useState<"practice" | "unit-exams" | "notes" | "results">("practice");
  const [selectedExam, setSelectedExam] = useState<any | null>(null);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadFiles(Array.from(e.target.files));
    }
  };

  const handleUnitExamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExam || uploadFiles.length === 0) return;

    // Client-side guard check for robust submission tracking
    const isAlreadySubmitted = mySubmissions.some((s: any) => {
      const subId = String(s.examId || "").trim().toLowerCase();
      const examId = String(selectedExam.id || "").trim().toLowerCase();
      const subTitle = String(s.examTitle || "").trim().toLowerCase();
      const examTitle = String(selectedExam.title || "").trim().toLowerCase();
      return (subId && subId === examId) || (subTitle && subTitle === examTitle);
    });

    if (isAlreadySubmitted) {
      setUploadMsg("You have already submitted an answer sheet for this exam.");
      return;
    }

    setUploading(true);
    setUploadMsg("Compressing and uploading files...");

    try {
      const formData = new FormData();
      formData.append("examId", selectedExam.id);
      formData.append("examTitle", selectedExam.title);

      for (const file of uploadFiles) {
        const processedBlob = await compressImage(file);
        formData.append("files", processedBlob, file.name);
      }

      const res = await fetch("/api/student/unit-exams/submit", {
        method: "POST",
        body: formData,
      });

      const rawText = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(rawText);
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error(data?.error || `Server error (${res.status})`);
      }

      setUploadMsg("Answer submitted successfully!");
      setUploadFiles([]);
      setTimeout(() => {
        setSelectedExam(null);
        setUploadMsg("");
        window.location.reload();
      }, 800);
    } catch (err: any) {
      setUploadMsg(err.message || "Error submitting answer.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white select-none relative overflow-hidden pb-24">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#8a00c2]/20 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#f0822b]/15 blur-[150px]" />

      {/* Header Banner */}
      <section className="relative border-b border-white/10 pt-16 pb-12 bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-[#8a00c2]/20 px-3.5 py-1 text-xs font-mono font-bold text-purple-200 uppercase">
              <span className="h-2 w-2 rounded-full bg-[#f0822b] animate-pulse" />
              Student Portal
            </span>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-white">
              Welcome back, {session.name.split(" ")[0]} 👋
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 font-mono">
              Student ID: <span className="text-[#f0822b] font-bold">{session.studentId}</span>
              {student && <> · {student.grade} · {student.mode} Class</>}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-3 text-center backdrop-blur-md">
              <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">MCQs Attempted</span>
              <span className="font-display text-xl font-bold text-purple-300">{myResults.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-6 mb-8">
          <button
            onClick={() => setActiveTab("practice")}
            className={`rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all ${
              activeTab === "practice"
                ? "bg-[#8a00c2] text-white shadow-lg shadow-[#8a00c2]/20 ring-1 ring-[#8a00c2]"
                : "bg-slate-900/80 text-slate-400 border border-white/10 hover:bg-slate-900 hover:text-white"
            }`}
          >
            Practice Exams ({practiceExams.length})
          </button>
          <button
            onClick={() => setActiveTab("unit-exams")}
            className={`rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all ${
              activeTab === "unit-exams"
                ? "bg-[#8a00c2] text-white shadow-lg shadow-[#8a00c2]/20 ring-1 ring-[#8a00c2]"
                : "bg-slate-900/80 text-slate-400 border border-white/10 hover:bg-slate-900 hover:text-white"
            }`}
          >
            Unit Exams ({unitExams.length})
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all ${
              activeTab === "notes"
                ? "bg-[#8a00c2] text-white shadow-lg shadow-[#8a00c2]/20 ring-1 ring-[#8a00c2]"
                : "bg-slate-900/80 text-slate-400 border border-white/10 hover:bg-slate-900 hover:text-white"
            }`}
          >
            Unit Notes ({unitNotes.length})
          </button>
          <button
            onClick={() => setActiveTab("results")}
            className={`rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all ${
              activeTab === "results"
                ? "bg-[#8a00c2] text-white shadow-lg shadow-[#8a00c2]/20 ring-1 ring-[#8a00c2]"
                : "bg-slate-900/80 text-slate-400 border border-white/10 hover:bg-slate-900 hover:text-white"
            }`}
          >
            MCQ Results ({myResults.length})
          </button>
        </div>

        {/* 1. PRACTICE EXAMS TAB */}
        {activeTab === "practice" && (
          <div>
            <h2 className="font-display text-lg font-bold text-white mb-4">Available Practice Exams</h2>
            {practiceExams.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur-md">
                <p className="text-xs font-mono text-slate-400">No pending practice exams. Check back after your next class!</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {practiceExams.map((e: any) => (
                  <div key={e.id} className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 flex flex-col justify-between shadow-xl">
                    <div>
                      <span className="rounded-lg bg-[#8a00c2]/20 border border-[#8a00c2]/30 px-2.5 py-1 font-mono text-[10px] font-bold text-purple-300 uppercase">
                        {e.grade}
                      </span>
                      <h3 className="font-display text-base font-bold text-white mt-3 leading-snug">{e.title}</h3>
                      {e.description && <p className="text-xs text-slate-400 mt-2 line-clamp-2">{e.description}</p>}
                    </div>
                    <Link
                      href={`/exam/${e.id}`}
                      className="mt-6 block text-center rounded-xl bg-[#8a00c2] py-3 text-xs font-bold text-white hover:bg-[#7200a3] transition-all"
                    >
                      Start Practice Exam →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. UNIT EXAMS TAB */}
        {activeTab === "unit-exams" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h2 className="font-display text-lg font-bold text-white">Unit Exams &amp; Written Submissions</h2>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <span className="h-2 w-2 rounded-full bg-[#f0822b]" />
                  Pending: {unitExams.filter((e: any) => !mySubmissions.some((s: any) => String(s.examId || "").trim().toLowerCase() === String(e.id || "").trim().toLowerCase() || String(s.examTitle || "").trim().toLowerCase() === String(e.title || "").trim().toLowerCase())).length}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Submitted: {unitExams.filter((e: any) => mySubmissions.some((s: any) => String(s.examId || "").trim().toLowerCase() === String(e.id || "").trim().toLowerCase() || String(s.examTitle || "").trim().toLowerCase() === String(e.title || "").trim().toLowerCase())).length}
                </span>
              </div>
            </div>

            {unitExams.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur-md">
                <p className="text-xs font-mono text-slate-400">No unit exams published yet.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {unitExams.map((exam: any) => {
                  // Robust String Normalization & Title Fallback
                  const submission = mySubmissions.find((s: any) => {
                    const subId = String(s.examId || "").trim().toLowerCase();
                    const examId = String(exam.id || "").trim().toLowerCase();
                    const subTitle = String(s.examTitle || "").trim().toLowerCase();
                    const examTitle = String(exam.title || "").trim().toLowerCase();
                    return (subId && subId === examId) || (subTitle && subTitle === examTitle);
                  });

                  const isSubmitted = !!submission;

                  return (
                    <div
                      key={exam.id}
                      className={`rounded-2xl border p-6 flex flex-col justify-between shadow-xl transition-all ${
                        isSubmitted
                          ? "border-emerald-500/40 bg-emerald-950/20 shadow-emerald-500/5"
                          : "border-purple-500/40 bg-slate-900/90 ring-1 ring-purple-500/20"
                      }`}
                    >
                      <div>
                        {/* Status Badge */}
                        <div className="flex items-center justify-between gap-2">
                          {isSubmitted ? (
                            <span className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                              ✓ SUBMITTED
                            </span>
                          ) : (
                            <span className="rounded-lg border border-[#f0822b]/30 bg-[#f0822b]/10 px-3 py-1 font-mono text-[10px] font-bold text-[#f0822b] uppercase tracking-wider">
                              NEW EXAM
                            </span>
                          )}
                          <span className="font-mono text-xs text-slate-400 font-bold">{exam.grade}</span>
                        </div>

                        <h3 className="font-display text-base font-bold text-white mt-4 leading-snug">{exam.title}</h3>

                        {/* Submitted State Box */}
                        {isSubmitted && (
                          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                              ✓ Answer Submitted
                            </span>
                            <span className="font-mono text-[11px] text-emerald-300/80">
                              {submission.submittedAt || "Recorded"} ({submission.fileUrls?.length || 1} file/s)
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 space-y-3 pt-4 border-t border-white/10">
                        <a
                          href={exam.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          download={exam.fileName || exam.title}
                          className="block text-center rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-bold text-slate-200 hover:bg-white/10 transition-colors"
                        >
                          📄 Download Exam Paper PDF
                        </a>

                        {isSubmitted ? (
                          <button
                            disabled
                            className="w-full rounded-xl border border-emerald-500/40 bg-emerald-500/20 py-3 text-xs font-bold text-emerald-300 cursor-not-allowed flex items-center justify-center gap-1.5"
                          >
                            ✓ Answer Sheet Submitted
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedExam(exam)}
                            className="w-full rounded-xl bg-[#8a00c2] py-3 text-xs font-bold text-white hover:bg-[#7200a3] transition-all shadow-md shadow-[#8a00c2]/20 hover:scale-[1.02]"
                          >
                            📤 Upload Answer Sheet
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 3. UNIT NOTES TAB */}
        {activeTab === "notes" && (
          <div>
            <h2 className="font-display text-lg font-bold text-white mb-4">Unit Notes &amp; Theory Guides</h2>
            {unitNotes.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur-md">
                <p className="text-xs font-mono text-slate-400">No unit notes published for your class yet.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {unitNotes.map((note: any) => (
                  <div key={note.id} className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 flex flex-col justify-between shadow-xl">
                    <div>
                      <span className="rounded-lg bg-purple-500/20 border border-purple-500/30 px-2.5 py-1 font-mono text-[10px] font-bold text-purple-300 uppercase">
                        Unit Note · {note.grade}
                      </span>
                      <h3 className="font-display text-base font-bold text-white mt-3 leading-snug">{note.title}</h3>
                    </div>
                    <a
                      href={note.fileUrl}
                      download={note.fileName || note.title}
                      className="mt-6 block text-center rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-bold text-slate-200 hover:bg-white/10 transition-colors"
                    >
                      📘 Download Unit Note
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. RESULTS TAB */}
        {activeTab === "results" && (
          <div>
            <h2 className="font-display text-lg font-bold text-white mb-4">My MCQ Exam Performance</h2>
            {myResults.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur-md">
                <p className="text-xs font-mono text-slate-400">You haven't sat any MCQ practice exams yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-xl">
                <table className="w-full min-w-[550px] text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-slate-400">
                      <th className="px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-wider">Exam Title</th>
                      <th className="px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-wider">Marks</th>
                      <th className="px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-wider">Percentage</th>
                      <th className="px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-wider">Date &amp; Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {myResults.map((r: any) => (
                      <tr key={r.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-5 py-4 font-display font-bold text-white">{r.examTitle}</td>
                        <td className="px-5 py-4 font-mono text-xs text-slate-300 font-semibold">{r.score} / {r.totalMarks}</td>
                        <td className="px-5 py-4">
                          <span className={`rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold uppercase ${
                            r.percentage >= 75
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}>
                            {r.percentage}%
                          </span>
                        </td>
                        <td className="px-5 py-4 font-mono text-xs text-slate-400">
                          {new Date(r.submittedAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* UPLOAD MODAL WITH PROMINENT WARNING */}
        {selectedExam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl relative space-y-4">
              <h3 className="font-display text-lg font-bold text-white">Upload Answer Sheet</h3>
              <p className="text-xs text-[#f0822b] font-mono font-semibold">{selectedExam.title}</p>

              {/* WARNING BOX */}
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5 text-xs text-amber-200 leading-relaxed">
                <strong className="text-amber-400 block mb-1">⚠️ Important Warning:</strong>
                Each student can submit <strong>ONLY 1 submission</strong> per unit exam. Re-uploading or modifying your answer sheet is strictly disabled after submission. Please make sure all written pages are selected before clicking submit.
              </div>

              <form onSubmit={handleUnitExamSubmit} className="space-y-4">
                <input
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={handleFileSelection}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-xs text-white file:mr-4 file:rounded-lg file:border-0 file:bg-[#8a00c2]/20 file:px-3 file:py-1 file:text-xs file:font-bold file:text-purple-300"
                />

                {uploadFiles.length > 0 && (
                  <p className="font-mono text-xs text-emerald-400 font-bold">
                    Selected {uploadFiles.length} file(s) for submission.
                  </p>
                )}

                {uploadMsg && <p className="text-xs font-bold text-purple-300 font-mono">{uploadMsg}</p>}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedExam(null)}
                    className="flex-1 rounded-xl border border-white/10 py-3 text-xs font-bold text-slate-400 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || uploadFiles.length === 0}
                    className="flex-1 rounded-xl bg-[#8a00c2] py-3 text-xs font-bold text-white hover:bg-[#7200a3] disabled:opacity-50 shadow-lg shadow-[#8a00c2]/20"
                  >
                    {uploading ? "Uploading..." : "Submit Answer Sheet"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
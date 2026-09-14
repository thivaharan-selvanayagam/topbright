"use client";

import { useState } from "react";

interface AdminSubmissionsClientProps {
  initialSubmissions: any[];
  students: any[];
  downloads: any[];
}

export default function AdminSubmissionsClient({
  initialSubmissions = [],
  students = [],
  downloads = [],
}: AdminSubmissionsClientProps) {
  const [submissions, setSubmissions] = useState<any[]>(initialSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [activePreviewImage, setActivePreviewImage] = useState<string | null>(null);
  const [filterGrade, setFilterGrade] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchFreshSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/unit-submissions");
      const data = await res.json();
      if (res.ok && data.submissions) {
        setSubmissions(data.submissions);
      }
    } catch (err) {
      console.error("Error refreshing submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student submission?")) return;

    try {
      const res = await fetch(`/api/admin/unit-submissions?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => String(s.id) !== String(id)));
        if (selectedSubmission?.id === id) setSelectedSubmission(null);
      } else {
        alert(data.error || "Failed to delete submission.");
      }
    } catch {
      alert("Error deleting submission.");
    }
  };

  // Convert Base64 data URI to a Blob URL to bypass browser top-frame navigation blocks
  const convertBase64ToBlob = (dataUrl: string): string => {
    if (!dataUrl || !dataUrl.startsWith("data:")) return dataUrl;
    try {
      const arr = dataUrl.split(",");
      const mimeMatch = arr[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new Blob([u8arr], { type: mime });
      return URL.createObjectURL(blob);
    } catch {
      return dataUrl;
    }
  };

  const handleOpenInNewTab = (rawUrl: string) => {
    const safeUrl = convertBase64ToBlob(rawUrl);
    window.open(safeUrl, "_blank");
  };

  const handleDownloadFile = (rawUrl: string, fileName: string) => {
    const safeUrl = convertBase64ToBlob(rawUrl);
    const a = document.createElement("a");
    a.href = safeUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filteredSubmissions = submissions.filter((s) => {
    if (filterGrade === "All") return true;
    return String(s.grade || "").toLowerCase().includes(filterGrade.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 sm:p-10 select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Student Written Exam Submissions
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Review and grade uploaded answer sheets submitted by students.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchFreshSubmissions}
              disabled={loading}
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 font-mono text-xs font-bold text-purple-300 hover:bg-white/5 transition-all disabled:opacity-50"
            >
              {loading ? "Syncing..." : "🔄 Refresh Submissions"}
            </button>

            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 font-mono text-xs font-bold text-white"
            >
              <option value="All">All Grades</option>
              <option value="Grade 6">Grade 6</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12">Grade 12</option>
            </select>
          </div>
        </div>

        {/* Submissions Table */}
        {filteredSubmissions.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-12 text-center font-mono text-xs text-slate-400">
            No student answer sheet submissions found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-xl">
            <table className="w-full min-w-[700px] text-sm text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-slate-400">
                  <th className="px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-wider">Student</th>
                  <th className="px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-wider">Exam Title</th>
                  <th className="px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-wider">Grade</th>
                  <th className="px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-wider">Files Attached</th>
                  <th className="px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-wider">Submitted Date</th>
                  <th className="px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredSubmissions.map((sub: any) => (
                  <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-white">{sub.studentName || "Student"}</div>
                      <div className="font-mono text-xs text-[#f0822b] font-bold">{sub.studentId}</div>
                    </td>
                    <td className="px-5 py-4 font-display font-semibold text-slate-200">{sub.examTitle}</td>
                    <td className="px-5 py-4 font-mono text-xs font-bold text-purple-300">{sub.grade}</td>
                    <td className="px-5 py-4 font-mono text-xs text-emerald-400 font-bold">
                      {sub.fileUrls?.length || 1} File(s)
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-slate-400">{sub.submittedAt || "Recently"}</td>
                    <td className="px-5 py-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedSubmission(sub)}
                        className="rounded-lg bg-[#8a00c2] px-3.5 py-1.5 font-mono text-xs font-bold text-white hover:bg-[#7200a3]"
                      >
                        View Answer
                      </button>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3.5 py-1.5 font-mono text-xs font-bold text-rose-300 hover:bg-rose-500/20"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Answer Sheet Viewer Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {selectedSubmission.studentName} ({selectedSubmission.studentId})
                  </h3>
                  <p className="font-mono text-xs text-[#f0822b] font-bold mt-1">
                    {selectedSubmission.examTitle} · {selectedSubmission.grade}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700"
                >
                  ✕ Close
                </button>
              </div>

              {/* Answer Sheets Display */}
              <div className="space-y-6">
                {selectedSubmission.fileUrls?.map((url: string, index: number) => {
                  const isImage = url.startsWith("data:image") || /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
                  const isPdf = url.startsWith("data:application/pdf") || /\.pdf$/i.test(url);

                  return (
                    <div key={index} className="rounded-2xl border border-white/10 bg-slate-950 p-4 space-y-3">
                      <div className="flex items-center justify-between font-mono text-xs font-bold text-slate-400">
                        <span>Page / File #{index + 1}</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleOpenInNewTab(url)}
                            className="text-purple-300 hover:underline"
                          >
                            Open in New Tab ↗
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDownloadFile(url, `Answer-${selectedSubmission.studentId}-Page${index + 1}`)
                            }
                            className="text-[#f0822b] hover:underline"
                          >
                            Download File 📥
                          </button>
                        </div>
                      </div>

                      {isImage ? (
                        <div className="relative group cursor-zoom-in" onClick={() => setActivePreviewImage(url)}>
                          <img
                            src={url}
                            alt={`Answer Sheet ${index + 1}`}
                            className="w-full max-h-[600px] object-contain rounded-xl border border-white/10 bg-slate-900"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl font-mono text-xs font-bold text-white">
                            🔍 Click to Enlarge / Zoom
                          </div>
                        </div>
                      ) : isPdf ? (
                        <iframe src={url} className="w-full h-96 rounded-xl border border-white/10" />
                      ) : (
                        <div className="p-8 text-center bg-slate-900 rounded-xl space-y-3">
                          <p className="font-mono text-xs text-slate-300">File Attachment (Non-Image Format)</p>
                          <button
                            onClick={() => handleDownloadFile(url, `Answer-${selectedSubmission.studentId}-Page${index + 1}`)}
                            className="rounded-xl bg-[#8a00c2] px-4 py-2 font-mono text-xs font-bold text-white"
                          >
                            Download File
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen Image Zoom Modal */}
        {activePreviewImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md cursor-zoom-out"
            onClick={() => setActivePreviewImage(null)}
          >
            <div className="relative max-w-5xl max-h-[95vh] flex flex-col items-center">
              <button
                onClick={() => setActivePreviewImage(null)}
                className="absolute -top-12 right-0 rounded-xl border border-white/20 bg-slate-800 px-4 py-1.5 font-mono text-xs font-bold text-white"
              >
                ✕ Close Fullscreen
              </button>
              <img
                src={activePreviewImage}
                alt="Enlarged Answer Sheet Page"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
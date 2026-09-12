"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExamClient({ session, exam }: any) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/exam/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examId: exam.id,
          userAnswers: answers,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit exam.");
      }

      // Success -> Navigate to dashboard results tab
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Error submitting exam.");
      setSubmitting(false);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = exam.questions?.length || 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white select-none relative overflow-hidden pb-20">
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 space-y-8">
        {/* Header */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="rounded-lg bg-purple-500/20 border border-purple-500/30 px-3 py-1 font-mono text-xs font-bold text-purple-300">
              {exam.grade} · MCQ Practice Exam
            </span>
            <h1 className="font-display text-2xl font-bold text-white mt-2">{exam.title}</h1>
          </div>
          <div className="text-right font-mono">
            <span className="text-xs text-slate-400 block font-bold">Progress</span>
            <span className="text-lg font-bold text-[#f0822b]">
              {answeredCount} / {totalQuestions} Answered
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-bold text-rose-300">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Questions Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {exam.questions?.map((q: any, idx: number) => (
            <div
              key={q.id || idx}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-4"
            >
              <h3 className="font-display text-base font-bold text-white leading-relaxed">
                <span className="text-[#f0822b] font-mono mr-2">Q{idx + 1}.</span>
                {q.question}
              </h3>

              <div className="grid gap-3 pt-2">
                {q.options?.map((opt: string, optIdx: number) => {
                  const isSelected = answers[q.id] === optIdx;
                  return (
                    <button
                      type="button"
                      key={optIdx}
                      onClick={() => handleOptionSelect(q.id, optIdx)}
                      className={`w-full text-left rounded-xl border p-4 text-xs font-medium transition-all flex items-center gap-3 ${
                        isSelected
                          ? "border-[#8a00c2] bg-[#8a00c2]/20 text-white ring-1 ring-[#8a00c2]"
                          : "border-white/10 bg-slate-950/60 text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`h-5 w-5 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold ${
                          isSelected
                            ? "border-[#f0822b] bg-[#f0822b] text-slate-950"
                            : "border-slate-600 text-slate-400"
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Submit Action Bar */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="rounded-xl border border-white/10 bg-slate-900 px-6 py-3 text-xs font-bold text-slate-400 hover:bg-white/5"
            >
              Exit Exam
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-[#8a00c2] px-8 py-3 text-xs font-bold text-white hover:bg-[#7200a3] disabled:opacity-50 shadow-lg shadow-[#8a00c2]/20"
            >
              {submitting ? "Submitting Answers..." : "Submit MCQ Exam"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
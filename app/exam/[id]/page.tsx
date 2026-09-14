"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

type ExamQuestion = { id: string; question: string; options: string[]; marks: number };
type ExamData = {
  id: string;
  title: string;
  description: string;
  grade: string;
  durationMinutes: number;
  questions: ExamQuestion[];
};
type ReviewItem = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  givenIndex: number | null;
  marks: number;
};
type Result = {
  id?: string;
  studentId?: string;
  score: number;
  totalMarks: number;
  percentage: number;
  examTitle: string;
};

export default function ExamPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [exam, setExam] = useState<ExamData | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [review, setReview] = useState<ReviewItem[] | null>(null);

  useEffect(() => {
    if (!params?.id) return;

    fetch(`/api/exams/${params.id}`)
      .then(async (r) => {
        if (!r.ok) {
          const altRes = await fetch(`/api/exam/${params.id}`);
          if (!altRes.ok) {
            const errData = await r.json().catch(() => ({}));
            throw new Error(errData.error || "Could not load exam details.");
          }
          return altRes.json();
        }
        return r.json();
      })
      .then((data) => {
        const loadedExam = data.exam || data;
        setExam(loadedExam);
        const duration = loadedExam.durationMinutes || 30;
        setSecondsLeft(duration * 60);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [params?.id]);

  const handleSubmit = useCallback(async () => {
    if (submitting || result || !params?.id) return;
    setSubmitting(true);
    setError("");

    try {
      let res = await fetch("/api/exam/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId: params.id, answers }),
      });

      if (res.status === 404) {
        res = await fetch("/api/exams/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ examId: params.id, answers }),
        });
      }

      const rawText = await res.text();
      let data: any = {};
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(`Server returned invalid response (${res.status}).`);
      }

      if (!res.ok) {
        setError(data.error || `Error ${res.status}: Could not submit exam.`);
        return;
      }

      setResult(data.result);
      setReview(data.review);

      // Save result directly to client localStorage to guarantee persistence across Vercel serverless containers
      if (data.result) {
        try {
          const studentIdClean = String(data.result.studentId || "").trim().toLowerCase();
          const resultRecord = {
            id: data.result.id || Date.now().toString(),
            examId: String(params.id).trim(),
            examTitle: data.result.examTitle || exam?.title || "MCQ Exam",
            score: data.result.score ?? 0,
            totalMarks: data.result.totalMarks ?? 0,
            percentage: data.result.percentage ?? 0,
            studentId: data.result.studentId || "",
            submittedAt: data.result.submittedAt || new Date().toISOString(),
          };

          // 1. Save to master key
          const masterKey = "topbright_mcq_results";
          const existingMaster = JSON.parse(localStorage.getItem(masterKey) || "[]");
          const filteredMaster = existingMaster.filter(
            (r: any) => String(r.examId).trim().toLowerCase() !== String(params.id).trim().toLowerCase()
          );
          localStorage.setItem(masterKey, JSON.stringify([resultRecord, ...filteredMaster]));

          // 2. Save to student-specific key
          if (studentIdClean) {
            const studentKey = `mcq_results_${studentIdClean}`;
            const existingStudent = JSON.parse(localStorage.getItem(studentKey) || "[]");
            const filteredStudent = existingStudent.filter(
              (r: any) => String(r.examId).trim().toLowerCase() !== String(params.id).trim().toLowerCase()
            );
            localStorage.setItem(studentKey, JSON.stringify([resultRecord, ...filteredStudent]));
          }
        } catch (e) {
          console.error("Local storage error:", e);
        }
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setError(err.message || "Something went wrong while submitting your answers.");
    } finally {
      setSubmitting(false);
    }
  }, [answers, params?.id, submitting, result, exam?.title]);

  useEffect(() => {
    if (secondsLeft === null || result) return;
    if (secondsLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => (s !== null ? s - 1 : s)), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, result, handleSubmit]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-xs text-slate-400 select-none">
        Loading exam session...
      </div>
    );
  }

  if (error && !exam) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 text-center select-none">
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-8 max-w-md space-y-4">
          <p className="text-sm font-bold text-rose-300">⚠️ {error}</p>
          <button
            onClick={() => {
              window.location.href = "/dashboard";
            }}
            className="inline-flex items-center justify-center rounded-xl bg-[#8a00c2] px-8 py-3 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 transition-all hover:bg-[#7200a3]"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- Post-Exam Submission Results & Answer Review ---------------- */
  if (result && review) {
    return (
      <div className="min-h-screen bg-slate-950 text-white select-none relative overflow-hidden pb-24">
        <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#8a00c2]/20 blur-[150px]" />
        <div className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#f0822b]/15 blur-[150px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 sm:p-10 text-center backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8a00c2] via-[#f0822b] to-[#8a00c2]" />

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              ✓ Exam Submitted Successfully
            </span>

            <h1 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-white">
              {result.examTitle}
            </h1>

            <div className="my-6">
              <span className="font-display text-6xl sm:text-7xl font-black bg-gradient-to-r from-[#8a00c2] via-purple-300 to-[#f0822b] bg-clip-text text-transparent">
                {result.score} / {result.totalMarks}
              </span>
              <p className="mt-2 text-sm font-mono font-bold text-slate-300">
                Score: <span className="text-[#f0822b]">{result.percentage}%</span> — saved to your Student ID
              </p>
            </div>

            <button
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              className="inline-flex items-center justify-center rounded-xl bg-[#8a00c2] px-8 py-3.5 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 transition-all hover:bg-[#7200a3] hover:scale-105 active:scale-95"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-3">
              <span>Answer Review &amp; Feedback</span>
              <span className="text-xs font-mono font-normal text-slate-400">({review.length} Questions)</span>
            </h2>

            {review.map((q, idx) => {
              const isCorrect = q.givenIndex === q.correctIndex;
              const isUnanswered = q.givenIndex === null;

              return (
                <div
                  key={q.id || idx}
                  className={`rounded-2xl border p-6 backdrop-blur-md transition-all ${
                    isCorrect
                      ? "border-emerald-500/40 bg-emerald-950/20"
                      : "border-rose-500/40 bg-rose-950/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase">
                      Question {idx + 1}
                    </span>

                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-400">
                        ✓ Correct (+{q.marks || 1} Marks)
                      </span>
                    ) : isUnanswered ? (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-400">
                        ! Unanswered (0 Marks)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1 font-mono text-xs font-bold text-rose-400">
                        ✕ Incorrect (0 Marks)
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-base font-semibold text-white leading-snug mb-5">
                    {q.question}
                  </h3>

                  <div className="space-y-3">
                    {q.options?.map((opt, i) => {
                      const isCorrectOption = i === q.correctIndex;
                      const isUserOption = i === q.givenIndex;

                      let optionStyle = "border-white/5 bg-slate-950/30 text-slate-500 opacity-60";
                      let badge = null;

                      if (isCorrectOption) {
                        optionStyle = "border-emerald-500 bg-emerald-500/20 text-white font-bold ring-1 ring-emerald-500";
                        badge = (
                          <span className="ml-auto rounded-md bg-emerald-500 px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-slate-950 uppercase">
                            Correct Answer
                          </span>
                        );
                      } else if (isUserOption && !isCorrectOption) {
                        optionStyle = "border-rose-500 bg-rose-500/20 text-rose-200 font-bold ring-1 ring-rose-500";
                        badge = (
                          <span className="ml-auto rounded-md bg-rose-500 px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-white uppercase">
                            Your Choice (Wrong)
                          </span>
                        );
                      }

                      return (
                        <div
                          key={i}
                          className={`flex items-center text-left p-4 rounded-xl border transition-all text-xs sm:text-sm ${optionStyle}`}
                        >
                          <span className="w-6 h-6 rounded-lg border border-white/20 flex items-center justify-center font-mono text-xs font-bold mr-3 shrink-0">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {badge}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!exam) return null;

  const answeredCount = Object.keys(answers).length;
  const minutes = Math.floor((secondsLeft ?? 0) / 60);
  const seconds = (secondsLeft ?? 0) % 60;

  return (
    <div className="min-h-screen bg-slate-950 text-white select-none relative overflow-hidden pb-24">
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#8a00c2]/20 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[500px] w-[500px] rounded-full bg-[#f0822b]/15 blur-[150px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        <div className="sticky top-6 z-30 mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/90 px-6 py-4 shadow-2xl backdrop-blur-md">
          <div>
            <h1 className="font-display text-base sm:text-lg font-bold text-white">{exam.title}</h1>
            <p className="font-mono text-xs font-medium text-slate-400 mt-0.5">
              <span className="text-[#f0822b] font-bold">{answeredCount}</span> of {exam.questions?.length || 0} answered
            </p>
          </div>

          <div
            className={`rounded-xl px-4 py-2 font-mono text-sm font-bold shadow-inner ${
              (secondsLeft ?? 0) < 60
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse"
                : "bg-[#8a00c2]/20 text-purple-200 border border-[#8a00c2]/40"
            }`}
          >
            ⏱ {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-bold text-rose-300">
            ⚠️ {error}
          </div>
        )}

        <div className="space-y-6">
          {exam.questions?.map((q, idx) => (
            <div key={q.id || idx} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#f0822b] uppercase tracking-wider">
                  Question {idx + 1}
                </span>
                <span className="font-mono text-xs text-slate-400 font-semibold">
                  {q.marks || 1} Marks
                </span>
              </div>

              <h3 className="font-display text-base sm:text-lg font-semibold text-white leading-snug mb-5">
                {q.question}
              </h3>

              <div className="space-y-3">
                {q.options?.map((opt, i) => {
                  const isSelected = answers[q.id] === i;
                  return (
                    <label
                      key={i}
                      className={`flex cursor-pointer items-center rounded-xl border p-4 text-xs sm:text-sm transition-all ${
                        isSelected
                          ? "border-[#8a00c2] bg-[#8a00c2]/20 text-white font-bold ring-1 ring-[#8a00c2]"
                          : "border-white/10 bg-slate-950/50 text-slate-300 hover:border-purple-500/40 hover:bg-slate-900"
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={isSelected}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                        className="sr-only"
                      />
                      <span
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center font-mono text-xs font-bold mr-3 shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#8a00c2] border-[#8a00c2] text-white"
                            : "border-white/20 text-slate-400"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full sm:w-auto rounded-xl bg-[#8a00c2] px-8 py-4 text-xs font-bold text-white shadow-xl shadow-[#8a00c2]/30 transition-all hover:bg-[#7200a3] hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {submitting ? "Submitting Exam..." : "Submit Exam Answers"}
          </button>
        </div>
      </div>
    </div>
  );
}
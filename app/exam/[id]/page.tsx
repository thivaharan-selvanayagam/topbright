"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

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
    fetch(`/api/exams/${params.id}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || "Could not load exam.");
        return data;
      })
      .then((data) => {
        setExam(data.exam);
        setSecondsLeft(data.exam.durationMinutes * 60);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleSubmit = useCallback(async () => {
    if (submitting || result) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/exams/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId: params.id, answers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not submit exam.");
        return;
      }
      setResult(data.result);
      setReview(data.review);
    } catch {
      setError("Something went wrong while submitting.");
    } finally {
      setSubmitting(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, params.id, submitting, result]);

  useEffect(() => {
    if (secondsLeft === null || result) return;
    if (secondsLeft <= 0) {
      handleSubmit();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => (s !== null ? s - 1 : s)), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, result, handleSubmit]);

  if (loading) {
    return <div className="container-page py-24 text-center text-slate-500">Loading exam…</div>;
  }

  if (error && !exam) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-red-500">{error}</p>
        <Link href="/dashboard" className="mt-4 inline-block text-cyan-600 hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  if (result && review) {
    return (
      <div className="container-page max-w-3xl py-14">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
          <p className="font-mono text-sm text-cyan-600">Exam submitted</p>
          <h1 className="mt-2 font-display text-2xl font-semibold text-navy-900">{result.examTitle}</h1>
          <p className="mt-6 font-display text-5xl font-semibold text-cyan-500">
            {result.score} / {result.totalMarks}
          </p>
          <p className="mt-2 text-slate-500">{result.percentage}% — saved to your Student ID</p>
          <Link
            href="/dashboard"
            className="mt-6 inline-block rounded-md bg-cyan-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-cyan-600"
          >
            Back to dashboard
          </Link>
        </div>

        <h2 className="mt-10 font-display text-lg font-semibold text-navy-900">Answer review</h2>
        <div className="mt-4 space-y-4">
          {review.map((q, idx) => (
            <div key={q.id} className="rounded-md border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-navy-900">
                {idx + 1}. {q.question}
              </p>
              <div className="mt-3 space-y-1.5">
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.correctIndex;
                  const isGiven = i === q.givenIndex;
                  return (
                    <div
                      key={i}
                      className={`rounded-md border px-3 py-2 text-sm ${
                        isCorrect
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                          : isGiven
                          ? "border-red-300 bg-red-50 text-red-700"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      {opt}
                      {isCorrect && <span className="ml-2 text-xs">✓ correct answer</span>}
                      {isGiven && !isCorrect && <span className="ml-2 text-xs">✗ your answer</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!exam) return null;

  const answeredCount = Object.keys(answers).length;
  const minutes = Math.floor((secondsLeft ?? 0) / 60);
  const seconds = (secondsLeft ?? 0) % 60;

  return (
    <div className="container-page max-w-3xl py-10">
      <div className="sticky top-16 z-10 -mx-4 mb-6 flex items-center justify-between border-b border-slate-200 bg-paper/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-md sm:border sm:px-5">
        <div>
          <h1 className="font-display text-lg font-semibold text-navy-900">{exam.title}</h1>
          <p className="text-xs text-slate-500">
            {answeredCount} / {exam.questions.length} answered
          </p>
        </div>
        <div
          className={`rounded-md px-3 py-1.5 font-mono text-sm ${
            (secondsLeft ?? 0) < 60 ? "bg-red-100 text-red-600" : "bg-cyan-100 text-cyan-700"
          }`}
        >
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-5">
        {exam.questions.map((q, idx) => (
          <div key={q.id} className="rounded-md border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-navy-900">
              {idx + 1}. {q.question}{" "}
              <span className="text-xs font-normal text-slate-400">({q.marks} marks)</span>
            </p>
            <div className="mt-3 space-y-2">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition ${
                    answers[q.id] === i
                      ? "border-cyan-400 bg-cyan-50 text-navy-900"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    checked={answers[q.id] === i}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                    className="accent-cyan-500"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-8 w-full rounded-md bg-cyan-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-cyan-600 disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit exam"}
      </button>
    </div>
  );
}

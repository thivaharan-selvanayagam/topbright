import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { getStudentSession } from "@/lib/auth";
import type { Result } from "@/lib/types";

export async function POST(req: NextRequest) {
  const session = getStudentSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in to submit this exam." }, { status: 401 });
  }

  const { examId, answers } = await req.json();
  if (!examId || typeof answers !== "object") {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const exams = await db.exams.all();
  const exam = exams.find((e) => e.id === examId && e.published);
  if (!exam) {
    return NextResponse.json({ error: "Exam not found." }, { status: 404 });
  }

  const results = await db.results.all();
  const already = results.find((r) => r.studentId === session.studentId && r.examId === exam.id);
  if (already) {
    return NextResponse.json({ error: "You have already submitted this exam." }, { status: 409 });
  }

  let score = 0;
  const totalMarks = exam.questions.reduce((sum, q) => sum + q.marks, 0);
  for (const q of exam.questions) {
    const given = answers[q.id];
    if (typeof given === "number" && given === q.correctIndex) {
      score += q.marks;
    }
  }
  const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 1000) / 10 : 0;

  const result: Result = {
    id: nanoid(10),
    studentId: session.studentId,
    studentName: session.name,
    examId: exam.id,
    examTitle: exam.title,
    score,
    totalMarks,
    percentage,
    answers,
    submittedAt: new Date().toISOString(),
  };

  results.push(result);
  await db.results.save(results);

  // Return the graded result with correct answers so the student sees them instantly.
  return NextResponse.json({
    result,
    review: exam.questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      givenIndex: typeof answers[q.id] === "number" ? answers[q.id] : null,
      marks: q.marks,
    })),
  });
}

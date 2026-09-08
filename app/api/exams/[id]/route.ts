import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getStudentSession } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getStudentSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in to take this exam." }, { status: 401 });
  }

  const exams = await db.exams.all();
  const exam = exams.find((e) => e.id === params.id && e.published);
  if (!exam) {
    return NextResponse.json({ error: "Exam not found." }, { status: 404 });
  }

  const results = await db.results.all();
  const already = results.find((r) => r.studentId === session.studentId && r.examId === exam.id);
  if (already) {
    return NextResponse.json({ error: "You have already submitted this exam.", already: true }, { status: 409 });
  }

  // Strip correct answers before sending to the client.
  const safeExam = {
    id: exam.id,
    title: exam.title,
    description: exam.description,
    grade: exam.grade,
    durationMinutes: exam.durationMinutes,
    questions: exam.questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      marks: q.marks,
    })),
  };

  return NextResponse.json({ exam: safeExam });
}

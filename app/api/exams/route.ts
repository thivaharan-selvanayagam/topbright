import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getStudentSession } from "@/lib/auth";

export async function GET() {
  const session = getStudentSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in to view exams." }, { status: 401 });
  }

  const [exams, results] = await Promise.all([db.exams.all(), db.results.all()]);
  const myResults = results.filter((r) => r.studentId === session.studentId);
  const attemptedIds = new Set(myResults.map((r) => r.examId));

  const list = exams
    .filter((e) => e.published)
    .map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      grade: e.grade,
      durationMinutes: e.durationMinutes,
      questionCount: e.questions.length,
      totalMarks: e.questions.reduce((sum, q) => sum + q.marks, 0),
      attempted: attemptedIds.has(e.id),
    }));

  return NextResponse.json({ exams: list, results: myResults });
}

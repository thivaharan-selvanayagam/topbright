import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getStudentSession } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getStudentSession();
    if (!session) {
      return NextResponse.json({ error: "Please log in to take this exam." }, { status: 401 });
    }

    const exams = await db.exams.all();
    const exam = exams.find((e) => String(e.id) === String(params.id) && e.published);
    if (!exam) {
      return NextResponse.json({ error: "Exam paper not found." }, { status: 404 });
    }

    const results = await db.results.all();
    const already = results.find(
      (r) =>
        String(r.studentId).toLowerCase() === String(session.studentId).toLowerCase() &&
        String(r.examId) === String(exam.id)
    );

    if (already) {
      return NextResponse.json(
        { error: "You have already submitted this exam.", already: true },
        { status: 409 }
      );
    }

    // Strip correct answers before sending questions to the client browser
    const safeExam = {
      id: exam.id,
      title: exam.title,
      description: exam.description,
      grade: exam.grade,
      durationMinutes: exam.durationMinutes || 30,
      questions: (exam.questions || []).map((q: any) => ({
        id: q.id,
        question: q.question,
        options: q.options,
        marks: q.marks || 1,
      })),
    };

    return NextResponse.json({ exam: safeExam }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to load exam details." },
      { status: 500 }
    );
  }
}
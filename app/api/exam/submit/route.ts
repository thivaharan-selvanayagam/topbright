import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { getStudentSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getStudentSession();
    if (!session) {
      return NextResponse.json(
        { error: "Session expired. Please log in again to submit." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { examId, answers } = body || {};

    if (!examId || typeof answers !== "object" || answers === null) {
      return NextResponse.json({ error: "Invalid submission data." }, { status: 400 });
    }

    const exams = await db.exams.all();
    const exam = exams.find((e: any) => String(e.id) === String(examId));
    if (!exam) {
      return NextResponse.json({ error: "Exam paper not found." }, { status: 404 });
    }

    const currentStudentId = String(session.studentId || "").toLowerCase();
    const results = await db.results.all();

    // Prevent duplicate attempts
    const alreadySubmitted = results.find(
      (r: any) =>
        String(r.studentId || "").toLowerCase() === currentStudentId &&
        String(r.examId) === String(exam.id)
    );

    if (alreadySubmitted) {
      return NextResponse.json({ error: "You have already submitted this exam." }, { status: 409 });
    }

    let score = 0;
    const questions = exam.questions || [];
    let totalMarks = 0;

    const review = questions.map((q: any) => {
      const qMarks = Number(q.marks) || 1;
      totalMarks += qMarks;

      const givenIndex = typeof answers[q.id] === "number" ? answers[q.id] : null;
      const correctIndex =
        typeof q.correctIndex === "number"
          ? q.correctIndex
          : typeof q.correctAnswer === "number"
          ? q.correctAnswer
          : 0;

      const isCorrect = givenIndex !== null && Number(givenIndex) === Number(correctIndex);
      if (isCorrect) {
        score += qMarks;
      }

      return {
        id: q.id,
        question: q.question,
        options: q.options || [],
        correctIndex,
        givenIndex,
        marks: qMarks,
      };
    });

    const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;

    const newResult = {
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

    // Safely attempt persistence while preventing EROFS server crash
    try {
      results.unshift(newResult);
      await db.results.save(results);
    } catch (saveErr) {
      console.warn("Could not persist result to disk:", saveErr);
    }

    return NextResponse.json({
      success: true,
      result: newResult,
      review,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error while processing MCQ submission." },
      { status: 500 }
    );
  }
}
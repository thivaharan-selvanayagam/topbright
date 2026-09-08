import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import type { Exam } from "@/lib/types";

export async function GET() {
  if (!getAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const exams = await db.exams.all();
  return NextResponse.json({ exams });
}

export async function POST(req: NextRequest) {
  if (!getAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { title, description, grade, durationMinutes, questions, published } = body;

  if (!title || !grade || !durationMinutes || !Array.isArray(questions) || questions.length === 0) {
    return NextResponse.json({ error: "Title, grade, duration and at least one question are required." }, { status: 400 });
  }

  const exam: Exam = {
    id: nanoid(8),
    title,
    description: description || "",
    grade,
    durationMinutes: Number(durationMinutes),
    published: Boolean(published),
    createdAt: new Date().toISOString(),
    questions: questions.map((q: any) => ({
      id: nanoid(6),
      question: q.question,
      options: q.options,
      correctIndex: Number(q.correctIndex),
      marks: Number(q.marks) || 1,
    })),
  };

  const exams = await db.exams.all();
  exams.push(exam);
  await db.exams.save(exams);

  return NextResponse.json({ exam });
}

export async function PATCH(req: NextRequest) {
  if (!getAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, published } = await req.json();
  const exams = await db.exams.all();
  const exam = exams.find((e) => e.id === id);
  if (!exam) return NextResponse.json({ error: "Exam not found." }, { status: 404 });
  exam.published = Boolean(published);
  await db.exams.save(exams);
  return NextResponse.json({ exam });
}

export async function DELETE(req: NextRequest) {
  if (!getAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const exams = await db.exams.all();
  const filtered = exams.filter((e) => e.id !== id);
  await db.exams.save(filtered);
  return NextResponse.json({ ok: true });
}

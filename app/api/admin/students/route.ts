import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import type { Student } from "@/lib/types";

export async function GET() {
  if (!getAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const students = await db.students.all();
  return NextResponse.json({
    students: students.map(({ passwordHash, ...rest }) => rest),
  });
}

export async function POST(req: NextRequest) {
  if (!getAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, name, grade, mode, password, phone } = await req.json();

  if (!id || !name || !grade || !mode || !password) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const students = await db.students.all();
  if (students.some((s) => s.id.toLowerCase() === id.toLowerCase())) {
    return NextResponse.json({ error: "That Student ID already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newStudent: Student = {
    id,
    name,
    grade,
    mode,
    phone,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  students.push(newStudent);
  await db.students.save(students);

  const { passwordHash: _, ...safe } = newStudent;
  return NextResponse.json({ student: safe });
}

export async function DELETE(req: NextRequest) {
  if (!getAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const students = await db.students.all();
  const filtered = students.filter((s) => s.id !== id);
  await db.students.save(filtered);
  return NextResponse.json({ ok: true });
}

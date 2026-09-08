import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signStudentToken, COOKIE_NAMES } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { studentId, password } = await req.json();

    if (!studentId || !password) {
      return NextResponse.json({ error: "Student ID and password are required." }, { status: 400 });
    }

    const students = await db.students.all();
    const student = students.find(
      (s) => s.id.toLowerCase() === String(studentId).trim().toLowerCase()
    );

    if (!student) {
      return NextResponse.json({ error: "Invalid student ID or password." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, student.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid student ID or password." }, { status: 401 });
    }

    const token = signStudentToken({ studentId: student.id, name: student.name });

    const res = NextResponse.json({
      ok: true,
      student: { id: student.id, name: student.name, grade: student.grade },
    });
    res.cookies.set(COOKIE_NAMES.STUDENT_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8,
      path: "/",
    });
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

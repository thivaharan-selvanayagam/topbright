import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import type { Student } from "@/lib/types";

export async function GET(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const students = await db.students.all();
    return NextResponse.json({ students });
  } catch {
    return NextResponse.json({ students: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, name, grade, mode, password, phone } = body;

    if (!id || !name || !password) {
      return NextResponse.json(
        { error: "Student ID, Name, and Password are required." },
        { status: 400 }
      );
    }

    const students = await db.students.all();
    const exists = students.some(
      (s) => s.id.toLowerCase() === id.trim().toLowerCase()
    );

    if (exists) {
      return NextResponse.json(
        { error: "Student ID already exists." },
        { status: 400 }
      );
    }

    const newStudent: Student = {
      id: id.trim(),
      name: name.trim(),
      grade: grade || "Grade 10",
      mode: mode || "Online",
      phone: phone?.trim() || "",
      passwordHash: password.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    };

    students.unshift(newStudent);
    await db.students.save(students);

    return NextResponse.json({ success: true, student: newStudent });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to create student." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Student ID required." }, { status: 400 });
  }

  try {
    const students = await db.students.all();
    const updated = students.filter(
      (s) => s.id.toLowerCase() !== id.trim().toLowerCase()
    );
    await db.students.save(updated);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete student." },
      { status: 500 }
    );
  }
}
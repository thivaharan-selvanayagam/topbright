import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { calculateFee } from "@/lib/feeCalculator";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const students = await db.students.all();
    return NextResponse.json({ students: students || [] }, { status: 200 });
  } catch {
    return NextResponse.json({ students: [] }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, name, grade, medium, place, mode, password, phone, feesPerClass, approved } = body;

    if (!id || !name || !password) {
      return NextResponse.json(
        { error: "Student ID, Name, and Password are required." },
        { status: 400 }
      );
    }

    const students = await db.students.all();
    const cleanId = id.trim().toLowerCase();
    const exists = students.some(
      (s: any) => String(s.id || "").toLowerCase() === cleanId
    );

    if (exists) {
      return NextResponse.json(
        { error: "Student ID already exists." },
        { status: 400 }
      );
    }

    const selectedGrade = grade || "Grade 10";
    const selectedMedium = medium || "Tamil";
    const computedFee = feesPerClass ? Number(feesPerClass) : calculateFee(selectedGrade, selectedMedium);
    const passwordHash = await bcrypt.hash(password.trim(), 10);

    const newStudent: any = {
      id: id.trim(),
      name: name.trim(),
      grade: selectedGrade,
      medium: selectedMedium,
      place: place?.trim() || "Puttalam",
      mode: mode || "Group",
      phone: phone?.trim() || "",
      feesPerClass: computedFee,
      password: password.trim(),
      passwordHash,
      approved: approved !== undefined ? Boolean(approved) : true, // Admin-created accounts default to approved
      lastPaymentDate: "",
      lastPaymentAmount: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    students.unshift(newStudent);
    await db.students.save(students);

    return NextResponse.json({ success: true, student: newStudent }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to create student." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { studentId, approved, newPassword, grade, medium, place, phone, feesPerClass } = body;

    if (!studentId) {
      return NextResponse.json({ error: "Student ID is required." }, { status: 400 });
    }

    const students = await db.students.all();
    const cleanId = String(studentId).trim().toLowerCase();

    const index = students.findIndex(
      (s: any) => String(s.id || "").trim().toLowerCase() === cleanId
    );

    if (index === -1) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }

    const target: any = students[index];

    // Toggle Admin Approval Status
    if (typeof approved === "boolean") {
      target.approved = approved;
    }

    // Reset Password
    if (newPassword && String(newPassword).trim() !== "") {
      const plain = String(newPassword).trim();
      target.password = plain;
      target.passwordHash = await bcrypt.hash(plain, 10);
    }

    // Update optional fields
    if (grade) target.grade = grade;
    if (medium) target.medium = medium;
    if (place) target.place = place.trim();
    if (phone) target.phone = phone.trim();
    if (feesPerClass !== undefined) target.feesPerClass = Number(feesPerClass);

    students[index] = target;
    await db.students.save(students);

    return NextResponse.json({ success: true, student: target }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to update student." },
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
      (s: any) => String(s.id || "").toLowerCase() !== id.trim().toLowerCase()
    );
    await db.students.save(updated);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete student." },
      { status: 500 }
    );
  }
}
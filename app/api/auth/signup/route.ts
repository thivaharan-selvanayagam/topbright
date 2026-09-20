import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { calculateFee } from "@/lib/feeCalculator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, grade, medium, place, phone, password, mode } = body;

    if (!name || !grade || !medium || !place || !phone || !password) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const students = await db.students.all();

    // Generate Auto-Incrementing Student ID (e.g. ICT2026001)
    const nextSeq = students.length + 1;
    const studentId = `ICT2026${String(nextSeq).padStart(3, "0")}`;

    // Auto-calculate Fees per Class
    const feesPerClass = calculateFee(grade, medium);

    // Hash the password for security and type compatibility
    const passwordHash = await bcrypt.hash(password.trim(), 10);

    const newStudent: any = {
      id: studentId,
      name: name.trim(),
      grade,
      medium,
      place: place.trim(),
      phone: phone.trim(),
      mode: mode || "Group",
      feesPerClass,
      password: password.trim(),
      passwordHash,
      approved: false, // Pending Admin approval based on fee payment
      lastPaymentDate: "",
      lastPaymentAmount: 0,
      createdAt: new Date().toISOString(),
    };

    students.push(newStudent);
    await db.students.save(students);

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful! Your account is pending Admin approval.",
        studentId,
        feesPerClass,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Registration failed." },
      { status: 500 }
    );
  }
}
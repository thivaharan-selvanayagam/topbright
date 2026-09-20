import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized admin access." }, { status: 401 });
    }

    const { studentId, amount, paymentDate } = await req.json();
    const students = await db.students.all();
    const cleanId = String(studentId || "").trim().toLowerCase();

    const index = students.findIndex(
      (s: any) => String(s.id || "").trim().toLowerCase() === cleanId
    );

    if (index === -1) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }

    // Cast record to 'any' to bypass strict interface checks
    const target: any = students[index];
    target.lastPaymentDate = paymentDate || new Date().toISOString().slice(0, 10);
    target.lastPaymentAmount = Number(amount) || target.feesPerClass || 0;
    target.approved = true; // Automatically approve student upon fee payment settlement

    students[index] = target;
    await db.students.save(students);

    return NextResponse.json({ success: true, student: target }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to log payment." }, { status: 500 });
  }
}
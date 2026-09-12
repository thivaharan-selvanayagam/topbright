import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import { getStudentSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getStudentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please log in again." }, { status: 401 });
    }

    const form = await req.formData();
    const examId = String(form.get("examId") || "");
    const examTitle = String(form.get("examTitle") || "");
    const files = form.getAll("files") as File[];
    const studentId = session.studentId;

    if (!examId || files.length === 0) {
      return NextResponse.json({ error: "Please attach at least one answer file." }, { status: 400 });
    }

    // Retrieve existing submissions to enforce 1 submission rule
    let existingSubmissions: any[] = [];
    try {
      if (db && (db as any).unitSubmissions) {
        existingSubmissions = await db.unitSubmissions.all();
      } else {
        const filePath = path.join(process.cwd(), "data", "unitSubmissions.json");
        const content = await fs.readFile(filePath, "utf-8");
        existingSubmissions = JSON.parse(content);
      }
    } catch {
      existingSubmissions = [];
    }

    const alreadySubmitted = existingSubmissions.some(
      (s: any) => String(s.examId) === String(examId) && String(s.studentId).toLowerCase() === String(studentId).toLowerCase()
    );

    if (alreadySubmitted) {
      return NextResponse.json(
        { error: "Submission blocked: You have already submitted an answer sheet for this unit exam." },
        { status: 400 }
      );
    }

    // Resolve Student Grade from Database without relying on session.grade
    let studentGrade = "";
    try {
      const students = await db.students.all();
      const st = students.find((s) => String(s.id).toLowerCase() === String(studentId).toLowerCase());
      if (st && st.grade) studentGrade = st.grade;
    } catch {}

    if (!studentGrade || studentGrade === "Grade Class") {
      studentGrade = "Grade 10";
    }
    if (!studentGrade.toLowerCase().startsWith("grade") && !isNaN(Number(studentGrade))) {
      studentGrade = `Grade ${studentGrade}`;
    }

    const fileUrls: string[] = [];
    const uploadDir = path.join(process.cwd(), "public", "uploads", "unit-submissions");
    await fs.mkdir(uploadDir, { recursive: true });

    for (const file of files) {
      if (file && file.size > 0) {
        const bytes = Buffer.from(await file.arrayBuffer());
        const ext = file.name.split(".").pop() || "jpg";
        const safeName = `${studentId}-${Date.now()}-${nanoid(4)}.${ext}`;
        await fs.writeFile(path.join(uploadDir, safeName), bytes);
        fileUrls.push(`/uploads/unit-submissions/${safeName}`);
      }
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const newSubmission = {
      id: nanoid(8),
      examId,
      examTitle,
      studentId,
      studentName: session.name,
      grade: studentGrade,
      fileUrls,
      submittedAt: now.toISOString().slice(0, 10),
      expiresAt,
    };

    try {
      if (db && (db as any).unitSubmissions) {
        let allSubmissions = await db.unitSubmissions.all();
        allSubmissions = (allSubmissions || []).filter((s: any) => {
          return new Date(s.expiresAt || s.submittedAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000;
        });
        allSubmissions.unshift(newSubmission);
        await db.unitSubmissions.save(allSubmissions);
      } else {
        const dataDir = path.join(process.cwd(), "data");
        await fs.mkdir(dataDir, { recursive: true });
        const filePath = path.join(dataDir, "unitSubmissions.json");
        existingSubmissions.unshift(newSubmission);
        await fs.writeFile(filePath, JSON.stringify(existingSubmissions, null, 2));
      }
    } catch (dbErr) {
      console.error("DB Save Error:", dbErr);
    }

    return NextResponse.json({ success: true, submission: newSubmission }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error while processing uploaded files." },
      { status: 500 }
    );
  }
}
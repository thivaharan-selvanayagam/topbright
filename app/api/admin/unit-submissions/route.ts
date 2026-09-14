import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized admin access." }, { status: 401 });
    }

    // Always fetch submissions via lib/db.ts to ensure runtime updates stored in /tmp are read
    let submissions: any[] = [];
    try {
      submissions = await db.unitSubmissions.all();
    } catch {
      submissions = [];
    }

    // Fetch registered students to cross-reference actual grades
    let students: any[] = [];
    try {
      students = await db.students.all();
    } catch {}

    const now = Date.now();
    const processedSubmissions = (submissions || [])
      .filter((s: any) => {
        const expiryTime = s.expiresAt
          ? new Date(s.expiresAt).getTime()
          : new Date(s.submittedAt || Date.now()).getTime() + 30 * 24 * 60 * 60 * 1000;
        return expiryTime > now;
      })
      .map((s: any) => {
        const matchedStudent = students.find(
          (st: any) =>
            String(st.id || "").toLowerCase().trim() ===
            String(s.studentId || "").toLowerCase().trim()
        );

        let realGrade = matchedStudent?.grade || s.grade;
        if (!realGrade || realGrade === "Grade Class") {
          realGrade = "Grade 10";
        }
        if (!realGrade.toLowerCase().startsWith("grade") && !isNaN(Number(realGrade))) {
          realGrade = `Grade ${realGrade}`;
        }

        return {
          ...s,
          grade: realGrade,
        };
      });

    return NextResponse.json({ submissions: processedSubmissions }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch student submissions." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized admin access." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const submissionId = searchParams.get("id");

    if (!submissionId) {
      return NextResponse.json({ error: "Missing submission ID." }, { status: 400 });
    }

    const allSubmissions = await db.unitSubmissions.all();
    const updated = allSubmissions.filter((s: any) => String(s.id) !== String(submissionId));

    await db.unitSubmissions.save(updated);
    return NextResponse.json({ success: true, submissions: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete submission." },
      { status: 500 }
    );
  }
}
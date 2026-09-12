import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let submissions: any[] = [];

  try {
    if (db && (db as any).unitSubmissions) {
      submissions = await (db as any).unitSubmissions.all();
    } else {
      const filePath = path.join(process.cwd(), "data", "unitSubmissions.json");
      const content = await fs.readFile(filePath, "utf-8");
      submissions = JSON.parse(content);
    }

    // Fetch registered students to map actual grades
    let students: any[] = [];
    try {
      students = await db.students.all();
    } catch {}

    const now = Date.now();
    submissions = (submissions || [])
      .filter((s: any) => {
        const expiry = new Date(s.expiresAt || s.submittedAt).getTime() + 30 * 24 * 60 * 60 * 1000;
        return expiry > now;
      })
      .map((s: any) => {
        // Cross-reference student ID
        const matchedStudent = students.find(
          (st: any) => st.id?.toLowerCase() === (s.studentId || "").toLowerCase()
        );

        let realGrade = matchedStudent?.grade || s.grade;
        if (!realGrade || realGrade === "Grade Class") {
          realGrade = "Grade 10"; // Default fallback
        }
        if (!realGrade.toLowerCase().startsWith("grade") && !isNaN(Number(realGrade))) {
          realGrade = `Grade ${realGrade}`;
        }

        return {
          ...s,
          grade: realGrade,
        };
      });

    return NextResponse.json({ submissions }, { status: 200 });
  } catch {
    return NextResponse.json({ submissions: [] }, { status: 200 });
  }
}
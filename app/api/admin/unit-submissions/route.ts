import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Multi-source fallback reader to handle Vercel serverless ephemeral storage
async function getAllSubmissions() {
  let list: any[] = [];

  // 1. Fetch via DB abstraction
  try {
    if (db && (db as any).unitSubmissions) {
      const res = await (db as any).unitSubmissions.all();
      if (Array.isArray(res) && res.length > 0) list = res;
    }
  } catch {}

  // 2. Fallback to /tmp filesystem (Vercel runtime writes)
  if (list.length === 0) {
    try {
      const tmpPath = path.join("/tmp", "unitSubmissions.json");
      const content = await fs.readFile(tmpPath, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) list = parsed;
    } catch {}
  }

  // 3. Fallback to repository data directory
  if (list.length === 0) {
    try {
      const dataPath = path.join(process.cwd(), "data", "unitSubmissions.json");
      const content = await fs.readFile(dataPath, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) list = parsed;
    } catch {}
  }

  return list;
}

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized admin access." }, { status: 401 });
    }

    const rawSubmissions = await getAllSubmissions();

    // Fetch registered students to cross-reference actual grades
    let students: any[] = [];
    try {
      students = await db.students.all();
    } catch {}

    const now = Date.now();

    // Process and preserve submissions safely without dropping valid entries
    const processedSubmissions = (rawSubmissions || [])
      .filter((s: any) => {
        if (!s) return false;
        if (!s.expiresAt && !s.submittedAt) return true;
        const targetDate = s.expiresAt ? new Date(s.expiresAt) : new Date(s.submittedAt);
        const expiryTime = targetDate.getTime() + (s.expiresAt ? 0 : 30 * 24 * 60 * 60 * 1000);
        if (isNaN(expiryTime)) return true;
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

    const allSubmissions = await getAllSubmissions();
    const updated = allSubmissions.filter((s: any) => String(s.id) !== String(submissionId));

    if (db && (db as any).unitSubmissions) {
      await (db as any).unitSubmissions.save(updated);
    }

    return NextResponse.json({ success: true, submissions: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete submission." },
      { status: 500 }
    );
  }
}
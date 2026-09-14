import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { getStudentSession } from "@/lib/auth";
import { db } from "@/lib/db";
import StudentDashboardClient from "./StudentDashboardClient";
import type { DownloadItem } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Helper to check grade matching
function matchesGrade(itemGrade: string, studentGrade: string): boolean {
  if (!itemGrade || !studentGrade) return false;
  const cleanItem = itemGrade.toLowerCase().replace("grade", "").trim();
  const cleanStudent = studentGrade.toLowerCase().replace("grade", "").trim();
  return itemGrade === "All Grades" || cleanItem === cleanStudent || itemGrade.includes(studentGrade);
}

// Safely fetch unit submissions from database or fallback JSON
async function getUnitSubmissions() {
  try {
    if ((db as any).unitSubmissions) {
      return await (db as any).unitSubmissions.all();
    }
    const filePath = path.join(process.cwd(), "data", "unitSubmissions.json");
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const session = getStudentSession();
  if (!session) redirect("/login");

  const currentStudentId = (session.studentId || "").toString().trim().toLowerCase();

  const [exams, results, students, downloads, submissions] = await Promise.all([
    db.exams.all().catch(() => []),
    db.results.all().catch(() => []),
    db.students.all().catch(() => []),
    db.downloads.all().catch(() => []),
    getUnitSubmissions(),
  ]);

  const student = students.find(
    (s: any) => (s.id || "").toString().trim().toLowerCase() === currentStudentId
  );
  const studentGrade = student?.grade || "";

  // 1. Filter student's submitted MCQ results with string-normalized studentId comparison
  const myResults = results
    .filter(
      (r: any) => (r.studentId || "").toString().trim().toLowerCase() === currentStudentId
    )
    .sort((a: any, b: any) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  // 2. Create a Set of normalized exam IDs that the student has already completed
  const attemptedExamIds = new Set(
    myResults.map((r: any) => (r.examId || "").toString().trim())
  );

  // 3. Exclude attempted exams so they disappear from the practice list once submitted
  const practiceExams = exams.filter((e: any) => {
    const examIdStr = (e.id || "").toString().trim();
    const isPublished = Boolean(e.published);
    const hasAttempted = attemptedExamIds.has(examIdStr);
    const isGradeMatch = matchesGrade(e.grade, studentGrade);

    return isPublished && !hasAttempted && isGradeMatch;
  });

  // 4. Unit Exams
  const unitExams = (downloads as DownloadItem[]).filter(
    (d) => d.category === "Unit Exams" && matchesGrade(d.grade, studentGrade)
  );

  // 5. Unit Notes
  const unitNotes = (downloads as DownloadItem[]).filter(
    (d) => d.category === "Unit Notes" && matchesGrade(d.grade, studentGrade)
  );

  // 6. Submissions belonging to this student
  const mySubmissions = submissions.filter((s: any) => {
    const subStudentId = (s.studentId || "").toString().trim().toLowerCase();
    return subStudentId === currentStudentId;
  });

  return (
    <StudentDashboardClient
      session={session}
      student={student}
      practiceExams={practiceExams}
      myResults={myResults}
      unitExams={unitExams}
      unitNotes={unitNotes}
      mySubmissions={mySubmissions}
    />
  );
}
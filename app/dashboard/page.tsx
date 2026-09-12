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

  // Fix: Access session.studentId directly
  const currentStudentId = (session.studentId || "").toString().trim().toLowerCase();

  const [exams, results, students, downloads, submissions] = await Promise.all([
    db.exams.all().catch(() => []),
    db.results.all().catch(() => []),
    db.students.all().catch(() => []),
    db.downloads.all().catch(() => []),
    getUnitSubmissions(),
  ]);

  const student = students.find((s: any) => s.id?.toLowerCase() === currentStudentId);
  const studentGrade = student?.grade || "";

  // 1. MCQ Practice Exams
  const myResults = results
    .filter((r: any) => r.studentId?.toLowerCase() === currentStudentId)
    .sort((a: any, b: any) => (a.submittedAt < b.submittedAt ? 1 : -1));

  const attemptedIds = new Set(myResults.map((r: any) => r.examId));
  const practiceExams = exams.filter(
    (e: any) => e.published && !attemptedIds.has(e.id) && matchesGrade(e.grade, studentGrade)
  );

  // 2. Unit Exams
  const unitExams = (downloads as DownloadItem[]).filter(
    (d) => d.category === "Unit Exams" && matchesGrade(d.grade, studentGrade)
  );

  // 3. Unit Notes
  const unitNotes = (downloads as DownloadItem[]).filter(
    (d) => d.category === "Unit Notes" && matchesGrade(d.grade, studentGrade)
  );

  // 4. Submissions belonging to this student
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
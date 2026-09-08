import { redirect } from "next/navigation";
import Link from "next/link";
import { getStudentSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = getStudentSession();
  if (!session) redirect("/login");

  const [exams, results, students] = await Promise.all([db.exams.all(), db.results.all(), db.students.all()]);
  const student = students.find((s) => s.id === session.studentId);
  const myResults = results
    .filter((r) => r.studentId === session.studentId)
    .sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));
  const attemptedIds = new Set(myResults.map((r) => r.examId));
  const available = exams.filter((e) => e.published && !attemptedIds.has(e.id));

  return (
    <div>
      <section className="border-b border-line/60 bg-navy-950">
        <div className="container-page py-14">
          <p className="font-mono text-sm text-cyan-400">Dashboard</p>
          <h1 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
            Welcome back, {session.name.split(" ")[0]}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Student ID: <span className="font-mono text-slate-300">{session.studentId}</span>
            {student && <> · Grade {student.grade} · {student.mode} classes</>}
          </p>
        </div>
      </section>

      <section className="container-page py-14">
        <h2 className="font-display text-lg font-semibold text-navy-900">Available exams</h2>
        {available.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            No new exams right now — check back after your next class.
          </p>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {available.map((e) => (
              <div key={e.id} className="rounded-md border border-slate-200 bg-white p-5">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{e.grade}</span>
                <h3 className="mt-2 font-display text-base font-semibold text-navy-900">{e.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{e.description}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {e.questions.length} questions · {e.durationMinutes} minutes
                </p>
                <Link
                  href={`/exam/${e.id}`}
                  className="mt-4 inline-block rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-600 focus-ring"
                >
                  Start exam
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white py-14">
        <div className="container-page">
          <h2 className="font-display text-lg font-semibold text-navy-900">Your results</h2>
          {myResults.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">You haven't sat any exams yet.</p>
          ) : (
            <div className="mt-5 overflow-x-auto rounded-md border border-slate-200">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-500">
                    <th className="px-4 py-3 font-medium">Exam</th>
                    <th className="px-4 py-3 font-medium">Score</th>
                    <th className="px-4 py-3 font-medium">Percentage</th>
                    <th className="px-4 py-3 font-medium">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {myResults.map((r) => (
                    <tr key={r.id}>
                      <td className="px-4 py-3 text-navy-900">{r.examTitle}</td>
                      <td className="px-4 py-3 font-mono text-navy-900">
                        {r.score} / {r.totalMarks}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            r.percentage >= 75
                              ? "bg-emerald-100 text-emerald-700"
                              : r.percentage >= 50
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {r.percentage}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {new Date(r.submittedAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

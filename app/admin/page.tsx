"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Tab =
  | "submissions"
  | "students"
  | "fees"
  | "exams"
  | "videos"
  | "downloads"
  | "timetable";

const GRADES = [
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
  "Grade 13",
  "Grade 6, 7 & 8",
  "Grade 10 & 11",
  "Grade 12 & 13",
  "All Grades",
];
const SINGLE_GRADES = [
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
  "Grade 13",
];
const MEDIUMS = ["Tamil", "English"];
const MODES = ["Online", "Physical", "One-to-One", "Group"];
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DOWNLOAD_CATEGORIES = [
  "Past Papers",
  "Model Papers",
  "School Exam Papers",
  "Books",
  "Unit Exams",
  "Unit Notes",
];
const SCHOOL_TERMS = ["Term 1", "Term 2", "Term 3"];

const INPUT_CLASS =
  "w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#8a00c2] focus:ring-1 focus:ring-[#8a00c2]";

function calculateFee(grade: string, medium: string): number {
  let baseFee = 500;
  const gNum = parseInt(grade.replace(/\D/g, ""), 10);

  if (gNum >= 6 && gNum <= 9) baseFee = 400;
  else if (gNum >= 10 && gNum <= 11) baseFee = 500;
  else if (gNum >= 12 && gNum <= 13) baseFee = 700;

  if (medium.toLowerCase() === "english") baseFee += 100;
  return baseFee;
}

function formatTime12h(time24: string) {
  if (!time24) return "";
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr || "00";
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const hFormatted = h < 10 ? `0${h}` : `${h}`;
  return `${hFormatted}:${m} ${ampm}`;
}

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>("submissions");

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.loggedIn) router.push("/admin/login");
        else setChecking(false);
      });
  }, [router]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  if (checking)
    return (
      <div className="min-h-screen bg-slate-950 py-24 text-center text-slate-500 font-mono">
        Checking access…
      </div>
    );

  const tabs: { id: Tab; label: string }[] = [
    { id: "submissions", label: "Student Submissions" },
    { id: "students", label: "Students Directory" },
    { id: "fees", label: "Fee Collection" },
    { id: "exams", label: "Exams" },
    { id: "videos", label: "Videos" },
    { id: "downloads", label: "Downloads" },
    { id: "timetable", label: "Timetable" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white select-none pb-20">
      <section className="border-b border-white/10 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-10">
          <div>
            <p className="font-mono text-xs font-bold tracking-widest text-[#f0822b] uppercase">
              Admin panel
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white">
              Manage Academy Portal
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold text-slate-300 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            Log out
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 rounded-xl border border-[#f0822b]/30 bg-[#f0822b]/10 px-5 py-4 text-xs font-medium text-slate-200 leading-relaxed">
          <strong className="text-[#f0822b]">System Note:</strong> Data is saved to Upstash Redis database for permanent cloud persistence across Vercel serverless deployments.
        </div>

        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
                tab === t.id
                  ? "bg-[#8a00c2] text-white shadow-md shadow-[#8a00c2]/20"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "submissions" && <SubmissionsTab />}
          {tab === "students" && <StudentsTab />}
          {tab === "fees" && <FeesTab />}
          {tab === "exams" && <ExamsTab />}
          {tab === "videos" && <VideosTab />}
          {tab === "downloads" && <DownloadsTab />}
          {tab === "timetable" && <TimetableTab />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Student Submissions Tab ---------------- */
function SubmissionsTab() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/unit-submissions")
      .then((r) => r.json())
      .then((data) => setSubmissions(data.submissions || []))
      .catch(() => setSubmissions([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-8 text-center font-mono text-xs text-slate-500">
        Loading student answer sheets...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-white">
            Student Written Unit Exam Submissions
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Answer sheet uploads are retained for 30 days before auto-purging.
          </p>
        </div>
        <span className="rounded-xl bg-purple-500/20 border border-purple-500/30 px-3.5 py-1.5 font-mono text-xs font-bold text-purple-300">
          Total Submissions: {submissions.length}
        </span>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-12 text-center">
          <p className="text-xs font-mono text-slate-500">
            No student answer sheets uploaded yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-display text-base font-bold text-white">
                        {sub.studentName}
                      </h4>
                      <span className="rounded-md bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-purple-300 uppercase">
                        {sub.grade || "Grade Class"}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#f0822b] mt-1">
                      ID: {sub.studentId}
                    </p>
                  </div>
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                    {sub.submittedAt}
                  </span>
                </div>

                <div className="mt-4 rounded-xl bg-white/5 border border-white/5 p-3">
                  <span className="font-mono text-[10px] uppercase text-slate-400 font-bold block">
                    Exam Title
                  </span>
                  <p className="text-xs font-bold text-white mt-1">
                    {sub.examTitle}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4">
                <span className="font-mono text-[10px] uppercase text-slate-400 font-bold block mb-2">
                  Uploaded Pages ({sub.fileUrls?.length || 1}):
                </span>
                <div className="flex flex-wrap gap-2">
                  {sub.fileUrls?.map((url: string, idx: number) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-purple-500/40 bg-[#8a00c2]/20 px-3 py-1.5 font-mono text-xs font-bold text-purple-200 hover:bg-[#8a00c2]/40 transition-colors"
                    >
                      📄 Page {idx + 1}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Students Directory Tab ---------------- */
function StudentsTab() {
  const [students, setStudents] = useState<any[]>([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    grade: "Grade 10",
    medium: "Tamil",
    place: "Puttalam",
    mode: "Group",
    password: "",
    phone: "",
  });
  const [resetStudent, setResetStudent] = useState<any | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  function load() {
    fetch("/api/admin/students")
      .then((r) => r.json())
      .then((d) => setStudents(d.students || []));
  }
  useEffect(load, []);

  const calculatedFee = calculateFee(form.grade, form.medium);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    const assignedId =
      form.id.trim() ||
      `ICT2026${String(students.length + 1).padStart(3, "0")}`;

    const res = await fetch("/api/admin/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        id: assignedId,
        feesPerClass: calculatedFee,
      }),
    });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error);
    setForm({
      id: "",
      name: "",
      grade: "Grade 10",
      medium: "Tamil",
      place: "Puttalam",
      mode: "Group",
      password: "",
      phone: "",
    });
    load();
  }

  async function handleToggleApproval(
    studentId: string,
    currentStatus: boolean
  ) {
    await fetch("/api/admin/students", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, approved: !currentStatus }),
    });
    load();
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!resetStudent || !newPassword) return;

    const res = await fetch("/api/admin/students", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: resetStudent.id, newPassword }),
    });

    if (res.ok) {
      setResetStudent(null);
      setNewPassword("");
      load();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(`Remove student ${id}?`)) return;
    await fetch(`/api/admin/students?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr]">
      <form
        onSubmit={handleAdd}
        className="h-fit space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md"
      >
        <h3 className="font-display text-lg font-bold text-white mb-2">
          Register new student
        </h3>
        {msg && (
          <p className="text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            {msg}
          </p>
        )}

        <Field label="Student ID (Auto-generated if blank)">
          <input
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            className={INPUT_CLASS}
            placeholder={`Auto e.g. ICT2026${String(
              students.length + 1
            ).padStart(3, "0")}`}
          />
        </Field>
        <Field label="Full name">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={INPUT_CLASS}
            placeholder="e.g. A. Dheena"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Grade">
            <select
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
              className={INPUT_CLASS}
            >
              {SINGLE_GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Medium">
            <select
              value={form.medium}
              onChange={(e) => setForm({ ...form, medium: e.target.value })}
              className={INPUT_CLASS}
            >
              {MEDIUMS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Place / Town">
            <input
              required
              value={form.place}
              onChange={(e) => setForm({ ...form, place: e.target.value })}
              className={INPUT_CLASS}
              placeholder="e.g. Puttalam"
            />
          </Field>
          <Field label="Class mode">
            <select
              value={form.mode}
              onChange={(e) => setForm({ ...form, mode: e.target.value })}
              className={INPUT_CLASS}
            >
              {MODES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Password">
          <input
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={INPUT_CLASS}
            placeholder="Set initial student password"
          />
        </Field>
        <Field label="Phone number">
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={INPUT_CLASS}
            placeholder="e.g. 0771234567"
          />
        </Field>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 flex justify-between items-center font-mono text-xs">
          <span className="text-slate-300 font-bold">Auto-Calculated Fee:</span>
          <span className="text-emerald-400 font-extrabold text-sm">
            LKR {calculatedFee} / Class
          </span>
        </div>

        <button className="w-full rounded-xl bg-[#8a00c2] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 transition-all hover:bg-[#7200a3] hover:-translate-y-0.5 mt-4">
          Register &amp; Approve Student
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
        <table className="w-full min-w-[700px] text-sm text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-slate-300 font-mono text-[10px] uppercase">
              <th className="px-4 py-4">ID</th>
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Grade</th>
              <th className="px-4 py-4">Medium</th>
              <th className="px-4 py-4">Place</th>
              <th className="px-4 py-4">Fees</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono text-xs">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-[#f0822b] font-bold">{s.id}</td>
                <td className="px-4 py-3 text-white font-sans font-bold">
                  {s.name}
                </td>
                <td className="px-4 py-3 text-purple-300">{s.grade}</td>
                <td className="px-4 py-3 text-slate-300">
                  {s.medium || "Tamil"}
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {s.place || "N/A"}
                </td>
                <td className="px-4 py-3 text-emerald-400 font-bold">
                  LKR{" "}
                  {s.feesPerClass ||
                    calculateFee(s.grade, s.medium || "Tamil")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      s.approved
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {s.approved ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() =>
                      handleToggleApproval(s.id, Boolean(s.approved))
                    }
                    className={`px-2 py-1 rounded text-[11px] font-bold ${
                      s.approved
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    {s.approved ? "Revoke" : "Approve"}
                  </button>
                  <button
                    onClick={() => setResetStudent(s)}
                    className="px-2 py-1 rounded bg-[#8a00c2]/30 text-purple-200 text-[11px] font-bold hover:bg-[#8a00c2]/50"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-400 hover:text-red-300 font-bold"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-12 text-center text-slate-500 text-xs"
                >
                  No students registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {resetStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleResetPassword}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 space-y-4"
          >
            <h3 className="font-display text-lg font-bold text-white">
              Reset Password for {resetStudent.name}
            </h3>
            <p className="font-mono text-xs text-[#f0822b]">
              Student ID: {resetStudent.id}
            </p>
            <input
              type="text"
              required
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={INPUT_CLASS}
            />
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setResetStudent(null)}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-xs font-bold text-slate-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-[#8a00c2] py-2.5 text-xs font-bold text-white"
              >
                Save Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/* ---------------- Fees Collection Tab ---------------- */
function FeesTab() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [amount, setAmount] = useState<number>(500);
  const [paymentDate, setPaymentDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  function load() {
    fetch("/api/admin/students")
      .then((r) => r.json())
      .then((d) => setStudents(d.students || []));
  }
  useEffect(load, []);

  async function handleSettlePayment(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedStudent) return;

    const res = await fetch("/api/admin/fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: selectedStudent.id,
        amount,
        paymentDate,
      }),
    });

    if (res.ok) {
      setSelectedStudent(null);
      load();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-white">
            Student Monthly Fees Collection Ledger
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Track advance monthly fee settlements (Due within first 5 days of
            the month).
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
        <table className="w-full min-w-[700px] text-sm text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-slate-300 font-mono text-[10px] uppercase">
              <th className="px-5 py-4">Student ID</th>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Grade</th>
              <th className="px-5 py-4">Phone Number</th>
              <th className="px-5 py-4">Last Payment Date</th>
              <th className="px-5 py-4">Last Settled Amount</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono text-xs">
            {students.map((st) => (
              <tr key={st.id} className="hover:bg-white/5 transition-colors">
                <td className="px-5 py-4 text-[#f0822b] font-bold">{st.id}</td>
                <td className="px-5 py-4 font-bold text-white font-sans">
                  {st.name}
                </td>
                <td className="px-5 py-4 text-purple-300">{st.grade}</td>
                <td className="px-5 py-4 text-slate-300">
                  {st.phone || "N/A"}
                </td>
                <td className="px-5 py-4 text-slate-300">
                  {st.lastPaymentDate || "Not Settled"}
                </td>
                <td className="px-5 py-4 text-emerald-400 font-bold">
                  {st.lastPaymentAmount
                    ? `LKR ${st.lastPaymentAmount}`
                    : "LKR 0"}
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => {
                      setSelectedStudent(st);
                      setAmount(
                        st.feesPerClass ||
                          calculateFee(st.grade, st.medium || "Tamil")
                      );
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#8a00c2] text-xs font-bold text-white hover:bg-[#7200a3]"
                  >
                    Record Fee Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleSettlePayment}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 space-y-4 font-mono text-xs"
          >
            <h3 className="font-display text-lg font-bold text-white font-sans">
              Record Monthly Fee Settlement
            </h3>
            <p className="text-purple-300 font-bold">
              {selectedStudent.name} ({selectedStudent.id})
            </p>

            <div>
              <label className="block text-slate-400 mb-1">
                Amount Settled (LKR)
              </label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Payment Date</label>
              <input
                type="date"
                required
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-slate-400 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-[#8a00c2] py-2.5 text-white font-bold"
              >
                Settle &amp; Approve
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/* ---------------- Timetable Tab ---------------- */
function TimetableTab() {
  const [form, setForm] = useState({
    day: "Monday",
    startTime: "16:00",
    endTime: "17:30",
    grade: "Grade 10 & 11",
    mode: "Online",
    topic: "",
  });
  const [msg, setMsg] = useState("");
  const [added, setAdded] = useState<any[]>([]);

  function loadTimetable() {
    fetch("/api/admin/timetable")
      .then((r) => r.json())
      .then((d) => setAdded(d.timetable || []))
      .catch(() => setAdded([]));
  }

  useEffect(() => {
    loadTimetable();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    const formattedTime = `${formatTime12h(form.startTime)} – ${formatTime12h(
      form.endTime
    )}`;

    const res = await fetch("/api/admin/timetable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day: form.day,
        time: formattedTime,
        grade: form.grade,
        mode: form.mode,
        topic: form.topic,
      }),
    });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error);
    setForm({
      day: "Monday",
      startTime: "16:00",
      endTime: "17:30",
      grade: "Grade 10 & 11",
      mode: "Online",
      topic: "",
    });
    loadTimetable();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/timetable?id=${id}`, { method: "DELETE" });
    loadTimetable();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form
        onSubmit={handleAdd}
        className="h-fit space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md"
      >
        <h3 className="font-display text-lg font-bold text-white mb-2">
          Add a class slot
        </h3>
        {msg && (
          <p className="text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            {msg}
          </p>
        )}

        <Field label="Day">
          <select
            value={form.day}
            onChange={(e) => setForm({ ...form, day: e.target.value })}
            className={INPUT_CLASS}
          >
            {DAYS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Start Time (Clock)">
            <input
              type="time"
              required
              value={form.startTime}
              onChange={(e) =>
                setForm({ ...form, startTime: e.target.value })
              }
              className={`${INPUT_CLASS} [color-scheme:dark]`}
            />
          </Field>
          <Field label="End Time (Clock)">
            <input
              type="time"
              required
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              className={`${INPUT_CLASS} [color-scheme:dark]`}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Grade">
            <select
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
              className={INPUT_CLASS}
            >
              {GRADES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </Field>
          <Field label="Mode">
            <select
              value={form.mode}
              onChange={(e) => setForm({ ...form, mode: e.target.value })}
              className={INPUT_CLASS}
            >
              {MODES.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Topic">
          <input
            required
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            className={INPUT_CLASS}
            placeholder="e.g. Unit 4: Python Data Structures"
          />
        </Field>

        <button className="w-full rounded-xl bg-[#8a00c2] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 transition-all hover:bg-[#7200a3] hover:-translate-y-0.5 mt-4">
          Add to timetable
        </button>
      </form>

      <div className="space-y-3">
        {added.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm"
          >
            <h4 className="font-display text-sm font-bold text-white">
              {t.day} · {t.time}
            </h4>
            <p className="mt-1 text-xs text-[#f0822b] font-mono">
              {t.grade} · {t.mode}
            </p>
            <p className="mt-2 text-sm text-slate-300 font-medium">{t.topic}</p>
            <button
              onClick={() => handleDelete(t.id)}
              className="mt-4 text-xs font-bold text-red-400 hover:text-red-300"
            >
              Remove Slot
            </button>
          </div>
        ))}
        {added.length === 0 && (
          <p className="text-xs text-slate-500 border border-dashed border-white/10 p-8 rounded-2xl text-center">
            No class slots configured in the timetable yet.
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Exams Tab ---------------- */
function ExamsTab() {
  const [exams, setExams] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("Grade 10 & 11");
  const [duration, setDuration] = useState(10);
  const [questions, setQuestions] = useState([
    {
      id: "q_1",
      question: "",
      options: ["", "", "", ""],
      correctIndex: 0,
      marks: 2,
    },
  ]);
  const [msg, setMsg] = useState("");

  function load() {
    fetch("/api/admin/exams")
      .then((r) => r.json())
      .then((d) => setExams(d.exams || []));
  }
  useEffect(load, []);

  function updateQuestion(i: number, patch: any) {
    setQuestions((qs) =>
      qs.map((q, idx) => (idx === i ? { ...q, ...patch } : q))
    );
  }
  function updateOption(i: number, oi: number, value: string) {
    setQuestions((qs) =>
      qs.map((q, idx) =>
        idx === i
          ? {
              ...q,
              options: q.options.map((o: string, j: number) =>
                j === oi ? value : o
              ),
            }
          : q
      )
    );
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    const preparedQuestions = questions.map((q, idx) => ({
      id: q.id || `q_${Date.now()}_${idx}`,
      question: q.question,
      options: q.options,
      correctIndex: Number(q.correctIndex),
      marks: Number(q.marks),
    }));

    const res = await fetch("/api/admin/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        grade,
        durationMinutes: Number(duration),
        questions: preparedQuestions,
        published: true,
      }),
    });

    const data = await res.json();
    if (!res.ok) return setMsg(data.error);

    setTitle("");
    setDescription("");
    setQuestions([
      {
        id: `q_${Date.now()}`,
        question: "",
        options: ["", "", "", ""],
        correctIndex: 0,
        marks: 2,
      },
    ]);
    load();
  }

  async function togglePublish(id: string, published: boolean) {
    await fetch("/api/admin/exams", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, published: !published }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (
      !confirm(
        "Delete this exam? Student results for it will remain on record."
      )
    )
      return;
    await fetch(`/api/admin/exams?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form
        onSubmit={handleCreate}
        className="h-fit space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md"
      >
        <h3 className="font-display text-lg font-bold text-white mb-2">
          Create an exam
        </h3>
        {msg && (
          <p className="text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            {msg}
          </p>
        )}
        <Field label="Title">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={INPUT_CLASS}
            placeholder="e.g. Unit 3 Programming Logic MCQ"
          />
        </Field>
        <Field label="Description">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={INPUT_CLASS}
            placeholder="Short instructions for students..."
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Grade">
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className={INPUT_CLASS}
            >
              {GRADES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </Field>
          <Field label="Duration (minutes)">
            <input
              type="number"
              min={1}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className={INPUT_CLASS}
            />
          </Field>
        </div>

        <div className="space-y-4 border-t border-white/10 pt-6 mt-4">
          {questions.map((q, i) => (
            <div
              key={q.id || i}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#f0822b]">
                  Question {i + 1}
                </p>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setQuestions((qs) => qs.filter((_, idx) => idx !== i))
                    }
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                required
                placeholder="Question text"
                value={q.question}
                onChange={(e) =>
                  updateQuestion(i, { question: e.target.value })
                }
                className={INPUT_CLASS}
              />
              <div className="mt-3 space-y-2">
                {q.options.map((opt: string, oi: number) => (
                  <div key={oi} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={`question_${i}_correct`}
                      checked={q.correctIndex === oi}
                      onChange={() => updateQuestion(i, { correctIndex: oi })}
                      className="text-[#8a00c2] focus:ring-[#8a00c2] bg-slate-900 border-white/20"
                    />
                    <input
                      required
                      placeholder={`Option ${oi + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(i, oi, e.target.value)}
                      className={`${INPUT_CLASS} py-1.5`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-slate-400 font-mono font-bold">
                Marks for correct answer:
                <input
                  type="number"
                  min={1}
                  value={q.marks}
                  onChange={(e) =>
                    updateQuestion(i, { marks: Number(e.target.value) })
                  }
                  className={`${INPUT_CLASS} w-20 py-1`}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setQuestions((qs) => [
                ...qs,
                {
                  id: `q_${Date.now()}_${qs.length}`,
                  question: "",
                  options: ["", "", "", ""],
                  correctIndex: 0,
                  marks: 2,
                },
              ])
            }
            className="text-xs font-bold text-[#8a00c2] hover:text-[#a914e8] transition-colors"
          >
            + Add another question
          </button>
        </div>

        <button className="w-full rounded-xl bg-[#8a00c2] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 transition-all hover:bg-[#7200a3] hover:-translate-y-0.5 mt-4">
          Create &amp; publish exam
        </button>
      </form>

      <div className="space-y-3">
        {exams.map((e) => (
          <div
            key={e.id}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-display text-base font-bold text-white">
                  {e.title}
                </h4>
                <p className="mt-1 text-xs text-slate-400 font-mono">
                  {e.grade} · {e.questions.length} questions ·{" "}
                  {e.durationMinutes} min
                </p>
              </div>
              <span
                className={`rounded-lg px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider ${
                  e.published
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-white/10 text-slate-400"
                }`}
              >
                {e.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="mt-4 flex gap-4 text-xs font-bold">
              <button
                onClick={() => togglePublish(e.id, e.published)}
                className="text-purple-400 hover:text-purple-300"
              >
                {e.published ? "Unpublish" : "Publish"}
              </button>
              <button
                onClick={() => handleDelete(e.id)}
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {exams.length === 0 && (
          <p className="text-xs text-slate-500 border border-dashed border-white/10 p-8 rounded-2xl text-center">
            No exams created yet.
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Downloads Tab ---------------- */
function DownloadsTab() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Past Papers",
    subCategory: "Term 1",
    grade: "Grade 11",
    fileUrl: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [added, setAdded] = useState<any[]>([]);

  function loadDownloads() {
    fetch("/api/admin/downloads")
      .then((r) => r.json())
      .then((d) => setAdded(d.downloads || d.items || []))
      .catch(() => setAdded([]));
  }

  useEffect(() => {
    loadDownloads();
  }, []);

  const availableGrades =
    form.category === "Past Papers"
      ? ["Grade 11", "Grade 12", "Grade 13"]
      : GRADES.filter((g) => !g.includes("&") && g !== "All Grades");

  useEffect(() => {
    if (
      form.category === "Past Papers" &&
      !["Grade 11", "Grade 12", "Grade 13"].includes(form.grade)
    ) {
      setForm((prev) => ({ ...prev, grade: "Grade 11" }));
    }
  }, [form.category, form.grade]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const body = new FormData();

    Object.entries(form).forEach(([k, v]) => {
      if (k === "subCategory" && form.category !== "School Exam Papers") return;
      body.append(k, v);
    });

    if (file) body.append("file", file);

    const res = await fetch("/api/admin/downloads", { method: "POST", body });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error);

    setForm({
      title: "",
      description: "",
      category: "Past Papers",
      subCategory: "Term 1",
      grade: "Grade 11",
      fileUrl: "",
    });
    setFile(null);
    loadDownloads();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/downloads?id=${id}`, { method: "DELETE" });
    loadDownloads();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <form
        onSubmit={handleAdd}
        className="h-fit space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md"
      >
        <h3 className="font-display text-lg font-bold text-white mb-2">
          Upload Resource
        </h3>
        {msg && (
          <p className="text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            {msg}
          </p>
        )}

        <Field label="Document Title">
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={INPUT_CLASS}
            placeholder="e.g., 2023 G.C.E O/L ICT Past Paper"
          />
        </Field>

        <Field label="Description (Optional)">
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={INPUT_CLASS}
            placeholder="Brief description of the material..."
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={INPUT_CLASS}
            >
              {DOWNLOAD_CATEGORIES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>

          <Field label="Grade">
            <select
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
              className={INPUT_CLASS}
            >
              {availableGrades.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </Field>
        </div>

        {form.category === "School Exam Papers" && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <Field label="School Term">
              <select
                value={form.subCategory}
                onChange={(e) =>
                  setForm({ ...form, subCategory: e.target.value })
                }
                className={`${INPUT_CLASS} border-[#f0822b]/50`}
              >
                {SCHOOL_TERMS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>
        )}

        <div className="border-t border-white/10 pt-4 mt-2">
          <Field label="Upload physical file (PDF, ZIP, docx)">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className={`${INPUT_CLASS} file:mr-4 file:rounded-xl file:border-0 file:bg-[#8a00c2]/20 file:px-4 file:py-1.5 file:text-xs file:font-bold file:text-[#8a00c2] hover:file:bg-[#8a00c2]/30`}
            />
          </Field>

          <p className="text-center text-xs font-mono text-slate-500 my-3">
            — OR —
          </p>

          <Field label="External Link (Google Drive, etc.)">
            <input
              value={form.fileUrl}
              onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
              className={INPUT_CLASS}
              placeholder="https://drive.google.com/..."
            />
          </Field>
        </div>

        <button className="w-full rounded-xl bg-[#8a00c2] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 transition-all hover:bg-[#7200a3] hover:-translate-y-0.5 mt-4">
          Publish Resource
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="font-display text-lg font-bold text-white mb-4">
          Uploaded Materials
        </h3>
        {added.map((d) => (
          <div
            key={d.id}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-display text-sm font-bold text-white">
                  {d.title}
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-md bg-[#8a00c2]/20 px-2 py-0.5 font-mono text-[10px] font-bold text-[#8a00c2] uppercase">
                    {d.category}
                  </span>
                  {d.subCategory && d.category === "School Exam Papers" && (
                    <span className="rounded-md bg-[#f0822b]/20 px-2 py-0.5 font-mono text-[10px] font-bold text-[#f0822b] uppercase">
                      {d.subCategory}
                    </span>
                  )}
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-300 uppercase">
                    {d.grade}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(d.id)}
                className="text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {added.length === 0 && (
          <div className="rounded-2xl border border-white/5 bg-white/5 p-8 text-center border-dashed">
            <p className="text-xs font-medium text-slate-500">
              No downloadable resources uploaded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Videos Tab ---------------- */
function VideosTab() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    url: "",
    grade: "Grade 10 & 11",
    category: "Theory",
  });
  const [msg, setMsg] = useState("");
  const [localVideos, setLocalVideos] = useState<any[]>([]);

  function loadVideos() {
    fetch("/api/admin/videos")
      .then((r) => r.json())
      .then((d) => setLocalVideos(d.videos || []))
      .catch(() => setLocalVideos([]));
  }

  useEffect(() => {
    loadVideos();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/admin/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error);
    setForm({
      title: "",
      description: "",
      url: "",
      grade: "Grade 10 & 11",
      category: "Theory",
    });
    loadVideos();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/videos?id=${id}`, { method: "DELETE" });
    loadVideos();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form
        onSubmit={handleAdd}
        className="h-fit space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md"
      >
        <h3 className="font-display text-lg font-bold text-white mb-2">
          Share a YouTube video
        </h3>
        {msg && (
          <p className="text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            {msg}
          </p>
        )}
        <Field label="Title">
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="Description">
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="YouTube URL or video ID">
          <input
            required
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className={INPUT_CLASS}
            placeholder="https://youtube.com/watch?v=..."
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Grade">
            <select
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
              className={INPUT_CLASS}
            >
              {GRADES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </Field>
          <Field label="Category">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={INPUT_CLASS}
            >
              {["Theory", "Practical", "Revision"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
        <button className="w-full rounded-xl bg-[#8a00c2] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 transition-all hover:bg-[#7200a3] hover:-translate-y-0.5 mt-4">
          Publish Video
        </button>
      </form>

      <div className="space-y-3">
        {localVideos.map((v) => (
          <div
            key={v.id}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm"
          >
            <h4 className="font-display text-sm font-bold text-white">
              {v.title}
            </h4>
            <p className="mt-1 text-xs text-slate-400 font-mono">
              {v.grade} · {v.category}
            </p>
            <button
              onClick={() => handleDelete(v.id)}
              className="mt-3 text-xs font-bold text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        ))}
        {localVideos.length === 0 && (
          <p className="text-xs text-slate-500 border border-dashed border-white/10 p-8 rounded-2xl text-center">
            No videos published yet.
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Shared Field Component ---------------- */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
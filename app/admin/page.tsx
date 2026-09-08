"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Tab = "students" | "exams" | "videos" | "downloads" | "timetable";

const GRADES = ["6", "7", "8", "9", "10", "11", "12", "Grade 6, 7 & 8", "Grade 9", "Grade 10 & 11", "Grade 12 & 13", "All Grades"];
const MODES = ["Online", "Physical", "One-to-One", "Group"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DOWNLOAD_TYPES = ["Exam Paper", "Model Paper", "Book", "Tute", "Other"];

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>("students");

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

  if (checking) return <div className="container-page py-24 text-center text-slate-500">Checking access…</div>;

  const tabs: { id: Tab; label: string }[] = [
    { id: "students", label: "Students" },
    { id: "exams", label: "Exams" },
    { id: "videos", label: "Videos" },
    { id: "downloads", label: "Downloads" },
    { id: "timetable", label: "Timetable" },
  ];

  return (
    <div>
      <section className="border-b border-line/60 bg-navy-950">
        <div className="container-page flex items-center justify-between py-10">
          <div>
            <p className="font-mono text-sm text-cyan-400">Admin panel</p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-white">Manage your site</h1>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md border border-line px-4 py-2 text-sm text-slate-300 hover:border-cyan-400 hover:text-cyan-400"
          >
            Log out
          </button>
        </div>
      </section>

      <div className="container-page py-10">
        <div className="mb-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <strong>Note:</strong> Everything here saves to JSON files on the server, which works well
          when running locally or on a persistent server. On Vercel's free serverless hosting, file
          writes are not permanently saved between visits — see the README's "Going to production"
          section for the quick database upgrade needed before relying on this in a live class.
          Also, the public Videos/Downloads/Timetable pages read a bundled copy of the data, so new
          items only show there after a rebuild/redeploy, even when writes succeed.
        </div>
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                tab === t.id ? "bg-navy-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "students" && <StudentsTab />}
          {tab === "exams" && <ExamsTab />}
          {tab === "videos" && <VideosTab />}
          {tab === "downloads" && <DownloadsTab />}
          {tab === "timetable" && <TimetableTab />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Students ---------------- */
function StudentsTab() {
  const [students, setStudents] = useState<any[]>([]);
  const [form, setForm] = useState({ id: "", name: "", grade: "10", mode: "Online", password: "", phone: "" });
  const [msg, setMsg] = useState("");

  function load() {
    fetch("/api/admin/students").then((r) => r.json()).then((d) => setStudents(d.students || []));
  }
  useEffect(load, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/admin/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error);
    setForm({ id: "", name: "", grade: "10", mode: "Online", password: "", phone: "" });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm(`Remove student ${id}?`)) return;
    await fetch(`/api/admin/students?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <form onSubmit={handleAdd} className="h-fit space-y-3 rounded-md border border-slate-200 bg-white p-5">
        <h3 className="font-display text-sm font-semibold text-navy-900">Add a student</h3>
        {msg && <p className="text-sm text-red-600">{msg}</p>}
        <Field label="Student ID (login)">
          <input required value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} className="input" placeholder="ICT2026004" />
        </Field>
        <Field label="Full name">
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
        </Field>
        <Field label="Grade">
          <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className="input">
            {["6", "7", "8", "9", "10", "11", "12"].map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </Field>
        <Field label="Class mode">
          <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })} className="input">
            {MODES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </Field>
        <Field label="Password">
          <input required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" placeholder="Set a starting password" />
        </Field>
        <Field label="Phone (optional)">
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
        </Field>
        <button className="btn-primary w-full">Add student</button>
      </form>

      <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
        <table className="w-full min-w-[500px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-500">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Grade</th>
              <th className="px-4 py-3 font-medium">Mode</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {students.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3 font-mono text-xs text-navy-900">{s.id}</td>
                <td className="px-4 py-3 text-navy-900">{s.name}</td>
                <td className="px-4 py-3 text-slate-600">{s.grade}</td>
                <td className="px-4 py-3 text-slate-600">{s.mode}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleDelete(s.id)} className="text-xs text-red-500 hover:underline">Remove</button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">No students yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Exams ---------------- */
function ExamsTab() {
  const [exams, setExams] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("Grade 10 & 11");
  const [duration, setDuration] = useState(10);
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctIndex: 0, marks: 2 },
  ]);
  const [msg, setMsg] = useState("");

  function load() {
    fetch("/api/admin/exams").then((r) => r.json()).then((d) => setExams(d.exams || []));
  }
  useEffect(load, []);

  function updateQuestion(i: number, patch: any) {
    setQuestions((qs) => qs.map((q, idx) => (idx === i ? { ...q, ...patch } : q)));
  }
  function updateOption(i: number, oi: number, value: string) {
    setQuestions((qs) =>
      qs.map((q, idx) => (idx === i ? { ...q, options: q.options.map((o: string, j: number) => (j === oi ? value : o)) } : q))
    );
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/admin/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, grade, durationMinutes: duration, questions, published: true }),
    });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error);
    setTitle(""); setDescription(""); setQuestions([{ question: "", options: ["", "", "", ""], correctIndex: 0, marks: 2 }]);
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
    if (!confirm("Delete this exam? Student results for it will remain on record.")) return;
    await fetch(`/api/admin/exams?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form onSubmit={handleCreate} className="h-fit space-y-3 rounded-md border border-slate-200 bg-white p-5">
        <h3 className="font-display text-sm font-semibold text-navy-900">Create an exam</h3>
        {msg && <p className="text-sm text-red-600">{msg}</p>}
        <Field label="Title">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
        </Field>
        <Field label="Description">
          <input value={description} onChange={(e) => setDescription(e.target.value)} className="input" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Grade">
            <select value={grade} onChange={(e) => setGrade(e.target.value)} className="input">
              {["Grade 6, 7 & 8", "Grade 9", "Grade 10 & 11", "Grade 12 & 13", "All Grades"].map((g) => <option key={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Duration (minutes)">
            <input type="number" min={1} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="input" />
          </Field>
        </div>

        <div className="space-y-4 border-t border-slate-200 pt-4">
          {questions.map((q, i) => (
            <div key={i} className="rounded-md border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-500">Question {i + 1}</p>
                {questions.length > 1 && (
                  <button type="button" onClick={() => setQuestions((qs) => qs.filter((_, idx) => idx !== i))} className="text-xs text-red-500">
                    Remove
                  </button>
                )}
              </div>
              <input
                required
                placeholder="Question text"
                value={q.question}
                onChange={(e) => updateQuestion(i, { question: e.target.value })}
                className="input mt-2"
              />
              <div className="mt-2 space-y-1.5">
                {q.options.map((opt: string, oi: number) => (
                  <div key={oi} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={q.correctIndex === oi}
                      onChange={() => updateQuestion(i, { correctIndex: oi })}
                    />
                    <input
                      required
                      placeholder={`Option ${oi + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(i, oi, e.target.value)}
                      className="input"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                Marks:
                <input
                  type="number"
                  min={1}
                  value={q.marks}
                  onChange={(e) => updateQuestion(i, { marks: Number(e.target.value) })}
                  className="input w-16 py-1"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setQuestions((qs) => [...qs, { question: "", options: ["", "", "", ""], correctIndex: 0, marks: 2 }])}
            className="text-sm text-cyan-600 hover:underline"
          >
            + Add another question
          </button>
        </div>

        <button className="btn-primary w-full">Create & publish exam</button>
      </form>

      <div className="space-y-3">
        {exams.map((e) => (
          <div key={e.id} className="rounded-md border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-display text-sm font-semibold text-navy-900">{e.title}</h4>
                <p className="mt-1 text-xs text-slate-500">{e.grade} · {e.questions.length} questions · {e.durationMinutes} min</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs ${e.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                {e.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="mt-3 flex gap-3 text-xs">
              <button onClick={() => togglePublish(e.id, e.published)} className="text-cyan-600 hover:underline">
                {e.published ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => handleDelete(e.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {exams.length === 0 && <p className="text-sm text-slate-400">No exams yet.</p>}
      </div>
    </div>
  );
}

/* ---------------- Videos ---------------- */
function VideosTab() {
  const [form, setForm] = useState({ title: "", description: "", url: "", grade: "Grade 10 & 11", category: "Theory" });
  const [msg, setMsg] = useState("");

  // The Videos page reads the bundled JSON file at build time, so newly added
  // videos are tracked here for this session until the site is redeployed.
  const [localVideos, setLocalVideos] = useState<any[]>([]);

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
    setLocalVideos((v) => [data.video, ...v]);
    setForm({ title: "", description: "", url: "", grade: "Grade 10 & 11", category: "Theory" });
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/videos?id=${id}`, { method: "DELETE" });
    setLocalVideos((v) => v.filter((x) => x.id !== id));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form onSubmit={handleAdd} className="h-fit space-y-3 rounded-md border border-slate-200 bg-white p-5">
        <h3 className="font-display text-sm font-semibold text-navy-900">Share a YouTube video</h3>
        {msg && <p className="text-sm text-red-600">{msg}</p>}
        <Field label="Title">
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" />
        </Field>
        <Field label="Description">
          <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" />
        </Field>
        <Field label="YouTube URL or video ID">
          <input required value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="input" placeholder="https://youtube.com/watch?v=..." />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Grade">
            <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className="input">
              {["Grade 6, 7 & 8", "Grade 9", "Grade 10 & 11", "Grade 12 & 13", "All Grades"].map((g) => <option key={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Category">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
              {["Theory", "Practical", "Revision"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
        </div>
        <button className="btn-primary w-full">Add video</button>
        <p className="text-xs text-slate-400">Added videos appear on the Videos page after your next deploy/rebuild, and instantly below for this session.</p>
      </form>

      <div className="space-y-3">
        {localVideos.map((v) => (
          <div key={v.id} className="rounded-md border border-slate-200 bg-white p-4">
            <h4 className="font-display text-sm font-semibold text-navy-900">{v.title}</h4>
            <p className="mt-1 text-xs text-slate-500">{v.grade} · {v.category}</p>
            <button onClick={() => handleDelete(v.id)} className="mt-2 text-xs text-red-500 hover:underline">Remove</button>
          </div>
        ))}
        {localVideos.length === 0 && <p className="text-sm text-slate-400">Videos you add this session will appear here.</p>}
      </div>
    </div>
  );
}

/* ---------------- Downloads ---------------- */
function DownloadsTab() {
  const [form, setForm] = useState({ title: "", description: "", type: "Model Paper", grade: "Grade 10 & 11", fileUrl: "" });
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [added, setAdded] = useState<any[]>([]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const body = new FormData();
    Object.entries(form).forEach(([k, v]) => body.append(k, v));
    if (file) body.append("file", file);

    const res = await fetch("/api/admin/downloads", { method: "POST", body });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error);
    setAdded((a) => [data.item, ...a]);
    setForm({ title: "", description: "", type: "Model Paper", grade: "Grade 10 & 11", fileUrl: "" });
    setFile(null);
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/downloads?id=${id}`, { method: "DELETE" });
    setAdded((a) => a.filter((x) => x.id !== id));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form onSubmit={handleAdd} className="h-fit space-y-3 rounded-md border border-slate-200 bg-white p-5">
        <h3 className="font-display text-sm font-semibold text-navy-900">Add a downloadable resource</h3>
        {msg && <p className="text-sm text-red-600">{msg}</p>}
        <Field label="Title">
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" />
        </Field>
        <Field label="Description">
          <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Type">
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input">
              {DOWNLOAD_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Grade">
            <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className="input">
              {["Grade 6, 7 & 8", "Grade 9", "Grade 10 & 11", "Grade 12 & 13", "All Grades"].map((g) => <option key={g}>{g}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Upload a file (PDF etc.)">
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="input" />
        </Field>
        <p className="text-center text-xs text-slate-400">— or —</p>
        <Field label="Paste a link instead (Google Drive, etc.)">
          <input value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} className="input" placeholder="https://drive.google.com/..." />
        </Field>
        <button className="btn-primary w-full">Add resource</button>
      </form>

      <div className="space-y-3">
        {added.map((d) => (
          <div key={d.id} className="rounded-md border border-slate-200 bg-white p-4">
            <h4 className="font-display text-sm font-semibold text-navy-900">{d.title}</h4>
            <p className="mt-1 text-xs text-slate-500">{d.type} · {d.grade}</p>
            <a href={d.fileUrl} target="_blank" rel="noreferrer" className="mt-1 block text-xs text-cyan-600 hover:underline">{d.fileUrl}</a>
            <button onClick={() => handleDelete(d.id)} className="mt-2 text-xs text-red-500 hover:underline">Remove</button>
          </div>
        ))}
        {added.length === 0 && <p className="text-sm text-slate-400">Resources you add this session will appear here.</p>}
      </div>
    </div>
  );
}

/* ---------------- Timetable ---------------- */
function TimetableTab() {
  const [form, setForm] = useState({ day: "Monday", time: "", grade: "Grade 10 & 11", mode: "Online", topic: "" });
  const [msg, setMsg] = useState("");
  const [added, setAdded] = useState<any[]>([]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/admin/timetable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error);
    setAdded((a) => [...a, data.entry]);
    setForm({ day: "Monday", time: "", grade: "Grade 10 & 11", mode: "Online", topic: "" });
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/timetable?id=${id}`, { method: "DELETE" });
    setAdded((a) => a.filter((x) => x.id !== id));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form onSubmit={handleAdd} className="h-fit space-y-3 rounded-md border border-slate-200 bg-white p-5">
        <h3 className="font-display text-sm font-semibold text-navy-900">Add a class slot</h3>
        {msg && <p className="text-sm text-red-600">{msg}</p>}
        <Field label="Day">
          <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} className="input">
            {DAYS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Time">
          <input required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="input" placeholder="4:00 PM – 5:30 PM" />
        </Field>
        <Field label="Grade">
          <input required value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className="input" placeholder="Grade 10 & 11" />
        </Field>
        <Field label="Mode">
          <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })} className="input">
            {MODES.map((m) => <option key={m}>{m}</option>)}
          </select>
        </Field>
        <Field label="Topic">
          <input required value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="input" />
        </Field>
        <button className="btn-primary w-full">Add to timetable</button>
      </form>

      <div className="space-y-3">
        {added.map((t) => (
          <div key={t.id} className="rounded-md border border-slate-200 bg-white p-4">
            <h4 className="font-display text-sm font-semibold text-navy-900">{t.day} · {t.time}</h4>
            <p className="mt-1 text-xs text-slate-500">{t.grade} · {t.mode}</p>
            <p className="text-sm text-slate-600">{t.topic}</p>
            <button onClick={() => handleDelete(t.id)} className="mt-2 text-xs text-red-500 hover:underline">Remove</button>
          </div>
        ))}
        {added.length === 0 && <p className="text-sm text-slate-400">Slots you add this session will appear here.</p>}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-navy-900">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

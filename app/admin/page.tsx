"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Tab = "students" | "exams" | "videos" | "downloads" | "timetable";

const GRADES = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "Grade 13", "Grade 6, 7 & 8", "Grade 10 & 11", "Grade 12 & 13", "All Grades"];
const MODES = ["Online", "Physical", "One-to-One", "Group"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DOWNLOAD_CATEGORIES = ["Past Papers", "Model Papers", "School Exam Papers", "Unit Papers", "Books"];
const SCHOOL_TERMS = ["Term 1", "Term 2", "Term 3"];

// Shared input styling for consistency
const INPUT_CLASS = "w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#8a00c2] focus:ring-1 focus:ring-[#8a00c2]";

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>("downloads"); 

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

  if (checking) return <div className="min-h-screen bg-slate-950 py-24 text-center text-slate-500 font-mono">Checking access…</div>;

  const tabs: { id: Tab; label: string }[] = [
    { id: "students", label: "Students" },
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
            <p className="font-mono text-xs font-bold tracking-widest text-[#f0822b] uppercase">Admin panel</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white">Manage Academy Portal</h1>
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
          <strong className="text-[#f0822b]">System Note:</strong> Everything here saves to JSON files on the server. On Vercel's free serverless hosting, file writes are not permanently saved between visits. The public Videos/Downloads pages read a bundled copy of the data, so new items only show there after a rebuild/redeploy, even when writes succeed.
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

/* ---------------- Downloads Tab ---------------- */
function DownloadsTab() {
  const [form, setForm] = useState({ 
    title: "", 
    description: "", 
    category: "Past Papers", 
    subCategory: "Term 1", 
    grade: "Grade 11", 
    fileUrl: "" 
  });
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [added, setAdded] = useState<any[]>([]);

  const availableGrades = form.category === "Past Papers" 
    ? ["Grade 11", "Grade 12", "Grade 13"] 
    : GRADES.filter(g => !g.includes("&") && g !== "All Grades");

  useEffect(() => {
    if (form.category === "Past Papers" && !["Grade 11", "Grade 12", "Grade 13"].includes(form.grade)) {
      setForm(prev => ({ ...prev, grade: "Grade 11" }));
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
    
    setAdded((a) => [data.item, ...a]);
    setForm({ title: "", description: "", category: "Past Papers", subCategory: "Term 1", grade: "Grade 11", fileUrl: "" });
    setFile(null);
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/downloads?id=${id}`, { method: "DELETE" });
    setAdded((a) => a.filter((x) => x.id !== id));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <form onSubmit={handleAdd} className="h-fit space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
        <h3 className="font-display text-lg font-bold text-white mb-2">Upload Resource</h3>
        {msg && <p className="text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{msg}</p>}
        
        <Field label="Document Title">
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={INPUT_CLASS} placeholder="e.g., 2023 G.C.E O/L ICT Past Paper" />
        </Field>
        
        <Field label="Description (Optional)">
          <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={INPUT_CLASS} placeholder="Brief description of the material..." />
        </Field>
        
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={INPUT_CLASS}>
              {DOWNLOAD_CATEGORIES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          
          <Field label="Grade">
            <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className={INPUT_CLASS}>
              {availableGrades.map((g) => <option key={g}>{g}</option>)}
            </select>
          </Field>
        </div>

        {form.category === "School Exam Papers" && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <Field label="School Term">
              <select value={form.subCategory} onChange={(e) => setForm({ ...form, subCategory: e.target.value })} className={`${INPUT_CLASS} border-[#f0822b]/50`}>
                {SCHOOL_TERMS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
          </div>
        )}

        <div className="border-t border-white/10 pt-4 mt-2">
          <Field label="Upload physical file (PDF, ZIP, docx)">
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className={`${INPUT_CLASS} file:mr-4 file:rounded-xl file:border-0 file:bg-[#8a00c2]/20 file:px-4 file:py-1.5 file:text-xs file:font-bold file:text-[#8a00c2] hover:file:bg-[#8a00c2]/30`} />
          </Field>
          
          <p className="text-center text-xs font-mono text-slate-500 my-3">— OR —</p>
          
          <Field label="External Link (Google Drive, etc.)">
            <input value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} className={INPUT_CLASS} placeholder="https://drive.google.com/..." />
          </Field>
        </div>

        <button className="w-full rounded-xl bg-[#8a00c2] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 transition-all hover:bg-[#7200a3] hover:-translate-y-0.5 mt-4">
          Publish Resource
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="font-display text-lg font-bold text-white mb-4">Recently Added (This Session)</h3>
        {added.map((d) => (
          <div key={d.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-display text-sm font-bold text-white">{d.title}</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-md bg-[#8a00c2]/20 px-2 py-0.5 font-mono text-[10px] font-bold text-[#8a00c2] uppercase">{d.category}</span>
                  {d.subCategory && d.category === "School Exam Papers" && (
                     <span className="rounded-md bg-[#f0822b]/20 px-2 py-0.5 font-mono text-[10px] font-bold text-[#f0822b] uppercase">{d.subCategory}</span>
                  )}
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-300 uppercase">{d.grade}</span>
                </div>
              </div>
              <button onClick={() => handleDelete(d.id)} className="text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors">Delete</button>
            </div>
          </div>
        ))}
        {added.length === 0 && (
          <div className="rounded-2xl border border-white/5 bg-white/5 p-8 text-center border-dashed">
            <p className="text-xs font-medium text-slate-500">Resources you upload during this admin session will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Students Tab ---------------- */
function StudentsTab() {
  const [students, setStudents] = useState<any[]>([]);
  const [form, setForm] = useState({ id: "", name: "", grade: "Grade 10", mode: "Online", password: "", phone: "" });
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
    setForm({ id: "", name: "", grade: "Grade 10", mode: "Online", password: "", phone: "" });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm(`Remove student ${id}?`)) return;
    await fetch(`/api/admin/students?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <form onSubmit={handleAdd} className="h-fit space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
        <h3 className="font-display text-lg font-bold text-white mb-2">Add a student</h3>
        {msg && <p className="text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{msg}</p>}
        <Field label="Student ID (login)">
          <input required value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} className={INPUT_CLASS} placeholder="ICT2026004" />
        </Field>
        <Field label="Full name">
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={INPUT_CLASS} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Grade">
            <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className={INPUT_CLASS}>
              {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Class mode">
            <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })} className={INPUT_CLASS}>
              {MODES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Password">
          <input required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={INPUT_CLASS} placeholder="Set a starting password" />
        </Field>
        <Field label="Phone (optional)">
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={INPUT_CLASS} />
        </Field>
        <button className="w-full rounded-xl bg-[#8a00c2] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 transition-all hover:bg-[#7200a3] hover:-translate-y-0.5 mt-4">
          Register Student
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
        <table className="w-full min-w-[500px] text-sm text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-slate-300">
              <th className="px-4 py-4 font-mono text-[10px] font-bold uppercase tracking-wider">ID</th>
              <th className="px-4 py-4 font-mono text-[10px] font-bold uppercase tracking-wider">Name</th>
              <th className="px-4 py-4 font-mono text-[10px] font-bold uppercase tracking-wider">Grade</th>
              <th className="px-4 py-4 font-mono text-[10px] font-bold uppercase tracking-wider">Mode</th>
              <th className="px-4 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-[#f0822b]">{s.id}</td>
                <td className="px-4 py-3 text-white font-medium">{s.name}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{s.grade}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{s.mode}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleDelete(s.id)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-slate-500 text-xs">No students registered yet.</td></tr>
            )}
          </tbody>
        </table>
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
      <form onSubmit={handleCreate} className="h-fit space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
        <h3 className="font-display text-lg font-bold text-white mb-2">Create an exam</h3>
        {msg && <p className="text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{msg}</p>}
        <Field label="Title">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={INPUT_CLASS} />
        </Field>
        <Field label="Description">
          <input value={description} onChange={(e) => setDescription(e.target.value)} className={INPUT_CLASS} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Grade">
            <select value={grade} onChange={(e) => setGrade(e.target.value)} className={INPUT_CLASS}>
              {GRADES.map((g) => <option key={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Duration (minutes)">
            <input type="number" min={1} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className={INPUT_CLASS} />
          </Field>
        </div>

        <div className="space-y-4 border-t border-white/10 pt-6 mt-4">
          {questions.map((q, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#f0822b]">Question {i + 1}</p>
                {questions.length > 1 && (
                  <button type="button" onClick={() => setQuestions((qs) => qs.filter((_, idx) => idx !== i))} className="text-xs text-red-400 hover:text-red-300">
                    Remove
                  </button>
                )}
              </div>
              <input
                required
                placeholder="Question text"
                value={q.question}
                onChange={(e) => updateQuestion(i, { question: e.target.value })}
                className={INPUT_CLASS}
              />
              <div className="mt-3 space-y-2">
                {q.options.map((opt: string, oi: number) => (
                  <div key={oi} className="flex items-center gap-3">
                    <input
                      type="radio"
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
                  onChange={(e) => updateQuestion(i, { marks: Number(e.target.value) })}
                  className={`${INPUT_CLASS} w-20 py-1`}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setQuestions((qs) => [...qs, { question: "", options: ["", "", "", ""], correctIndex: 0, marks: 2 }])}
            className="text-xs font-bold text-[#8a00c2] hover:text-[#a914e8] transition-colors"
          >
            + Add another question
          </button>
        </div>

        <button className="w-full rounded-xl bg-[#8a00c2] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 transition-all hover:bg-[#7200a3] hover:-translate-y-0.5 mt-4">
          Create & publish exam
        </button>
      </form>

      <div className="space-y-3">
        {exams.map((e) => (
          <div key={e.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-display text-base font-bold text-white">{e.title}</h4>
                <p className="mt-1 text-xs text-slate-400 font-mono">{e.grade} · {e.questions.length} questions · {e.durationMinutes} min</p>
              </div>
              <span className={`rounded-lg px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider ${e.published ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/10 text-slate-400"}`}>
                {e.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="mt-4 flex gap-4 text-xs font-bold">
              <button onClick={() => togglePublish(e.id, e.published)} className="text-purple-400 hover:text-purple-300">
                {e.published ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => handleDelete(e.id)} className="text-red-400 hover:text-red-300">Delete</button>
            </div>
          </div>
        ))}
        {exams.length === 0 && <p className="text-xs text-slate-500 border border-dashed border-white/10 p-8 rounded-2xl text-center">No exams created yet.</p>}
      </div>
    </div>
  );
}

/* ---------------- Videos Tab ---------------- */
function VideosTab() {
  const [form, setForm] = useState({ title: "", description: "", url: "", grade: "Grade 10 & 11", category: "Theory" });
  const [msg, setMsg] = useState("");
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
      <form onSubmit={handleAdd} className="h-fit space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
        <h3 className="font-display text-lg font-bold text-white mb-2">Share a YouTube video</h3>
        {msg && <p className="text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{msg}</p>}
        <Field label="Title">
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={INPUT_CLASS} />
        </Field>
        <Field label="Description">
          <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={INPUT_CLASS} />
        </Field>
        <Field label="YouTube URL or video ID">
          <input required value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className={INPUT_CLASS} placeholder="https://youtube.com/watch?v=..." />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Grade">
            <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className={INPUT_CLASS}>
              {GRADES.map((g) => <option key={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Category">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={INPUT_CLASS}>
              {["Theory", "Practical", "Revision"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
        </div>
        <button className="w-full rounded-xl bg-[#8a00c2] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 transition-all hover:bg-[#7200a3] hover:-translate-y-0.5 mt-4">
          Publish Video
        </button>
      </form>

      <div className="space-y-3">
        {localVideos.map((v) => (
          <div key={v.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm">
            <h4 className="font-display text-sm font-bold text-white">{v.title}</h4>
            <p className="mt-1 text-xs text-slate-400 font-mono">{v.grade} · {v.category}</p>
            <button onClick={() => handleDelete(v.id)} className="mt-3 text-xs font-bold text-red-400 hover:text-red-300">Remove</button>
          </div>
        ))}
        {localVideos.length === 0 && <p className="text-xs text-slate-500 border border-dashed border-white/10 p-8 rounded-2xl text-center">Videos you add this session will appear here.</p>}
      </div>
    </div>
  );
}

/* ---------------- Timetable Tab ---------------- */
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
      <form onSubmit={handleAdd} className="h-fit space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
        <h3 className="font-display text-lg font-bold text-white mb-2">Add a class slot</h3>
        {msg && <p className="text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{msg}</p>}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Day">
            <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} className={INPUT_CLASS}>
              {DAYS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Time">
            <input required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={INPUT_CLASS} placeholder="4:00 PM – 5:30 PM" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Grade">
            <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className={INPUT_CLASS}>
              {GRADES.map((g) => <option key={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Mode">
            <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })} className={INPUT_CLASS}>
              {MODES.map((m) => <option key={m}>{m}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Topic">
          <input required value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className={INPUT_CLASS} />
        </Field>
        <button className="w-full rounded-xl bg-[#8a00c2] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 transition-all hover:bg-[#7200a3] hover:-translate-y-0.5 mt-4">
          Add to timetable
        </button>
      </form>

      <div className="space-y-3">
        {added.map((t) => (
          <div key={t.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm">
            <h4 className="font-display text-sm font-bold text-white">{t.day} · {t.time}</h4>
            <p className="mt-1 text-xs text-[#f0822b] font-mono">{t.grade} · {t.mode}</p>
            <p className="mt-2 text-sm text-slate-300 font-medium">{t.topic}</p>
            <button onClick={() => handleDelete(t.id)} className="mt-4 text-xs font-bold text-red-400 hover:text-red-300">Remove Slot</button>
          </div>
        ))}
        {added.length === 0 && <p className="text-xs text-slate-500 border border-dashed border-white/10 p-8 rounded-2xl text-center">Slots you add this session will appear here.</p>}
      </div>
    </div>
  );
}

/* ---------------- Shared Field Component ---------------- */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
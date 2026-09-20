"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const GRADES = [
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
const MODES = ["Group", "Physical", "Online", "One-to-One"];

function calculateFee(grade: string, medium: string): number {
  let baseFee = 500;
  const gNum = parseInt(grade.replace(/\D/g, ""), 10);

  if (gNum >= 6 && gNum <= 9) baseFee = 500;
  else if (gNum >= 10 && gNum <= 11) baseFee = 600;
  else if (gNum >= 12 && gNum <= 13) baseFee = 700;

  if (medium.toLowerCase() === "english") baseFee += 100;
  return baseFee;
}

const INPUT_CLASS =
  "w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 outline-none transition-colors focus:border-[#8a00c2] focus:ring-1 focus:ring-[#8a00c2]";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    grade: "Grade 10",
    medium: "Tamil",
    place: "Puttalam",
    phone: "",
    mode: "Group",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registeredData, setRegisteredData] = useState<any | null>(null);

  const estimatedFee = calculateFee(form.grade, form.medium);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to complete registration.");
      }

      setRegisteredData(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white select-none relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#8a00c2]/20 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[500px] w-[500px] rounded-full bg-[#f0822b]/15 blur-[150px]" />

      <div className="w-full max-w-lg relative z-10">
        {registeredData ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 text-center backdrop-blur-md shadow-2xl space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-2xl font-bold">
              ✓
            </div>

            <div>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-4 py-1 text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                Registration Successful
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold text-white">
                Account Pending Approval
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950 p-5 space-y-3 font-mono text-xs text-left">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Assigned Student ID:</span>
                <span className="text-[#f0822b] font-bold text-sm">
                  {registeredData.studentId}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Class Fee (per session):</span>
                <span className="text-emerald-400 font-bold">
                  LKR {registeredData.feesPerClass}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Approval Status:</span>
                <span className="text-amber-400 font-bold uppercase">Pending Admin Approval</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-mono bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-left">
              <strong className="text-amber-400 block mb-1">ℹ️ Next Steps:</strong>
              Please settle your advance monthly class fees with the Admin within the first 5 days of the month. Once confirmed, your login access will be activated immediately.
            </p>

            <Link
              href="/login"
              className="block w-full rounded-xl bg-[#8a00c2] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 hover:bg-[#7200a3] transition-all"
            >
              Proceed to Student Login →
            </Link>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-[#8a00c2]/20 px-3.5 py-1 text-[10px] font-mono font-bold text-purple-200 uppercase">
                Student Registration
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Create Student Account
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                Fill in your details below to register for the student portal.
              </p>
            </div>

            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs font-bold text-rose-300 font-mono">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. V. Dhananjali"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={INPUT_CLASS}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">
                    Grade
                  </label>
                  <select
                    value={form.grade}
                    onChange={(e) => setForm({ ...form, grade: e.target.value })}
                    className={INPUT_CLASS}
                  >
                    {GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">
                    Medium
                  </label>
                  <select
                    value={form.medium}
                    onChange={(e) => setForm({ ...form, medium: e.target.value })}
                    className={INPUT_CLASS}
                  >
                    {MEDIUMS.map((m) => (
                      <option key={m} value={m}>
                        {m} Medium
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">
                    Place / Town
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Badulla"
                    value={form.place}
                    onChange={(e) => setForm({ ...form, place: e.target.value })}
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">
                    Class Mode
                  </label>
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
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0771234567"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Create your portal password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={INPUT_CLASS}
                />
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-300 font-bold">Auto-Calculated Fee:</span>
                <span className="text-emerald-400 font-extrabold text-sm">
                  LKR {estimatedFee} / Class
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#8a00c2] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 hover:bg-[#7200a3] transition-all disabled:opacity-50 mt-2"
              >
                {loading ? "Registering..." : "Submit Registration"}
              </button>
            </form>

            <div className="text-center font-mono text-xs text-slate-400 pt-2 border-t border-white/5">
              Already have an approved account?{" "}
              <Link href="/login" className="text-[#f0822b] font-bold hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
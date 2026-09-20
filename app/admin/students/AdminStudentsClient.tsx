"use client";

import { useState } from "react";

interface Student {
  id: string;
  name: string;
  grade: string;
  medium: string;
  place: string;
  phone: string;
  feesPerClass: number;
  approved: boolean;
}

export default function AdminStudentsClient({ initialStudents = [] }: { initialStudents: Student[] }) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [resetModalStudent, setResetModalStudent] = useState<Student | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleToggleApproval = async (studentId: string, currentApproved: boolean) => {
    try {
      const res = await fetch("/api/admin/students", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, approved: !currentApproved }),
      });
      const data = await res.json();
      if (res.ok) {
        setStudents((prev) =>
          prev.map((s) => (s.id === studentId ? { ...s, approved: !currentApproved } : s))
        );
      }
    } catch {
      alert("Error updating approval status.");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalStudent || !newPassword) return;

    try {
      const res = await fetch("/api/admin/students", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: resetModalStudent.id, newPassword }),
      });

      if (res.ok) {
        setMsg(`Password reset successfully for ${resetModalStudent.name}!`);
        setTimeout(() => {
          setResetModalStudent(null);
          setNewPassword("");
          setMsg("");
        }, 1200);
      }
    } catch {
      alert("Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 sm:p-10 select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">Student Master Directory</h1>
            <p className="text-xs font-mono text-slate-400 mt-1">Admin access only · Student registration records</p>
          </div>
        </div>

        {/* Notebook-Style Student Directory Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-xl">
          <table className="w-full min-w-[800px] text-sm text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                <th className="px-5 py-4">Student ID</th>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Grade</th>
                <th className="px-5 py-4">Medium</th>
                <th className="px-5 py-4">Place</th>
                <th className="px-5 py-4">Phone Number</th>
                <th className="px-5 py-4">Fees / Class</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {students.map((st) => (
                <tr key={st.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4 text-[#f0822b] font-bold">{st.id}</td>
                  <td className="px-5 py-4 font-bold text-white font-sans">{st.name}</td>
                  <td className="px-5 py-4 text-purple-300 font-bold">{st.grade}</td>
                  <td className="px-5 py-4 text-slate-300">{st.medium || "Tamil"}</td>
                  <td className="px-5 py-4 text-slate-300">{st.place}</td>
                  <td className="px-5 py-4 text-slate-300">{st.phone}</td>
                  <td className="px-5 py-4 text-emerald-400 font-bold">LKR {st.feesPerClass}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                        st.approved
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {st.approved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleToggleApproval(st.id, st.approved)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        st.approved
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                      }`}
                    >
                      {st.approved ? "Revoke" : "Approve"}
                    </button>
                    <button
                      onClick={() => setResetModalStudent(st)}
                      className="px-3 py-1.5 rounded-lg bg-[#8a00c2] text-xs font-bold text-white hover:bg-[#7200a3]"
                    >
                      Reset Password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Reset Password Modal */}
        {resetModalStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-white">Reset Student Password</h3>
              <p className="text-xs font-mono text-purple-300">
                {resetModalStudent.name} ({resetModalStudent.id})
              </p>

              {msg && <p className="text-xs font-mono text-emerald-400 font-bold">{msg}</p>}

              <form onSubmit={handleResetPassword} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-xs text-white"
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setResetModalStudent(null)}
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
          </div>
        )}
      </div>
    </div>
  );
}
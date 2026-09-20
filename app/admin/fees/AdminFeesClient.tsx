"use client";

import { useState } from "react";

export default function AdminFeesClient({ initialStudents = [] }: { initialStudents: any[] }) {
  const [students, setStudents] = useState<any[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const handleSettlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    try {
      const res = await fetch("/api/admin/fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedStudent.id,
          amount: paymentAmount,
          paymentDate,
        }),
      });

      if (res.ok) {
        setStudents((prev) =>
          prev.map((s) =>
            s.id === selectedStudent.id
              ? { ...s, lastPaymentDate: paymentDate, lastPaymentAmount: paymentAmount, approved: true }
              : s
          )
        );
        setSelectedStudent(null);
      }
    } catch {
      alert("Failed to log payment.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 sm:p-10 select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">Student Fees Collection Dashboard</h1>
            <p className="text-xs font-mono text-slate-400 mt-1">Advance monthly fee settlement ledger (Payable within first 5 days)</p>
          </div>
        </div>

        {/* Fees Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-xl">
          <table className="w-full min-w-[700px] text-sm text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                <th className="px-5 py-4">Student ID</th>
                <th className="px-5 py-4">Student Name</th>
                <th className="px-5 py-4">Grade</th>
                <th className="px-5 py-4">Phone Number</th>
                <th className="px-5 py-4">Last Payment Date</th>
                <th className="px-5 py-4">Amount Paid</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {students.map((st) => (
                <tr key={st.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4 text-[#f0822b] font-bold">{st.id}</td>
                  <td className="px-5 py-4 font-bold text-white font-sans">{st.name}</td>
                  <td className="px-5 py-4 text-purple-300 font-bold">{st.grade}</td>
                  <td className="px-5 py-4 text-slate-300">{st.phone}</td>
                  <td className="px-5 py-4 text-slate-300">{st.lastPaymentDate || "Not Paid Yet"}</td>
                  <td className="px-5 py-4 text-emerald-400 font-bold">
                    {st.lastPaymentAmount ? `LKR ${st.lastPaymentAmount}` : "LKR 0"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedStudent(st);
                        setPaymentAmount(st.feesPerClass || 500);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#8a00c2] text-xs font-bold text-white hover:bg-[#7200a3]"
                    >
                      Record Fee Payment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-white">Record Monthly Fee Payment</h3>
              <p className="text-xs font-mono text-purple-300">
                {selectedStudent.name} ({selectedStudent.id})
              </p>

              <form onSubmit={handleSettlePayment} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-400 mb-1">Payment Amount (LKR)</label>
                  <input
                    type="number"
                    required
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Settlement Date</label>
                  <input
                    type="date"
                    required
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedStudent(null)}
                    className="flex-1 rounded-xl border border-white/10 py-2.5 text-slate-400"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 rounded-xl bg-[#8a00c2] py-2.5 text-white font-bold">
                    Settle &amp; Approve
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
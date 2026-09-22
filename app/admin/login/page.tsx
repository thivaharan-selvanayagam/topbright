"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white select-none relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {/* Background Brand Glows */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[#8a00c2]/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[400px] w-[400px] rounded-full bg-[#f0822b]/15 blur-[140px]" />

      <div className="w-full max-w-sm relative z-10">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6"
        >
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-[#8a00c2]/20 px-3 py-1 text-[10px] font-mono font-bold text-purple-200 uppercase tracking-widest">
              TopBright Control
            </span>
            <h1 className="font-display text-2xl font-extrabold text-white">
              Admin Portal Login
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Enter your master password to access management controls.
            </p>
          </div>

          {error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-bold text-rose-300 font-mono text-center">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              placeholder="Enter admin password"
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 outline-none transition-colors focus:border-[#8a00c2] focus:ring-1 focus:ring-[#8a00c2]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#8a00c2] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#8a00c2]/20 hover:bg-[#7200a3] transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Log In to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
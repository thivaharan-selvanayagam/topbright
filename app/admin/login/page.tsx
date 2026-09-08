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
    <div className="bg-navy-950">
      <div className="container-page flex min-h-[calc(100vh-64px)] items-center justify-center py-16">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg border border-line bg-navy-900 p-6">
          <div className="text-center">
            <p className="font-mono text-sm text-cyan-400">Admin</p>
            <h1 className="mt-1 font-display text-xl font-semibold text-white">Teacher login</h1>
          </div>
          {error && (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-slate-200">Admin password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="mt-1.5 w-full rounded-md border border-line bg-navy-950 px-3 py-2.5 text-sm text-white focus-ring"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-cyan-400 px-4 py-2.5 text-sm font-medium text-navy-950 hover:bg-cyan-500 disabled:opacity-60"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}

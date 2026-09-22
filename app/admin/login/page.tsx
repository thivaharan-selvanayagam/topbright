"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative overflow-hidden bg-[#0d0114] select-none">
      {/* Ambient Glowing Background */}
      <div className="absolute -left-20 -top-20 h-96 w-96 animate-pulse rounded-full bg-[#8a00c2]/25 blur-[120px]" />
      <div
        className="absolute -bottom-20 right-10 h-96 w-96 animate-pulse rounded-full bg-[#f0822b]/20 blur-[120px]"
        style={{ animationDuration: "6s" }}
      />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="container-page relative z-10 flex min-h-[calc(100vh-64px)] items-center justify-center py-16">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <p className="font-mono text-sm font-medium text-[#f0822b]">
              TopBright ICT Academy
            </p>
            <h1 className="mt-2 font-display text-2xl font-semibold text-white">
              Admin Portal Login
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Enter your master password to access the control dashboard.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-lg border border-[#8a00c2]/30 bg-[#160221]/90 p-6 shadow-2xl backdrop-blur"
          >
            {error && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300 font-mono">
                {error}
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-slate-200">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-md border border-[#8a00c2]/40 bg-[#0d0114] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 transition focus:border-[#f0822b] focus:outline-none focus:ring-1 focus:ring-[#f0822b]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#8a00c2] px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-[#8a00c2]/30 transition hover:bg-[#7200a3] disabled:opacity-60 focus-ring"
            >
              {loading ? "Logging in…" : "Log in to Admin Dashboard"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-400">
            Looking for student access?{" "}
            <Link href="/login" className="font-medium text-[#f0822b] hover:underline">
              Go to Student Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";

export default function ContactForm({ whatsapp }: { whatsapp: string }) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = `Hi Lavanya Teacher, my name is ${name || "___"} (Grade ${grade || "___"}).\n\n${
      message || "I'd like to know more about your ICT classes."
    }`;
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-[#8a00c2]/30 bg-[#160221]/90 p-6 shadow-lg backdrop-blur"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-200">Your name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1.5 w-full rounded-md border border-[#8a00c2]/40 bg-[#0d0114] px-3 py-2 text-sm text-white placeholder-slate-500 transition focus:border-[#f0822b] focus:outline-none focus:ring-1 focus:ring-[#f0822b]"
            placeholder="e.g. Nithusha Kumar"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-200">Grade</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
            className="mt-1.5 w-full rounded-md border border-[#8a00c2]/40 bg-[#0d0114] px-3 py-2 text-sm text-white transition focus:border-[#f0822b] focus:outline-none focus:ring-1 focus:ring-[#f0822b]"
          >
            <option value="" className="bg-[#0d0114] text-slate-400">
              Select grade
            </option>
            {["6", "7", "8", "9", "10", "11", "12"].map((g) => (
              <option key={g} value={g} className="bg-[#0d0114] text-white">
                Grade {g}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-200">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="mt-1.5 w-full rounded-md border border-[#8a00c2]/40 bg-[#0d0114] px-3 py-2 text-sm text-white placeholder-slate-500 transition focus:border-[#f0822b] focus:outline-none focus:ring-1 focus:ring-[#f0822b]"
          placeholder="Tell Lavanya what you'd like to ask about — class mode, timing, fees..."
        />
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#25D366]/20 transition hover:bg-[#1fb959] focus-ring"
      >
        Send via WhatsApp
      </button>
      <p className="text-xs text-slate-400">
        This opens WhatsApp with your message pre-filled — you just tap send.
      </p>
    </form>
  );
}
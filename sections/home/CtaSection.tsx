import Link from "next/link";
import settings from "@/data/settings.json";

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#fdf8ff] to-[#fffaf5] py-16">
      <div className="container-page relative z-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
            Ready to join a class?
          </h2>
          <p className="mt-2 max-w-md text-slate-600">
            Message Lavanya directly on WhatsApp to ask about grades, batches and fees.
          </p>
        </div>
        <div className="flex gap-4">
          <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="rounded-md bg-[#8a00c2] px-6 py-3 text-sm font-medium text-white shadow-md shadow-[#8a00c2]/20 transition hover:bg-[#7200a3] focus-ring">
            Chat on WhatsApp
          </a>
          <Link href="/contact" className="rounded-md border border-[#8a00c2]/30 bg-white px-6 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-[#f0822b] hover:text-[#f0822b] focus-ring">
            Contact page
          </Link>
        </div>
      </div>
    </section>
  );
}
"use client";

import Image from "next/image";
import Link from "next/link";
import settings from "@/data/settings.json";

function MapPinIcon() {
  return (
    <svg className="w-4 h-4 text-[#f0822b] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 text-[#f0822b] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.826-1.47-5.114-3.758-6.584-6.584l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 fill-current text-[#27c93f] shrink-0" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#8a00c2] transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300 border-t border-purple-900/40 select-none">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute left-0 bottom-0 h-80 w-80 rounded-full bg-[#8a00c2]/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[#f0822b]/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/logo_nav.png"
                alt="TopBright Academy Logo"
                width={240}
                height={56}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 max-w-sm font-medium">
              TopBright Academy provides specialized ICT education for Grades 6–13 across Batticaloa and online. Featuring live lectures, past paper practice, and automated diagnostic testing.
            </p>
            
            {/* CLICKABLE ADMISSIONS LINK */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-slate-200 transition-all hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-white"
              >
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Admissions Open for {new Date().getFullYear()} Batches</span>
                <span className="text-[#f0822b] transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </div>

          {/* EXPLORE NAVIGATION */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2 inline-block">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm font-medium">
              {[
                { label: "About Academy", href: "/about" },
                { label: "Class Timetable", href: "/timetable" },
                { label: "Video Lessons", href: "/videos" },
                { label: "Study Downloads", href: "/downloads" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-slate-300 transition-colors hover:text-[#f0822b]"
                  >
                    <ChevronRightIcon />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* STUDENTS PORTAL */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2 inline-block">
              Student Portal
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm font-medium">
              {[
                { label: "Student Login", href: "/login" },
                { label: "My Exam Results", href: "/dashboard" },
                { label: "Help & Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-slate-300 transition-colors hover:text-[#f0822b]"
                  >
                    <ChevronRightIcon />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2 inline-block">
              Get In Touch
            </h3>
            
            <ul className="mt-4 space-y-3 text-xs sm:text-sm font-medium">
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPinIcon />
                <span>{settings.address}</span>
              </li>
              <li>
                <a
                  href={`tel:+${settings.whatsapp}`}
                  className="flex items-center gap-2.5 text-slate-300 transition-colors hover:text-[#f0822b]"
                >
                  <PhoneIcon />
                  <span>{settings.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-emerald-400 transition-all hover:bg-emerald-500/20 hover:border-emerald-500/50"
                >
                  <WhatsAppIcon />
                  <span className="font-bold text-xs">Chat on WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p>© {new Date().getFullYear()} TopBright Academy, Batticaloa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#f0822b] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#f0822b] transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
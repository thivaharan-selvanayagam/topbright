"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/timetable", label: "Timetable" },
  { href: "/downloads", label: "Downloads" },
  { href: "/videos", label: "Videos" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<{ loggedIn: boolean; name?: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then(setSession)
      .catch(() => setSession({ loggedIn: false }));
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setSession({ loggedIn: false });
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#8a00c2]/30 bg-[#0d0114]/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        {/* Brand Nav Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_nav.png"
            alt="TopBright Academy Logo"
            width={480}
            height={112}
            className="h-14 w-auto object-contain py-1"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors focus-ring ${
                pathname === l.href ? "font-medium text-[#f0822b]" : "text-slate-300 hover:text-[#f0822b]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {session?.loggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-md px-3 py-1.5 text-sm text-slate-200 hover:text-[#f0822b]"
              >
                {session.name?.split(" ")[0] ?? "Dashboard"}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md border border-[#8a00c2]/50 px-3 py-1.5 text-sm text-slate-300 hover:border-[#f0822b] hover:text-[#f0822b] focus-ring"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-[#8a00c2] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#7200a3] focus-ring"
            >
              Student Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-md text-slate-200 hover:text-[#f0822b] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="border-t border-[#8a00c2]/30 bg-[#0d0114] md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-2 py-2.5 text-sm ${
                  pathname === l.href ? "font-medium text-[#f0822b]" : "text-slate-300 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-[#8a00c2]/30 pt-3">
              {session?.loggedIn ? (
                <div className="flex items-center justify-between px-2">
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="text-sm text-slate-200">
                    {session.name} — Dashboard
                  </Link>
                  <button onClick={handleLogout} className="text-sm text-[#f0822b]">
                    Log out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="mx-2 flex items-center justify-center rounded-md bg-[#8a00c2] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#7200a3]"
                >
                  Student Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
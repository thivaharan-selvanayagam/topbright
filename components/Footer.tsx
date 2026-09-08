import Image from "next/image";
import Link from "next/link";
import settings from "@/data/settings.json";

export default function Footer() {
  return (
    <footer className="border-t border-[#8a00c2]/30 bg-[#0d0114] text-slate-400">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/logo_nav.png"
              alt="TopBright Academy Logo"
              width={240}
              height={56}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-300">
            ICT classes for Grade 6–12, online and in Batticaloa. One-to-one and
            group sessions, real past-paper practice, and instant exam results.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-white">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="transition-colors hover:text-[#f0822b]">About</Link></li>
            <li><Link href="/timetable" className="transition-colors hover:text-[#f0822b]">Timetable</Link></li>
            <li><Link href="/videos" className="transition-colors hover:text-[#f0822b]">Videos</Link></li>
            <li><Link href="/downloads" className="transition-colors hover:text-[#f0822b]">Downloads</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-white">Students</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/login" className="transition-colors hover:text-[#f0822b]">Student login</Link></li>
            <li><Link href="/dashboard" className="transition-colors hover:text-[#f0822b]">My results</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-[#f0822b]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-white">Get in touch</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>{settings.address}</li>
            <li>
              <a href={`tel:+${settings.whatsapp}`} className="transition-colors hover:text-[#f0822b]">
                {settings.phone}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#f0822b]"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#8a00c2]/30 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} TopBright Academy, Batticaloa. All rights reserved.
      </div>
    </footer>
  );
}
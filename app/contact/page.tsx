import type { Metadata } from "next";
import settings from "@/data/settings.json";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact | TopBright Academy" };

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0d0114]">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-[#8a00c2]/30 bg-[#0d0114]">
        <div className="absolute -left-20 -top-20 h-80 w-80 animate-pulse rounded-full bg-[#8a00c2]/25 blur-[120px]" />
        <div className="container-page relative z-10 py-16">
          <p className="font-mono text-sm font-medium text-[#f0822b]">Contact</p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">
            Get in touch
          </h1>
          <p className="mt-3 max-w-xl text-slate-300">
            Questions about batches, fees or timing? Reach out directly or send a message below.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container-page relative z-10 grid gap-10 py-14 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          {/* Call / WhatsApp Card */}
          <div className="group rounded-lg border border-[#8a00c2]/30 bg-[#160221]/90 p-6 shadow-lg backdrop-blur transition-all duration-300 hover:border-[#f0822b]/60">
            <h3 className="font-display text-sm font-semibold text-white">Call or WhatsApp</h3>
            <a href={`tel:+${settings.whatsapp}`} className="mt-2 block font-display text-xl text-[#f0822b] hover:underline">
              {settings.phone}
            </a>
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-[#1fb959]"
            >
              Open WhatsApp chat
            </a>
          </div>

          {/* Location Card */}
          <div className="group rounded-lg border border-[#8a00c2]/30 bg-[#160221]/90 p-6 shadow-lg backdrop-blur transition-all duration-300 hover:border-[#f0822b]/60">
            <h3 className="font-display text-sm font-semibold text-white">Location</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{settings.address}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Physical classes held here — online classes available anywhere.
            </p>
          </div>

          {/* Email Card */}
          <div className="group rounded-lg border border-[#8a00c2]/30 bg-[#160221]/90 p-6 shadow-lg backdrop-blur transition-all duration-300 hover:border-[#f0822b]/60">
            <h3 className="font-display text-sm font-semibold text-white">Email</h3>
            <a href={`mailto:${settings.email}`} className="mt-2 block text-sm text-[#f0822b] hover:underline">
              {settings.email}
            </a>
          </div>
        </div>

        {/* Contact Form Wrapper */}
        <div className="rounded-lg border border-[#8a00c2]/30 bg-[#160221]/90 p-2 shadow-lg backdrop-blur">
          <ContactForm whatsapp={settings.whatsapp} />
        </div>
      </section>
    </div>
  );
}
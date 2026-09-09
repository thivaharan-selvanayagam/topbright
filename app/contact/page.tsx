import type { Metadata } from "next";
import settings from "@/data/settings.json";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact | TopBright Academy" };

function PhoneIcon() {
  return (
    <svg className="w-5 h-5 text-[#f0822b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.826-1.47-5.114-3.758-6.584-6.584l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5 fill-current text-[#27c93f]" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="w-5 h-5 text-[#8a00c2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-5 h-5 text-[#f0822b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white select-none relative overflow-hidden">
      {/* Background Lighting Elements */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#8a00c2]/20 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#f0822b]/15 blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        
        {/* TOP HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8a00c2]/40 bg-[#8a00c2]/20 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-purple-200 uppercase shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#f0822b] animate-ping" />
            Admissions &amp; Support
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-tight">
            Connect With <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#8a00c2] via-purple-300 to-[#f0822b] bg-clip-text text-transparent">
              TopBright Academy
            </span>
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            Direct access for student enrollments, timetable queries, and online portal assistance in Batticaloa.
          </p>
        </div>

        {/* MAIN SPLIT LAYOUT */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          
          {/* LEFT COLUMN: UNIFIED CONTACT PANEL (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            
            {/* WHATSAPP ACTION CARD */}
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-6 sm:p-7 shadow-2xl transition-all duration-300 hover:border-emerald-500/60">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                  <WhatsAppIcon />
                  Instant Messaging
                </span>
                <span className="text-[10px] font-mono text-slate-400">24/7 Available</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white">WhatsApp Inquiry</h3>
              <p className="text-xs text-slate-300 font-medium mt-1">Get immediate responses regarding fees, batch times, and study tutes.</p>
              
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2.5 w-full rounded-xl bg-[#27c93f] px-6 py-3.5 text-xs font-extrabold text-slate-950 shadow-lg shadow-[#27c93f]/20 transition-all hover:bg-[#22b538] hover:scale-[1.02]"
              >
                <WhatsAppIcon />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>

            {/* PHONE CARD */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-7 shadow-xl transition-all duration-300 hover:border-[#f0822b]/50 hover:bg-slate-900">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0822b]/10 border border-[#f0822b]/20">
                  <PhoneIcon />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white">Direct Phone Call</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Speak with Lavanya Teacher</p>
                </div>
              </div>
              <a 
                href={`tel:+${settings.whatsapp}`} 
                className="mt-2 block font-mono text-lg sm:text-xl font-extrabold text-[#f0822b] hover:underline"
              >
                {settings.phone}
              </a>
            </div>

            {/* LOCATION CARD */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-7 shadow-xl transition-all duration-300 hover:border-[#8a00c2]/50 hover:bg-slate-900">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8a00c2]/10 border border-[#8a00c2]/20">
                  <MapPinIcon />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white">Academy Location</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Batticaloa, Sri Lanka</p>
                </div>
              </div>
              <p className="text-xs text-slate-200 font-semibold leading-relaxed">{settings.address}</p>
            </div>

            {/* EMAIL CARD */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-7 shadow-xl transition-all duration-300 hover:border-[#f0822b]/50 hover:bg-slate-900">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0822b]/10 border border-[#f0822b]/20">
                  <MailIcon />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white">Email Address</h4>
                  <a 
                    href={`mailto:${settings.email}`} 
                    className="font-mono text-xs font-bold text-[#f0822b] hover:underline"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: HIGH-CONTRAST FORM CONTAINER (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-purple-500/30 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div>
              <div className="mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">Send A Message</h2>
                  <p className="text-xs text-slate-400 font-medium mt-1">Complete the form below and we will respond promptly.</p>
                </div>
                <span className="hidden sm:inline-block font-mono text-[10px] font-bold text-[#8a00c2] bg-[#8a00c2]/20 px-3 py-1 rounded-full border border-[#8a00c2]/30 uppercase tracking-widest">
                  Quick Form
                </span>
              </div>

              {/* Form Component */}
              <ContactForm whatsapp={settings.whatsapp} />
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>TopBright ICT Academy</span>
              <span className="text-[#f0822b] font-bold">Batticaloa &amp; Online</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
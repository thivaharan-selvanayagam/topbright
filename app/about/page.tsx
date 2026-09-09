import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = { title: "About | TopBright Academy" };

function AcademicCapIcon() {
  return (
    <svg className="w-5 h-5 text-[#f0822b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg className="w-5 h-5 text-[#8a00c2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

const modes = [
  { 
    title: "Online Live Classes", 
    body: "Interactive live streaming sessions accessible from anywhere, with HD lesson video archives uploaded within 24 hours.",
    tag: "Virtual Classroom" 
  },
  { 
    title: "Physical Classes in Batticaloa", 
    body: "Direct face-to-face instruction held in a modern classroom setup for students who learn best in an in-person environment.",
    tag: "In-Person Learning" 
  },
  { 
    title: "One-to-One Personalized Sessions", 
    body: "Tailored private coaching focused entirely on a single student's learning speed, programming practice, and exam weak spots.",
    tag: "Individual Focus" 
  },
  { 
    title: "Interactive Group Batches", 
    body: "Small peer cohorts designed for collective past paper solving, group logic exercises, and collaborative problem-solving.",
    tag: "Collaborative Learning" 
  },
];

const pillars = [
  {
    title: "Real Exam Blueprint Alignment",
    desc: "Every theoretical module is linked straight to past national examination questions, marking schemes, and time management strategies.",
  },
  {
    title: "Instant Portal Self-Assessment",
    desc: "Students don't wait weeks for feedback. Online MCQ exams auto-mark immediately with complete logical explanations provided.",
  },
  {
    title: "Comprehensive Resource Vault",
    desc: "Subscribers receive full digital access to model papers, downloadable tutes, revision handbooks, and recorded lecture backups.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen select-none">
      
      {/* SECTION 1: HERO BANNER (DARK THEME) */}
      <section className="relative bg-slate-950 text-white border-b border-slate-800 pt-20 pb-16 sm:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[#8a00c2]/20 blur-[140px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8a00c2]/40 bg-[#8a00c2]/20 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-purple-200 uppercase shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#f0822b] animate-ping" />
            About TopBright Academy
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-tight max-w-4xl">
            ICT Education Rooted In <br />
            <span className="bg-gradient-to-r from-[#8a00c2] via-purple-300 to-[#f0822b] bg-clip-text text-transparent">
              Real Exam Mastery.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            Moving beyond simple rote memorization — we train Grade 6–13 students across Batticaloa and islandwide online to excel in national ICT examinations.
          </p>
        </div>
      </section>

      {/* SECTION 2: EDUCATOR SPOTLIGHT & QUALIFICATIONS (LIGHT THEME) */}
      <section className="bg-slate-50 text-slate-900 border-b border-slate-200 py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            {/* Educator Portrait Card */}
            <div className="lg:col-span-5 relative">
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
                <div className="relative h-[380px] sm:h-[420px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-purple-100 to-slate-100">
                  <Image
                    src="/lavanya_profile.webp"
                    alt="Lavanya - BICT (Hons), Lead ICT Educator"
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-white/90 p-4 backdrop-blur-md shadow-lg">
                    <h3 className="font-display text-lg font-bold text-slate-900">Lavanya</h3>
                    <p className="font-mono text-xs font-semibold text-[#8a00c2] mt-0.5">
                      BICT (Hons) · University of Jaffna
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium mt-1">
                      Founder &amp; Lead ICT Educator at TopBright Academy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Educator Details Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#8a00c2]/20 bg-[#8a00c2]/5 px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-[#8a00c2] uppercase">
                <AcademicCapIcon />
                Academic Credential &amp; Background
              </span>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
                Guided by University-Level <br />
                <span className="text-[#f0822b]">Academic Expertise.</span>
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
                At TopBright Academy, classes are engineered and taught directly by <strong className="text-slate-900">Lavanya</strong>, bringing tertiary academic rigour and standardized teaching techniques to secondary school ICT syllabi.
              </p>

              {/* Credential Cards Grid */}
              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f0822b]/10 border border-[#f0822b]/30">
                      <AcademicCapIcon />
                    </div>
                    <h4 className="font-display text-sm font-bold text-slate-900">BICT (Honours) Degree</h4>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Graduated with an Honours Degree in Bachelor of Information &amp; Communication Technology from the <strong>University of Jaffna</strong>.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8a00c2]/10 border border-[#8a00c2]/30">
                      <BriefcaseIcon />
                    </div>
                    <h4 className="font-display text-sm font-bold text-slate-900">Visiting Lecturer</h4>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Served as a Visiting Lecturer at <strong>Jaffna University College</strong>, delivering higher education ICT frameworks.
                  </p>
                </div>
              </div>

              {/* Experience Highlight Banner */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/80 p-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white font-mono text-xl font-extrabold shadow-md">
                  5+
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-slate-900">Years of Proven Teaching Experience</h4>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    Over 5 years of dedicated experience conducting physical classes in Batticaloa and live interactive online streams islandwide.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: 4 TAILORED WAYS TO LEARN (DARK THEME) */}
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-24 relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#f0822b]/15 blur-[140px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#f0822b]">
              Flexible Delivery
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-white uppercase">
              4 Tailored Ways To Learn
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base font-medium">
              Whether you prefer the energy of a physical classroom or the comfort of online studying, we offer flexible class modes to suit every student.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {modes.map((m) => (
              <div
                key={m.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#8a00c2]/60 hover:bg-slate-900"
              >
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#f0822b] bg-[#f0822b]/10 px-2.5 py-1 rounded-md uppercase tracking-wider inline-block mb-4 border border-[#f0822b]/20">
                    {m.tag}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#f0822b] transition-colors">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300 font-medium">
                    {m.body}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Grades 6–13</span>
                  <span className="text-[#8a00c2] font-bold">Available</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR TEACHING METHODOLOGY (LIGHT THEME) */}
      <section className="bg-slate-50 text-slate-900 border-b border-slate-200 py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#8a00c2]/20 bg-[#8a00c2]/5 px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-[#8a00c2] uppercase">
                Academic Philosophy
              </span>
              
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
                Why Students Excel At <br />
                <span className="bg-gradient-to-r from-[#8a00c2] to-[#f0822b] bg-clip-text text-transparent">
                  TopBright Academy.
                </span>
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
                Secondary ICT is not merely about memorizing hardware terms or software menus. We teach algorithmic logic, system design, binary math, and programming fundamentals with structured exam techniques.
              </p>

              <div className="space-y-4 pt-2">
                {pillars.map((p) => (
                  <div key={p.title} className="flex items-start gap-3.5">
                    <CheckCircleIcon />
                    <div>
                      <h4 className="font-display text-sm font-bold text-slate-900">{p.title}</h4>
                      <p className="text-xs text-slate-600 font-medium mt-0.5 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Showcase Box */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <span className="font-mono text-xs font-bold text-slate-500">STUDENT LEARNING ECOSYSTEM</span>
                  <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">ACTIVE 24/7</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-800 font-semibold">1. Live Interactive Lectures</span>
                    <span className="text-[10px] font-mono text-[#f0822b] font-bold">Online &amp; Physical</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-800 font-semibold">2. HD Video Replay Archives</span>
                    <span className="text-[10px] font-mono text-[#8a00c2] font-bold">Unlimited Access</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-800 font-semibold">3. Automated Online Exams</span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold">Instant Scoring</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Admissions Status</span>
                    <span className="text-xs font-bold text-slate-900">Open For Grades 6 – 13</span>
                  </div>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-xl bg-[#8a00c2] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#7200a3]"
                  >
                    <span>Inquire Batches</span>
                    <ArrowRightIcon />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: STATS COUNTER BAR (DARK THEME) */}
      <section className="bg-slate-950 text-white py-16 relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[600px] rounded-full bg-[#8a00c2]/10 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-center backdrop-blur shadow-xl">
              <p className="font-display text-4xl font-extrabold text-[#f0822b]">5+ Yrs</p>
              <p className="mt-2 text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">Teaching Experience</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-center backdrop-blur shadow-xl">
              <p className="font-display text-4xl font-extrabold text-[#8a00c2]">Grade 6–13</p>
              <p className="mt-2 text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">National Syllabus Range</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-center backdrop-blur shadow-xl">
  <p className="font-display text-4xl font-extrabold text-[#f0822b]">4 Options</p>
  <p className="mt-2 text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
    Online &amp; Physical · 1-to-1 or Group
  </p>
</div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-center backdrop-blur shadow-xl">
              <p className="font-display text-4xl font-extrabold text-emerald-400">24/7</p>
              <p className="mt-2 text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">Student Portal Access</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
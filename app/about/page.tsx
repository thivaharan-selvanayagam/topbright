import type { Metadata } from "next";

export const metadata: Metadata = { title: "About | TopBright Academy" };

const modes = [
  { title: "Online classes", body: "Live sessions you can join from home, with full lesson recordings uploaded afterwards." },
  { title: "Physical classes", body: "In-person classes held in Batticaloa for students who learn best face-to-face." },
  { title: "One-to-one classes", body: "Focused sessions built entirely around one student's pace and weak areas." },
  { title: "Group classes", body: "Small batches where students learn together and practice past papers as a team." },
];

export default function AboutPage() {
  return (
    <div className="bg-[#0d0114]">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-[#8a00c2]/30 bg-[#0d0114]">
        <div className="absolute -left-20 -top-20 h-80 w-80 animate-pulse rounded-full bg-[#8a00c2]/25 blur-[120px]" />
        <div className="container-page relative z-10 py-16">
          <p className="font-mono text-sm font-medium text-[#f0822b]">About Us</p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">
            ICT taught with real exam papers, not just theory.
          </h1>
        </div>
      </section>

      {/* Narrative Body & Learning Modes */}
      <section className="container-page relative z-10 grid gap-12 py-16 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-5 text-slate-300">
          <p className="leading-relaxed">
            TopBright Academy teaches Information & Communication Technology (ICT) to students from
            Grade 6 through Grade 12, based in Batticaloa. Classes combine clear theory
            explanations with hands-on practice, and every topic is tied back to how it is
            actually asked in school and national exams.
          </p>
          <p className="leading-relaxed">
            Students can join fully online, attend physical classes in Batticaloa, or choose
            a one-to-one session for individual attention. Group classes are also available
            for students who prefer learning alongside friends and classmates.
          </p>
          <p className="leading-relaxed">
            Beyond the classroom, this website gives every student a personal login to
            revisit lesson videos, download model papers, past papers, tutes and books, and
            sit short online exams that are marked and recorded instantly.
          </p>
        </div>

        <div className="space-y-4">
          {modes.map((m) => (
            <div
              key={m.title}
              className="group rounded-lg border border-[#8a00c2]/30 bg-[#160221]/90 p-5 shadow-md backdrop-blur transition-all duration-300 hover:border-[#f0822b]/60 hover:bg-[#1e032d]"
            >
              <h3 className="font-display text-base font-semibold text-white transition-colors group-hover:text-[#f0822b]">
                {m.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="relative overflow-hidden border-t border-[#8a00c2]/30 bg-[#160221] py-16">
        <div className="absolute right-0 top-0 h-64 w-64 animate-pulse rounded-full bg-[#f0822b]/15 blur-[100px]" />
        <div className="container-page relative z-10 grid gap-8 sm:grid-cols-3">
          <div className="rounded-md border border-[#8a00c2]/20 bg-[#0d0114]/60 p-6 backdrop-blur">
            <p className="font-display text-4xl font-bold text-[#f0822b]">6–12</p>
            <p className="mt-2 text-sm text-slate-300">Grades taught, from foundation ICT to A/Level</p>
          </div>
          <div className="rounded-md border border-[#8a00c2]/20 bg-[#0d0114]/60 p-6 backdrop-blur">
            <p className="font-display text-4xl font-bold text-[#f0822b]">4</p>
            <p className="mt-2 text-sm text-slate-300">Ways to learn — online, physical, 1-to-1, group</p>
          </div>
          <div className="rounded-md border border-[#8a00c2]/20 bg-[#0d0114]/60 p-6 backdrop-blur">
            <p className="font-display text-4xl font-bold text-[#f0822b]">24/7</p>
            <p className="mt-2 text-sm text-slate-300">Access to videos and downloads with your Student ID</p>
          </div>
        </div>
      </section>
    </div>
  );
}
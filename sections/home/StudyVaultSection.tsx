import Link from "next/link";

const sampleResources = [
  { title: "Grade 11 ICT Model Paper 2026", type: "Model Paper", format: "PDF Document", link: "/downloads" },
  { title: "Python Programming Quick Summary", type: "Study Tute", format: "PDF Handbook", link: "/downloads" },
  { title: "Number Systems Practice Revision", type: "Past Paper", format: "Interactive Test", link: "/downloads" },
];

export default function StudyVaultSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#8a00c2]/10 bg-slate-50 py-20">
      <div className="container-page relative z-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="flex gap-4 items-center">
            <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 text-[#8a00c2]">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
               </svg>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8a00c2]">
                Study Vault
              </span>
              <h2 className="mt-1 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
                Recent model papers &amp; tutes.
              </h2>
            </div>
          </div>
          <Link href="/downloads" className="inline-flex items-center gap-2 rounded-md bg-[#8a00c2] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#7200a3]">
            View all downloads
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {sampleResources.map((res) => (
            <div key={res.title} className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-[#f0822b]/50">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono font-semibold text-[#f0822b]">{res.type}</span>
                <span>{res.format}</span>
              </div>
              <h3 className="mt-3 font-display text-base font-semibold text-slate-900 group-hover:text-[#8a00c2]">
                {res.title}
              </h3>
              <Link href={res.link} className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8a00c2] hover:underline">
                Download Resource &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
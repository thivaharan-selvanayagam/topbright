const platformFeatures = [
  {
    title: "Smart Auto-Marking",
    desc: "Submit your online MCQs and immediately see which questions you got wrong, with correct logic explanations so you never repeat the same mistake.",
    illustration: (
      <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xl">
        <rect x="50" y="40" width="220" height="240" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="4"/>
        <rect x="80" y="80" width="120" height="12" rx="6" fill="#F1F5F9"/>
        <rect x="80" y="110" width="160" height="12" rx="6" fill="#F1F5F9"/>
        <rect x="80" y="140" width="140" height="12" rx="6" fill="#F1F5F9"/>
        <circle cx="270" cy="180" r="50" fill="#22C55E" opacity="0.1"/>
        <path d="M250 180L265 195L295 160" stroke="#22C55E" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="220" y="80" width="100" height="40" rx="8" fill="#8a00c2" className="animate-pulse"/>
        <text x="270" y="105" fill="white" fontSize="16" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">98 / 100</text>
      </svg>
    )
  },
  {
    title: "Topic-by-Topic Analytics",
    desc: "Your dashboard tracks your scores across all syllabus units. Visually see your progress curve go up and know exactly which chapter to focus on next.",
    illustration: (
      <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xl">
        <rect x="40" y="40" width="320" height="220" rx="16" fill="white" stroke="#E2E8F0" strokeWidth="4"/>
        <path d="M80 220V80" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round"/>
        <path d="M80 220H320" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round"/>
        <path d="M80 190C120 190 140 120 180 120C220 120 240 150 280 90C300 60 320 60 320 60" stroke="#f0822b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="180" cy="120" r="8" fill="#8a00c2"/>
        <circle cx="280" cy="90" r="8" fill="#8a00c2"/>
        <rect x="160" y="140" width="40" height="80" rx="4" fill="#8a00c2" opacity="0.1"/>
        <rect x="260" y="110" width="40" height="110" rx="4" fill="#f0822b" opacity="0.2"/>
      </svg>
    )
  },
  {
    title: "Direct Teacher Q&A",
    desc: "Stuck on a problem? Send a message through the platform or WhatsApp and get answers directly from Lavanya teacher to unblock your studying instantly.",
    illustration: (
      <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xl">
        <rect x="60" y="60" width="180" height="100" rx="20" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="4"/>
        <path d="M80 160L60 190L100 160" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="4"/>
        <rect x="90" y="90" width="120" height="10" rx="5" fill="#CBD5E1"/>
        <rect x="90" y="120" width="80" height="10" rx="5" fill="#CBD5E1"/>
        <rect x="160" y="140" width="180" height="100" rx="20" fill="#8a00c2"/>
        <path d="M320 240L340 270L300 240" fill="#8a00c2"/>
        <rect x="190" y="170" width="120" height="10" rx="5" fill="white" opacity="0.8"/>
        <rect x="190" y="200" width="90" height="10" rx="5" fill="white" opacity="0.8"/>
        <circle cx="340" cy="140" r="16" fill="#f0822b"/>
        <path d="M335 140L340 145L347 135" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

export default function PlatformFeaturesSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#8a00c2]/10 bg-slate-50 py-24">
      <div className="container-page relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8a00c2]">
            Inside The Platform
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
            Experience the ultimate student dashboard.
          </h2>
          <p className="mt-4 text-slate-600">
            Your personalized learning environment designed to track your progress and highlight exactly what you need to study next.
          </p>
        </div>

        <div className="space-y-24">
          {platformFeatures.map((feat, idx) => (
            <div key={feat.title} className={`flex flex-col gap-12 lg:items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-30 ${idx % 2 === 0 ? 'bg-[#8a00c2]' : 'bg-[#f0822b]'}`} />
                  {feat.illustration}
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0822b]/10 text-[#f0822b] font-bold text-xl mb-6">
                  {idx + 1}
                </div>
                <h3 className="font-display text-2xl font-semibold text-slate-900">{feat.title}</h3>
                <p className="mt-4 text-lg text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const steps = [
  { n: "01", title: "Get your Student ID", body: "Lavanya sets up a unique login for you when you join." },
  { n: "02", title: "Attend your classes", body: "Online or physical, one-to-one or group — pick what fits." },
  { n: "03", title: "Study with the material", body: "Watch lesson videos and download papers, tutes and books." },
  { n: "04", title: "Sit your exam & get marks", body: "Log in, complete the test, and see your result instantly." },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#8a00c2]/10 bg-white py-24">
      <div className="container-page relative z-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
            From your first class to your first exam mark.
          </h2>
        </div>
        
        <div className="mt-16 relative">
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-slate-200" />
          
          <div className="grid gap-12 md:grid-cols-4 relative z-10">
            {steps.map((s) => (
              <div key={s.n} className="group flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-4 border-slate-50 text-[#8a00c2] font-bold font-mono shadow-md group-hover:scale-110 group-hover:border-[#8a00c2]/20 transition-all">
                  {s.n}
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-slate-900 transition-colors duration-200 group-hover:text-[#8a00c2]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
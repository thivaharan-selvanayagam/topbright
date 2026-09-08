export default function ForParentsSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#8a00c2]/10 bg-white py-24">
      <svg className="absolute left-0 bottom-0 text-[#f0822b]/5 w-full h-auto translate-y-1/2" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>

      <div className="container-page relative z-20">
        <div className="rounded-3xl bg-gradient-to-r from-slate-50 to-[#fdf8ff] border border-slate-200 p-8 md:p-12 lg:flex lg:items-center lg:justify-between shadow-sm">
          <div className="lg:w-1/2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#f0822b]">
              For Parents
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
              Stay updated on your child&apos;s progress effortlessly.
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed text-lg">
              We believe in full transparency. As a parent, you don&apos;t have to guess how your child is performing. Our system is designed to keep you in the loop.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3 text-base text-slate-700 font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#27c93f]/20 text-[#27c93f]">✓</div>
                Weekly exam marks sent via WhatsApp
              </li>
              <li className="flex items-center gap-3 text-base text-slate-700 font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#27c93f]/20 text-[#27c93f]">✓</div>
                Monitor attendance and video watch history
              </li>
              <li className="flex items-center gap-3 text-base text-slate-700 font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#27c93f]/20 text-[#27c93f]">✓</div>
                Direct line to Lavanya teacher for feedback
              </li>
            </ul>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-5/12">
             <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-purple-900/10">
               <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                 <div className="h-12 w-12 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                   <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                 </div>
                 <div>
                   <p className="font-semibold text-slate-900">Lavanya Teacher</p>
                   <p className="text-xs text-slate-500">WhatsApp Notification</p>
                 </div>
               </div>
               <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700 shadow-inner">
                 &quot;Hi! Your child scored <strong>92%</strong> on this week&apos;s Boolean Logic quiz. They have shown great improvement!&quot;
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
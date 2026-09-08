const topAchievers = [
  { name: "M. Nithusha", exam: "O/L ICT Batch", score: "A Grade", school: "Vincent Girls' High School" },
  { name: "K. Abinesh", exam: "O/L ICT Batch", score: "A Grade", school: "St. Michael's College" },
  { name: "R. Shalini", exam: "A/L ICT Batch", score: "A Grade", school: "Cecilia's Girls' College" },
];

export default function HallOfFameSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#8a00c2]/10 bg-[#fdf8ff] py-24">
      <div className="container-page relative z-20">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0822b]/10 text-[#f0822b] mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
            Hall of Fame
          </h2>
          <p className="mt-4 max-w-lg text-slate-600">
            Celebrating our top achievers who have secured outstanding results in their national examinations.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {topAchievers.map((student) => (
            <div key={student.name} className="relative overflow-hidden flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm border border-slate-200/60 text-center transition-transform hover:-translate-y-1">
              <svg className="absolute -right-4 -bottom-4 w-24 h-24 text-[#8a00c2]/5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              
              <div className="relative z-10 h-16 w-16 rounded-full bg-[#8a00c2]/10 flex items-center justify-center text-[#8a00c2] font-display text-xl font-bold mb-4">
                {student.name.charAt(0)}
              </div>
              <h3 className="relative z-10 font-display text-lg font-semibold text-slate-900">{student.name}</h3>
              <p className="relative z-10 text-xs font-mono font-medium text-[#f0822b] mt-1">{student.exam}</p>
              <div className="relative z-10 mt-4 inline-block rounded-md bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                {student.score}
              </div>
              <p className="relative z-10 mt-3 text-xs text-slate-500">{student.school}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
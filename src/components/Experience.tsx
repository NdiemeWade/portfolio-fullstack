export default function Experience() {
  const experiences = [
    {
      role: 'Développeuse Full-Stack (Stagiaire)',
      company: 'LAS (Limak-AIBD-Summa)',
      period: '2026',
      description: 'Développement d\'APIs Node.js, gestion de bases de données MySQL et création d\'interfaces web avec Angular.',
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#F0D3CE]/60">
      <h2 className="text-3xl font-serif font-bold text-[#2C1820] mb-8">
        Expériences<span className="text-[#C86D7D]">.</span>
      </h2>
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-[#F0D3CE] shadow-xs">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-[#2C1820]">{exp.role}</h3>
              <span className="text-sm font-medium text-[#C86D7D] bg-[#FAF3F0] px-3 py-1 rounded-full">
                {exp.period}
              </span>
            </div>
            <p className="text-sm font-semibold text-[#7A5C66] mb-3">{exp.company}</p>
            <p className="text-[#7A5C66]">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
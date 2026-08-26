export default function Skills() {
  const skills = [
    { category: 'Frontend', items: ['Next.js', 'React', 'Angular', 'Tailwind CSS', 'TypeScript'] },
    { category: 'Backend & Data', items: ['Node.js', 'Python', 'MySQL', 'SQL', 'Postman'] },
    { category: 'Outils & Environnement', items: ['Git', 'GitHub', 'VS Code', 'C'] },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#F0D3CE]/60">
      <h2 className="text-3xl font-serif font-bold text-[#2C1820] mb-8">
        Compétences<span className="text-[#C86D7D]">.</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-[#F0D3CE] shadow-xs">
            <h3 className="text-lg font-bold text-[#2C1820] mb-4">{s.category}</h3>
            <ul className="space-y-2">
              {s.items.map((item, i) => (
                <li key={i} className="text-[#7A5C66] text-sm flex items-center space-x-2">
                  <span className="text-[#C86D7D]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#F0D3CE]/60">
      <h2 className="text-3xl font-serif font-bold text-[#2C1820] mb-6">
        À propos<span className="text-[#C86D7D]">.</span>
      </h2>
      <div className="bg-white p-8 rounded-3xl border border-[#F0D3CE] shadow-xs max-w-3xl">
        <p className="text-[#7A5C66] leading-relaxed mb-4">
          Étudiante en Bachelor Informatique à Epitech Nancy, je me passionne pour le développement full-stack et les architectures axées sur la data et l'intelligence artificielle.
        </p>
        <p className="text-[#7A5C66] leading-relaxed">
          Mon objectif est d'associer rigueur logicielle et solutions innovantes pour concevoir des produits web complets, performants et utiles.
        </p>
      </div>
    </section>
  )
}
'use client'

export default function About() {
  return (
    <section id="about" className="w-full bg-[#FAF7F8] border-y border-[#F472B6]/30 py-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TITRE PRINCIPAL EN DEHORS DE LA CARTE */}
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#BE185D] block">
            RACONTER MON PARCOURS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#2C1820]">
            À propos de moi<span className="text-[#EC4899]">.</span>
          </h2>
        </div>

        {/* CARTE CONTENANT LE TEXTE DE PRÉSENTATION */}
        <div className="bg-gradient-to-br from-[#FCE7F3]/60 via-[#FAF4F7] to-white rounded-3xl p-8 sm:p-12 border border-[#F472B6]/30 shadow-sm">
          <div className="space-y-4 max-w-3xl text-sm sm:text-base font-sans text-[#5C404E] leading-relaxed">
            <p>
              Étudiante en Bachelor Informatique à Epitech Nancy, je me passionne pour le développement full-stack et les architectures axées sur la data et l'intelligence artificielle.
            </p>
            <p>
              Mon objectif est d'associer rigueur logicielle et solutions innovantes pour concevoir des applications web complètes, performantes et intuitives.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
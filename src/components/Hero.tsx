'use client'

import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Badge Étudiante */}
      <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-[#F0D3CE] shadow-xs mb-8">
        <Sparkles className="w-4 h-4 text-[#C86D7D]" />
        <span className="text-xs sm:text-sm font-semibold text-[#2C1820] tracking-wide">
          Étudiante en Bachelor Informatique @ Epitech Nancy
        </span>
      </div>

      {/* Titre Principal (Textes sombres ultra lisibles) */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#2C1820] leading-tight mb-6">
        Développeuse Full-Stack <br className="hidden sm:block" />
        & Passionnée d'IA<span className="text-[#C86D7D]">.</span>
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-lg text-[#7A5C66] leading-relaxed mb-10">
        Bienvenue sur mon portfolio. Je conçois des applications web modernes, robustes et évolutives, en explorant l'ingénierie logicielle et la science des données.
      </p>

      {/* Boutons d'action */}
      <div className="flex flex-wrap items-center gap-4 mb-16">
        <Link
          href="/projects"
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#C86D7D] text-white font-medium hover:bg-[#B55869] shadow-md hover:shadow-lg transition-all"
        >
          <span>Voir mes projets</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="#contact"
          className="inline-flex items-center px-6 py-3.5 rounded-full bg-white text-[#2C1820] font-medium border border-[#F0D3CE] hover:border-[#C86D7D] hover:text-[#C86D7D] shadow-xs transition-all"
        >
          Me contacter
        </Link>
      </div>

      {/* Badges du bas */}
      <div className="pt-8 border-t border-[#F0D3CE]/80 flex flex-wrap gap-6 text-sm font-medium text-[#7A5C66]">
        <div className="flex items-center space-x-2">
          <span className="text-[#C86D7D] font-mono font-bold">&lt;/&gt;</span>
          <span>Full-Stack Web</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[#C86D7D]">🗄️</span>
          <span>Data & Backend</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[#C86D7D]">🧠</span>
          <span>Intelligence Artificielle</span>
        </div>
      </div>

    </section>
  )
}
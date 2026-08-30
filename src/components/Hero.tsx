'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section id="home" className="relative w-full max-w-6xl mx-auto pt-36 pb-20 px-4 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Colonne Gauche */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Badge bien visible */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pink-50 border-2 border-pink-300 text-pink-900 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-600"></span>
            </span>
            <span className="text-xs font-mono font-bold">
              À la recherche d'opportunités en Dév & IA
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-[#231118] leading-tight">
            Développeuse Full-Stack <br />
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              & Passionnée d'IA.
            </span>
          </h1>

          <p className="text-sm sm:text-base font-mono text-[#5C424E] leading-relaxed max-w-xl">
            Étudiante en Bachelor Informatique à Epitech Nancy. Je conçois des applications web modernes, robustes et axées sur l'intelligence artificielle.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/projects"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-mono text-xs font-bold shadow-md hover:shadow-pink-500/20 transition-all"
            >
              Voir mes projets →
            </Link>
            <Link
              href="#contact"
              className="px-6 py-3.5 rounded-xl bg-white border-2 border-pink-200 text-[#231118] font-mono text-xs font-bold hover:border-pink-400 hover:bg-pink-50/50 transition-all shadow-xs"
            >
              Me contacter
            </Link>
          </div>
        </div>

        {/* Colonne Droite : Photo réelle */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl p-2 bg-gradient-to-b from-pink-300 via-purple-300 to-pink-100 shadow-xl">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white">
              <Image
                src="/photo.jpg"
                alt="Ndiémé Wade"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-pink-200 text-center shadow-md">
                <p className="text-xs font-serif font-bold text-[#231118]">Ndiémé Wade</p>
                <p className="text-[10px] font-mono font-medium text-pink-700">Epitech Nancy • France</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
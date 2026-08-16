'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Code2, Database, Brain } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-chic-50 dark:bg-chic-900 transition-colors">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-chic-200/40 dark:bg-chic-800/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-chic-100 dark:bg-chic-800 border border-chic-200 dark:border-chic-700 text-chic-800 dark:text-chic-200 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-chic-600 dark:text-chic-500" />
            <span>Étudiante en Informatique @ Epitech Nancy</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-chic-900 dark:text-chic-50 tracking-tight leading-tight mb-6">
            Développeuse Full-Stack & Passionnée d'IA<span className="text-chic-600 dark:text-chic-500">.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-chic-800/80 dark:text-chic-200/80 leading-relaxed mb-8">
            Conception d'applications web modernes, robustes et élégantes. Spécialisée en React, Next.js, Node.js et l'intégration de solutions IA.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-chic-600 hover:bg-chic-500 dark:bg-chic-500 dark:hover:bg-chic-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
            >
              <span>Voir mes projets</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/#contact"
              className="px-6 py-3 rounded-full bg-chic-100 dark:bg-chic-800 hover:bg-chic-200 dark:hover:bg-chic-700 text-chic-900 dark:text-chic-50 font-medium border border-chic-200/60 dark:border-chic-700 transition-all"
            >
              Me contacter
            </Link>
          </div>

          {/* Quick Skill Tags */}
          <div className="pt-8 border-t border-chic-200/60 dark:border-chic-800/80 flex flex-wrap gap-6 text-sm text-chic-800/70 dark:text-chic-200/70">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-chic-600 dark:text-chic-500" />
              <span>Full-Stack Web</span>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-chic-600 dark:text-chic-500" />
              <span>Data & Supabase</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-chic-600 dark:text-chic-500" />
              <span>Intelligence Artificielle</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
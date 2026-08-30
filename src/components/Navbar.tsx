'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/about' },
    { name: 'Éducation', href: '/education' },
    { name: 'Expériences', href: '/experiences' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Projets', href: '/projects' },
    { name: 'Compétences', href: '/skills' },
    { name: 'Autres', href: '/others' },
    { name: 'Contact', href: '/#contact' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    if (path.includes('#')) return false
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FAF4F7]/90 backdrop-blur-md border-b border-[#F472B6]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-serif font-bold text-[#2C1820] tracking-tight">
          Ndiémé<span className="text-[#EC4899]">.</span>
        </Link>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:flex items-center gap-1 bg-white/60 p-1.5 rounded-full border border-[#F472B6]/20 shadow-sm">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  active
                    ? 'bg-[#FCE7F3] text-[#BE185D] font-bold shadow-sm'
                    : 'text-[#593E4D] hover:text-[#2C1820] hover:bg-[#FCE7F3]/40'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* BOUTON CV (DESKTOP) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-mono font-bold text-white bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:from-[#DB2777] hover:to-[#7C3AED] rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            CV <span>↓</span>
          </a>
        </div>

        {/* BOUTON BURGER (MOBILE) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label="Ouvrir le menu"
          className="md:hidden p-2 text-[#2C1820] hover:bg-[#FCE7F3]/50 rounded-xl transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MENU MOBILE DÉROULANT */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-[#F472B6]/20 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-mono transition-all ${
                    active
                      ? 'bg-[#FCE7F3] text-[#BE185D] font-bold'
                      : 'text-[#593E4D] hover:bg-[#FCE7F3]/40'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          <div className="pt-2 border-t border-[#F472B6]/10 flex items-center justify-between">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 text-xs font-mono font-bold text-white bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-xl shadow-sm"
            >
              Télécharger CV ↓
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF3F0]/90 backdrop-blur-md border-b border-[#F0D3CE]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo / Nom */}
        <Link href="/" className="font-serif font-bold text-xl text-[#2C1820]">
          Ndiémé<span className="text-[#C86D7D]">.</span>
        </Link>

        {/* Navigation avec les '/' devant chaque ancre pour fonctionner depuis n'importe quelle page */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-[#7A5C66]">
          <Link href="/" className="hover:text-[#2C1820] transition-colors">
            Home
          </Link>
          <Link href="/#about" className="hover:text-[#2C1820] transition-colors">
            À propos
          </Link>
          <Link href="/#experience" className="hover:text-[#2C1820] transition-colors">
            Expériences
          </Link>
          <Link href="/projects" className="hover:text-[#2C1820] transition-colors">
            Projets
          </Link>
          <Link href="/#skills" className="hover:text-[#2C1820] transition-colors">
            Compétences
          </Link>
          <Link href="/#contact" className="hover:text-[#2C1820] transition-colors">
            Contact
          </Link>
        </div>

      </div>
    </nav>
  )
}
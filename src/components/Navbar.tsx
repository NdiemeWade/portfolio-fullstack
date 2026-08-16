'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, Download, Menu, X } from 'lucide-react'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Experience', href: '/experience' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Education', href: '/#education' },
    { name: 'Certifications', href: '/#certifications' },
    { name: 'Contact', href: '/#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-chic-50/80 dark:bg-chic-900/80 border-b border-chic-200/50 dark:border-chic-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif font-bold text-chic-900 dark:text-chic-50 tracking-tight">
          Ndiémé<span className="text-chic-600 dark:text-chic-500">.</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-chic-100/60 dark:bg-chic-800/60 p-1.5 rounded-full border border-chic-200/40 dark:border-chic-800">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 text-sm font-medium text-chic-900/80 dark:text-chic-50/80 hover:text-chic-600 dark:hover:text-chic-500 rounded-full transition-all hover:bg-white/60 dark:hover:bg-chic-900/60"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions (CV + Socials + Theme Toggle) */}
        <div className="hidden sm:flex items-center space-x-3">
          <a
            href="/CV_Ndieme_Wade.pdf"
            target="_blank"
            download="CV_Ndieme_Wade.pdf"
            className="flex items-center space-x-1.5 px-4 py-2 text-sm font-medium text-white bg-chic-600 hover:bg-chic-500 dark:bg-chic-500 dark:hover:bg-chic-600 rounded-full shadow-sm hover:shadow transition-all"
          >
            <span>CV</span>
            <Download className="w-4 h-4" />
          </a>

          {/* LinkedIn Icon */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 text-chic-900/70 dark:text-chic-50/70 hover:text-chic-600 dark:hover:text-chic-500 bg-chic-100/80 dark:bg-chic-800/80 rounded-full transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>

          {/* GitHub Icon */}
          <a
            href="https://github.com/NdiemeWade"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 text-chic-900/70 dark:text-chic-50/70 hover:text-chic-600 dark:hover:text-chic-500 bg-chic-100/80 dark:bg-chic-800/80 rounded-full transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
          </a>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Changer de thème"
            className="p-2 text-chic-900/70 dark:text-chic-50/70 hover:text-chic-600 dark:hover:text-chic-500 bg-chic-100/80 dark:bg-chic-800/80 rounded-full transition-colors"
          >
            <Sun className="w-4 h-4 hidden dark:block" />
            <Moon className="w-4 h-4 block dark:hidden" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-chic-900/70 dark:text-chic-50/70 bg-chic-100/80 dark:bg-chic-800/80 rounded-full"
          >
            <Sun className="w-4 h-4 hidden dark:block" />
            <Moon className="w-4 h-4 block dark:hidden" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-chic-900 dark:text-chic-50"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 space-y-2 bg-chic-50 dark:bg-chic-900 border-b border-chic-200 dark:border-chic-800">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-chic-900 dark:text-chic-50 hover:text-chic-600 dark:hover:text-chic-500 rounded-md"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex items-center space-x-3">
            <a
              href="/CV_Ndieme_Wade.pdf"
              target="_blank"
              download="CV_Ndieme_Wade.pdf"
              className="flex-1 flex items-center justify-center space-x-2 py-2 text-sm font-medium text-white bg-chic-600 rounded-full"
            >
              <span>Télécharger CV</span>
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
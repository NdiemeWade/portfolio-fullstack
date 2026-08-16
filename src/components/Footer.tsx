import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-chic-200/60 dark:border-chic-800/80 bg-chic-50 dark:bg-chic-900 transition-colors py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-chic-800/70 dark:text-chic-200/70">
        
        <p>© {new Date().getFullYear()} Ndiémé Wade. Tous droits réservés.</p>

        <div className="flex items-center space-x-6">
          <Link href="https://github.com/NdiemeWade" target="_blank" rel="noopener noreferrer" className="hover:text-chic-600 dark:hover:text-chic-500 transition-colors">
            GitHub
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-chic-600 dark:hover:text-chic-500 transition-colors">
            LinkedIn
          </Link>
          <Link href="mailto:ndieme.wade@epitech.eu" className="hover:text-chic-600 dark:hover:text-chic-500 transition-colors">
            Email
          </Link>
        </div>

      </div>
    </footer>
  )
}
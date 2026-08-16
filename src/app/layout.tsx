import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Ndiémé Wade | Software Engineering & AI Student',
  description: 'Portfolio de Ndiémé Wade, élève ingénieure en informatique à Epitech Nancy.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased selection:bg-chic-500 selection:text-white">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
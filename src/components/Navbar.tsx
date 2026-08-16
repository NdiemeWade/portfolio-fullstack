import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Nom */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          Ndiémé<span className="text-blue-600">.dev</span>
        </Link>

        {/* Liens de navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="#about" className="hover:text-blue-600 transition-colors">
            À propos
          </Link>
          <Link href="#experiences" className="hover:text-blue-600 transition-colors">
            Expériences
          </Link>
          <Link href="#projects" className="hover:text-blue-600 transition-colors">
            Projets
          </Link>
          <Link href="#skills" className="hover:text-blue-600 transition-colors">
            Compétences
          </Link>
          <Link href="#contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
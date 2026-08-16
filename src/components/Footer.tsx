export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8 text-center text-sm text-gray-500">
      <div className="mx-auto max-w-6xl px-6">
        <p>© {new Date().getFullYear()} Ndiémé Wade — Tous droits réservés.</p>
        <p className="mt-1 text-xs text-gray-400">
          Construit avec Next.js, React, Tailwind CSS & Supabase.
        </p>
      </div>
    </footer>
  );
}
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">Get in touch</p>
        <h1 className="text-4xl font-serif text-gray-900">
          Let's build something <span className="text-blue-600 italic">together.</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Whether it's a project, collaboration, internship, or just a chat — I'm always open to interesting conversations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</p>
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm font-semibold text-gray-800">ndieme.wade@epitech.eu</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">LinkedIn</p>
              <p className="text-sm font-semibold text-blue-600">linkedin.com/in/ndiemewade</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Status</p>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1,5">
              🟢 Open to opportunities
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Currently studying at Epitech Nancy • Open to internship opportunities.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
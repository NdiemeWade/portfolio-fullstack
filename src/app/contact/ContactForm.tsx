'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setStatus({ type: 'success', msg: 'Message envoyé avec succès !' });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error();
      }
    } catch {
      setStatus({ type: 'error', msg: "Erreur lors de l'envoi du message." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
          <input required name="name" type="text" placeholder="Your name" className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
          <input required name="email" type="email" placeholder="your@email.com" className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
        <input name="subject" type="text" placeholder="What's this about?" className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Message</label>
        <textarea required name="message" rows={5} placeholder="Tell me about your project, idea, or question..." className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600" />
      </div>

      {status && (
        <p className={`text-xs ${status.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
          {status.msg}
        </p>
      )}

      <button
        disabled={loading}
        type="submit"
        className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send message →'}
      </button>
    </form>
  );
}
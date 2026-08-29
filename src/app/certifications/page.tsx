import { supabase } from '@/lib/supabase';

export const revalidate = 60;

export default async function CertificationsPage() {
  const { data: certs } = await supabase
    .from('certifications')
    .select('*')
    .order('issue_date', { ascending: false });

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">Credentials</p>
        <h1 className="text-4xl font-serif text-gray-900 mb-3">Certifications</h1>
        <p className="text-gray-600 max-w-2xl">
          Industry-recognised credentials validating skills in data, cloud, and machine learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs?.map((cert) => (
          <div key={cert.id} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold text-xs">
                  {cert.issuer.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-gray-900">{cert.title}</h3>
                  <p className="text-xs font-semibold text-blue-600">{cert.issuer}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-6">{cert.description}</p>
            </div>

            <div className="flex justify-between items-center border-t border-gray-100 pt-4 text-xs">
              <span className="text-gray-400 font-mono">{cert.issue_date?.slice(0, 7)}</span>
              {cert.credential_url && (
                <a href={cert.credential_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold">
                  Verify ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
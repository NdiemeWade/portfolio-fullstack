import { supabase } from '@/lib/supabase';

export const revalidate = 60;

export default async function EducationPage() {
  const { data: educationList } = await supabase
    .from('education')
    .select('*')
    .order('start_date', { ascending: false });

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-serif text-gray-900 mb-10">Education</h1>

      <div className="space-y-6">
        {educationList?.map((item) => (
          <div key={item.id} className="relative p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
            {item.is_current && (
              <span className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-2,5 py-1 rounded-md uppercase">
                Current
              </span>
            )}
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                🎓
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <h2 className="text-xl font-serif text-gray-900">{item.institution}</h2>
                  <span className="text-xs text-gray-400 font-mono">
                    {item.start_date?.slice(0, 7)} — {item.is_current ? 'Present' : item.end_date?.slice(0, 7)}
                  </span>
                </div>
                <p className="font-semibold text-gray-800 text-sm">{item.degree}</p>
                <p className="text-xs text-gray-500 mb-4">{item.field_of_study} • {item.location}</p>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.highlights?.map((h: string, idx: number) => (
                    <span key={idx} className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1 rounded-lg">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
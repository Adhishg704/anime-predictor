export default function KeywordsSection({ animeKeywords }) {
  if (!animeKeywords || animeKeywords.length === 0) {
    return (
      <div className="text-white text-sm mt-4 italic">
        Loading keywords...
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl mt-6 shadow-lg border border-slate-600 mb-6">
      <h2 className="text-white text-xl font-bold mb-4">Tags & Genres</h2>
      <div className="flex flex-wrap gap-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
        {animeKeywords.map((keyword, index) => (
          <span
            key={index}
            className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

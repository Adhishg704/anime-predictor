import React from "react";

export default function InputSection({
  animeInput,
  setAnimeInput,
  handleKeyDown,
  handleSubmit,
  loading
}) {
  return (
    <div className="p-5 flex items-center gap-4 bg-slate-700">
      <h3 className="text-gray-300 text-xl font-mono whitespace-nowrap">
        Enter anime:
      </h3>
      <input
        type="text"
        className="bg-slate-600 font-mono text-white text-lg p-3 w-full rounded-xl border border-gray-500 focus:border-blue-400 outline-none"
        placeholder="Enter anime name..."
        value={animeInput}
        onChange={(e) => setAnimeInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-blue-600 font-mono text-white text-lg px-5 py-3 rounded-xl hover:bg-blue-500 transition duration-200"
        onClick={!loading && handleSubmit}
      >
        Analyze
      </button>
    </div>
  );
}

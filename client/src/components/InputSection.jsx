import React from "react";
import AutoCompleteInput from "./AutoCompleteInput";

export default function InputSection({
  animeInput,
  setAnimeInput,
  handleKeyDown,
  handleSubmit,
  loading
}) {
  return (
    <div className="p-5 flex flex-col sm:flex-row items-center gap-4 bg-slate-700">
      <h3 className="text-gray-300 text-xl font-mono whitespace-nowrap">
        Enter anime:
      </h3>
      <AutoCompleteInput
        value={animeInput}
        onChange={setAnimeInput}
        placeholder="Enter anime name..."
        inputClassName="text-lg font-mono"
        containerClassName="flex-1 w-full"
      />
      <button
        className="bg-blue-600 font-mono text-white text-lg px-5 py-3 rounded-xl hover:bg-blue-500 transition duration-200 w-full sm:w-auto"
        onClick={!loading && handleSubmit}
      >
        Analyze
      </button>
    </div>
  );
}

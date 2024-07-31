import React, { useState } from "react";

export default function Recommend() {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    
  };

  return (
    <div className="flex flex-col h-screen bg-slate-700">
      <div className="flex-grow bg-slate-600 p-5">
        Hello
      </div>
      <div className="p-4 flex items-center justify-between bg-slate-800">
        <h3 className="text-gray-500 text-3xl font-mono">
          Enter anime to be analyzed
        </h3>
        <textarea
          type="text"
          className="bg-slate-700 font-mono text-white text-2xl p-3 border-none outline-none w-full rounded-full"
          placeholder="Enter your prompt..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="bg-slate-700 font-mono text-white text-2xl p-4 rounded-full hover:bg-slate-600 transition duration-200 ml-5"
          onClick={handleSubmit}
        >
          Analyze
        </button>
      </div>
    </div>
  );
}



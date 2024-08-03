import React, { useState } from "react";

export default function Recommend() {
  const [animeName, setAnimeName] = useState("");
  const [anilistURL, setanilistURL] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setanilistURL(false);
      const response = await fetch("http://localhost:8000/get-anilist-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          anime_title: animeName,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(errorData.error || "Unable to get response");
      }
      const data = await response.json();
      setanilistURL(data.anilist_url || "No URL found");
      setErrorMsg("");
    } catch (error) {
      setErrorMsg("An error occurred: " + error.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-700">
      <div className="flex-grow bg-slate-600 p-5">
        {loading && (<div className="text-white">Loading...</div>)}
        {errorMsg && <div className="text-red-500">{errorMsg}</div>}
        {anilistURL && (
          <div className="text-yellow-100">
            <p>Anilist URL:</p>
            <a href={anilistURL} target="_blank" rel="noopener noreferrer">
              {anilistURL}
            </a>
          </div>
        )}
      </div>
      <div className="p-4 flex items-center justify-between bg-slate-800">
        <h3 className="text-gray-500 text-3xl font-mono">
          Enter anime to be analyzed
        </h3>
        <textarea
          type="text"
          className="bg-slate-700 font-mono text-white text-2xl p-3 border-none outline-none w-full rounded-full"
          placeholder="Enter your prompt..."
          value={animeName}
          onChange={(e) => setAnimeName(e.target.value)}
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

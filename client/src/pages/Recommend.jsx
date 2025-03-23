import React, { useState} from "react";

export function AnimeSentimentAnalyzer() {
  const [animeName, setAnimeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [anilistURL, setAnilistURL] = useState("");
  const [reviewTitles, setReviewTitles] = useState([]);

  const handleSubmit = async () => {
    if (!animeName.trim()) {
      setErrorMsg("Please enter an anime name!");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    setAnilistURL("");
    setReviewTitles([]);

    setTimeout(() => {
      setAnilistURL(`https://anilist.co/search/anime?search=${animeName}`);
      setReviewTitles(["Fetching reviews..."]);
      setLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900">
      <div className="flex-grow bg-slate-800 p-6 font-mono overflow-auto">
        <LoadingIndicator loading={loading} />
        <ErrorMessage errorMsg={errorMsg} />
        <AnilistURLDisplay anilistURL={anilistURL} />
        <ReviewList reviewTitles={reviewTitles} />
      </div>
      <InputSection
        animeName={animeName}
        setAnimeName={setAnimeName}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

function LoadingIndicator({ loading }) {
  if (!loading) return null;
  return (
    <div className="text-white flex items-center">
      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Loading...
    </div>
  );
}

function ErrorMessage({ errorMsg }) {
  if (!errorMsg) return null;
  return <div className="text-red-400 bg-red-900 p-2 rounded-lg w-fit">{errorMsg}</div>;
}

function AnilistURLDisplay({ anilistURL }) {
  if (!anilistURL) return null;
  return (
    <div className="text-yellow-200 mt-4">
      <p>Anilist URL:</p>
      <a href={anilistURL} target="_blank" rel="noopener noreferrer" className="underline text-blue-400 hover:text-blue-300">
        {anilistURL}
      </a>
    </div>
  );
}

function ReviewList({ reviewTitles }) {
  if (reviewTitles.length === 0) return null;
  return (
    <div className="mt-4">
      <h3 className="text-white text-lg">Review Titles:</h3>
      <ul className="list-disc list-inside text-yellow-400">
        {reviewTitles.map((reviewTitle, index) => (
          <li key={index} className="mt-2">{reviewTitle}</li>
        ))}
      </ul>
    </div>
  );
}

function InputSection({ animeName, setAnimeName, handleKeyDown, handleSubmit }) {
  return (
    <div className="p-5 flex items-center gap-4 bg-slate-700">
      <h3 className="text-gray-300 text-xl font-mono whitespace-nowrap">Enter anime:</h3>
      <input
        type="text"
        className="bg-slate-600 font-mono text-white text-lg p-3 w-full rounded-xl border border-gray-500 focus:border-blue-400 outline-none"
        placeholder="Enter anime name..."
        value={animeName}
        onChange={(e) => setAnimeName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="bg-blue-600 font-mono text-white text-lg px-5 py-3 rounded-xl hover:bg-blue-500 transition duration-200" onClick={handleSubmit}>
        Analyze
      </button>
    </div>
  );
}
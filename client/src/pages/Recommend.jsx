import React, { useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";
import AnilistURLDisplay from "../components/AnilistURLDisplay";
import InputSection from "../components/InputSection";

export function AnimeSentimentAnalyzer() {
  const [animeInput, setAnimeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [anilistURL, setAnilistURL] = useState("");

  const handleSubmit = async () => {
    if (!animeInput.trim()) {
      setErrorMsg("Please enter an anime name!");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    setAnilistURL("");

    setTimeout(() => {
      setAnilistURL(`https://anilist.co/search/anime?search=${animeInput}`);
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
      </div>
      <InputSection
        animeInput={animeInput}
        setAnimeInput={setAnimeInput}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
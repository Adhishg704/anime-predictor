import React, { useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";
import AnilistURLDisplay from "../components/AnilistURLDisplay";
import InputSection from "../components/InputSection";
import AnimeInfo from "../components/AnimeInfo";

import { useAnimeData } from "../../hooks/useAnimeData.js";

export function AnimeSentimentAnalyzer() {
  const [animeInput, setAnimeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [anilistURL, setAnilistURL] = useState("");

  const {
    animeInfo,
    animeReviews,
    animeSummaries,
    errorMsg,
    loadingAnimeData,
    loadAllAnimeData,
  } = useAnimeData();

  const handleSubmit = async () => {
    if (!animeInput.trim()) {
      return;
    }

    setLoading(true);
    setAnilistURL(`https://anilist.co/search/anime?search=${animeInput}`);

    await loadAllAnimeData(animeInput);
    setLoading(false);
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
        <AnimeInfo anime={animeInfo} loading={loadingAnimeData} />
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

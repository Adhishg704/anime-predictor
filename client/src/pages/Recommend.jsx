import { useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";
import AnilistURLDisplay from "../components/AnilistURLDisplay";
import InputSection from "../components/InputSection";
import AnimeInfo from "../components/AnimeInfo";
import ToggleGridUi from "../components/ToggleGridUi.jsx";

import { useAnimeMetaData, useAnimeReviewData, useAnimeKeywordsData } from "../hooks/useAnimeData.js";
import ThreeByThreeGrid from "../components/ThreeByThreeGrid.jsx";

export function AnimeSentimentAnalyzer() {
  const [animeInput, setAnimeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [anilistURL, setAnilistURL] = useState("");
  const [animeGrid, setAnimeGrid] = useState(Array(9).fill(""));

  console.log(animeGrid);

  const {
    animeInfo,
    errorMsg,
    loadingAnimeData,
    loadAllAnimeMetaData,
  } = useAnimeMetaData();

  const {
    animeReviews,
    animeSentimentList,
    loadAllAnimeReviewData
  } = useAnimeReviewData();

  const {
    animeKeywords,
    resetKeywords,
    loadAllAnimeKeywords
  } = useAnimeKeywordsData();

  const handleSubmit = async () => {
    if (!animeInput.trim()) {
      return;
    }

    resetKeywords();

    setLoading(true);
    setAnilistURL(`https://anilist.co/search/anime?search=${animeInput}`);

    await loadAllAnimeMetaData(animeInput);
    await loadAllAnimeKeywords(animeInput);
    await loadAllAnimeReviewData(animeInput);
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
        <AnimeInfo animeMetadata={animeInfo} animeReviews={animeReviews} animeSentimentList = {animeSentimentList} animeKeywords = {animeKeywords} loading={loadingAnimeData}  />
      </div>
      <ToggleGridUi animeGrid={animeGrid} setAnimeGrid={setAnimeGrid} />
      <InputSection
        animeInput={animeInput}
        setAnimeInput={setAnimeInput}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

import React, { useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";
import AnilistURLDisplay from "../components/AnilistURLDisplay";
import InputSection from "../components/InputSection";
import AnimeInfo from "../components/AnimeInfo";

export function AnimeSentimentAnalyzer() {
  const [animeInput, setAnimeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAnimeData, setLoadingAnimeData] = useState(false);
  const [animeInfo, setAnimeInfo] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [anilistURL, setAnilistURL] = useState("");

  const handleSubmit = () => {
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

    loadAnimeInfo();
  };

  const loadAnimeInfo = async () => {
    setLoadingAnimeData(true);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/analyze/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ anime: animeInput })
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch anime data");
      }
  
      const data = await response.json();
  
      setAnimeInfo(data.data.Media);
    } catch (error) {
      console.error("Error fetching anime data:", error);
      setErrorMsg("Failed to load anime data. Please try again.");
    } finally {
      setLoadingAnimeData(false);
    }
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
        <AnimeInfo anime = {animeInfo} loading = {loadingAnimeData} />
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
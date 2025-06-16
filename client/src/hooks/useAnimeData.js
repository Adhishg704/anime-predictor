import { useState } from "react";
import {
  fetchAnimeMetadata,
  fetchAnimeReviews,
  fetchReviewSummaries,
} from "../api/api.js";

export const useAnimeMetaData = () => {
  const [animeInfo, setAnimeInfo] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingAnimeData, setLoadingAnimeData] = useState(false);

  const loadAllAnimeMetaData = async (animeName) => {
    setLoadingAnimeData(true);
    setErrorMsg("");

    try {
      const metadata = await fetchAnimeMetadata(animeName);
      setAnimeInfo(metadata.data.Media);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setLoadingAnimeData(false);
    }
  };

  return {
    animeInfo,
    errorMsg,
    loadingAnimeData,
    loadAllAnimeMetaData,
  };
};

export const useAnimeReviewData = () => {
  const [animeReviews, setAnimeReviews] = useState(null);
  const [animeSentimentList, setAnimeSentimentList] = useState(null);

  const loadAllAnimeReviewData = async (animeName) => {
    try {
      const reviews = await fetchAnimeReviews(animeName);
      setAnimeReviews(reviews.data.Media.reviews);

      const summaries = await fetchReviewSummaries(reviews.data.Media.reviews);
      setAnimeSentimentList(summaries.sentiment_results);
    } catch (err) {
      console.error(err);
    } 
  };

  return {
    animeReviews,
    animeSentimentList,
    loadAllAnimeReviewData
  }
}

import { useState } from "react";
import {
  fetchAnimeMetadata,
  fetchAnimeReviews,
  fetchReviewSummary,
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
    setAnimeReviews(null);
    setAnimeSentimentList(null);

    try {
      const reviews = await fetchAnimeReviews(animeName);
      setAnimeReviews(reviews.data.Media.reviews);

      for(const review of reviews.data.Media.reviews.nodes) {
        const response = await fetchReviewSummary(review);
        const summary = response.summary;

        setAnimeSentimentList((prev) => [
          ...(prev || []),
          {
            "summary": summary
          }
        ]);

        await delay(2000);
      }
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

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

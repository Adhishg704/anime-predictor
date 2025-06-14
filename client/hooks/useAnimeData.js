import { useState } from "react";
import {
  fetchAnimeMetadata,
  fetchAnimeReviews,
  fetchReviewSummaries,
} from "../api/api.js";

export const useAnimeData = () => {
  const [animeInfo, setAnimeInfo] = useState({});
  const [animeReviews, setAnimeReviews] = useState([]);
  const [animeSummaries, setAnimeSummaries] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingAnimeData, setLoadingAnimeData] = useState(false);

  const loadAllAnimeData = async (animeName) => {
    setLoadingAnimeData(true);
    setErrorMsg("");

    try {
      const metadata = await fetchAnimeMetadata(animeName);
      setAnimeInfo(metadata.data.Media);

      const reviews = await fetchAnimeReviews(animeName);
      setAnimeReviews(reviews.data.Media.reviews);

      const summaries = await fetchReviewSummaries(reviews.data.Media.reviews);
      setAnimeSummaries(summaries.summary_list);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setLoadingAnimeData(false);
    }
  };

  return {
    animeInfo,
    animeReviews,
    animeSummaries,
    errorMsg,
    loadingAnimeData,
    loadAllAnimeData,
  };
};

import { useState } from "react";
import {
  fetchAnimeMetadata,
  fetchAnimeReviews,
  fetchReviewSummary,
  fetchReviewKeywords,
  fetchComparisonPercentage
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

      for (const review of reviews.data.Media.reviews.nodes) {
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

  const resetReviewsAndSentimentList = () => {
    setAnimeReviews(null);
    setAnimeSentimentList(null);
  }

  return {
    animeReviews,
    animeSentimentList,
    resetReviewsAndSentimentList,
    loadAllAnimeReviewData
  }
}

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export const useAnimeKeywordsData = () => {
  const [animeKeywords, setAnimeKeywords] = useState([]);

  const loadAllAnimeKeywords = async (animeName) => {
    const response = await fetchReviewKeywords(animeName);
    const tags = response.data.Media.tags;

    for (const tag of tags) {
      if (!tag.isGeneralSpoiler && !tag.isMediaSpoiler) {
        setAnimeKeywords((prev) => [
          ...prev,
          tag.name
        ]);
      }

    }
  };

  const resetKeywords = () => { setAnimeKeywords([]) };

  return {
    animeKeywords,
    resetKeywords,
    loadAllAnimeKeywords
  }
}

export const useAnimeComparisonWithThreeByThree = () => {
  const [comparisonPercentageList, setComparisonPercentageList] = useState([]);

  const loadComparisonData = async (animeName, threeByThreeAnime) => {
    const analyzedKeywordsResponse = await fetchReviewKeywords(animeName);
    const analyzedKeywords = analyzedKeywordsResponse.data.Media.tags.map((tag) => ({"name": tag.name, "rank": tag.rank}));

    for(const anime of threeByThreeAnime) {
      if(anime === "") {
        continue;
      }
      const favoriteAnimeKeywordsResponse = await fetchReviewKeywords(anime);
      const favoriteAnimeKeywords = favoriteAnimeKeywordsResponse.data.Media.tags.map((tag) => ({"name": tag.name, "rank": tag.rank}));

      const comparisonPercentageResponse = await fetchComparisonPercentage(analyzedKeywords, favoriteAnimeKeywords);

      setComparisonPercentageList((prev) => [
        ...prev,
        {
          anime,
          similarity: comparisonPercentageResponse.similarity,
          top_3_tags: comparisonPercentageResponse.top_3_tags
        }
      ]);
    }
  }

  const resetComparisonPercentageList = () => { setComparisonPercentageList([]) };

  return {
    comparisonPercentageList,
    resetComparisonPercentageList,
    loadComparisonData
  }
}

import React from "react";
import AverageScore from "./AnimeInfo/AverageScore";
import Characters from "./AnimeInfo/Characters";
import ScoreDistributionChart from "./AnimeInfo/ScoreDistributionChart";
import GenderPieChart from "./AnimeInfo/CharacterGenderFavouriteChart";
import ReviewsSection from "./AnimeInfo/ReviewsSection";
import KeywordsSection from "./AnimeInfo/KeywordsSection";

export default function AnimeInfo({ animeMetadata, animeReviews, animeSentimentList, animeKeywords, loading }) {
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg text-center">
        <p className="text-lg font-semibold">Loading anime data...</p>
      </div>
    );
  }

  if (!animeMetadata || !animeMetadata.title) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg mt-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        {animeMetadata.title.english}
      </h1>
      <p className="text-center text-gray-400 text-lg">
        Studio:{" "}
        {animeMetadata.studios.edges
          .filter((studio) => studio.node.isAnimationStudio)
          .map((studio) => studio.node.name)
          .join(", ") || "Unknown"}
      </p>

      <AverageScore anime={animeMetadata} />

      <ScoreDistributionChart anime={animeMetadata} />

      <Characters anime={animeMetadata} />

      <GenderPieChart anime={animeMetadata} />

      <KeywordsSection animeKeywords = {animeKeywords} />

      <ReviewsSection animeReviews={animeReviews} animeSentimentList={animeSentimentList} />
    </div>
  );
}

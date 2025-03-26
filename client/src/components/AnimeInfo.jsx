import React from "react";
import AverageScore from "./AnimeInfo/AverageScore";
import Characters from "./AnimeInfo/Characters";
import ScoreDistributionChart from "./AnimeInfo/ScoreDistributionChart";
import GenderPieChart from "./AnimeInfo/CharacterGenderFavouriteChart";

export default function AnimeInfo({ anime, loading }) {
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg text-center">
        <p className="text-lg font-semibold">Loading anime data...</p>
      </div>
    );
  }

  if (!anime || !anime.title) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg mt-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        {anime.title.english}
      </h1>
      <p className="text-center text-gray-400 text-lg">
        Studio:{" "}
        {anime.studios.edges
          .filter((studio) => studio.node.isAnimationStudio)
          .map((studio) => studio.node.name)
          .join(", ") || "Unknown"}
      </p>

      <AverageScore anime={anime} />

      <ScoreDistributionChart anime={anime} />

      <Characters anime={anime} />

      <GenderPieChart anime={anime} />
    </div>
  );
}

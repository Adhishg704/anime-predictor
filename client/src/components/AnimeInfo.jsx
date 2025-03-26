import React from "react";

export default function AnimeInfo({ anime, loading }) {

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg text-center">
        <p className="text-lg font-semibold">Loading anime data...</p>
      </div>
    );
  }

  if (!anime || !anime.title || !anime.title.romaji) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg mt-4">
      <h1 className="text-3xl font-bold text-center mb-4">{anime.title.romaji}</h1>
      <p className="text-center text-gray-400 text-lg">
        Studio: {anime.studios.edges
        .filter((studio) => studio.node.isAnimationStudio)
        .map((studio) => studio.node.name)
        .join(", ") || "Unknown"}
      </p>

      <div className="mt-6 text-center">
        <span className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-lg font-semibold">
          Average Score: {anime.averageScore ?? "N/A"}/100
        </span>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Top Characters</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {anime.characters && anime.characters.edges.length > 0 ? (
            anime.characters.edges
            .slice()
            .sort((a, b) => (b.node.favourites ?? 0) - (a.node.favourites ?? 0))
            .map((char) => (
              <div
                key={char.node.name.full}
                className="bg-gray-800 p-4 rounded-lg text-center shadow-md"
              >
                <img
                  src={char.node.image.medium}
                  alt={char.node.name.full}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-2 border-2 border-indigo-500"
                />
                <h3 className="text-lg font-medium">{char.node.name.full}</h3>
                <p className="text-sm text-gray-400">
                  Favourites: {char.node.favourites ?? 0}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No character data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}


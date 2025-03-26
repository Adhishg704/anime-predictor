import React from "react";

export default function AnimeInfo() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-4">{anime.name}</h1>
      <p className="text-center text-gray-400 text-lg">
        Studio: {anime.studio}
      </p>

      <div className="mt-6 text-center">
        <span className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-lg font-semibold">
          Average Score: {anime.averageScore}/100
        </span>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Top Characters</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {anime.characters.map((char) => (
            <div
              key={char.id}
              className="bg-gray-800 p-4 rounded-lg text-center shadow-md"
            >
              <img
                src={char.image}
                alt={char.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-2 border-2 border-indigo-500"
              />
              <h3 className="text-lg font-medium">{char.name}</h3>
              <p className="text-sm text-gray-400">
                Favourites: {char.favourites}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

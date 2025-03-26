import React from "react";

export default function AverageScore({ anime }) {
  return (
    <div className="mt-6 text-center mb-6">
      <span className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-lg font-semibold">
        Average Score: {anime.averageScore ?? "N/A"}/100
      </span>
    </div>
  );
}

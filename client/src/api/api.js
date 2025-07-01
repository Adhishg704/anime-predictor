export const fetchAnimeMetadata = async (animeName) => {
  const response = await fetch("http://127.0.0.1:8000/api/getAnimeMetadata/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ anime: animeName }),
  });

  if (!response.ok) throw new Error("Failed to fetch anime metadata");
  return await response.json();
};

export const fetchAnimeReviews = async (animeName) => {
  const response = await fetch("http://127.0.0.1:8000/api/getAnimeReviews/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ anime: animeName }),
  });

  if (!response.ok) throw new Error("Failed to fetch anime reviews");
  return await response.json();
}; 

export const fetchReviewSummary = async (review) => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/getReviewSentiment/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    }
  );

  if (!response.ok) throw new Error("Failed to fetch review summary");
  return await response.json();
};

export const fetchReviewKeywords = async (animeName) => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/getReviewKeywords/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({anime: animeName}),
    }
  );

  if (!response.ok) throw new Error("Failed to fetch review keywords");
  return await response.json();
};

export const fetchAutoCompleteSuggestions = async (animeName) => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/getClosestAnime/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({anime: animeName}),
    }
  );

  if (!response.ok) throw new Error("Failed to fetch autocomplete suggestions");
  return await response.json();
};

export const fetchComparisonPercentage = async (analyzedKeywords, favoriteAnimeKeywords) => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/getSimilarityScore/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({analyzed_anime_tags: analyzedKeywords, favorite_anime_tags: favoriteAnimeKeywords}),
    }
  );

  if (!response.ok) throw new Error("Failed to fetch comparison percentage");
  return await response.json();
};

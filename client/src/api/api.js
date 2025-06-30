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

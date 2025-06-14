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

export const fetchReviewSummaries = async (reviews) => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/getReviewsSentiment/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviews),
    }
  );

  if (!response.ok) throw new Error("Failed to fetch review summaries");
  return await response.json();
};

import React, { useState} from "react";

export default function Recommend() {
  const [animeName, setAnimeName] = useState("");
  const [anilistURL, setAnilistURL] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewTitles, setReviewTitles] = useState([]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setAnilistURL("");
      setReviewTitles([]);
      setErrorMsg("");

      const response = await fetch("http://localhost:8000/get-anilist-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          anime_title: animeName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(errorData.error || "Unable to get response");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setAnilistURL(data.anilist_url || "No URL found");
      getReviews(data.anilist_url);
    } catch (error) {
      setErrorMsg("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getReviews = async (url) => {
    try {
      setLoadingReviews(true);
      setErrorMsg("");
      const anilistReviewsURL = url + "/reviews";

      const response = await fetch(
        "http://localhost:3000/api/v1/scrape/get-review-titles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reviewsLink: anilistReviewsURL }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(errorData.error || "Unable to get response");
        setLoadingReviews(false);
        return;
      }

      const data = await response.json();
      setReviewTitles(data.reviewTitles || []);
    } catch (error) {
      setErrorMsg("An error occurred: " + error.message);
    } finally {
      setLoadingReviews(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-700">
      <div className="flex-grow bg-slate-600 p-5 font-mono">
        {loading && <div className="text-white">Loading...</div>}
        {errorMsg && <div className="text-red-500">{errorMsg}</div>}
        {anilistURL && (
          <div className="text-yellow-100">
            <p>Anilist URL:</p>
            <a href={anilistURL} target="_blank" rel="noopener noreferrer">
              {anilistURL}
            </a>
          </div>
        )}
        {loadingReviews && <div className="text-white">Loading reviews...</div>}
        {reviewTitles.length > 0 && (
          <div>
            <h3 className="text-white pt-3">Review Titles:</h3>
            {reviewTitles.map((reviewTitle, index) => (
              <div key={index} className="text-yellow-500 pt-3">
                {reviewTitle}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 flex items-center justify-between bg-slate-800">
        <h3 className="text-gray-500 text-3xl font-mono">
          Enter anime to be analyzed
        </h3>
        <textarea
          type="text"
          className="bg-slate-700 font-mono text-white text-2xl p-3 border-none outline-none w-full rounded-full"
          placeholder="Enter your prompt..."
          value={animeName}
          onChange={(e) => setAnimeName(e.target.value)}
        />
        <button
          className="bg-slate-700 font-mono text-white text-2xl p-4 rounded-full hover:bg-slate-600 transition duration-200 ml-5"
          onClick={handleSubmit}
        >
          Analyze
        </button>
      </div>
    </div>
  );
}

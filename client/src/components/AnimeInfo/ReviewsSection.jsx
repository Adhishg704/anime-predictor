import React from 'react'

export default function ReviewsSection({ animeReviews, animeSummaries }) {

    return (
        <div>
            {animeReviews.map((review, index) => (
                <div key={index} className="p-4 bg-slate-700 rounded-xl mb-4 shadow-md">
                    <h3 className="text-lg font-bold text-white">{review.summary || "Untitled Review"}</h3>
                    <p className="text-sm text-gray-300 mt-1">Score: {review.score}</p>
                    <p className="text-sm text-gray-300 mt-1">Likes: {review.rating}</p>
                    <p className="text-white mt-2">{animeSummaries[index]}</p>
                </div>
            ))}
        </div>
    )
}

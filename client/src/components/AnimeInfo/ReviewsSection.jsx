export default function ReviewsSection({ animeReviews, animeSentimentList }) {

    if (!animeReviews || !animeSentimentList) {
        return (
            <div className="p-4 bg-slate-800 rounded-xl mb-4 shadow-md animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-700 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-slate-700 rounded w-1/4 mb-1"></div>
                <div className="h-3 bg-slate-700 rounded w-1/4"></div>
                <div className="h-6 bg-slate-700 rounded w-full mt-2"></div>
                <div className="h-6 bg-slate-700 rounded w-5/6 mt-2"></div>
            </div>
        )
    }

    return (
        <div>
            {animeSentimentList
                .map((sentiment, index) => ({
                    sentiment,
                    review: animeReviews.nodes[index]
                }))
                .filter(({ sentiment }) => sentiment.summary !== "Summary failed.")
                .map(({ sentiment, review }, index) => (
                    <div key={index} className="p-4 bg-slate-700 rounded-xl mb-4 shadow-md">
                        <h3 className="text-lg font-bold text-white">
                            {review.summary}
                        </h3>
                        <p className="text-sm text-gray-300 mt-1">Score: {review.score}</p>
                        <p className="text-sm text-gray-300 mt-1">Likes: {review.rating}</p>
                        <p className="text-white mt-2">{sentiment.summary}</p>
                    </div>
                ))}
        </div>
    )
}

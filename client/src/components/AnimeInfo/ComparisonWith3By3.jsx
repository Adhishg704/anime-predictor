export default function ComparisonWith3By3({ animeName, comparisonPercentageList }) {
  if (!comparisonPercentageList || comparisonPercentageList.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        3x3 anime list not entered or comparison data unavailable.
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl mt-6 shadow-lg border border-slate-600 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Similarity to <span className="text-blue-600">{animeName}</span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {comparisonPercentageList.map((entry, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <h3 className="text-lg font-medium mb-2">{entry.anime}</h3>
            <p className="text-white">
              Similarity: <span className="font-bold text-green-600">{entry.similarity?.toFixed(2)}%</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

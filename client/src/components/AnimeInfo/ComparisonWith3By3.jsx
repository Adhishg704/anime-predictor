import React, { useState } from 'react';

const getSimilaritySlab = (percentage) => {
  if (percentage <= 20) {
    return { label: 'Low Similarity', color: 'text-red-500', bgColor: 'bg-red-900/20', borderColor: 'border-red-700' };
  }
  else if (percentage < 50) {
    return { label: 'Moderate Similarity', color: 'text-yellow-500', bgColor: 'bg-yellow-900/20', borderColor: 'border-yellow-700' };
  }
  else {
    return { label: 'High Similarity', color: 'text-green-500', bgColor: 'bg-green-900/20', borderColor: 'border-green-700' };
  }
}


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
        {comparisonPercentageList.map((entry, index) => {
          const { label, color, bgColor, borderColor } = getSimilaritySlab(entry.similarity)

          return (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ${bgColor} ${borderColor} border`}
            >
              <h3 className="text-lg font-medium mb-2">{entry.anime}</h3>
              <p className="text-white">
                Similarity: <span className={`font-bold ${color}`}>{entry.similarity?.toFixed(2)}%</span>
                <span className={`ml-2 text-xs ${color}`}>({label})</span>
              </p>
              <TopTagsSection similarityLabel={label} topTags={entry.top_3_tags} />
            </div>
          );
        })}
      </div>
    </div>
  );
}


function TopTagsSection({ similarityLabel, topTags }) {
  const [isOpen, setIsOpen] = useState(false);

  const getTagExplanation = (label) => {
    switch (label) {
      case 'High Similarity':
        return "These tags are highly prominent in both anime profiles, indicating a strong connection.";
      case 'Moderate Similarity':
        return "These tags highlight notable common themes found in both anime profiles.";
      case 'Low Similarity':
        return "While overall similarity is limited, these tags represent the common ground identified.";
      default:
        return "These are the key contributing tags.";
    }
  };

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-sm text-blue-400 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {isOpen ? 'Hide Details ▲' : 'Show Shared Tags ▼'}
      </button>

      {isOpen && (
        <div className="mt-2 text-xs text-gray-300">
          <p className="mb-2">{getTagExplanation(similarityLabel)}</p>
          {topTags && topTags.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {topTags.map((tag, idx) => (
                <li key={idx} className="text-gray-200">
                  {tag}
                </li>
              ))}
            </ul>
          ) : (
            <p className="italic text-gray-400">No significant shared tags found.</p>
          )}
        </div>
      )}
    </div>
  );
}
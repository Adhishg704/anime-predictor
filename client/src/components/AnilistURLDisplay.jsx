import React from 'react'

export default function AnilistURLDisplay({ anilistURL }) {
    if (!anilistURL) return null;
    return (
      <div className="text-yellow-200 mt-4 text-center">
        <p>Anilist URL:</p>
        <a
          href={anilistURL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400 hover:text-blue-300"
        >
          {anilistURL}
        </a>
      </div>
    );
}

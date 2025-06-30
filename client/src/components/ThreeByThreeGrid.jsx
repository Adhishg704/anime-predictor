import { useState } from 'react';
import AutoCompleteInput from './AutoCompleteInput';

export default function ThreeByThreeGrid({ animeGrid, setAnimeGrid }) {
    const handleChange = (index, value) => {
        const newAnimeGrid = [...animeGrid];
        newAnimeGrid[index] = value;
        setAnimeGrid(newAnimeGrid);
    }

    return (
        <div className="p-4 font-mono">
            <h2 className="text-2xl font-bold text-center text-white mb-4">3 by 3 Anime Grid</h2>
            <div className="grid grid-cols-3 gap-2 p-5">
                {animeGrid.map((val, index) => (
                    <AutoCompleteInput
                        key={index}
                        value={val}
                        onChange={(val) => handleChange(index, val)}
                    />
                ))}
            </div>
        </div>
    );
}

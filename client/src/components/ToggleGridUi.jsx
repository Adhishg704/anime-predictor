import {useState} from 'react';
import ThreeByThreeGrid from './ThreeByThreeGrid';

export default function ToggleGridUi({ animeGrid, setAnimeGrid }) {
    const [showGrid, setshowGrid] = useState(false);

    return (
        <div className="px-6 pb-4">
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setshowGrid(!showGrid)}
            >
                {showGrid ? "Hide 3x3 Input" : "Enter 3x3 Anime Grid"}
            </button>

            {showGrid && (
                <ThreeByThreeGrid animeGrid = {animeGrid} setAnimeGrid={setAnimeGrid} />
            )}
        </div>

    )
}

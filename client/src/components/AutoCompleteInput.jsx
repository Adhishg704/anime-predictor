import { useState, useEffect } from "react";
import { fetchAutoCompleteSuggestions } from "../api/api.js";

export default function AutoCompleteInput({ value, onChange }) {
    const [query, setQuery] = useState(value || "");
    const [suggestions, setSuggestions] = useState([]);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        const controller = new AbortController();
        const debounceTimer = setTimeout(async () => {
            try {
                const data = await fetchAutoCompleteSuggestions(query, controller.signal);
                const closestAnime = data?.data?.Page?.media.map(anime => anime.title.english) || [];
                setSuggestions(closestAnime);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Autocomplete fetch error:", err);
                }
            }
        }, 300);

        return () => {
            clearTimeout(debounceTimer);
            controller.abort();
        };
    }, [query]);

    const handleSelect = (name) => {
        setQuery(name);
        setSuggestions([]);
        onChange(name);
    };

    return (
        <div className="relative w-full">
            <input
                className="p-2 rounded bg-slate-700 text-white border border-slate-600 w-full"
                type="text"
                placeholder="Start typing..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(true);
                }}
                onFocus={() => setActive(true)}
                onBlur={() => setTimeout(() => setActive(false), 150)}
            />
            {active && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white text-black border border-slate-300 rounded max-h-40 overflow-y-auto">
                    {suggestions.map((title, i) => (
                        <li
                            key={i}
                            className="px-2 py-1 hover:bg-slate-200 cursor-pointer"
                            onClick={() => handleSelect(title)}
                        >
                            {title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query.trim())}`);
            setQuery("");
        }
    };

    return (
        <div className="relative w-full sm:w-80">
            <div className="flex items-center bg-white/5 backdrop-blur-lg border border-white/10 hover:border-pink-400/40 transition-all rounded-full px-4 py-2 shadow-lg">
                <Search size={18} className="text-pink-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search posts, users..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-transparent text-gray-100 placeholder-gray-500 text-sm focus:outline-none flex-1"
                />
            </div>

            {/* Glow Animation on Focus */}
            <div className="absolute -inset-[1px] rounded-full blur-md bg-gradient-to-r from-pink-500/30 to-purple-500/30 opacity-0 focus-within:opacity-100 transition-all pointer-events-none" />
        </div>
    );
};

export default SearchBar;

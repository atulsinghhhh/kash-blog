import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && query.trim()) {
        // Decide route: e.g., /search?query=xyz
        navigate(`/search?query=${encodeURIComponent(query.trim())}`);
        setQuery(""); // clear input
        }
    };

    return (
        <div className="flex items-center bg-gray-800 rounded-full px-3 py-1 w-full sm:w-auto">
        <Search size={18} className="text-gray-400 mr-2" />
        <input
            type="text"
            placeholder="Search posts, users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-transparent focus:outline-none text-sm flex-1"
        />
        </div>
    );
};

export default SearchBar;

import React from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    const suggestedSites = [
        { name: "Google", url: "https://www.google.com" },
        { name: "YouTube", url: "https://www.youtube.com" },
        { name: "GitHub", url: "https://www.github.com" },
        { name: "Twitter (X)", url: "https://x.com" },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white px-6">
        <h1 className="text-7xl font-extrabold mb-4 text-pink-500 animate-pulse">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found 😔</h2>
        <p className="text-gray-400 mb-8 text-center max-w-lg">
            It looks like the page you’re looking for doesn’t exist.  
            Maybe try visiting one of these websites instead 👇
        </p>

        <div className="grid grid-cols-2 gap-3 mb-10">
            {suggestedSites.map((site) => (
            <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition px-4 py-3 rounded-lg shadow-lg"
            >
                <span>{site.name}</span>
                <ExternalLink size={18} />
            </a>
            ))}
        </div>

        <div className="flex gap-3">
            <button
                onClick={() => navigate("/")}
                className="bg-pink-600 hover:bg-pink-700 px-5 py-2 rounded-lg font-semibold"
                >
                Go to Home
            </button>
            <button
                onClick={() => navigate(-1)}
                className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg font-semibold"
                >
                Go Back
            </button>
        </div>
        </div>
    );
};

export default NotFound;

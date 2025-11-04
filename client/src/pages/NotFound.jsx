import React from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  const suggestedSites = [
    { name: "Google", url: "https://www.google.com" },
    { name: "YouTube", url: "https://www.youtube.com" },
    { name: "GitHub", url: "https://github.com" },
    { name: "Twitter (X)", url: "https://x.com" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0f10] via-gray-950 to-black text-gray-100 px-6">
      {/* 404 Heading */}
      <h1 className="text-8xl font-extrabold mb-4 text-pink-500 drop-shadow-[0_0_15px_rgba(232,121,249,0.6)]">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found 😔</h2>
      <p className="text-gray-400 mb-8 text-center max-w-lg">
        It seems the page you’re looking for doesn’t exist.  
        Try one of these popular sites or head back home 👇
      </p>

      {/* Suggested Links */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10 w-full max-w-md">
        {suggestedSites.map((site) => (
          <a
            key={site.name}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-white/5 hover:bg-pink-500/10 border border-white/10 transition-all px-5 py-3 rounded-xl shadow-md backdrop-blur-lg"
          >
            <span className="font-medium">{site.name}</span>
            <ExternalLink size={18} className="text-pink-400" />
          </a>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 px-6 py-2 rounded-lg font-semibold text-white transition-all"
        >
          Go Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg font-semibold text-gray-200 transition-all"
        >
          Go Back
        </button>
      </div>

      {/* Decorative glow */}
      <div className="absolute -z-10 w-[600px] h-[600px] bg-pink-500/10 blur-3xl rounded-full top-20"></div>
    </div>
  );
};

export default NotFound;

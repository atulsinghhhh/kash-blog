import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataProvider } from "../context/AuthContext";
import PostCard from "../compoents/PostCard";

function SearchPage() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(search);
    const query = params.get("query");

    const { serverUrl, user } = useContext(authDataProvider);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const doSearch = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/search?query=${query}`, {
            withCredentials: true,
            });
            setPosts(res.data.posts || []);
            setUsers(res.data.users || []);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setLoading(false);
        }
        };
        if (query) doSearch();
    }, [query, serverUrl]);

    // Fetch following list for current user
    useEffect(() => {
        const fetchFollowing = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/auth/follow-stats/${user._id}`, {
            withCredentials: true,
            });
            setFollowing(res.data.following.map((f) => f._id));
        } catch (error) {
            console.error("Failed to load following list", error);
        }
        };
        if (user?._id) fetchFollowing();
    }, [serverUrl, user]);

    // Handle Follow / Unfollow
    const toggleFollow = async (targetUserId) => {
        try {
        const res = await axios.post(
            `${serverUrl}/api/auth/toggle-follow/${targetUserId}`,
            {},
            { withCredentials: true }
        );
        if (res.data.following) {
            // add to following
            setFollowing((prev) => [...prev, targetUserId]);
        } else {
            // remove from following
            setFollowing((prev) => prev.filter((id) => id !== targetUserId));
        }
        } catch (err) {
        console.error("Failed to toggle follow", err);
        }
    };

    if (loading)
        return (
        <div className="min-h-screen bg-[#0f0f10] text-gray-400 flex items-center justify-center">
            Searching...
        </div>
        );

    return (
        <div className="min-h-screen bg-[#0f0f10] text-gray-100 px-4 py-10">
            <div className="max-w-5xl mx-auto space-y-8">
                <h2 className="text-3xl font-serif font-semibold text-pink-400">
                Results for “{query}”
                </h2>

                {/* Users Section */}
                {users.length > 0 && (
                <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-semibold text-pink-400 mb-3">Users</h3>
                    <ul className="space-y-3">
                    {users.map((u) => (
                        <li
                        key={u._id}
                        className="flex items-center justify-between bg-white/5 hover:bg-white/10 transition-all p-3 rounded-xl"
                        >
                        <div
                            onClick={() => navigate(`/profile/${u._id}`)}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <img
                            src={u.avatar}
                            alt={u.username}
                            className="w-10 h-10 rounded-full object-cover border border-white/20"
                            />
                            <div>
                            <p className="text-gray-200 font-medium">
                                {u.name || "Unnamed"}{" "}
                                <span className="text-gray-500 text-sm">
                                @{u.username}
                                </span>
                            </p>
                            <p className="text-gray-500 text-xs">
                                {u.bios || "No bio yet."}
                            </p>
                            </div>
                        </div>

                        {/* Follow Button */}
                        {user && user._id !== u._id && (
                            <button
                            onClick={() => toggleFollow(u._id)}
                            className={`px-3 py-1 text-sm rounded-lg font-medium transition-all ${
                                following.includes(u._id)
                                ? "bg-white/10 border border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white"
                                : "bg-pink-500 hover:bg-pink-600 text-white"
                            }`}
                            >
                            {following.includes(u._id) ? "Following" : "Follow"}
                            </button>
                        )}
                        </li>
                    ))}
                    </ul>
                </div>
                )}

                {/* Posts Section */}
                {posts.length > 0 && (
                <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-semibold text-pink-400 mb-3">
                    📝 Posts
                    </h3>
                    <div className="space-y-4">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                    </div>
                </div>
                )}

                {/* No Results */}
                {users.length === 0 && posts.length === 0 && (
                    <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl text-center text-gray-500">
                        <p className="text-lg">No results found for “{query}”.</p>
                        <p className="text-sm text-gray-400 mt-2">
                        Try searching with different keywords.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;

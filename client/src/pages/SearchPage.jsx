import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { authDataProvider } from "../context/AuthContext";
import PostCard from "../compoents/PostCard";

function SearchPage() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const query = params.get("query");

    const { serverUrl } = useContext(authDataProvider);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const doSearch = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/search?query=${query}`, { withCredentials: true });
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

    if (loading) return <div className="p-4 text-center text-gray-500">Searching...</div>;

    return (
        <div className="max-w-5xl mx-auto mt-6 px-4 space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">Results for "{query}"</h2>

        {users.length > 0 && (
            <div>
            <h3 className="font-semibold mb-2">Users</h3>
            <ul className="space-y-1">
                {users.map(user => (
                <li key={user._id} className="text-gray-700">@{user.username}</li>
                ))}
            </ul>
            </div>
        )}

        {posts.length > 0 && (
            <div>
            <h3 className="font-semibold mb-2">Posts</h3>
            <div className="space-y-4">
                {posts.map(post => (
                <PostCard key={post._id} post={post} />
                ))}
            </div>
            </div>
        )}

        {users.length === 0 && posts.length === 0 && (
            <div className="text-gray-500">No results found.</div>
        )}
        </div>
    );
}

export default SearchPage;

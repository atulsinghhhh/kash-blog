import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { authDataProvider } from "../context/AuthContext";

const Slidebar = () => {
    const { serverUrl } = useContext(authDataProvider);
    const [tags, setTags] = useState([]);
    const [authors, setAuthors] = useState([]);


    const fetchTags = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/post/tags?limit=10`);
            setTags(response.data.tags);
        } catch (error) {
            console.error("Failed to fetch tags:", error);
        }
    };


    const fetchAuthors = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/post/top-authors`);
            setAuthors(response.data.authors);
        } catch (error) {
            console.error("Failed to fetch authors:", error);
        }
    };

    useEffect(() => {
        fetchTags();
        fetchAuthors();
    }, []);

    return (
        <aside className="bg-gray-100 rounded-xl p-4 space-y-6">
            <div>
                <h3 className="text-gray-700 font-semibold mb-2">Trending Tags</h3>
                <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                    key={tag}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                    #{tag}
                    </span>
                ))}
                </div>
            </div>
            <div>
                <h3 className="text-gray-700 font-semibold mb-2">Top Authors</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                {authors.map((author) => (
                    <li key={author.username} className="flex items-center gap-2">
                    <img
                        src={author.avatar}
                        alt="avatar"
                        className="w-6 h-6 rounded-full"
                    />
                    @{author.username}
                    </li>
                ))}
                </ul>
            </div>
        </aside>
    );
};

export default Slidebar;
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authDataProvider } from "../context/AuthContext";
import axios from "axios";

const UpdatePost = () => {
    const { id } = useParams();
    const { serverUrl } = useContext(authDataProvider);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = useState("blog");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/post/user/${id}`, {
                withCredentials: true,
            });
            const post = response.data.post;
            setTitle(post.title);
            setContent(post.content);
            setType(post.type);
            setTags(post.tags || []);
        } catch (error) {
            console.error("Failed to load post:", error);
        }
        };
        fetchPost();
    }, [id, serverUrl]);

    const addTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput("");
        }
    };

    const removeTag = (tag) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${serverUrl}/api/post/${id}`,
                {
                    title,
                    content,
                    type,
                    tags,
                },
                { withCredentials: true }
            );
            alert("Post updated!");
            navigate("/profile");
        } catch (error) {
            console.error("Failed to update post:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f10] flex justify-center items-start py-10 px-4 text-gray-100">
            <div className="w-full max-w-3xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-serif font-semibold text-pink-400 mb-6">
                    Update Post
                </h1>

                <form onSubmit={handleUpdate} className="space-y-6">
                {/* Title */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Write your title..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                />

                {/* Content */}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your content here..."
                    rows="8"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                ></textarea>

                {/* Type Selector */}
                <div>
                    <label className="text-sm text-gray-400 mb-1 block">Post Type</label>
                    <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                    >
                        <option value="blog">Blog</option>
                        <option value="poetry">Poetry</option>
                        <option value="code">Code</option>
                        <option value="activity">Activity</option>
                    </select>
                </div>

                {/* Tag Input */}
                <div>
                    <label className="text-sm text-gray-400 mb-1 block">Tags</label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            placeholder="Add a tag"
                            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                        />
                        <button
                            type="button"
                            onClick={addTag}
                            className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg text-white font-medium transition"
                        >
                            Add
                        </button>
                    </div>

                    {/* Tags List */}
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                            key={tag}
                            onClick={() => removeTag(tag)}
                            className="bg-white/10 hover:bg-pink-500/30 border border-white/20 text-gray-300 hover:text-white px-3 py-1 rounded-full text-sm cursor-pointer transition"
                            >
                            #{tag} ✕
                            </span>
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-gray-400 hover:text-gray-200 transition"
                        >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-600 px-5 py-2 rounded-lg text-white font-medium transition"
                        >
                        Update Post
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePost;

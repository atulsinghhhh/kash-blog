import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authDataProvider } from "../context/AuthContext";
import axios from "axios";
import { ThumbsUp, SendHorizonal } from "lucide-react";

const Post = () => {
    const { id } = useParams();
    const { serverUrl, user } = useContext(authDataProvider);

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [isLiking, setIsLiking] = useState(false);

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [serverUrl, id]);

    const fetchPost = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/post/${id}`, {
                withCredentials: true,
            });
            setPost(response.data.post);
        } catch (error) {
            console.error("Failed to fetch post:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/comment/post/${id}`, {
                withCredentials: true,
            });
            setComments(res.data.comments || []);
        } catch (err) {
            console.error("Failed to fetch comments", err);
        }
    };

    const handleToggleLike = async () => {
        try {
            setIsLiking(true);
            await axios.put(`${serverUrl}/api/post/like/${id}`, {}, {
                withCredentials: true
            });
            fetchPost();
        } catch (error) {
            console.error("Failed to toggle like:", error);
        } finally {
            setIsLiking(false);
        }
    };

    const handleAddComment = async () => {
        if (!comment.trim()) return;
        try {
            await axios.post(`${serverUrl}/api/comment/add`, {
                content: comment,
                postId: post._id
            }, { withCredentials: true });
            setComment("");
            fetchComments(); // Refresh comments
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    if (loading || !post) {
        return <div className="p-4 text-center text-gray-500">Loading post...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-6 p-4 border rounded shadow bg-white">
            <h1 className="text-3xl font-bold mb-4 text-gray-700">{post.title}</h1>

            <div className="text-sm text-gray-500 mb-3">
                <span>Type: <strong>{post.type}</strong></span>
                <span className="ml-4">Author: <strong>{post.author?.username || "Unknown"}</strong></span>
            </div>

            <div className="text-gray-800 whitespace-pre-wrap mb-4">{post.content}</div>

            {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Likes Section */}
            <div className="mt-6 flex items-center gap-3">
                <button
                    onClick={handleToggleLike}
                    disabled={isLiking}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                    <ThumbsUp size={18} />
                    <span>{post.likes?.length || 0} Like{post.likes?.length !== 1 ? "s" : ""}</span>
                </button>
            </div>

            {/* Comments Section */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Comments ({comments.length})</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                    {comments.map((c, index) => (
                        <div key={index} className="border p-2 rounded bg-gray-50">
                            <div className="text-sm text-gray-600">@{c.author?.username || "Anonymous"}:</div>
                            <div className="text-gray-800">{c.content}</div>
                        </div>
                    ))}
                </div>

                {/* Add Comment */}
                <div className="mt-4 flex items-center gap-2">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 border px-3 py-2 rounded text-sm"
                    />
                    <button
                        onClick={handleAddComment}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        <SendHorizonal size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;

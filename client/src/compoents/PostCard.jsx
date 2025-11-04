import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authDataProvider } from "../context/AuthContext";
import axios from "axios";
import { MessageCircle, Heart } from "lucide-react";

const PostCard = ({ post }) => {
    const author = post.author || {};
    const { serverUrl, user } = useContext(authDataProvider);
    const navigate = useNavigate();

    const [isFollowing, setIsFollowing] = useState(false);
    const [likes, setLikes] = useState(post.likes?.length || 0);
    const [likedByUser, setLikedByUser] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

  // Fetch follow status
    useEffect(() => {
        const checkFollow = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/auth/follow-stats/${author._id}`, {
                withCredentials: true,
                });
                const followers = res.data.followers || [];
                setIsFollowing(followers.some((f) => f._id === user._id));
            } catch (error) {
                console.log(error);
            }
        };
        if (user && user._id !== author._id) checkFollow();
    }, [user, author]);

  // Follow/unfollow logic
    const handleFollowToggle = async () => {
        try {
            const res = await axios.put(`${serverUrl}/api/auth/follow/${author._id}`, {}, { withCredentials: true });
            setIsFollowing(res.data.isFollowing);
        } catch (error) {
            console.log("follow error", error);
        }
    };

  // Like/unlike logic
    useEffect(() => {
        if (user && post.likes) {
            setLikedByUser(post.likes.includes(user._id));
        }
    }, [post.likes, user]);

    const handleToggleLike = async () => {
        try {
            const res = await axios.put(`${serverUrl}/api/post/like/${post._id}`, {}, { withCredentials: true });
            setLikes(res.data.likes);
            setLikedByUser(!likedByUser);
        } catch (error) {
            console.error("Failed to like/unlike post", error);
        }
    };

  // Comments
    const fetchComments = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/comment/post/${post._id}`, {
                withCredentials: true,
            });
            setComments(res.data.comments || []);
        } catch (error) {
            console.error("Failed to fetch comments", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [post._id]);

    const handleCommentSubmit = async () => {
        try {
            if (!commentText.trim()) return;
            await axios.post(
                `${serverUrl}/api/comment/add`,
                { content: commentText, postId: post._id },
                { withCredentials: true }
            );
            setCommentText("");
            fetchComments();
        } catch (error) {
            console.error("Failed to add comment", error);
        }
    };

  // Navigate to user profile
    const openUserProfile = () => {
        navigate(`/user/${author._id}`);
    };

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg hover:bg-white/10 transition-all duration-300">
        {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div
                    onClick={openUserProfile}
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    <img
                        src={author.avatar}
                        alt={author.username}
                        className="w-8 h-8 rounded-full object-cover border border-white/20"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-pink-400 transition">
                        @{author.username}
                    </span>
                </div>

                {user && user._id !== author._id && (
                <button
                    onClick={handleFollowToggle}
                    className={`text-xs px-3 py-1 rounded-lg transition-all ${
                    isFollowing
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        : "bg-pink-500 text-white hover:bg-pink-600"
                    }`}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>
                )}
            </div>

        {/* Post Content */}
            <Link to={`/post/${post._id}`}>
                <h2 className="text-lg font-serif font-semibold text-white mb-2 hover:text-pink-400 transition">
                    {post.title}
                </h2>
            </Link>

            <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                {post.content.slice(0, 160)}...
            </p>

            <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
            </p>

        {/* Reactions */}
            <div className="flex gap-6 mt-4 items-center">
                <button onClick={handleToggleLike} className="flex items-center gap-1 text-gray-200 hover:text-red-400 transition">
                    <Heart
                        fill={likedByUser ? "red" : "none"}
                        className="w-5 h-5 transition-all duration-200"
                    />
                    <span>{likes}</span>
                </button>
                <div className="flex items-center gap-1 text-gray-300">
                    <MessageCircle className="w-5 h-5" />
                    <span>{comments.length}</span>
                </div>
            </div>

        {/* Comment Section */}
            <div className="mt-4">
                <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 text-gray-100 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                />
                <button
                    onClick={handleCommentSubmit}
                    className="mt-2 px-4 py-1 text-sm bg-pink-500 hover:bg-pink-600 text-white rounded-lg"
                >
                    Comment
                </button>
            </div>

        {/* Comments Display */}
            <div className="mt-4 max-h-32 overflow-y-auto space-y-2 text-sm text-gray-300">
                {comments.map((comment) => (
                <div key={comment._id} className="bg-white/5 p-2 rounded-lg">
                    <span
                        onClick={() => navigate(`/user/${comment.author._id}`)}
                        className="text-pink-400 cursor-pointer hover:underline mr-1"
                    >
                        @{comment.author.username}
                    </span>
                        {comment.content}
                </div>
                ))}
            </div>
        </div>
    );
};

export default PostCard;

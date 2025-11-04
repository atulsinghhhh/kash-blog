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
      await axios.put(`${serverUrl}/api/post/like/${id}`, {}, { withCredentials: true });
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
      await axios.post(
        `${serverUrl}/api/comment/add`,
        { content: comment, postId: post._id },
        { withCredentials: true }
      );
      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  if (loading || !post) {
    return (
      <div className="min-h-screen bg-[#0f0f10] text-gray-400 flex items-center justify-center">
        Loading post...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f10] text-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
        {/* Post Title */}
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-pink-400 mb-4">
          {post.title}
        </h1>

        {/* Meta info */}
        <div className="text-sm text-gray-400 mb-5">
          <span>📝 Type: <span className="text-gray-300 font-medium">{post.type}</span></span>
          <span className="ml-6">👤 Author: 
            <span className="text-gray-300 font-medium ml-1">
              @{post.author?.username || "Unknown"}
            </span>
          </span>
        </div>

        {/* Post Content */}
        <div className="text-gray-200 leading-relaxed whitespace-pre-wrap border-l-2 border-pink-500/40 pl-4 mb-6">
          {post.content}
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-white/10 text-pink-400 px-3 py-1 rounded-full text-sm hover:bg-pink-500/20 transition-all"
              >
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
            className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-all"
          >
            <ThumbsUp size={20} />
            <span className="font-medium">
              {post.likes?.length || 0} Like{post.likes?.length !== 1 ? "s" : ""}
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-8" />

        {/* Comments Section */}
        <div>
          <h3 className="text-xl font-semibold text-pink-400 mb-3">
            Comments ({comments.length})
          </h3>

          {/* Comment List */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {comments.length > 0 ? (
              comments.map((c, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-3"
                >
                  <div className="text-sm text-pink-400">
                    @{c.author?.username || "Anonymous"}
                  </div>
                  <div className="text-gray-200">{c.content}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}
          </div>

          {/* Add Comment */}
          <div className="mt-5 flex items-center gap-3">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-white/10 border border-white/20 px-3 py-2 rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            />
            <button
              onClick={handleAddComment}
              className="bg-pink-500 hover:bg-pink-600 transition p-2 rounded-lg text-white"
            >
              <SendHorizonal size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

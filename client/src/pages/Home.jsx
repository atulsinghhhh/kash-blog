import React, { useContext, useEffect, useState } from "react";
import PostCard from "../compoents/PostCard";
import Slidebar from "../compoents/Slidebar";
import axios from "axios";
import { authDataProvider } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const { serverUrl } = useContext(authDataProvider);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/post/`, {
          withCredentials: true,
        });
        setPosts(Array.isArray(response.data.posts) ? response.data.posts : []);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]);
      }
    };

    const fetchAllTags = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/post/tags`, {
          withCredentials: true,
        });
        setTags(Array.isArray(response.data.tags) ? response.data.tags : []);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
        setTags([]);
      }
    };

    fetchAllPosts();
    fetchAllTags();
  }, [serverUrl]);

  return (
    <div className="min-h-screen bg-[#0f0f10] text-gray-100">
      <div className="max-w-6xl mx-auto mt-10 px-4 grid md:grid-cols-3 gap-8">
        {/* Left / Main Section */}
        <div className="md:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-serif font-semibold text-pink-400">
              Latest Posts
            </h2>
            {/* <Link
              to="/create-post"
              className="bg-pink-500 hover:bg-pink-600 transition px-4 py-2 rounded-lg text-sm text-white shadow-lg"
            >
              Write Post
            </Link> */}
          </div>

          {/* Posts Section */}
          {posts && posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No posts available yet.
            </p>
          )}

          {/* Discover Topics Section */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-pink-400 mb-3">
              Discover Topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags && tags.length > 0 ? (
                tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/10 hover:bg-pink-500/20 text-gray-300 hover:text-pink-400 transition px-3 py-1 rounded-full text-sm cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No topics available</span>
              )}
            </div>
          </div>

          {/* Share Prompt Card */}
          <div className="bg-gradient-to-r from-pink-500/20 to-pink-700/10 border border-pink-400/30 rounded-2xl p-6 text-center shadow-lg">
            <p className="text-gray-300 mb-3 font-medium">
              Have something to share with the world?
            </p>
            <Link to="/create-post">
              <button className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-lg text-white font-semibold transition">
                Write a Post 
              </button>
            </Link>
          </div>
        </div>

        {/* Right / Sidebar */}
        <Slidebar />
      </div>
    </div>
  );
}

export default Home;

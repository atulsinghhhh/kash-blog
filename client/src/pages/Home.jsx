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
        if (response.data && Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
          console.log("post: ", response.data.posts);
        } else {
          console.log("Invalid posts response:", response.data);
          setPosts([]);
        }
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
        if (response.data && Array.isArray(response.data.tags)) {
          setTags(response.data.tags);
          console.log("Tags:", response.data.tags);
        } else {
          console.log("Invalid tags response:", response.data);
          setTags([]);
        }
      } catch (error) {
        console.error("Failed to fetch tags:", error);
        setTags([]);
      }
    };

    fetchAllPosts();
    fetchAllTags();
  }, [serverUrl]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto mt-6 px-4 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {/* trending posts */}
          {/* <div className="bg-pink-100 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-pink-600 mb-2">Trending Posts</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {(posts || []).slice(0, 2).map(post => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div> */}

          <h2 className="text-xl font-semibold text-gray-700">Latest Posts</h2>
          <div className="space-y-4">
            {posts && posts.length > 0 ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <p className="text-gray-500">No posts available</p>
            )}
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="font-semibold text-gray-700 mb-2">
              Discover Topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags && tags.length > 0 ? (
                tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No topics available</span>
              )}
            </div>
          </div>

          <div className="bg-pink-100 rounded-lg p-4 text-center">
            <p className="text-gray-700 mb-2">Have something to share?</p>
            <Link to="/create-post">
              <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 cursor-pointer">
                Write a Post
              </button>
            </Link>
          </div>
        </div>

        <Slidebar />
      </div>
    </div>
  );
}

export default Home;

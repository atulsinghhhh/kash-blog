import React, { useContext, useEffect, useState } from 'react';
import PostCard from '../compoents/PostCard';
import Slidebar from '../compoents/Slidebar';
import axios from 'axios';
import { authDataProvider } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const { serverUrl } = useContext(authDataProvider);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/post/`, { withCredentials: true });
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    const fetchAllTags = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/post/tags`, { withCredentials: true });
        setTags(response.data.tags);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
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
          <div className="bg-pink-100 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-pink-600 mb-2">Trending Posts</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {posts.slice(0, 2).map(post => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-700">Latest Posts</h2>
          <div className="space-y-4">
            {posts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="font-semibold text-gray-700 mb-2">Discover Topics</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">#{tag}</span>
              ))}
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

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { authDataProvider } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Slidebar = () => {
  const { serverUrl } = useContext(authDataProvider);
  const [tags, setTags] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch trending tags
  const fetchTags = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/post/tags?limit=10`);
      setTags(Array.isArray(response.data.tags) ? response.data.tags : []);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  // Fetch top authors
  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/post/top-authors`);
      setAuthors(
        Array.isArray(response.data.authors) ? response.data.authors : []
      );
    } catch (error) {
      console.error("Failed to fetch authors:", error);
    }
  };

  // Fetch recent users
  const fetchRecentUsers = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/post/recent-users?limit=5`
      );
      setNewUsers(
        Array.isArray(response.data.users) ? response.data.users : []
      );
    } catch (error) {
      console.error("Failed to fetch recent users:", error);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchAuthors();
    fetchRecentUsers();
  }, []);

  return (
    <aside className="bg-white/5 backdrop-blur-lg border border-white/10 text-gray-100 rounded-2xl p-5 space-y-8 shadow-lg">
      {/* Trending Tags */}
      <div>
        <h3 className="text-lg font-semibold text-pink-400 mb-3">
          Trending Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <span
                key={tag}
                className="bg-white/10 text-gray-300 hover:text-pink-400 px-3 py-1 rounded-full text-xs cursor-pointer transition-all"
              >
                #{tag}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500">No tags available</p>
          )}
        </div>
      </div>

      {/* Top Authors */}
      <div>
        <h3 className="text-lg font-semibold text-pink-400 mb-3">
          Top Authors
        </h3>
        <ul className="space-y-3 text-sm">
          {authors.length > 0 ? (
            authors.map((author) => (
              <li
                key={author._id}
                className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-2 rounded-xl transition-all"
                onClick={() => navigate(`/profile/${author._id}`)}
              >
                <img
                  src={author.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border border-white/20"
                />
                <span className="text-gray-300 hover:text-pink-400">
                  @{author.username}
                </span>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No authors found</p>
          )}
        </ul>
      </div>

      {/* 🆕 Recent Users Section */}
      <div>
        <h3 className="text-lg font-semibold text-pink-400 mb-3">
          New Members
        </h3>
        <ul className="space-y-3 text-sm">
          {newUsers.length > 0 ? (
            newUsers.map((user) => (
              <li
                key={user._id}
                className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-2 rounded-xl transition-all"
                onClick={() => navigate(`/profile/${user._id}`)}
              >
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border border-white/20"
                />
                <div>
                  <p className="font-medium text-gray-300 hover:text-pink-400">
                    @{user.username}
                  </p>
                  <p className="text-xs text-gray-500">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No new users</p>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Slidebar;

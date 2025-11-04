import axios from 'axios';
import React, { useContext, useState } from 'react';
import { authDataProvider } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("blog");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const { serverUrl } = useContext(authDataProvider);
  const navigate = useNavigate();

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${serverUrl}/api/post/`,
        { title, content, type, tags },
        { withCredentials: true }
      );
      alert("✨ Post published successfully!");
      navigate("/");
    } catch (error) {
      console.log("Failed to upload new post", error);
      alert("Failed to publish post");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f10] text-gray-100 flex justify-center items-start py-10">
      <div className="max-w-3xl w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-serif font-semibold text-pink-400">
          Create New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write a captivating title..."
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          {/* Content */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, poetry, or story here..."
            rows="8"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          ></textarea>

          {/* Type */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Category</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="blog">Blog</option>
              <option value="poetry">Poetry</option>
              <option value="code">Code</option>
              <option value="activity">Activity</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Tags</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg text-white transition"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => removeTag(tag)}
                  className="bg-pink-400/20 text-pink-300 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-pink-500/30 transition"
                >
                  #{tag} ✕
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-lg text-white font-medium transition"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;

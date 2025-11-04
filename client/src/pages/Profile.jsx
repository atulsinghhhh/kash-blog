import React, { useContext, useEffect, useState } from "react";
import { authDataProvider } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const { serverUrl, user } = useContext(authDataProvider);
    const [posts, setPosts] = useState([]);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [bios, setBios] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/auth/follow-stats/${user._id}`, {
                withCredentials: true,
                });
                setFollowers(res.data.followers);
                setFollowing(res.data.following);
            } catch (error) {
                console.error("Error loading follow stats", error);
            }
        };
        fetchStats();
    }, [user._id]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/post/user/${user._id}`, {
                withCredentials: true,
                });
                setPosts(res.data.posts);
            } catch (error) {
                console.error("Failed to fetch user posts:", error);
            }
        };

        if (user) fetchPosts();
    }, [serverUrl, user]);

    const handleUpdateProfile = async () => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("bios", bios);
            if (avatar) formData.append("avatar", avatar);

            await axios.patch(`${serverUrl}/api/auth/update`, formData, { withCredentials: true });
            alert("Profile Updated!!");
            setEditing(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await axios.delete(`${serverUrl}/api/post/${id}`, { withCredentials: true });
            setPosts(posts.filter((p) => p._id !== id));
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f10] text-gray-100 px-6 py-8">
        {/* Profile Header */}
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl flex items-center gap-6 shadow-lg">
            <img
            src={user.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border border-white/20 shadow-md"
            />
            <div className="flex-1">
            {editing ? (
                <>
                <input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded px-3 py-2 w-full mb-2 text-gray-100 placeholder-gray-400"
                />
                <textarea
                    placeholder="Enter your bio"
                    value={bios}
                    onChange={(e) => setBios(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded px-3 py-2 w-full mb-2 text-gray-100 placeholder-gray-400"
                />
                <input
                    type="file"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    className="text-sm text-gray-400 mb-3"
                />
                <div className="space-x-3">
                    <button
                    onClick={handleUpdateProfile}
                    className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg text-white"
                    >
                    Save
                    </button>
                    <button
                    onClick={() => setEditing(false)}
                    className="text-gray-400 hover:text-gray-200"
                    >
                    Cancel
                    </button>
                </div>
                </>
            ) : (
                <>
                <h2 className="text-2xl font-serif font-semibold">{user.name}</h2>
                <p className="text-gray-400 text-sm mt-1">{user.bios || "No bio yet."}</p>
                <button
                    onClick={() => setEditing(true)}
                    className="mt-2 text-sm text-pink-400 hover:underline"
                >
                    Edit Profile
                </button>
                </>
            )}
            </div>
        </div>

        {/* Follow Stats */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl">
            <h3 className="text-lg font-semibold mb-3 text-pink-400">Followers ({followers.length})</h3>
            <div className="flex flex-wrap gap-3">
                {followers.map((f) => (
                <div
                    key={f._id}
                    className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2"
                >
                    <img src={f.avatar} alt={f.username} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm">@{f.username}</span>
                </div>
                ))}
            </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl">
            <h3 className="text-lg font-semibold mb-3 text-pink-400">Following ({following.length})</h3>
            <div className="flex flex-wrap gap-3">
                {following.map((f) => (
                <div
                    key={f._id}
                    className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2"
                >
                    <img src={f.avatar} alt={f.username} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm">@{f.username}</span>
                </div>
                ))}
            </div>
            </div>
        </div>

        {/* Posts Section */}
        <div className="max-w-4xl mx-auto mt-10">
            <h3 className="text-xl font-semibold mb-4 text-pink-400">My Posts</h3>
            {posts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">You haven’t created any posts yet.</p>
            ) : (
            <div className="space-y-4">
                {posts.map((post) => (
                <div
                    key={post._id}
                    className="bg-white/5 hover:bg-white/10 transition-all backdrop-blur-lg border border-white/10 p-4 rounded-2xl flex justify-between items-start"
                >
                    <div>
                    <h4 className="font-medium text-lg">{post.title}</h4>
                    <p className="text-sm text-gray-400 line-clamp-2">{post.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                        {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    </div>
                    <div className="flex gap-3">
                    <button
                        onClick={() => navigate(`/update-post/${post._id}`)}
                        className="text-blue-400 text-sm hover:underline"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDeletePost(post._id)}
                        className="text-red-400 text-sm hover:underline"
                    >
                        Remove
                    </button>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
        </div>
    );
};

export default Profile;

import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    const author = post.author || {}; 

    return (
        <div className="rounded-xl shadow p-4 hover:shadow-md transition bg-gray-500">
        <Link to={`/post/${post._id}`}>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
        </Link>
        
        <p className="text-white text-sm mb-3">
            {post.content.slice(0, 120)}...
        </p>

        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <img
                src={author.avatar}
                alt={author.name}
                className="w-6 h-6 rounded-full"
            />
            <span className="text-gray-950 text-sm">{author.username}</span>
            </div>
            <span className="text-xs text-gray-950">
                {new Date(post.createdAt).toLocaleDateString()}
            </span>
        </div>
        </div>
    );
};

export default PostCard;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authDataProvider } from "../context/AuthContext"
import axios from "axios";
import { MessageCircle, Heart } from "lucide-react";

const PostCard = ({ post }) => {
    const author = post.author || {}; 
    const {serverUrl,user}=useContext(authDataProvider);

    const [isFollowing, setIsFollowing] = useState(false);
    const [likes,setLikes]=useState(post.likes?.length || 0);
    const [likedByUser,setLikedByUser]=useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(()=>{
        const check=async()=>{
            try {
                const response=await axios.get(`${serverUrl}/api/auth/follow-stats/${author._id}`,{
                    withCredentials: true
                })
                const followers=response.data.followers || []
                setIsFollowing(followers.some(f=> f._id === user._id));
            } catch (error) {
                console.log(error);
            }
        }
        if(user && user._id !== author._id) check();
    },[user,author])

    const handleFollowToggle=async()=>{
        try {
            const response=await axios.put(`${serverUrl}/api/auth/follow/${author._id}`,{},{
                withCredentials: true
            })
            setIsFollowing(response.data.isFollowing);
        } catch (error) {
            console.log("follow error",error);
        }
    }


    useEffect(()=>{
        if(user && post.likes){
            setLikedByUser(post.likes.includes(user._id))
        }
    },[post.likes,user])


    const handleToggleLike=async()=>{
        try {
            const response=await axios.put(`${serverUrl}/api/post/like/${post._id}`,{},{
                withCredentials:true
            });
            setLikes(response.data.likes);
            setLikedByUser(!likedByUser);
        } catch (error) {
            console.error("Failed to like/unlike post", error);
        }
    }
    const fetchComments=async()=>{
        try {
            const response = await axios.get(`${serverUrl}/api/comment/post/${post._id}`,{
                withCredentials:true
            });
            setComments(response.data.comments || []);
        } catch (error) {
            console.error("Failed to fetch comments", error);
        }
    }

    useEffect(() => {
        fetchComments();
    }, [post._id]);



    const handleCommentSubmit=async()=>{
        try {
            if(!commentText.trim()) return;
            await axios.post(`${serverUrl}/api/comment/add`,{
                content: commentText,
                postId: post._id
            },{withCredentials:true});

            setCommentText("");
            fetchComments(); 
        } catch (error) {
            console.error("Failed to add comment", error);
        }
    }

    return (
        <div className="rounded-xl shadow p-4 hover:shadow-md transition bg-gray-500">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <img src={author.avatar} alt={author.username} className="w-6 h-6 rounded-full" />
                    <span className="text-gray-950 text-sm">@{author.username}</span>
                </div>
                {user && user._id !== author._id && (
                    <button
                        onClick={handleFollowToggle}
                        className={`text-xs px-2 py-1 rounded ${isFollowing ? "bg-gray-300 text-black" : "bg-blue-500 text-white"}`}
                    >
                        {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                )}

            </div>

            <Link to={`/post/${post._id}`}>
                <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
            </Link>

            <p className="text-white text-sm mb-3">
                {post.content.slice(0, 120)}...
            </p>

            <span className="text-xs text-gray-300">
                {new Date(post.createdAt).toLocaleDateString()}
            </span>

            <div className="flex gap-6 mt-4 items-center">
                <button onClick={handleToggleLike} className="flex items-center gap-1 text-white">
                    <Heart fill={likedByUser ? "red" : "none"} className="w-5 h-5" />
                    <span>{likes}</span>
                </button>
                <span className="flex items-center gap-1 text-white">
                    <MessageCircle className="w-5 h-5" />
                    <span>{comments.length}</span>
                </span>
            </div>

            <div className="mt-3">
                <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full mt-2 px-3 py-2 text-sm rounded bg-white text-black"
                />
                <button onClick={handleCommentSubmit} className="mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded">
                    Comment
                </button>
            </div>

            <div className="mt-4 text-sm text-white max-h-32 overflow-y-auto">
                {comments.map((comment) => (
                    <div key={comment._id} className="mb-2">
                        <strong>@{comment.author.username}:</strong> {comment.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostCard;

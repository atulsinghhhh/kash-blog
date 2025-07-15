import React,{useContext, useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { authDataProvider } from "../context/AuthContext";
import axios from "axios";

const Post=()=>{
    const {id}=useParams();
    const {serverUrl}=useContext(authDataProvider);

    const [post,setPost]=useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchPost=async()=>{
            try {
                const response = await axios.get(`${serverUrl}/api/post/${id}`, { withCredentials: true });
                setPost(response.data.post)
            } catch (error) {
                console.error("Failed to fetch user posts:", error);
            } finally{
                setLoading(false)
            }
        }
        fetchPost();
    },[serverUrl,id])

    if (loading || !post) {
        return <div className="p-4 text-center text-gray-500">Loading post...</div>;
    }

    return(
        <div className="max-w-3xl mx-auto mt-6 p-4 border rounded shadow">
            <h1 className="text-3xl font-bold mb-4 text-gray-600">{post.title}</h1>
            <div className="text-sm text-gray-500 mb-2">
                <span>Type: <strong>{post.type}</strong></span>
                <span className="ml-4">Author: <strong>{post.author?.username || "Unknown"}</strong></span>
            </div>
            <div className="text-gray-800 whitespace-pre-wrap mb-4">{post.content}</div>

            {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag, idx) => (
                <span key={idx} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                    #{tag}
                </span>
            ))}
        </div>
        )}
    </div>
    )

}

export default Post
import React, { useContext, useEffect,useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { authDataProvider } from "../context/AuthContext";
import axios from "axios";

const UpdatePost=()=>{
    const {id}=useParams();
    const {serverUrl}=useContext(authDataProvider);
    const navigate=useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = useState("blog");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    useEffect(()=>{
        const fetchPost=async()=>{
            try {
                const response=await axios.get(`${serverUrl}/api/post/user/${id}`,{
                    withCredentials:true
                })
                const post=response.data.post
                setTitle(post.title)
                setContent(post.content)
                setType(post.type)
                setTags(post.tags || [])
            } catch (error) {
                console.error("Failed to load post:", error);
            }
        }
        fetchPost();
    },[id,serverUrl])

    const addTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput("");
        }
    };

    const removeTag = (tag) => {
        setTags(tags.filter(t => t !== tag));
    };

    const handleUpdate=async(e)=>{
        e.preventDefault();
        try {
            await axios.put(`${serverUrl}/api/post/${id}`,{
                title,
                content,
                type,
                tags
            },{withCredentials:true})
            alert("Post updated!");
            navigate("/profile");
        } catch (error) {
            console.error("Failed to update post:", error);
        }
    }


    return(
        <div className="max-w-3xl mx-auto mt-6 p-4">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">✏ Update Post</h1>
            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Write your title..."
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Write your content here..."
                    rows="8"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                ></textarea>

                <select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                    <option value="blog">Blog</option>
                    <option value="poetry">Poetry</option>
                    <option value="code">Code</option>
                    <option value="activity">Activity</option>
                </select>

                <div>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                            placeholder="Add a tag"
                            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <button
                            type="button"
                            onClick={addTag}
                            className="bg-pink-500 text-white px-3 py-2 rounded hover:bg-pink-600"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm cursor-pointer"
                                onClick={() => removeTag(tag)}
                            >
                                #{tag} ✕
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                    >
                        Update Post
                    </button>
                </div>
            </form>
        </div>

    )
}

export default UpdatePost
import React, { useContext, useEffect, useState } from "react"
import { authDataProvider } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import axios from "axios";

const Profile=()=>{
    const {serverUrl,user}=useContext(authDataProvider);
    const [posts,setPosts]=useState([]);
    const [editing,setEditing]=useState(false);
    const [name,setName]=useState("")
    const [bios,setBios]=useState("")
    const [avatar,setAvatar]=useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);



    const navigate=useNavigate();

    useEffect(()=>{
        const fetchStats=async()=>{
            try {
                const response=await axios.get(`${serverUrl}/api/auth/follow-stats/${user._id}`,{
                    withCredentials: true
                })
                setFollowers(response.data.followers);
                setFollowing(response.data.following);
            } catch (error) {
                console.error("Error loading follow stats", error);
            }
        }
        fetchStats();
    },[user._id])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/post/user/${user._id}`, {
                    withCredentials: true
                });
                setPosts(response.data.posts);
            } catch (error) {
                console.error("Failed to fetch user posts:", error);
            }
        };

        if (user) fetchPosts();
    }, [serverUrl, user]);


    const handleUpdateProfile=async()=>{
        try {
            const formData=new FormData();
            formData.append("name",name)
            formData.append("bios",bios)
            if(avatar){
                formData.append("avatar",avatar);
            }

            await axios.patch(`${serverUrl}/api/auth/update`,formData,{
                withCredentials:true
            });
            alert("Profile Updated!!");
            setEditing(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    }

    const handleDeletePost=async(id)=>{
        try {
            await axios.delete(`${serverUrl}/api/post/${id}`,
                {withCredentials:true})
            setPosts(posts.filter(p=>p._id !==id));
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    }

    return(
        <div className="max-w-4xl mx-auto mt-6 p-4 space-y-6">
            <div className="bg-gray-100 p-4 rounded-xl flex items-center gap-4">
                <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                    {editing?(
                        <>
                        <input
                            placeholder="enter your name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            className="border rounded px-2 py-1 mb-1 w-full"
                        />
                        <textarea
                            placeholder="enter your bios"
                            value={bios}
                            onChange={e=>setBios(e.target.value)}
                            className="border rounded px-2 py-1 mb-1 w-full"
                        />
                        <input
                            type="file"
                            onChange={e=>setAvatar(e.target.files[0])}
                            className="mb-2"
                        />
                        <button
                            onClick={handleUpdateProfile}
                            className="bg-pink-500 text-white px-3 py-2 rounded mr-2"
                        >
                            Save
                        </button>

                        <button
                            onClick={()=>setEditing(false)}
                            className="text-gray-500"
                        >
                            Cancel
                        </button>
                        </>
                    ):(
                        <>
                            {/* <h3 className="text-xl font-semibold">{user.username}</h3> */}
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p className="text-gray-600 text-sm">{user.bios || "No bio yet."}</p>

                            <button
                                onClick={()=>setEditing(true)}
                                className="text-pink-500 mt-1 text-sm"
                            >
                                Edit
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="my-4">
                {/* Followers Section */}
                <h2 className="text-lg font-semibold mb-2">Followers ({followers.length})</h2>
                <div className="flex flex-wrap gap-4">
                    {followers.map(f => (
                    <div
                        key={f._id}
                        className="flex items-center gap-2 p-3 border rounded-lg bg-gray-100 min-w-[160px]"
                    >
                        <img src={f.avatar} alt={f.username} className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-sm font-medium">@{f.username}</span>
                    </div>
                    ))}
                </div>

                {/* Following Section */}
                <h2 className="text-lg font-semibold mt-8 mb-2">Following ({following.length})</h2>
                <div className="flex flex-wrap gap-4">
                    {following.map(f => (
                    <div
                        key={f._id}
                        className="flex items-center gap-2 p-3 border rounded-lg bg-gray-100 min-w-[160px]"
                    >
                        <img src={f.avatar} alt={f.username} className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-sm font-medium">@{f.username}</span>
                    </div>
                    ))}
                </div>
            </div>

            {/* user posts */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">My Posts</h3>
                {posts.length===0?(
                    <p className="text-gray-500 text-center">You haven't created any posts yet.</p>
                ):(
                    posts.map(post=>(
                        <div key={post._id}
                            className="bg-white p-3 rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <h4 className="font-medium">{post.title}</h4>
                                <p className="font-sm">{post.content}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={()=>navigate(`/update-post/${post._id}`)}
                                    className="text-blue-500 text-sm cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={()=>handleDeletePost(post._id)}
                                    className="text-red-500 text-sm cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Profile
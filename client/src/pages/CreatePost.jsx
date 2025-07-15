import axios from 'axios';
import React,{useContext, useState} from 'react'
import { authDataProvider } from '../context/AuthContext';

function CreatePost() {
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [type,setType]=useState("blog");
    const [tags,setTags]=useState([]);
    const [tagInput,setTagInput]=useState("");
    const {serverUrl}=useContext(authDataProvider);

    const addTag=()=>{
      if(tagInput && !tags.includes(tagInput)){
        setTags([...tags,tagInput])
        setTagInput("");
      }
    }

    const removeTag=(tag)=>{
      setTags(tags.filter(t=>t !==tag))
    }


    const handleSubmit=async()=>{
      try {
        const response=await axios.post(`${serverUrl}/api/post/`,{
          title,content,type,tags
        },{withCredentials:true});

        console.log(response.data);
      } catch (error) {
        console.log('failed the uploaded a new post',error)
      }
    }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">✏ Create New Post</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
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
          onChange={(e)=>setType(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="blog">Blog</option>
          <option value="poetry">Poetry</option>
          <option value="code">Code</option>
          <option value="activity">Activity</option>
        </select>

        <div>
          <div className='flex gap-2 mb-2'>
            <input
              type='text'
              value={tagInput}
              onChange={(e)=>setTagInput(e.target.value)}
              placeholder='Add a tag'
              className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addTag();
              }}
              className="bg-pink-500 text-white px-3 py-2 rounded hover:bg-pink-600"
            >
              Add
            </button>

          </div>
          <div className='flex flex-wrap gap-2'>
            {tags.map(tag=>(
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

        <div className='flex justify-end gap-3'>
          <button
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
              Publish Post
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost

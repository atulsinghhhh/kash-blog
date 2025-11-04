import React, { useContext, useState } from 'react'
import { authDataProvider } from '../context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const {serverUrl}=useContext(authDataProvider);
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("");
  const [showPassword,setShowPassword]=useState("")
  const navigate=useNavigate();

  const handleSignup=async(e)=>{
    e.preventDefault();
    try {
      const response=await axios.post(`${serverUrl}/api/auth/signup`,{
        username,email,password
      },{withCredentials:true});
      console.log(response.data);
      // navigate("/login")
      navigate("/");
    } catch (error) {
      console.log("failed to signup to new user")
    }
  }
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSignup}>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome, Kashlog</h2>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <div className="relative mb-4">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 pr-10 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-blue-700 hover:bg-blue-600 transition duration-200 text-white font-semibold py-2 rounded-lg"
          >
            Signup
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400">
          <p>
            Already have an account?{' '}
            <span
              className="text-blue-400 underline cursor-pointer hover:text-white"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Signup

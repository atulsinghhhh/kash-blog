import React, { useContext, useState } from 'react'
import { authDataProvider } from '../context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const {serverUrl,setIsLoggedIn,setUser}=useContext(authDataProvider);
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("");
  const [showPassword,setShowPassword]=useState("")
  const navigate=useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault();
    try {
      const response=await axios.post(`${serverUrl}/api/auth/login`,{
        email,password
      },{withCredentials:true});

      setIsLoggedIn(true);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg">
        <form onSubmit={handleLogin}>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome, Kashlog</h2>
          
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
            Login
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400">
          <p>
            Don't have an account?{' '}
            <span
              className="text-blue-400 underline cursor-pointer hover:text-white"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, UserCircle, PenSquare, LogOut } from "lucide-react";
import { authDataProvider } from "../context/AuthContext";
import axios from "axios";
import SearchBar from "./SearchBar";

const Navbar = () => {
    const { serverUrl, user, setIsLoggedIn, setUser } = useContext(authDataProvider);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });
            setIsLoggedIn(false);
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.log("Failed to logout", error);
        }
    };

    return (
        <nav className="backdrop-blur-lg bg-white/5 border-b border-white/10 sticky top-0 z-50 shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-serif font-semibold tracking-wide text-pink-400 hover:text-pink-300 transition-all"
                    >
                    Kashlog<span className="text-gray-400 font-light">.</span>
                </Link>

                {/* Search Bar */}
                <div className="hidden sm:flex items-center bg-white/10 border border-white/10 rounded-full px-4 py-2 text-gray-300 hover:border-pink-400 transition-all w-64 focus-within:w-80 duration-300">
                    <Search size={18} className="mr-2 text-gray-400" />
                    <SearchBar />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-5">
                {user ? (
                    <>
                    <Link
                        to="/create-post"
                        className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm shadow-md transition-all"
                    >
                        <PenSquare size={16} />
                        <span>Create</span>
                    </Link>

                    <Link
                        to="/profile"
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full border border-white/10 transition-all"
                    >
                        {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.username || user.name}
                            className="w-8 h-8 rounded-full object-cover border border-white/20"
                        />
                        ) : (
                        <UserCircle
                            size={26}
                            className="text-gray-300 hover:text-pink-400 transition-all"
                        />
                        )}
                        <span className="hidden sm:inline text-sm text-gray-500 font-medium">
                        @{user.username || user.name}
                        </span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-pink-400 transition-all cursor-pointer"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                    </>
                ) : (
                    <Link
                    to="/login"
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm shadow-md transition-all"
                    >
                    Login
                    </Link>
                )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

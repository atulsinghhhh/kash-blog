import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, UserCircle } from "lucide-react";
import { authDataProvider } from "../context/AuthContext";
import axios from "axios";
import SearchBar from "./SearchBar";

const Navbar = () => {
    const { serverUrl, user, setIsLoggedIn, setUser } = useContext(authDataProvider);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${serverUrl}/api/auth/logout`,
                {},
                {
                    withCredentials: true,
                }
            );
            setIsLoggedIn(false);
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.log("failed to logout", error);
        }
    };
    return (
        <div className="bg-gray-900 text-white p-4 md:p-6 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-y-4">
                <Link to={"/"} className="text-2xl font-bold text-pink-500">
                    Kashlog
                </Link>

                <div className="flex items-center bg-gray-800 rounded-full px-3 py-2 w-full sm:w-auto">
                    <SearchBar />
                </div>

                <div className="flex items-center gap-5">
                {user ? (
                    <>
                    <Link
                        to="/create-post"
                        className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-full text-sm"
                    >
                        Create Post
                    </Link>
                    <Link to={"/profile"} className="flex items-center gap-2">
                        {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.username || user.name}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        ) : (
                        <UserCircle
                            size={26}
                            className="cursor-pointer hover:text-pink-400"
                            title={user.username || user.name}
                        />
                        )}
                        <span className="hidden sm:inline text-sm">
                        @{user.username || user.name}
                        </span>
                    </Link>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-pink-400 text-sm cursor-pointer"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-full text-sm"
                        >
                        Login
                    </Link>
                )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

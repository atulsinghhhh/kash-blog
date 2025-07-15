import React,{useContext} from "react"
import { authDataProvider } from "../context/AuthContext"
import { Navigate } from "react-router-dom";


const ProectRoutes=({children})=>{
    const {isLoggedIn,loading}=useContext(authDataProvider);

    if (loading) {
        return <div className="text-center mt-8 text-gray-500">Checking authentication...</div>; // show loading indicator
    }

    if(!isLoggedIn){
        return <Navigate to="/login" replace/>
    }
    return children
}

export default ProectRoutes
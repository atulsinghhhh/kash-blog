import axios from "axios";
import React,{ createContext, useEffect, useState }  from "react"

export const authDataProvider=createContext();

const AuthProvider=({children})=>{
    const serverUrl='http://localhost:8800'
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [user,setUser]=useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const response=await axios.get(`${serverUrl}/api/auth/me`,{
                    withCredentials:true
                })
                setUser(response.data.user);
                setIsLoggedIn(true)
                localStorage.setItem("user", JSON.stringify(response.data.user));
            } catch (error) {
                setUser(null)
                setIsLoggedIn(false)
                localStorage.removeItem("user");
            } finally{
                setLoading(false)
            }
        }
        fetchUser();
    },[])

    const value={
        serverUrl,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        loading
    }
    return(
        <authDataProvider.Provider value={value}>
            {children}
        </authDataProvider.Provider>
    )
}
export default AuthProvider
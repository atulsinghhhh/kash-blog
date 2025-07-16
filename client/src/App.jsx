import { Routes,Route, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProectRoutes from "./compoents/protectRoute"
import Navbar from "./compoents/Navbar"
import CreatePost from "./pages/CreatePost"
import Profile from "./pages/Profile"
import UpdatePost from "./pages/UpdatePost"
import Post from "./pages/Post"
import SearchPage from "./pages/SearchPage"
import Footer from "./compoents/Footer"

function App() {
  const location=useLocation();
  const hidePanel=['/login','/signup']
  const footerPanel=['/login','/signup','/search','/profile', '/post/']
  const showLayout=!hidePanel.includes(location.pathname);
  const footerLayout = !footerPanel.some(path => location.pathname.startsWith(path));
  return (
    <>
      {showLayout && <Navbar/> }
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/search" element={<SearchPage />} />

        {/* Protected Route */}
        <Route path="/create-post" element={
          <ProectRoutes>
            <CreatePost/>
          </ProectRoutes>
        }/>
        
        <Route path="/profile" element={
          <ProectRoutes>
            <Profile/>
          </ProectRoutes>
        }/>

        <Route path="/update-post/:id" element={
          <ProectRoutes>
            <UpdatePost/>
          </ProectRoutes>
        }
        />
        <Route path="/post/:id" element={
          <ProectRoutes>
            <Post/>
          </ProectRoutes>
        }
        />
      </Routes>
      {footerLayout && <Footer/>}
    </>
  )
}

export default App

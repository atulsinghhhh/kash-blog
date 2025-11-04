import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProectRoutes from "./compoents/protectRoute";
import Navbar from "./compoents/Navbar";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import UpdatePost from "./pages/UpdatePost";
import Post from "./pages/Post";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import Footer from "./compoents/Footer";

function App() {
  const location = useLocation();

  // Paths where Navbar should be hidden
  const hidePanel = ["/login", "/signup"];

  // Paths where Footer should be hidden
  const footerPanel = ["/login", "/signup", "/search", "/profile", "/post/"];

  // Define all valid base paths
  const knownBases = [
    "/",
    "/login",
    "/signup",
    "/search",
    "/create-post",
    "/profile",
    "/update-post",
    "/post",
  ];

  // Check if the current route is valid
  const isKnownRoute = knownBases.some((base) =>
    base === "/" ? location.pathname === "/" : location.pathname.startsWith(base)
  );

  // Hide Navbar if on login/signup OR if route is unknown (404)
  const hideNavbar =
    hidePanel.some((path) => location.pathname.startsWith(path)) || !isKnownRoute;

  // Hide Footer if on certain paths OR if route is unknown (404)
  const hideFooter =
    footerPanel.some((path) => location.pathname.startsWith(path)) || !isKnownRoute;

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchPage />} />

        {/* Protected Routes */}
        <Route
          path="/create-post"
          element={
            <ProectRoutes>
              <CreatePost />
            </ProectRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProectRoutes>
              <Profile />
            </ProectRoutes>
          }
        />
        <Route path="/profile/:id" element={
          <ProectRoutes>
            <Profile />
          </ProectRoutes>
        } />
        
        <Route
          path="/update-post/:id"
          element={
            <ProectRoutes>
              <UpdatePost />
            </ProectRoutes>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProectRoutes>
              <Post />
            </ProectRoutes>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

export default App;

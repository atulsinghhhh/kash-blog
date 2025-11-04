import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import searchRoutes from "./routes/search.route.js"
import commentRoutes from "./routes/comment.route.js"

const app=express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials:true
}));

app.use(express.json({limit:"20kb"}))
app.use(cookieParser());

app.use("/api/auth",userRoutes)
app.use("/api/post",postRoutes)
app.use("/api/search",searchRoutes);
app.use("/api/comment",commentRoutes)

// Only respond with the welcome message on the exact root path.
// Using app.get for '/' prevents it from matching '/api/*' routes.
app.get('/', (req, res) => {
    res.send('welcome to kashlog, here you write a blog ');
});



export {app}
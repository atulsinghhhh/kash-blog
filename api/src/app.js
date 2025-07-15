import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import searchRoutes from "./routes/search.route.js"

const app=express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));

// app.use("/",(req,res)=>{
//     res.send("welcome to kashlog, here you write a blog ")
// })

app.use(express.json({limit:"20kb"}))
app.use(cookieParser());

app.use("/api/auth",userRoutes)
app.use("/api/post",postRoutes)
app.use("/api/search",searchRoutes);


export {app}
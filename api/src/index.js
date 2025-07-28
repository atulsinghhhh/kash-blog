import { app } from "./app.js";
import dotenv from "dotenv"
import dbConnect from "./db/index.js"

dotenv.config();

dbConnect()
.then(()=>{
    app.on('error', (error) => {
        console.error('app encountered an error:', error);
    });
    app.listen(process.env.PORT,'0.0.0.0',()=>{
        console.log(`Server is running on the port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(`server failed to connect MONODB ${error}`)
})



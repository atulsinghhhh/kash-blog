import mongoose from "mongoose"

const dbConnect=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONODB_URI}`);
        console.log(`MONODB Connected Successfully ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log(`MONDB Connection failed !! ${error.message}`);
        process.exit(1);
    }
}

export default dbConnect
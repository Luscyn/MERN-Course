import mongoose from "mongoose";



export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected successfully to MONGODB")
    } catch (error) {
        console.error("Error connecting to MongoDB", error)
        process.exit(1) // exit with failure
    }   
}
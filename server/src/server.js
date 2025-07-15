import express from 'express'
import dotenv from 'dotenv'
import noteRoutes from "./routes/notesRoutes.js"
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors'
import path from 'path'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
if(process.env.NODE_ENV !== "production") {
    app.use(cors(
        {origin: "http://localhost:5173"}
    ));
}


app.use(express.json()); // Middleware to convert req to json
app.use(rateLimiter);

// Our custom middleware
// app.use((req, res, next)=> {
//     console.log("We just got a new req");
//     next();
// })




// Routes
app.use("/api/notes", noteRoutes)


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")))

    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../client/","dist","index.html"))
    })
}


// 404
app.use((req,res)=> {
    res.status(404).send("This page doest exist")
})




// First connect to db then run server
connectDB().then(()=>{
    app.listen(PORT, ()=> {
        console.log(`Server running at http://localhost:${PORT}`)
    })
});



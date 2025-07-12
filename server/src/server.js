import express from 'express'
import dotenv from 'dotenv'
import noteRoutes from "./routes/notesRoutes.js"
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config()

const PORT = process.env.PORT || 5001;

const app = express()


// Middleware
app.use(express.json()); // Middleware to convert req to json
app.use(rateLimiter);

// Our custom middleware
// app.use((req, res, next)=> {
//     console.log("We just got a new req");
//     next();
// })


app.get('/', (req, res) => {
    res.status(200).send("Dashboard")
})

// Routes
app.use("/api/notes", noteRoutes)

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



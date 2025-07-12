import express from 'express'
import dotenv from 'dotenv'
import noteRoutes from "./routes/notesRoutes.js"
import { connectDB } from './config/db.js';

dotenv.config()

const PORT = process.env.PORT || 5001;

const app = express()
connectDB();

app.use(express.json()) // Middleware to convert req to json
app.get('/', (req, res) => {
    res.status(200).send("Homepage");
})



// Routes
app.use("/api/notes", noteRoutes)


// 404
app.use((req,res)=> {
    res.status(404).send("This page doest exist")
})


app.listen(PORT, ()=> {
    console.log(`Server running at http://localhost:${PORT}`)
})


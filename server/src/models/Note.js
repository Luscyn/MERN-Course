import mongoose from 'mongoose'


// Creating the schema
const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String, 
            required: true,
        },
        content: {
            type: String,
            required: true
        },
    },
    { 
        timestamps: true // createdAt, updatedAt
    } 
)

// Creating the model
const Note = mongoose.model("Note", noteSchema)

export default Note
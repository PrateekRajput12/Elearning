import express from "express";
import dotenv from 'dotenv'
import connectDB from "./database/db.js";
import cookieParser from "cookie-parser";
const app = express()
dotenv.config({
    quiet: true // ----> Quite is for stop showing message of dot env in terminal
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


const PORT = process.env.PORT || 5000
app.get("/", (req, res) => {
    res.json({ message: "Running" })
})



// Importing Routes
import userRoutes from './routes/user.js'

// using routes 
app.use("/api", userRoutes)   // ---> api har uske pehle ayegi

app.listen(PORT, () => {

    console.log(`running on port ${PORT}`);
    connectDB()

})
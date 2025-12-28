import express from "express";
import dotenv from 'dotenv'

dotenv.config({
    quiet: true // ----> Quite is for stop showing message of dot env in terminal
})
const app = express()
const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.json({ message: "Running" })
})
app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})
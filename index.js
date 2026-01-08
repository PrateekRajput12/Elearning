import express from "express";
import dotenv from 'dotenv'
import connectDB from "./database/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import Razorpay from 'razorpay'
import userRoutes from './routes/user.js'
import adminRoutes from './routes/admin.js'
import courseRoutes from './routes/course.js'
const app = express()
import helmet from "helmet";
app.use(helmet());

dotenv.config({
    quiet: true // ----> Quite is for stop showing message of dot env in terminal
})
// razor pay step 1
export const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.Razorpay_Secret
})
// using middleware

// app.set("trust proxy", 1);

// app.use(cors({
//     origin: ["https://elearning-client-zo7h.onrender.com", "https://elearning-five-tau.vercel.app",
//         "http://localhost:5173"], // frontend URL
//     credentials: true
// }))
app.set("trust proxy", 1);

app.use(cors({
    origin: [
        "https://elearning-client-zo7h.onrender.com", "https://elearning-five-tau.vercel.app",
        "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


// app.options("/api/course/delete/:id", cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }));


app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/uploads", express.static('uploads'))

const PORT = process.env.PORT || 5000
app.get("/", (req, res) => {
    res.json({ message: "Running" })
})



// Importing Routes

// using routes 
app.use("/api", userRoutes)   // ---> api har uske pehle ayegi
app.use("/api", adminRoutes)
app.use("/api", courseRoutes)
connectDB()
app.listen(PORT, () => {

    console.log(`running on port ${PORT}`);


})
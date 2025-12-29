import jwt from "jsonwebtoken"
import { User } from "../models/user.js"

export const isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        // console.log(token);

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.user = await User.findById(decoded._id)

        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}


export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not admin " })
        }

        next()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
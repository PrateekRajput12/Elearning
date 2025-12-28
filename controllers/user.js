import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import sendMail from "../middleware/sendmail.js";
export const register = async (req, res) => {
    try {
        const { email, name, password } = req.body

        if (!email || !name || !password) {
            return res.status(402).json({ message: "Please enter full details" })
        }


        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: "User Already exist"
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10)
        user = {
            name,
            email, password: hashedPassword
        }

        const otp = Math.floor(Math.random() * 1000000)

        const activationToken = jwt.sign({ user, otp },
            process.env.Activation_Secret, {
            expiresIn: "5m"
        }
        )

        const data = {
            name, otp
        }

        await sendMail(email,
            "ELearning",
            data
        )


        res.status(200).json({
            message: "Otp sent to your email",
            activationToken
        })

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message })
    }
}
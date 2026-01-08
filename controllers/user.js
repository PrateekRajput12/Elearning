import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import sendMail from "../middleware/sendmail.js";
import TryCatch from "../middleware/TryCatch.js";
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

        const otp = Math.floor(100000 + Math.random() * 900000)

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


        // res.cookie("activationToken", activationToken, {
        //     httpOnly: true,
        //     sameSite: "lax", // use "none" + secure:true in production
        //     secure: false,   // true only on HTTPS
        //     maxAge: 5 * 60 * 1000
        // })

        res.cookie("activationToken", activationToken, {
            httpOnly: true,
            sameSite: "none",   // REQUIRED for cross-site
            secure: true,      // REQUIRED on HTTPS
            maxAge: 5 * 60 * 1000
        });


        res.status(200).json({
            message: "Otp sent to your email"
        })


    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message })
    }
}


export const verifyUser = TryCatch(async (req, res) => {
    const { otp } = req.body
    const activationToken = req.cookies.activationToken


    const verify = jwt.verify(activationToken, process.env.Activation_Secret)

    if (!verify) {
        return res.status(400).json({ message: "otp expired" })

    }

    if (verify.otp !== otp) {
        return res.status(400).json({ message: "wrong otp" })
    }

    await User.create({
        name: verify.user.name,
        email: verify.user.email,
        password: verify.user.password
    })

    res.json({
        message: "User Registered successfully"
    })

})


export const loginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Please enter details" })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "User does not exist please register first" })
    }

    const hashedPassword = await bcrypt.compare(password, user.password)

    if (!hashedPassword) {
        return res.status(400).json({ message: "Password does not match please enter correct password" })
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "7d"
    })

    // res.cookie("token", token, {
    //     httpOnly: true,
    //     secure: false,      // true in production (HTTPS)
    //     sameSite: "lax",
    //     maxAge: 7 * 24 * 60 * 60 * 1000
    // })


    res.cookie("token", token, {
        httpOnly: true,
        secure: true,          // MUST be true on HTTPS
        sameSite: "none",      // MUST be none for cross-domain
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
        message: ` Welcome back ${user.name}`,
        user
    })
})


export const userProfile = TryCatch(async (req, res) => {

    const user = await User.findById(req.user._id)

    res.json({ user })

})

export const logOut = TryCatch(async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), // past date
        sameSite: "lax",
        secure: false // true in production
    });

    res.json({ message: "Logged out successfully" });
})
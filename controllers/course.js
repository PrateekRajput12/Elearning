import TryCatch from '../middleware/TryCatch.js'
import { Lecture } from '../models/Lecture.js'
import { Course } from '../models/Course.js'
import { User } from '../models/user.js'
import { instance } from '../index.js'
import crypto from 'crypto'
import { Payment } from '../models/payment.js'
export const getAllCourses = TryCatch(async (req, res) => {
    const courses = await Course.find()

    res.json({
        courses
    })
})


export const getSingleCourse = TryCatch(async (req, res) => {
    const getCourse = await Course.findById(req.params.id)
    if (!getCourse) return res.status(400).json({ message: "Course not found" })
    res.json({
        getCourse
    })
})


export const fetchLectures = TryCatch(async (req, res) => {
    const course = req.params.id
    const lectures = await Lecture.find({ course })
    // console.log(lectures);
    // console.log(req.user);
    // console.log("UserId ");

    const user = await User.findById(req.user._id)

    if (user.role === "admin") {
        return res.json({ lectures })
    }
    if (!user.subscription.includes(req.params.id)) {
        return res.status(400).json({ message: "You have not subscribed to this course please subscribe first" })
    }

    res.json({ lectures })

})


export const fetchLecture = TryCatch(async (req, res) => {
    // const course = req.params.id
    const lecture = await Lecture.findById(req.params.id)
    // console.log(lectures);
    // console.log(req.user);
    // console.log("UserId ");

    const user = await User.findById(req.user._id)

    if (user.role === "admin") {
        return res.json({ lecture })
    }
    if (!user.subscription.includes(req.params.id)) {
        return res.status(400).json({ message: "You have not subscribed to this course please subscribe first" })
    }

    res.json({ lecture })
})



export const getMyCourses = TryCatch(async (req, res) => {
    const courses = await Course.find({ _id: req.user.subscription })


    res.json({
        courses
    })
})



// razorpay-2

export const checkout = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id)

    const course = await Courses.findById(req.params.id)

    if (user.subscription.includes(course._id)) {
        return res.status(400).json({
            message: "You have already encrolled this course"
        })
    }
    const options = {
        amount: Number(course.price * 100),
        currency: "INR"
    }
    const order = await instance.orders.create(options)


    res.status(201).json({
        order, course
    })
})

// Step -4 rzor pay
export const paymentVerification = TryCatch(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto.createHash("sha256",
        process.env.Razorpay_Secret).update(body).digest("hex")


    const isAuthentic = expectedSignature === razorpay_signature

    if (isAuthentic) {
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        })

        const user = await User.findById(req.user._id)

        const course = await Course.findById(req.params.id)
        user.subscription.push(course._id)


        await user.save()

        res.status(200).json({
            message: "Course Purchased successfully"
        })
    } else {
        return res.status(400).json({
            message: "Payment Failed"
        })
    }
})
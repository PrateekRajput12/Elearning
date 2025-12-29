import TryCatch from '../middleware/TryCatch.js'
import { Lecture } from '../models/Lecture.js'
import { Course } from '../models/Course.js'
import { User } from '../models/user.js'
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


export const fetchLecture = TryCatch(async (req, res) => {
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
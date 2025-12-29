import TryCatch from "../middleware/TryCatch.js";
import { Course } from "../models/Course.js";
import { Lecture } from "../models/Lecture.js";
export const createCourse = TryCatch(async (req, res) => {
    const { title, description, category, createdBy, duration, price } = req.body

    const image = req.file


    await Course.create({
        title,
        description,
        category,
        createdBy,
        image: image?.path,
        duration,
        price
    })

    res.status(201).json({
        message: "Course Created Successfully"
    })

})




export const addLecture = TryCatch(async (req, res) => {
    const course = await Course.findById(req.params.id)  // for getting params by id 

    if (!course) return res.status(400).json({ message: "No course with this id " })

    const { title, description, } = req.body

    const file = req.file.path

    const lecture = await Lecture.create({ title, description, video: file, course: course._id })

    res.status(201).json({
        message: "Lecture Added",
        lecture

    })
})
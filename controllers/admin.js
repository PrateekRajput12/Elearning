import TryCatch from "../middleware/TryCatch.js";
import { Course } from "../models/Course.js";
import { Lecture } from "../models/Lecture.js";
import { promisify } from "util";
import { rm } from 'fs'
import fs from 'fs'
import { User } from "../models/user.js";

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



export const deleteLecture = TryCatch(async (req, res) => {
    const id = req.params.id
    const lecture = await Lecture.findById(id)
    // rm(lecture.video, () => {
    //     console.log("video deleted ");
    // })

    // await lecture.deleteOne()

    // res.status(200).json({ message: "Lecture deleted" })

    if (!lecture) {
        return res.status(404).json({ message: "Lecture not found" });
    }

    // 🔥 Delete video from Cloudinary
    await deleteFromCloudinary(lecture?.video, "video");

    await lecture.deleteOne();

    res.status(200).json({
        message: "Lecture deleted successfully",
    });
})

// const unlikeAsync = promisify(fs.unlink)

// export const deleteCourse = TryCatch(async (req, res) => {
//     const id = req.params.id

//     const course = await Course.findById(id)

//     const lectures = await Lecture.find({ course: course._id })
//     await Promise.all(
//         lectures.map(async (lecture) => {
//             await unlikeAsync(lecture.video)
//             console.log("video deleted");
//         })
//     )
//     rm(course.image, () => {
//         console.log("Thubnail deleted ");
//     })
//     await Lecture.find({ course: req.params.id }).deleteMany()
//     await course.deleteOne()

//     await User.updateMany({}, { $pull: { subscription: req.params.id } })

//     res.json({ message: "Course Deleted Successfully" })

// })


const unlinkAsync = promisify(fs.unlink)

// 
// export const deleteCourse = TryCatch(async (req, res) => {
//     const { id } = req.params

//     const course = await Course.findById(id)
//     if (!course) {
//         return res.status(404).json({ message: "Course not found" })
//     }

//     // console.log("point 1")

//     // 1️⃣ Find all lectures of this course
//     const lectures = await Lecture.find({ course: course._id })
//     // console.log("point 2")
//     // console.log(lectures);
//     // 2️⃣ Delete lecture videos safely
//     await Promise.all(
//         lectures.map(async (lecture) => {
//             try {
//                 if (lecture.video && fs.existsSync(lecture.video)) {
//                     // console.log("Deleting video:", lecture.video)
//                     await unlinkAsync(lecture.video)
//                 }
//             } catch (err) {
//                 console.error("Video delete error:", err.message)
//             }
//         })
//     )

//     // console.log("point 3")

//     // 3️⃣ Delete course thumbnail safely
//     try {
//         if (course.image && fs.existsSync(course.image)) {
//             await unlinkAsync(course.image)
//         }
//     } catch (err) {
//         console.error("Image delete error:", err.message)
//     }

//     // console.log("point 4")

//     // 4️⃣ Delete lectures from DB
//     await Lecture.deleteMany({ course: course._id })

//     // 5️⃣ Delete course
//     await course.deleteOne()
//     // console.log("point 5")

//     // 6️⃣ Remove course from user subscriptions
//     await User.updateMany(
//         {},
//         { $pull: { subscription: course._id } }
//     )

//     // console.log("point 6")

//     res.json({ message: "Course Deleted Successfully" })
// })

// with cloudinary
export const deleteCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    // 🔥 Delete course image
    await deleteFromCloudinary(course.image, "image");

    // 🔥 Find & delete all lectures
    const lectures = await Lecture.find({ course: course._id });

    for (const lecture of lectures) {
        await deleteFromCloudinary(lecture.video, "video");
        await lecture.deleteOne();
    }

    await course.deleteOne();

    res.status(200).json({
        message: "Course & lectures deleted successfully",
    });
};


export const getAllStats = TryCatch(async (req, res) => {
    const totalCourses = (await Course.find()).length
    const totalLectures = (await Lecture.find()).length
    const totalUser = (await User.find()).length


    const stats = {
        totalCourses,
        totalLectures,
        totalUser
    }

    res.json({ stats })
})

export const getAllUser = TryCatch(async (req, res) => {
    const users = await User.find({ _id: { $ne: req.user.id } }).select(
        '-password'
    )
    res.json({ users })
})


export const updateRole = TryCatch(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user.role === "user") {
        user.role = "admin"

        await user.save()

        return res.status(200).json({
            message: "Role updated to admin "
        })
    }
    if (user.role === "admin") {
        user.role = "user"

        await user.save()

        return res.status(200).json({
            message: "Role updated "
        })
    }
})
import express from 'express'
import { fetchLecture, getAllCourses, getSingleCourse } from '../controllers/course.js'
import { isAdmin, isAuth } from '../middleware/isAuth.js'

const router = express.Router()


router.get("/course/all", getAllCourses)
router.get("/course/:id", getSingleCourse)
router.get("/lecture/:id", isAuth, fetchLecture)
export default router
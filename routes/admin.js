import express from 'express'
import { isAdmin, isAuth } from '../middleware/isAuth.js'
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllStats, getAllUser, updateRole } from '../controllers/admin.js'
import { uploadFile } from '../middleware/multer.js'


const router = express.Router()


router.post("/course/new", isAuth, isAdmin, uploadFile, createCourse)
router.post("/course/:id", isAuth, isAdmin, uploadFile, addLecture)
router.delete("/course/delete/:id", isAuth, isAdmin, deleteCourse)

router.delete("/lecture/delete/:id", isAuth, isAdmin, deleteLecture)
router.get("/stats", isAuth, isAdmin, getAllStats)
router.put("/user/:id", isAuth, isAdmin, updateRole)
router.get("/users", isAuth, isAdmin, getAllUser)
export default router
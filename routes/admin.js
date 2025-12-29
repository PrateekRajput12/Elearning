import express from 'express'
import { isAdmin, isAuth } from '../middleware/isAuth.js'
import { addLecture, createCourse } from '../controllers/admin.js'
import { uploadFile } from '../middleware/multer.js'


const router = express.Router()


router.post("/course/new", isAuth, isAdmin, uploadFile, createCourse)
router.post("/course/:id", isAuth, isAdmin, uploadFile, addLecture)
export default router
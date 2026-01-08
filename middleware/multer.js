// import multer from 'multer'
// import { v4 as uuid } from 'uuid'

// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, "uploads")
//     },
//     filename(req, file, cb) {
//         const id = uuid()

//         const extName = file.originalname.split(".").pop()

//         const fileName = `${id}.${extName}`

//         cb(null, this.filename)
//     }
// })


// export const uploadFile = multer({ storage }).single("file")


// import multer from 'multer'
// import { v4 as uuid } from 'uuid'


// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, "uploads")
//     },
//     filename(req, file, cb) {
//         const id = uuid()
//         const extName = file.originalname.split(".").pop()
//         const fileName = `${id}.${extName}`

//         cb(null, fileName)   // ✅ FIX HERE
//     }
// })

// export const uploadFile = multer({ storage }).single("file")



import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        let resourceType = "image";

        if (file.mimetype.startsWith("video")) {
            resourceType = "video";
        }

        return {
            folder: "elearning",
            resource_type: resourceType,
        };
    },
});

const upload = multer({ storage });

export default upload;
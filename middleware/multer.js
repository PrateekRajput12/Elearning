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


import multer from 'multer'
import { v4 as uuid } from 'uuid'

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads")
    },
    filename(req, file, cb) {
        const id = uuid()
        const extName = file.originalname.split(".").pop()
        const fileName = `${id}.${extName}`

        cb(null, fileName)   // ✅ FIX HERE
    }
})

export const uploadFile = multer({ storage }).single("file")

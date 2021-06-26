// const multer =require = require('multer')

// const Storage = multer.diskStorage({
//     destination : (req, file, cb) => {
//         cb(null,'./public/images')
//     },
//     filename : (req, file, cb) => {
//         const ext = file.originalname.substr(file.originalname.lastIndexOf('.'))
//         cb(null, file.fieldname + "_" + Date.now() + file.originalname)
//     }
// })

// const upload = multer({
//     storage: Storage,
// }).single('image')

// module.exports = upload
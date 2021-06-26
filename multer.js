const multer =require = require('multer')

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null,'uploads')
    },
    filename : (req, file, cb) => {
        const ext = file.originalname.substr(file.originalname.lastIndexOf('.'))
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

store = multer({storage:storage})
module.exports = store
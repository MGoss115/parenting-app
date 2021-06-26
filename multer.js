const multer =require = require('multer')
const storage = multer.memoryStorage()


const fileFilter = (req, file, cb) => {
    //if the filetype is not right
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

module.exports = upload
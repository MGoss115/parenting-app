const mongoose = require('../db/connection')

const KidSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assignment'
        },
       
    },
   
)

const Kid = mongoose.model('Kid', KidSchema)
module.exports = Kid
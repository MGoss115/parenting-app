const mongoose = require('../db/connection')

const KidsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
       
    },
    { timestamps: true }
)

const Kids = mongoose.model('Kids', KidsSchema)
module.exports = Kids
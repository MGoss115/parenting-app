const mongoose = require('../db/connection')

const AssignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        complete: {
            type: Boolean,
            default: false,
        },
    },
   
)

const Assignment = mongoose.model('Assignment', AssignmentSchema)
module.exports = Assignment

const mongoose = require('../db/connection')

const AssignmentSchema = new mongoose.Schema(
    {
        homework: {
            type: [String], 
           
        },
        clean: {
            type: [String],
           
        },
        schedule: {
            type: [String],
           
        },
    },
   
)

const Assignment = mongoose.model('Assignment', AssignmentSchema)
module.exports = Assignment

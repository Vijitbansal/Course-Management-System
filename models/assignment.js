const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'CourseSchema'
    },
    description: {
        type: String,
        required: true,
    },
    start_time: {
        type: Date,
        required: true,
    },
    end_time: {
        type: Date,
        required: true,
    }
},{timestamp:true})

const Assignment = mongoose.model("AssignmentSchema", assignmentSchema);

module.exports = Assignment;


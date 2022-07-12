const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    course_id: {
        type: ObjectId,
        required: true,
    },
    description: {
        type: string,
        required: true,
    },
    start_time: {
        type: date,
        required: true,

    },end_time: {
        type: date,
        required: true,
    }
})

const Assignment = mongoose.model("AssignmentSchema", assignmentSchema);

module.exports = Assignment;


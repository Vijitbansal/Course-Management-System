const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
},{timestamp:true})

const Enrollment = mongoose.model("EnrollmentSchema", enrollmentSchema);

module.exports = Enrollment;

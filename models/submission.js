const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    student_id: {
        type: ObjectId,
        required: true,
    },
    assignment_id: {
        type: ObjectId,
        required: true,
    },
    submission_time: {
        type: date,
        required: true,
    },
    file_url: {
        type: string, 
        required: true,
    },
    grade: {
        type: string,
        enum:['A', 'B', 'C','D','F'],
        required: true,
    }
})

const Submission = mongoose.model("SubmissionSchema", submissionSchema);

module.exports = Submission;

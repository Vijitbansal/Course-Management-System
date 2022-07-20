const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    assignment_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    submission_time: {
        type: Date,
        required: true,
    },
    file_url: {
        type: String, 
        required: true,
    },
    grade: {
        type: String,
        enum:['A', 'B', 'C','D','F'],
        // default:"A",
        required: false,
    }
})

const Submission = mongoose.model("SubmissionSchema", submissionSchema);

module.exports = Submission;

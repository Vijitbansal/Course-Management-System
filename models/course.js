const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    educator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema'
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String, 
        default:"UPCOMING",
        enum:['UPCOMING', 'RUNNING', 'COMPLETED'],
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    students_enrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,  // remaining if else in schema for checking educator h ya student 
            ref: 'UserSchema',
            unique: true
        }
    ],
    assignments: [
        {
            type: mongoose.Schema.Types.ObjectId,   
            ref: 'Assignment'
        }
    ]
   
},{timestamp:true})

const Course = mongoose.model("CourseSchema", courseSchema);

module.exports = Course;

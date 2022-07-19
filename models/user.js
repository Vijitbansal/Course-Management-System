const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
        required: true,
    },
    type: {
        type: String,
        enum:['ADMIN','EDUCATOR','STUDENT'],
        required: true,
    },
    course_enrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CourseSchema'
        }
    ]
},{timestamp:true})

const User = mongoose.model("UserSchema", userSchema);

module.exports = User;


const express = require("express");
const Enrollment = require("../models/enrollment");
const route = express.Router()
const Course = require("../models/course")

//create enrollment 
module.exports.create = async  (req, res)=> {
    try {
        const is_valid_user =  req.user ;
        console.log(is_valid_user,"+++++++++++")
        console.log(is_valid_user,"#####");
        // if(is_valid_user.type!="STUDENT")
        // {
        //     return res.status(403).json({
        //         message:"Only students can enroll"
        //     })
        // }

        const course_id = req.params.id; 
        console.log(course_id,"idddddddd");
        const is_exist = is_valid_user.course_enrolled.indexOf(course_id)
        console.log(is_exist,"#####");

        if(is_exist!=-1){
            return res.status(400).json({
                        message:"Student already enrolled"
                    })
        }
        let course = await Course.findById(course_id)
        // course.student_enrolled.push(is_valid_user.id)
        if(course){
            console.log(course.students_enrolled,"91919199919191999919");
            course.students_enrolled.push(is_valid_user.id)
            is_valid_user.course_enrolled.push(course_id)
            course.save();
            is_valid_user.save();
            // course.save(function(err) {
            //     return res.status(400).json({
            //         message:`Student already enrolled ${err}`
            //     })
            //   });
            return res.status(200).json({
                message:"Students enrolled in this course",
                data:course
                })
        }
    } catch (err) {
        console.log(err,"errrrrrr");
        return res.status(500).json({
            message:"Some error occured"
        })
    }

}
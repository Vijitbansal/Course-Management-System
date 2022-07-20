const express = require("express");
const Assignment = require("../models/assignment");
const route = express.Router()
const Course = require("../models/course")

//create assignment 
module.exports.create = async  (req, res)=> {
    try {
        const is_valid_user =  req.user ;
        if(is_valid_user.type!="EDUCATOR")
        {
            return res.status(403).json({
                message:"Only educators can create assignment"
            })
        }
        const { course_id , description, start_time, end_time } = req.body ; 
        let course = await Course.findById(course_id)
        if(course){
            console.log(req.body);
            console.log(course_id,"idddddddd");
            let newAssignment = await Assignment.create({
                course_id,
                description,
                start_time,
                end_time
            });
            if(newAssignment){
                course.assignments.push(newAssignment);
                course.save();
            }
            return res.status(200).json({
                message:"Assignment created successfully"
            })
        }
    } catch (err) {
        console.log(err,"errrrrrr");
        return res.status(500).json({
            message:"Some error occured"
        })
    }

}

//update assignment 
module.exports.update = async function (req, res) {
    try {
        const is_valid_user =  req.user ;
        if(is_valid_user.type!="EDUCATOR")
        {
            return res.status(403).json({
                message:"Only educators can update assignment"
            })
        }
            const{id} = req.params;
            let oldAssignment = await Assignment.findById(id);
            if(oldAssignment){
                if(req.body.end_date){
                    oldAssignment.end_date=req.body.end_date
                }
                if(req.body.description){
                    oldAssignment.description=req.body.description
                }
                oldAssignment.save() // Description, end_date

                return res.status(200).json({
                    message:"Assignment updated successfully"
                })
            }
                return res.status(400).json({
                    message:"Assignment not found"
            
                })}
        catch (err) {
        console.log(err,"errrrrrr");
        return res.status(500).json({
            message:"Some error occured"
        })
    }
}

//delete assignment 
module.exports.delete = async function (req, res) {
    try {
        const is_valid_user =  req.user ;
        if(is_valid_user.type!="EDUCATOR")
        {
            return res.status(403).json({
                message:"Only educators can delete assignment"
            })
        }
        let assignment = await Assignment.findById(req.params.id);
        let course_id = assignment.course_id;
        if (assignment) {
            Assignment.remove();
            let course = await Course.findById(course_id);
            let idx = course.assignments.indexOf(req.params.id);

            course.assignments.splice(idx, 1);
            course.save();
            assignment.delete();
        }
        return res.status(200).json({
            message:"Assignment deleted successfully"
        })
    }
    catch (err) {
        console.log("Error in deleting assignment", err);
        return;
    }
}

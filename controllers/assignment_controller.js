const express = require("express");
const Assignment = require("../models/assignment");
const route = express.Router()
const Course = require("../models/assignment")

//create course 
module.exports.create = async  (req, res)=> {
    try {
        const is_valid_user =  req.user ;
        console.log(is_valid_user,"+++++++++++")
        // console.log(is_valid_user,"#####");
        if(is_valid_user.type!="EDUCATOR")
        {
            return res.status(403).json({
                message:"Only educators can create assignment"
            })
        }

            const{id,description,start_date,end_date} = req.body; 
            console.log(id,"idddddddd");
            let newAssignment = await Assignment.create({
                id,
                description,
                start_date,
                end_date
            });
            return res.status(200).json({
                message:"Assignment created successfully"
            })
            
    } catch (err) {
        console.log(err,"errrrrrr");
        return res.status(500).json({
            message:"Some error occured"
        })
    }

}

//update course 
module.exports.update = async function (req, res) {
    try {
        const is_valid_user =  req.user ;
        // console.log(is_valid_user,"#####");
        if(is_valid_user.type!="EDUCATOR")
        {
            return res.status(403).json({
                message:"Only educators can update assignment"
            })
        }
            const{id} = req.params;
            let oldAssignment = await Assignment.findById(id);
            console.log(oldAssignment,"llllllllllllllll")
            if(oldAssignment){
                if(req.body.end_date){
                    oldAssignment.end_date=req.body.end_date
                }
                if(req.body.description){
                    oldAssignment.description=req.body.description
                }
                console.log(oldAssignment,"Oooooooooooooo")
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
        let assignment = await Assignment.findById(req.params.id);
        let course_id = assignment.course_id;
        if (assignment) {
            Assignment.remove();
            let course = await Course.findById(course_id);
            let idx = Course.assignment.indexOf(req.params.id);

            Course.assignment.splice(idx, 1);
            Course.save();
            assignment.save();
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

//View all the submissions against an assignment

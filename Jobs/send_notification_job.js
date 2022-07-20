const express = require("express");
const { map } = require("..");
const Assignment = require("../models/assignment");
const Course = require("../models/course");
const Submission = require("../models/submission");


module.exports.send_notification_job = async () =>{
    try{
        const assignments = await Assignment.find({}) 
        let current_date = new Date();
        let student_ids = []
        let filter_students = []
        let relatedAssignment = []
        let relation = new Map()
        if(assignments){
            for (const assignment of assignments)
             {
               if(assignment.start_time <= current_date && assignment.end_time >= current_date){
                   let course_id = assignment.course_id
                   let course = await Course.findById(course_id)
                   if(course)
                   {
                     student_ids = course.students_enrolled

                   }
                   if(student_ids)
                   {
                    for (const student_id of student_ids)
                     {
                        let submission = await Submission.find({student_id: student_id, assignment_id: assignment.id })
                        if(submission.length==0){
                            filter_students.push(student_id)
                            relatedAssignment.push(assignment.id)
                            relation.set(student_ids,assignment.id)
                        }
                     }
                   } 
               }   
            }
            return relation        
        }
        console.log("Sending notification to all the students")
        return []
    }
    catch(err){
        console.log(err,"Error in sending the notification")
    }
}
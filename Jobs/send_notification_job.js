const express = require("express");
const { map } = require("..");
const Assignment = require("../models/assignment");
const Course = require("../models/course");
const Submission = require("../models/submission");


module.exports.send_notification_job = async () =>{
    try{
        console.log("AAAGYE")
        const assignments = await Assignment.find({}) 
        console.log(assignments,"bobtyyyyyyyyyyyyyy")
        // const assignments=1
        // if(assignments)
        // console.log(assignments,"chunkyyyyyy")
        let current_date = new Date();
        let student_ids = []
        let filter_students = []
        let relatedAssignment = []
        let relation = new Map()
        if(assignments){
            console.log(assignments,"bobtyyyyy")
            console.log(filter_students,"000 bada chunkyyyyy")

            for (const assignment of assignments)
             {
               if(assignment.start_time <= current_date && assignment.end_time >= current_date){
                   let course_id = assignment.course_id
                   let course = await Course.findById(course_id)
                   if(course)
                   {
                    console.log(course,"bada bobtyyyy")
                    console.log(filter_students,"111 bada chunkyyyyy")

                     student_ids = course.students_enrolled

                   }
                   if(student_ids)
                   {
                    console.log(filter_students,"222 bada chunkyyyyy")

                    console.log(student_ids,"chhotaa bobtyyy")
                    for (const student_id of student_ids)
                    //  student_ids.forEach( async (student_id) =>
                     {
                        console.log(student_id,assignment.id,"badaaa satyaansh")
                        let submission = await Submission.find({student_id: student_id, assignment_id: assignment.id })
                        if(submission.length==0){

                            console.log(submission,"bada satyaansh")
                            console.log(submission,"bada kiraaaa")
                            console.log(student_id,"bada acffffff")
                            console.log(filter_students,"333 bada chunkyyyyy")
                            filter_students.push(student_id)
                            relatedAssignment.push(assignment.id)
                            relation.set(student_ids,assignment.id)
                            // relation[student_id].push(assignment.id)
                            console.log(filter_students,"444 bada chunkyyyyy")

                        }
                        console.log(filter_students,"bada chunkyyyyy")
                     }
                   } 
               }   
            }
            console.log("ho rha h ?")//nhi
            return relation        
        }
        console.log("Updating the status of the course from running to completed")
        return []
    }
    catch(err){
        console.log(err,"Error in updating the status of the job.")
    }
}
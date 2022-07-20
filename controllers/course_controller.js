const express = require("express");
const route = express.Router();
const Course = require("../models/course");
const User = require("../models/user");

//create course
module.exports.create = async (req, res) => {
  try {
    const is_valid_user = req.user;
    if (is_valid_user.type != "EDUCATOR") {
      return res.status(403).json({
        message: "Only educators can create course",
      });
    }
    const { name, description, capacity, start_date, end_date } = req.body;
    let newCourse = await Course.create({
      name,
      description,
      capacity,
      start_date,
      end_date,
    });
    return res.status(201).json({
      message: "Course created successfully",
    });
  } catch (err) {
    console.log(err, "errrrrrr");
    return res.status(500).json({
      message: "Some error occured",
    });
  }
};

//update course
module.exports.update = async function (req, res) {
  try {
    const is_valid_user = req.user;
    if (is_valid_user.type != "EDUCATOR") {
      return res.status(403).json({
        message: "Only educators can update course",
      });
    }
    const { id } = req.params;
    let today = new Date();
    let oldCourse = await Course.findById(id);
    let new_state = ""
    console.log(oldCourse, "llllllllllllllll");
    if (oldCourse) {
      if (req.body.capacity) {
        oldCourse.capacity = req.body.capacity;
      }
      if (req.body.name) {
        oldCourse.name = req.body.name;
      }
      if (req.body.description) {
        oldCourse.description = req.body.description;
      }
      if (req.body.start_date) {
        oldCourse.start_date = req.body.start_date;
      }
      if (req.body.end_date) {
        oldCourse.end_date = req.body.end_date;
      }
      if(oldCourse.end_date < oldCourse.start_date){
        return res.status(400).json({
            message: "Course start date should not exceed course end date",
          })
      }
      if(oldCourse.start_date > today){
        new_state = "UPCOMING"
      }
      else if (oldCourse.end_date < today){
        new_state = "COMPLETED"
      }
      else{
        new_state = "RUNNING"
      }
      if(new_state!=oldCourse.state){
        return res.status(400).json({
            message: "Cannot update state of the course"
          })
      }
      console.log(oldCourse, "Oooooooooooooo");
      oldCourse.save();

      return res.status(201).json({
        message: "Course updated successfully",
      });
    }
    return res.status(400).json({
      message: "Course not found",
    });
  } catch (err) {
    console.log(err, "errrrrrr");
    return res.status(500).json({
      message: "Some error occured",
    });
  }
};

module.exports.view_students = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id).populate(
      "students_enrolled"
    );
    if (course) {
      return res.status(200).json({
        message: "List of students enrolled in the respective course",
        data: course.students_enrolled,
      });
    }
    return res.status(404).json({
      message: "Course not found",
    });
  } catch (err) {
    console.log(err, "errrrrrr");
    return res.status(500).json({
      message: "Some error occured",
    });
  }
};

module.exports.student_courses = async (req, res) => {
  try {
    upcoming_courses = [];
    running_courses = [];
    completed_courses = [];
    todayDate = new Date();
    let user_courses = await User.findById(req.params.id).populate(
      "course_enrolled")
    if(user_courses){
        console.log(user_courses,"coursesssssssss");
        console.log(user_courses.course_enrolled,"coursesssssssss");
        user_courses.course_enrolled.forEach((course) => {

          if (course.end_date > todayDate && course.start_date < todayDate) {
            running_courses.push(course);
          } 
          else if(course.start_date > todayDate ){
            upcoming_courses.push(course);
          }
          else {
            completed_courses.push(course);
          }
        });
        return res.status(200).json({
            upcomongCourses : upcoming_courses,
            runningCourses: running_courses,
            completedCourses: completed_courses  
          });
    }
  } catch (err) {
    console.log(err, "errrrrrr");
    return res.status(500).json({
      message: "Some error occured",
    });
  }
};

const express = require("express");
const Course = require("../models/course");

module.exports.update_course_status_job = async () => {
  try {
    let courses = await Course.find({});
    let current_date = new Date();
    if (courses) {
      courses.forEach((course) => {
        if (course.status == "RUNNING" && course.end_date < current_date) {
          course.status = "COMPLETED";
          course.save();
        }
      });
    }
    console.log("Updating the status of the course from running to completed");
  } catch {
    console.log("Error in updating the status of the job.");
  }
};

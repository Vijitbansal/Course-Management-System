const express = require("express");
const router = express.Router();
const course_controller =  require("../controllers/course_controller");
const token_verification = require("../config/token_verification") //middleware used


router.post("/create",token_verification.checkAuthentication, course_controller.create);
router.put("/update/:id",token_verification.checkAuthentication, course_controller.update);
router.get("/view_students/:id", course_controller.view_students);
router.get("/student_courses/:id", course_controller.student_courses);

// router.post("/delete", course_controller.delete);

module.exports = router;
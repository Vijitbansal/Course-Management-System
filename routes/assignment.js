const express = require("express");
const router = express.Router();
const assignment_controller =  require("../controllers/assignment_controller");
const token_verification = require("../config/token_verification") //middleware used

// doubt ki assignment will be created in the course then will the route be : /course/assignment/create  ????

router.post("/create",token_verification.checkAuthentication, assignment_controller.create);
router.put("/update/:id",token_verification.checkAuthentication, assignment_controller.update);
router.post("/delete",token_verification.checkAuthentication, assignment_controller.delete);
// router.get("/view_submissions/:id", assignment_controller.view_submissisons);

module.exports = router;
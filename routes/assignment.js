const express = require("express");
const router = express.Router();
const assignment_controller =  require("../controllers/assignment_controller");
const token_verification = require("../config/token_verification") //middleware used


router.post("/create",token_verification.checkAuthentication, assignment_controller.create);
router.put("/update/:id",token_verification.checkAuthentication, assignment_controller.update);
router.delete("/delete/:id",token_verification.checkAuthentication, assignment_controller.delete);
module.exports = router;
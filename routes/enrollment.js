const express = require("express");
const router = express.Router();
const enrollment_controller =  require("../controllers/enrollment_controller");
const token_verification = require("../config/token_verification") //middleware used
router.post("/create/:id",token_verification.checkAuthentication, enrollment_controller.create);

module.exports = router;
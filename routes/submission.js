const express = require("express");
const router = express.Router();
const submission_controller =  require("../controllers/file.controller");
const token_verification = require("../config/token_verification") //middleware used


// router.post("/", upload_controller.upload);
router.post("/upload", submission_controller.upload);
router.get("/files", submission_controller.getListFiles);
router.get("/files/:name", submission_controller.download);
router.post("/grades",token_verification.checkAuthentication, submission_controller.update_grade);
// router.post("/grades", submission_controller.update_grade);


module.exports = router;
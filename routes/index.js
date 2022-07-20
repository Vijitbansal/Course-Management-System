const express = require("express");
const router = express.Router();
const users = require("./users");
const course = require("./course");
const assignment = require("./assignment");
const enrollment = require("./enrollment");
const submission = require("./submission");

router.use("/assignment/submission", submission);
router.use("/enrollment", enrollment);
router.use("/assignment", assignment);
router.use("/course", course);
router.use("/user", users);
module.exports = router;


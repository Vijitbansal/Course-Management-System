const express = require("express");
const router = express.Router();
const users = require("./users");
const course = require("./course");
const assignment = require("./assignment");
const enrollment = require("./enrollment");

router.use("/enrollment", enrollment);
router.use("/assignment", assignment);
router.use("/course", course);
router.use("/user", users);
module.exports = router;


const express = require("express");
const router = express.Router();

// const home_controller = require("../controllers/home_controller");
const users = require("./users");
const course = require("./course");

router.use("/course", course);
router.use("/user", users);
module.exports = router;


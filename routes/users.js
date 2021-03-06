const express = require("express");
const router = express.Router();
const user_controller =  require("../controllers/user_controller");
const token_verification = require("../config/token_verification") //middleware used

router.post("/login", user_controller.login);
router.post("/signup", user_controller.signup);
// router.post("/logout", user_controller.logout);
router.post("/create",token_verification.checkAuthentication, user_controller.create);
router.delete("/delete/:id",token_verification.checkAuthentication, user_controller.delete);

module.exports = router;
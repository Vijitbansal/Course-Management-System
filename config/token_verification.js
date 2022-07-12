const jwt = require("jsonwebtoken");
const User = require("../models/user")

module.exports.checkAuthentication = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        // console.log(req.headers);
        console.log(token);
        if (!token) {
            return res.status(403).json({
                message: "Invalid credentials"
            });
        }
        const secret = "secret"
        const verified = jwt.verify(token, secret);
        console.log(verified, "^^^^^^");
        if (!verified) {
            return res.status(403).json({
                message: "Invalid credentials"
            });
        }
        const user = await User.findById(verified.id);
        console.log(user, "userrrrrrrr");
        if (!user) {
            return res.status(403).json({
                message: "Invalid credentials"
            });
        }
        req.user=user;
        return next();
    } catch (err) {
        console.log(err,"errrrrrrrrrr");
        return res.status(403).json({
            message: "Invalid credentials"
        });
    }
}
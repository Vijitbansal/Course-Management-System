const express = require("express")
const User = require("../models/user")
const jwt = require("jsonwebtoken");


module.exports.create = async function (req, res) {
    try {
        const is_valid_user =  req.user ;
        // console.log(is_valid_user,"#####");
        if(is_valid_user.type!="ADMIN")
        {
            return res.status(403).json({
                message:"Only admins can create users"
            })
        }
            const{name,phone,type} = req.body;
            if(type=="STUDENT"){
                return res.status(403).json({
                    message:"Admins cannot create students"
                })
            }
            let newUser = await User.create({
                name : name,
                phone :phone,
                type:type,
                password:"password" 
            });
            return res.status(201).json({
                message:"Educator created successfully"
            })
            
    } catch (err) {
        console.log(err,"errrrrrr");
        return res.status(500).json({
            message:"Some error occured"
        })
    }

}

module.exports.login = async function (req, res) {
    try {
        console.log(req.body,"**********");
        const { phone, password } = req.body;
        console.log("***", phone, "*****", password);
        if (!phone || !password) {
            return res.status(400).json({ msg: "All fields are required." });
        }
        const existUser = await User.findOne({ phone: phone });
        // console.log(existUser);
        if (!existUser) {
            return res.status(400).json({ msg: "User does not exist." });
        }
        // const isMatch = await bcrypt.compare(password, existUser.password);
        // console.log(isMatch);
        const isMatch = (password==existUser.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials." });
        }
        const secret="secret";
        const token = jwt.sign({ id: existUser.id }, secret);
        return res.json({ token, user: { id: existUser.id, name: existUser.name } });

    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Login failed." });
    }
}

module.exports.logout = function (req, res) {

}

module.exports.delete = function (req, res) {

}
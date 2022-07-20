const express = require("express")
const User = require("../models/user")
const jwt = require("jsonwebtoken");


module.exports.create = async function (req, res) {
    try {
        const is_valid_user =  req.user ;
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
            let pass = name+phone.substr(phone.length - 5);      
                let newUser = await User.create({
                name : name,
                phone :phone,
                type:type,
                password: Buffer.from(pass).toString('base64')
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
        const { phone, password } = req.body;
        console.log("*****", phone, "*****", password);
        if (!phone || !password) {
            return res.status(400).json({ msg: "All fields are required." });
        }
        const existUser = await User.findOne({ phone: phone });
        if (!existUser) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        const isMatch = (password==Buffer.from(existUser.password, 'base64').toString('ascii'));
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials." });
        }
        const secret="secret";
        const token = jwt.sign({ id: existUser.id }, secret , {expiresIn:'2h'});
        return res.json({ token, user: { id: existUser.id, name: existUser.name } });

    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Login failed." });
    }
}
module.exports.signup = async function (req, res) {
    try {
        console.log(req.body,"**********");
        const { name , phone, password } = req.body;
        console.log(name,"****", phone, "*****", password);
        if (!name || !phone || !password) {
            return res.status(400).json({ msg: "All fields are required." });
        }
        const existUser = await User.findOne({ phone: phone });
        if(existUser){
            return res.status(400).json({ msg: "User already exist" });
        }
        const user = await User.create({
            name,
            phone,
            password,
            type: "STUDENT",
            active:true
        })
       if(user){
        req.user = user;
        return res.status(200).json({
            message:"Student created successfully",
            data: user
        })
    }
    return res.status(400).json({ msg: "User is not created" });
   }
     catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "User creation failed." });
    }
}

module.exports.delete = async function (req, res) {
    try {
        const is_valid_user =  req.user ;
        if(is_valid_user.type!="ADMIN")
        {
            return res.status(403).json({
                message:"You don't have permission to delete this user"
            })
        }
        const { id } = req.param;
        const existUser = await User.deleteOne({ id });
        if (!existUser) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Error in deleting user" });
    }
}
const express = require("express")
const adminRoute = express.Router()
const { AdminModel } = require("../Models/Admin.Model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


adminRoute.post("/signup", async (req, res) => {
    const { email, name, password,  bloodgroup, address, confirmpassword, phone ,branch,subject,rollno} = req.body
    try {
        const adminuser = await AdminModel.findOne({ email })
        if (adminuser) {
            res.status(200).send({ "message": "User Already Exists please login" })
        } else if (password != confirmpassword) {
            res.status(200).send({ "message": "Password Differes please enter it again" })
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                const newuser = AdminModel({ name, password: hash, email, bloodgroup, address, phone,branch,subject,rollno})
                await newuser.save()
                res.status(200).send({ "message": "User Registered Successfully" })
            })
        }
    } catch (err) {
        res.status(400).send({ "message": err })
    }
})


adminRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await AdminModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({  userid: user._id }, 'sg_mart');
                    res.status(200).send({ "message": "Login Successfull", "token": token })
                } else {
                    res.status(200).send({ "message": "Incorrect Password" })
                }
            });
        } else {
            res.status(200).send({ "message": "User not registered Please register" })
        }
    } catch (err) {
        res.status(400).send({ "message": err })
    }
})


module.exports = {
    adminRoute
}
const express = require("express");
const attendanceRoute = express.Router();
const { AttendanceModel } = require("../Models/Attendance.Model");
const { AdminModel } = require("../Models/Admin.Model")
const {auth}=require("../MiddleWare/auth")


attendanceRoute.post("/mark",auth, async (req, res) => {
    const {userid,rollno}=req.body
    try {
        const user= await AdminModel.findOne({_id:userid})
        if(user){
            if(user.rollno==rollno){
                const checkattendance= await AttendanceModel.findOne({rollno})
                if(checkattendance){
                    const attdate=await checkattendance.date.toISOString().split('T')[0];
                    const today = new Date().toISOString().split('T')[0];
                    if(attdate==today){
                        res.status(200).send({ message: "Attendance Already Marked for today" });
                    }else{
                        const attendance = new AttendanceModel(req.body);
                        await attendance.save();
                        res.status(200).send({ message: "Attendance marked successfully" }); 
                    }     
                }else{
                    const attendance = new AttendanceModel(req.body);
                    await attendance.save();
                    res.status(200).send({ message: "Attendance marked successfully" });
                }
            }else{
                res.status(200).send({ message: "Wrong Roll number According to your id" });
            }
        }else{
            res.status(200).send({ message: "User with the roll number not found" });
        }

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

attendanceRoute.get("/user/:rollno", async (req, res) => {
    const rollno = req.params.rollno;
    try {
        const attendance = await AttendanceModel.find({ rollno }).populate('rollno');
        res.status(200).send({ attendance });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

attendanceRoute.get("/all", async (req, res) => {
    try {
        const attendance = await AttendanceModel.find().populate('rollno');
        res.status(200).send({ attendance });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = {
    attendanceRoute
};

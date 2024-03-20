const express=require("express")
const cors=require("cors")
const {adminRoute}=require("./Routes/Admin.Route")
require('dotenv').config()
const {attendanceRoute}=require("./Routes/Attendance.Route")
const {connection}=require("./db")
const app=express()
app.use(express.json())
app.use(cors())
app.use("/admin",adminRoute)
app.use("/attendance",attendanceRoute)




app.get("/otp",(req,res)=>{
    try{
res.status(200).send({"message":"login",isAuth:true}) 
    }catch(err){
        res.status(400).send({"message":err.message}) 
    }
})




app.listen(process.env.PORT,async()=>{
try{
    await connection
    console.log("connected to DB")
    console.log(`Server is running at ${process.env.PORT} port`)
}catch(error){
console.log(error)
}
})






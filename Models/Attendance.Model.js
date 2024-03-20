const mongoose = require("mongoose");

const AttendanceSchema = mongoose.Schema({
    rollno: { type:Number, required:true},
    date: { type: Date, default: Date.now ,required:true },
    status: { type: String, enum: ["present", "absent"], default: "absent" ,required:true},
    userid:{type:String,required:true}
}, {
    versionKey: false
});

const AttendanceModel = mongoose.model("attendance", AttendanceSchema);

module.exports = {
    AttendanceModel
};

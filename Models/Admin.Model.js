const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    name: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    phone: { required: true, type: Number },
    address: { required: true, type: String },
    bloodgroup: {
        required: true,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        type: String
    },
    branch: { required: true, type: String },
    subject: { required: true, type: String },
    rollno: { required: true, type: Number },
}, {
    versionKey: false
});

const AdminModel = mongoose.model("admin", AdminSchema);

module.exports = {
    AdminModel
};

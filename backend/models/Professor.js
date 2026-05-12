const mongoose = require("mongoose");

const professorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String },
    designation: { type: String },
    profileImage: { type: String },
    isBlocked: { type: Boolean, default: false },
    createdByAdmin: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Professor", professorSchema);

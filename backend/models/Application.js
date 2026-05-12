const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
    required: true
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },

  applicantName: {
    type: String,
    required: true
  },

  formData: {
    type: Object
  },

  documents: {
    type: Object
  },

  submittedAt: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    enum: ["Pending", "Qualified", "Rejected"],
    default: "Pending"
  },
  serialNumber: Number,


}, { timestamps: true });



module.exports = mongoose.model("Application", applicationSchema);
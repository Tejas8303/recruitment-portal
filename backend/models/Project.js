const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectCode: {
    type: String,
    required: true,
    unique: true
  },

  projectTitle: {
    type: String,
    required: true
  },

  deadline: {
    type: Date,
    required: true
  },

  requiredDocuments: [
    {
      type: String
    }
  ],

  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor"
  }

}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
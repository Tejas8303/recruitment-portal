const Professor = require("../models/Professor");
const Project = require("../models/Project");
const Application = require("../models/Application");
const bcrypt = require("bcryptjs");

// CREATE PROFESSOR
exports.createProfessor = async (req, res) => {
  try {
    const { name, email, password, department, designation, profileImage } = req.body;

    const existingProfessor = await Professor.findOne({ email });
    if (existingProfessor) {
      return res.status(400).json({ message: "Professor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const professor = await Professor.create({
      name,
      email,
      password: hashedPassword,
      department,
      designation,
      profileImage
    });

    res.status(201).json({ message: "Professor created successfully", professor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET ALL PROFESSORS
exports.getProfessors = async (req, res) => {
  try {
    const professors = await Professor.find().select("-password");
    res.json(professors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// TOGGLE BLOCK PROFESSOR
exports.toggleProfessorBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await Professor.findById(id);

    if (!professor) {
      return res.status(404).json({ message: "Professor not found" });
    }

    professor.isBlocked = !professor.isBlocked;
    await professor.save();

    res.json({ message: `Professor ${professor.isBlocked ? "blocked" : "unblocked"} successfully`, professor });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL PROJECTS
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("professor", "name email department");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE PROJECT
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Optionally delete all applications associated with this project
    await Application.deleteMany({ project: id });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL APPLICATIONS
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("student", "name email")
      .populate("project", "projectTitle projectCode")
      .populate("professor", "name email");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

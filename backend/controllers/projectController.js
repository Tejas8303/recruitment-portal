const Project = require("../models/Project");

// CREATE PROJECT (PROFESSOR)
exports.createProject = async (req, res) => {
  try {
    const { projectCode, projectTitle, description, deadline, requiredDocuments } = req.body;

    const project = await Project.create({
      projectCode,
      projectTitle,
      description,
      deadline,
      requiredDocuments,
      professor: req.professor._id
    });

    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET PROFESSOR'S OWN PROJECTS
exports.getProfessorProjects = async (req, res) => {
  try {
    const projects = await Project.find({ professor: req.professor._id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET PROFESSOR'S SINGLE PROJECT
exports.getProfessorProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, professor: req.professor._id });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE PROFESSOR'S PROJECT
exports.updateProfessorProject = async (req, res) => {
  try {
    const { projectTitle, deadline, requiredDocuments } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, professor: req.professor._id },
      { projectTitle, deadline, requiredDocuments },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE PROFESSOR'S PROJECT
exports.deleteProfessorProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, professor: req.professor._id });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL PROJECTS (USER DASHBOARD)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("professor", "name department").sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE PROJECT (USER)
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("professor", "name department");
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const Professor = require("../models/Professor");
const Project = require("../models/Project");
const Application = require("../models/Application");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// Helper: delete all uploaded files for an application from disk
function deleteApplicationFiles(application) {
  const documents = application.documents || {};
  for (const filePath of Object.values(documents)) {
    if (!filePath) continue;
    try {
      const absolutePath = path.join(__dirname, "..", filePath);
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    } catch (err) {
      console.error("Failed to delete file:", filePath, err.message);
    }
  }
}

// CREATE PROFESSOR
exports.createProfessor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingProfessor = await Professor.findOne({ email });
    if (existingProfessor) {
      return res.status(400).json({ message: "Professor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const professor = await Professor.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Professor created successfully", professor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// BULK UPLOAD PROFESSORS
exports.bulkUploadProfessors = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a CSV file" });
  }

  const results = [];
  let total = 0;
  let created = 0;
  let duplicates = 0;
  let failed = 0;

  const { Readable } = require("stream");
  const stream = Readable.from(req.file.buffer);

  stream
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      total = results.length;
      
      for (const row of results) {
        try {
          const { name, email, password } = row;
          if (!name || !email || !password) {
            failed++;
            continue;
          }

          const existingProfessor = await Professor.findOne({ email });
          if (existingProfessor) {
            duplicates++;
            continue;
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          await Professor.create({
            name,
            email,
            password: hashedPassword
          });
          created++;
        } catch (error) {
          failed++;
        }
      }

      res.status(200).json({
        total,
        created,
        duplicates,
        failed
      });
    })
    .on("error", (error) => {
      res.status(500).json({ message: "Error parsing CSV", error: error.message });
    });
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

// DELETE PROFESSOR
exports.deleteProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await Professor.findByIdAndDelete(id);
    if (!professor) {
      return res.status(404).json({ message: "Professor not found" });
    }

    // Cascade delete: find all projects by this professor
    const projects = await Project.find({ professor: id });
    for (const project of projects) {
      // Delete uploaded files for applications in this project
      const applications = await Application.find({ project: project._id });
      for (const app of applications) {
        deleteApplicationFiles(app);
      }
      await Application.deleteMany({ project: project._id });
      await Project.findByIdAndDelete(project._id);
    }

    res.json({ message: "Professor account and related data deleted successfully" });
  } catch (error) {
    console.error(error);
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

// DELETE PROJECT (ADMIN — cascade: applications + uploaded files)
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Delete uploaded files from disk, then remove application records
    const applications = await Application.find({ project: id });
    for (const app of applications) {
      deleteApplicationFiles(app);
    }
    await Application.deleteMany({ project: id });

    res.json({ message: "Project and all related applications deleted successfully" });
  } catch (error) {
    console.error(error);
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

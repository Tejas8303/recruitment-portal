const Application = require("../models/Application");
const Project = require("../models/Project");
const fs = require("fs");
const path = require("path");
const request = require("request");
const { Parser } = require("json2csv");
const archiver = require("archiver");

// SUBMIT APPLICATION (STUDENT)
exports.submitApplication = async (req, res) => {
  try {
    const { projectId, applicantName, formData } = req.body;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (new Date() > new Date(project.deadline)) {
      return res.status(400).json({ message: "Application deadline passed" });
    }

    const existing = await Application.findOne({
      student: req.user.id,
      project: projectId
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const count = await Application.countDocuments({ project: projectId });
    const uploadedDocs = {};

    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        uploadedDocs[file.fieldname] = file.path;
      });
    }

    const application = await Application.create({
      student: req.user.id,
      professor: project.professor,
      project: projectId,
      applicantName,
      serialNumber: count + 1,
      formData: formData ? JSON.parse(formData) : {},
      documents: uploadedDocs,
      status: "Pending"
    });

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET PROFESSOR'S APPLICATIONS
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ professor: req.professor._id })
      .populate("student", "name email")
      .populate("project", "projectCode projectTitle")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE APPLICATION (PROFESSOR)
exports.getSingleApplication = async (req, res) => {
  try {
    const app = await Application.findOne({ _id: req.params.id, professor: req.professor._id })
      .populate("student", "name email")
      .populate("project", "projectCode");

    if (!app) return res.status(404).json({ message: "Application not found" });
    res.json(app);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// EXPORT CSV (PROFESSOR)
exports.exportApplicationsCSV = async (req, res) => {
  try {
    const applications = await Application.find({ professor: req.professor._id })
      .populate("student", "name email")
      .populate("project", "projectCode");

    const data = applications.map(app => ({
      email: app.student?.email || "",
      project: app.project?.projectCode || "",
      ...app.formData
    }));

    if (data.length === 0) {
      return res.status(400).json({ message: "No data to export" });
    }

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("applications.csv");
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "CSV export failed" });
  }
};

// GET STUDENT'S APPLICATIONS
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user.id }).select("project status");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE STATUS (PROFESSOR)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Application.findOne({ _id: req.params.id, professor: req.professor._id });

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    app.status = status;
    await app.save();

    res.json({ message: "Status updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DOWNLOAD ALL DOCUMENTS AS ZIP (PROFESSOR)
exports.downloadAllProjects = async (req, res) => {
  try {
    const applications = await Application.find({ professor: req.professor._id })
      .populate("project", "projectCode");

    res.attachment("recruitment.zip");

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);

    for (const app of applications) {
      try {
        if (!app.project) continue;

        const projectCode = app.project.projectCode;
        const applicantFolder = `${app.applicantName}_${app.serialNumber}`;
        const documents = app.documents || {};

        for (const [docName, fileUrl] of Object.entries(documents)) {
          try {
            if (!fileUrl) continue;
            console.log("DOWNLOADING:", fileUrl);
            const extension = path.extname(fileUrl.split("?")[0]) || ".pdf";
            const fileName = `${applicantFolder}_${docName}${extension}`;
            const zipPath = `${projectCode}/${applicantFolder}/${fileName}`;
            archive.append(request(fileUrl), { name: zipPath });
          } catch (fileError) {
            console.log("FILE FAILED:", fileUrl);
          }
        }
      } catch (appError) {
        console.log("APPLICATION FAILED:", app._id);
      }
    }

    await archive.finalize();
  } catch (error) {
    console.error("ZIP ERROR:", error);
    res.status(500).json({ message: "ZIP download failed" });
  }
};

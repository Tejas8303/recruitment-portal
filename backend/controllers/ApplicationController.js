const Application = require("../models/Application");
const Project = require("../models/Project");
const fs = require("fs");
const path = require("path");
const { Parser } = require("json2csv");
const archiver = require("archiver");
const PDFDocument = require("pdfkit");

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
      project: projectId,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    // Build document URL paths from uploaded files
    // file.path is an absolute disk path; we store it as /uploads/... for static serving
    const uploadedDocs = {};
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const uploadsRoot = path.join(__dirname, "../uploads");
        const rel = path.relative(uploadsRoot, file.path);
        uploadedDocs[file.fieldname] = "/uploads/" + rel.replace(/\\/g, "/");
      });
    }

    const newApp = await Application.create({
      student: req.user.id,
      professor: project.professor,
      project: projectId,
      applicantName,
      serialNumber: req.resolvedSerialNumber || 1,
      formData: formData ? JSON.parse(formData) : {},
      documents: uploadedDocs,
      status: "Pending",
    });

    res.status(201).json({ 
      message: "Application submitted successfully", 
      applicationId: newApp._id 
    });
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
    const app = await Application.findOne({
      _id: req.params.id,
      professor: req.professor._id,
    })
      .populate("student", "name email")
      .populate("project", "projectCode");

    if (!app) return res.status(404).json({ message: "Application not found" });
    res.json(app);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// EXPORT CSV (PROFESSOR & ADMIN)
exports.exportApplicationsCSV = async (req, res) => {
  try {
    const projectId = req.params.projectId || req.query.projectId;
    let query = {};

    if (projectId) {
      query.project = projectId;
    }

    if (req.professor) {
      query.professor = req.professor._id;
    }

    const applications = await Application.find(query)
      .populate("student", "name email")
      .populate("project", "projectCode");

    const data = applications.map((app) => ({
      email: app.student?.email || "",
      project: app.project?.projectCode || "",
      ...app.formData,
    }));

    if (data.length === 0) {
      return res.status(400).json({ message: "No data to export" });
    }

    const parser = new Parser();
    const csv = parser.parse(data);

    let filename = "applications.csv";
    if (projectId) {
      const project = await Project.findById(projectId);
      if (project) {
        filename = `${project.projectCode}_applications.csv`;
      }
    }

    res.header("Content-Type", "text/csv");
    res.attachment(filename);
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "CSV export failed" });
  }
};

// GET STUDENT'S APPLICATIONS
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user.id })
      .populate("project", "projectCode projectTitle deadline")
      .populate("student", "name email");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE STATUS (PROFESSOR)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Application.findOne({
      _id: req.params.id,
      professor: req.professor._id,
    });

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
    const applications = await Application.find({ professor: req.professor._id }).populate(
      "project",
      "projectCode"
    );

    res.attachment("recruitment.zip");

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);

    for (const app of applications) {
      try {
        if (!app.project) continue;

        const projectCode     = app.project.projectCode;
        const applicantFolder = `${app.applicantName}_${app.serialNumber}`;
        const documents       = app.documents || {};

        for (const [docName, filePath] of Object.entries(documents)) {
          try {
            if (!filePath) continue;

            // filePath is stored as "/uploads/AI001/Rahul_1/Rahul_1_photo.jpg"
            // Resolve to absolute path on disk
            const absolutePath = path.join(__dirname, "..", filePath);

            if (!fs.existsSync(absolutePath)) {
              console.log("SKIPPING MISSING FILE:", absolutePath);
              continue;
            }

            const ext      = path.extname(filePath);
            const fileName = `${applicantFolder}_${docName}${ext}`;
            const zipPath  = `${projectCode}/${applicantFolder}/${fileName}`;

            archive.file(absolutePath, { name: zipPath });
          } catch (fileError) {
            console.log("FILE FAILED:", filePath, fileError.message);
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

// DOWNLOAD RECEIPT PDF (STUDENT)
exports.downloadReceiptPDF = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id)
      .populate("project")
      .populate("student");

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Verify user owns this application
    if (app.student._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access to receipt" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt_${app.project?.projectCode || "app"}_${app.serialNumber || "1"}.pdf`
    );

    doc.pipe(res);

    // Design styling: Outer frame
    doc.rect(20, 20, 572, 752).strokeColor("#e2e8f0").lineWidth(2).stroke();

    // Top Brand Accent line
    doc.rect(20, 20, 572, 10).fillColor("#4f46e5").fill();

    doc.moveDown(3);

    // Header
    doc.fontSize(24).fillColor("#1e293b").font("Helvetica-Bold").text("Application Receipt", { align: "center" });
    doc.moveDown(0.3);
    doc.fontSize(10).fillColor("#64748b").font("Helvetica").text("Institutional Recruitment Portal Acknowledgement", { align: "center" });
    doc.moveDown(2);

    // Divider Line
    doc.moveTo(40, doc.y).lineTo(572 - 40, doc.y).strokeColor("#cbd5e1").lineWidth(1).stroke();
    doc.moveDown(2);

    // Helper to draw label-value rows
    const drawRow = (label, value) => {
      const currentY = doc.y;
      doc.fontSize(11).fillColor("#475569").font("Helvetica-Bold").text(label, 50, currentY);
      doc.fontSize(11).fillColor("#0f172a").font("Helvetica").text(value, 200, currentY, { width: 350 });
      doc.moveDown(1.5);
    };

    const appFormattedId = `${app.project?.projectCode || "N/A"}-${String(app.serialNumber || 1).padStart(3, "0")}`;

    drawRow("Application ID:", appFormattedId);
    drawRow("Candidate Name:", app.applicantName || "N/A");
    drawRow("Candidate Email:", app.student?.email || "N/A");
    drawRow("Project Code:", app.project?.projectCode || "N/A");
    drawRow("Project Title:", app.project?.projectTitle || "N/A");
    drawRow("Submission Time:", new Date(app.submittedAt || app.createdAt).toLocaleString());
    drawRow("Current Status:", app.status || "Pending");

    doc.moveDown(3);
    doc.moveTo(40, doc.y).lineTo(572 - 40, doc.y).strokeColor("#cbd5e1").lineWidth(1).stroke();
    doc.moveDown(3);

    // Footer Info
    doc.fontSize(9).fillColor("#94a3b8").text("This document serves as proof of your application submission.", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(9).fillColor("#cbd5e1").text("Recruitment Portal System Generated - No signature required.", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("PDF generation failed:", error);
    res.status(500).json({ message: "Failed to generate receipt PDF" });
  }
};

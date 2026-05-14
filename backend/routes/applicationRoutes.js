const express = require("express");

const {
  submitApplication,
  getApplications,
  exportApplicationsCSV,
  downloadAllProjects,
  getMyApplications,
  getSingleApplication,
  updateStatus,
} = require("../controllers/ApplicationController");

const { userAuth } = require("../middleware/userAuth");
const { professorAuth } = require("../middleware/professorAuth");
const upload = require("../middleware/uploadMiddleware");
const resolveProject = require("../middleware/resolveProject");

const router = express.Router();

// STUDENT ROUTES
// resolveProject runs first (uses ?projectId query param) to build folder path before Multer
router.post("/", userAuth, resolveProject, upload.any(), submitApplication);
router.get("/my", userAuth, getMyApplications);

// PROFESSOR ROUTES
router.get("/", professorAuth, getApplications);
router.get("/export/csv", professorAuth, exportApplicationsCSV);
router.get("/export/csv/:projectId", professorAuth, exportApplicationsCSV);
router.get("/download/all", professorAuth, downloadAllProjects);
router.get("/:id", professorAuth, getSingleApplication);
router.put("/:id/status", professorAuth, updateStatus);

module.exports = router;
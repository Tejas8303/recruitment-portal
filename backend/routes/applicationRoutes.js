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

const router = express.Router();

// STUDENT ROUTES
router.post("/", userAuth, upload.any(), submitApplication);
router.get("/my", userAuth, getMyApplications);

// PROFESSOR ROUTES
router.get("/", professorAuth, getApplications);
router.get("/export/csv", professorAuth, exportApplicationsCSV);
router.get("/download/all", professorAuth, downloadAllProjects);
router.get("/:id", professorAuth, getSingleApplication);
router.put("/:id/status", professorAuth, updateStatus);

module.exports = router;
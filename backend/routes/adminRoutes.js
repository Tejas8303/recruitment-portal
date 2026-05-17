const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { adminAuth } = require("../middleware/adminAuth");
const { exportApplicationsCSV } = require("../controllers/ApplicationController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Apply adminAuth to all routes in this file
router.use(adminAuth);

// Professor Management
router.post("/professors/bulk-upload", upload.single("file"), adminController.bulkUploadProfessors);
router.post("/professors", adminController.createProfessor);
router.get("/professors", adminController.getProfessors);
router.put("/professors/:id/block", adminController.toggleProfessorBlock);
router.delete("/professors/:id", adminController.deleteProfessor);

// Projects Management
router.get("/projects", adminController.getAllProjects);
router.delete("/projects/:id", adminController.deleteProject);
router.get("/projects/:projectId/export/csv", exportApplicationsCSV);

// Applications Management
router.get("/applications", adminController.getAllApplications);

module.exports = router;

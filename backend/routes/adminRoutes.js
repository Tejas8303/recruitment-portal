const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { adminAuth } = require("../middleware/adminAuth");

// Apply adminAuth to all routes in this file
router.use(adminAuth);

// Professor Management
router.post("/professors", adminController.createProfessor);
router.get("/professors", adminController.getProfessors);
router.put("/professors/:id/block", adminController.toggleProfessorBlock);

// Projects Management
router.get("/projects", adminController.getAllProjects);
router.delete("/projects/:id", adminController.deleteProject);

// Applications Management
router.get("/applications", adminController.getAllApplications);

module.exports = router;

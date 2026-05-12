const express = require("express");

const {
  createProject,
  getProjects,
  getProjectById,
  getProfessorProjects,
  getProfessorProjectById,
  updateProfessorProject,
  deleteProfessorProject
} = require("../controllers/projectController");

const { userAuth } = require("../middleware/userAuth");
const { professorAuth } = require("../middleware/professorAuth");

const router = express.Router();

// PROFESSOR ROUTES
router.post("/professor", professorAuth, createProject);
router.get("/professor", professorAuth, getProfessorProjects);
router.get("/professor/:id", professorAuth, getProfessorProjectById);
router.put("/professor/:id", professorAuth, updateProfessorProject);
router.delete("/professor/:id", professorAuth, deleteProfessorProject);

// USER ROUTES
router.get("/", userAuth, getProjects);
router.get("/:id", userAuth, getProjectById);

module.exports = router;
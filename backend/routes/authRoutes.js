const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { userAuth } = require("../middleware/userAuth");
const { professorAuth } = require("../middleware/professorAuth");

// User routes
router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
router.get("/profile", userAuth, authController.getProfile);

// Professor routes
router.post("/professor/login", authController.loginProfessor);
// We can add /professor/profile here if needed

// Admin routes
router.post("/admin/login", authController.loginAdmin);

module.exports = router;

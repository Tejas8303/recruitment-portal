const User = require("../models/User");
const Professor = require("../models/Professor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// REGISTER USER (Student)
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      token: generateToken(user._id, "user"),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN USER (Student)
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user._id, "user"),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET USER PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN PROFESSOR
exports.loginProfessor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const professor = await Professor.findOne({ email });

    if (!professor) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (professor.isBlocked) {
      return res.status(403).json({ message: "Account is blocked. Contact Admin." });
    }

    const isMatch = await bcrypt.compare(password, professor.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      token: generateToken(professor._id, "professor"),
      professor: {
        _id: professor._id,
        name: professor.name,
        email: professor.email,
        department: professor.department,
        designation: professor.designation,
        profileImage: professor.profileImage
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN ADMIN
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = generateToken("admin_id", "admin");
      res.json({
        token,
        admin: {
          email: process.env.ADMIN_EMAIL,
          role: "admin"
        }
      });
    } else {
      res.status(400).json({ message: "Invalid admin credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
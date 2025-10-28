const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  const existimgUser = await User.findOne({ email });
  if (existimgUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const user = new User({
    name,
    email,
    phone,
    password,
  });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    "swiggy-clone-secret-key-2025",
    { expiresIn: "7d" }
  );

  res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "swiggy-clone-secret-key-2025",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;

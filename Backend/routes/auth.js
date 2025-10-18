const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");

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

  await user.save();

  res.status(200).json({
    maessage: "User Regestered Successfully",
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    res.status(200).json({
      message: "Login successful",
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

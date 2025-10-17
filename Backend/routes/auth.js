const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log("Name", name, "email", email);

  res.status(200).json({
    maessage: "User Regestered Successfully",
    user: { name, email },
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("email", email, "password", password);

  res.status(200).json({
    maessage: "User Loggedin Successfully",
    user: { email },
  });
});

module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Verify username and password and get user id
  const userId = 1;

  // Authenticate user and generate JWT
  const payload = {
    sub: userId,
  };
  const token = jwt.sign(payload, "simple-key", { expiresIn: "1h" });
  res.json({ token });
});

router.post("/logout", (req, res) => {
  // Invalidate JWT
  res.sendStatus(200);
});

module.exports = router;

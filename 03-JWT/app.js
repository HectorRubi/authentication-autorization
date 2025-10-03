const express = require("express");
const authRoutes = require("./routes/auth.js");
const verifyToken = require("./middleware/auth.js");

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", verifyToken, (req, res) => {
  console.log(req.user);
  res.send("Hello World with JWT!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

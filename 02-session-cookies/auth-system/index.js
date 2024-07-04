const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const port = 3000;
const salt = 10;
const users = [];

const getCredentials = (data = "") => atob(data).split(":");

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "this is a simple secret",
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: false,
      httpOnly: false,
    },
  })
);

app.get("/sessions", (req, res) => {
  res.status(200).json({ sessions: req.sessionStore.sessions });
});

app.get("/users", (req, res) => {
  res.status(200).json({ users });
});

app.post("/register", (req, res) => {
  if (!req.body.credentials) {
    res.status(400).send("Please add data");
  }

  // Get credentials
  const [email, pass] = getCredentials(req.body.credentials);

  // Check if user is already register
  if (
    !users.find(
      (user) => user.email === email && bcrypt.compareSync(pass, user.pass)
    )
  ) {
    // Save data into database
    const id = users.length + 1;
    const encrypted = bcrypt.hashSync(pass, salt);
    users.push({ id, email, pass: encrypted });
  }

  res.status(201).json({ message: "Registration success" });
});

app.post("/login", (req, res) => {
  // Get credentials
  const [email, pass] = getCredentials(req.body.credentials);

  // Check if user exist in database
  const user = users.find(
    (userDB) => userDB.email === email && bcrypt.compareSync(pass, userDB.pass)
  );

  if (user) {
    // Encrypt password
    const encrypted = bcrypt.hashSync(pass, salt);
    req.session.user = { id: user.id, email, pass: encrypted };
    res.status(200).json({ message: "Access granted" });
  } else {
    res.status(403).json({ message: "Email or password incorrect" });
  }
});

app.post("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.status(200).json({ message: "Logged out" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${3000}`);
});

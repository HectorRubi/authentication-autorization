const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const salt = 10;
const users = [];

const getCredentials = (data) => atob(data).split(":");

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

app.post("/register", (req, res) => {
  if (!req.body.data) {
    res.status(400).send("Please add data");
  }
  // Get credentials
  const [email, pass] = getCredentials(req.body.data);

  // Encrypt password
  const encrypted = bcrypt.hashSync(pass, salt);

  // Check if user is already register
  if (
    !users.find(
      (user) =>
        user.email === email && bcrypt.hashSync(user.pass, salt) === encrypted
    )
  ) {
    // Save data into database
    const id = users.length + 1;
    users.push({ id, email, encrypted });
    req.session.user = { id, email, encrypted };
  }

  console.log({ users });
  res.status(201).json({ message: "Registration success" });
});

app.post("/login", () => {});

app.post("/logout", () => {});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${3000}`);
});

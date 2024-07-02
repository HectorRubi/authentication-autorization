const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const salt = 10;
const users = [
  {
    id: 1,
    email: "test@test.com",
    pass: "$2b$10$KZoGcU.YRpoQk6zhrDxT6uai9nPykaZ58axgg1YSOuEV.5ZocyG8G",
  },
];

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
    // req.session.user = { id, email, encrypted };
  }

  console.log({ users });
  res.status(201).json({ message: "Registration success" });
});

app.post("/login", (req, res) => {
  // Get credentials
  const [email, pass] = getCredentials(req.body.data);

  // Check if user exist
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

app.post("/logout", () => {});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${3000}`);
});

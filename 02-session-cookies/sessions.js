const express = require("express");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(
  session({
    secret: "your_secret_key", // A secret key used to sign the session ID
    resave: false, // Forces the session to be saved back to the session store
    saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store

    cookie: {
      maxAge: 3600000,
      httpOnly: false,
      secure: false,
    },
  })
);

app.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`Number of views ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.send("Welcome to this page for the first time");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

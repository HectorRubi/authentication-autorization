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
      secure: false,
    },
  })
);

app.get("/", (req, res) => {
  // Check if users has a session property called views
  if (req.session.views) {
    req.session.views++;
    console.log(req.sessionID, req.sessionStore.sessions, req.session);
    res.send(`Number of views ${req.session.views}`);
  } else {
    // If not, initialize the 'views'
    req.session.views = 1;
    res.send("Welcome to this page for the first time");
  }
});

app.get("/store", (req, res) => {
  // Save some data in the store
  req.session.customData = "This is saved in the session.";
  res.send("Data has been saved in the session.");
});

app.get("/retrieve", (req, res) => {
  // Check if the session data exist before trying to access it
  if (req.session.customData) {
    res.send(`Heres is your session data: ${req.session.customData}`);
  } else {
    res.send("No session data found");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // Cookie Creation

  // name = value
  res.cookie("sessionId", "43290432432", {
    // The cookie expires in 24 hours
    expires: new Date(Date.now() + 86400000),

    // The cookie is accessible for APIs under the '/api' route
    path: "/api",

    // The cookie belongs to the 'example.com' domain
    domain: "localhost",

    // The cookie will be sent over HTTPS only
    secure: true,

    // The cookie cannot be accessible by client-side scripts
    httpOnly: true,
  });

  // Using maxAge to specify expiration time in milliseconds
  res.cookie("preferences", "dark_theme", {
    // The cookie expires in 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,

    httpOnly: true,
  });

  res.send("Cookies are sent with different attributes");
});

app.get("/api", (req, res) => {
  // The cookie 'sessionId' exist here
  res.send("Hello World API");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

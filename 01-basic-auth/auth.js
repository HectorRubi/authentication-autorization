const base64 = require("base-64");

const decodeCredentials = (auth) => {
  // Token: Basic YWRtaW46QWRtaW4xMjMu
  // Get just the token
  const token = auth.split("Basic ")[1] || "";

  const decoded = base64.decode(token);

  // Credentials are in the form "user:pass"
  // This should return [user, pass]
  return decoded.split(":");
};

module.exports = function (req, res, next) {
  const authorization = req.headers.authorization || "";

  // Take the header and decode credentials
  const [username, password] = decodeCredentials(authorization);

  // Verify the credentials
  if (username === "admin" && password === "Admin123.") {
    return next();
  }

  // Respond with authenticate header on auth failure
  res.set("WWW-Authenticate", "Basic");
  res.status(401).send("Authentication required");
};

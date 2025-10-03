const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const payload = jwt.verify(token, "simple-key");
    req.user = payload;
  } catch (error) {
    return res.sendStatus(403);
  }

  next();
}

module.exports = verifyToken;

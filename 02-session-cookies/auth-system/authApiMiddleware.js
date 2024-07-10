module.exports = function (req, res, next) {
  if (!req.session.user) {
    res.status(401).json({ message: "Access denied" });
  } else {
    next();
  }
};

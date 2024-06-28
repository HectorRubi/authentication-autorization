const getCookies = (req) => req.headers.cookie.split("; ");
module.exports = function (req, res, next) {
  req.cookies = getCookies(req);
  next();
};

const jwt = require("jsonwebtoken");
const config = require("config");

function middleware(req, res, next) {
  console.log(req.file, req.files);
  const token = req.headers.access_token;

  if (!token) {
    return res
      .status(401)
      .json({ hasError: true, message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));

    req.user = decoded;

    next();
  } catch (error) {
    console.error(error.message);

    return res.status(401).json({ hasError: true, message: "Invalid token" });
  }
}

module.exports = middleware;

const jwt = require("jsonwebtoken");

function middleware(req, res, next) {
  const token = req.headers.access_token;

  if (!token) {
    return res
      .status(401)
      .json({ hasError: true, message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ hasError: true, message: "Invalid token" });
  }
}

module.exports = middleware;

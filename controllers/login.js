const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ hasError: true, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ hasError: true, message: "Invalid credentials" });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, config.get("JWT_SECRET"), {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = login;

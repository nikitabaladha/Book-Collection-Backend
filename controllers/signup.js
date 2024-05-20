const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

async function signup(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ hasError: true, message: "All fields are required" });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ hasError: true, message: "User already exists" });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();

    const payload = { userId: user.id };
    const token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server error");
  }
}

module.exports = signup;

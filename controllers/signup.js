const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

async function signup(req, res) {
  console.count();
  console.log("Received request body:", req.body);
  const { firstName, lastName, email, password } = req.body;

  try {
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

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

module.exports = signup;

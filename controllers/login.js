const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const loginValidationSchema = require("./Validators/loginValidationSchema.js");

async function login(req, res) {
  try {
    const { error } = loginValidationSchema.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details[0].message;
      return res.status(400).json({ message: errorMessages });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ hasError: true, message: "User does not exists" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ hasError: true, message: "Invalid Password" });
    }

    const payload = { id: user.id };

    const token = jwt.sign(payload, config.get("JWT_SECRET"), {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ hasError: false, message: "Login Successful", token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = login;

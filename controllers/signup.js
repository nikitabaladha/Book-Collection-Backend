const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const signupValidationSchema = require("./Validators/signupValidationSchema.js");

async function signup(req, res) {
  try {
    const { error } = signupValidationSchema.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details[0].message;
      return res.status(400).json({ message: errorMessages });
    }

    const { firstName, lastName, email, password } = req.body;

    let isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
    });

    delete user.password;

    return res.status(200).json({
      hasError: false,
      message: "Signup successfully",
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user.id,
      },
    });
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server error");
  }
}

module.exports = signup;

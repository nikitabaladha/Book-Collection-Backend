// controllers/User/getAllUsers.js
const User = require("../../models/User");

async function get(req, res) {
  try {
    const users = await User.find();

    return res.status(200).json({
      hasError: false,
      message: "All users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = get;

// controllers/Book/get.js
const Book = require("../../models/Book");

async function get(req, res) {
  try {
    const books = await Book.find();

    return res.status(200).json({
      hasError: false,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = get;

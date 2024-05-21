// controllers/Book/get.js
const Book = require("../../models/Book");

async function get(req, res) {
  try {
    const userId = req.user.id;

    const books = await Book.find({ userId: userId });

    if (books.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No books found for the authenticated user",
      });
    }

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

// controllers/Book/getBookById.js

const Book = require("../../models/Book");

async function getBookById(req, res) {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ hasError: true, message: "Book not found" });
    }

    return res.status(200).json({
      hasError: false,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = getBookById;

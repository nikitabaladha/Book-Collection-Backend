// controllers/Book/deleteById.js
const Book = require("../../models/Book");

async function deleteBookById(req, res) {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ hasError: true, message: "Book not found" });
    }

    await Book.findByIdAndDelete(bookId);

    return res
      .status(200)
      .json({ hasError: false, message: "Book deleted successfully" });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = deleteBookById;

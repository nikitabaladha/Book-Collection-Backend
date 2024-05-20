// controllers/Book/update.js
const Book = require("../../models/Book");

async function update(req, res) {
  try {
    const { title, author, genre, yearPublished } = req.body;

    const bookId = req.params.id;

    if (!title || !author || !genre || !yearPublished) {
      return res
        .status(400)
        .json({ hasError: true, message: "All fields are required" });
    }

    const existingBook = await Book.findById(bookId);

    if (!existingBook) {
      return res
        .status(404)
        .json({ hasError: true, message: "Book not found" });
    }

    existingBook.title = title;
    existingBook.author = author;
    existingBook.genre = genre;
    existingBook.yearPublished = yearPublished;

    await existingBook.save();

    return res.status(200).json({
      hasError: false,
      message: "Book updated successfully",
      data: existingBook,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = update;

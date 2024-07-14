// controllers/Book/getAll.js

const Book = require("../../models/Book");

async function getAll(req, res) {
  try {
    const books = await Book.find();

    if (!books.length) {
      return res.status(404).json({
        hasError: true,
        message: "No books found for the authenticated user",
      });
    }

    const booksWithDetails = books.map((book) => ({
      _id: book._id,
      coverImage: book.coverImage
        ? `${req.protocol}://${req.get("host")}${book.coverImage}`
        : null,
      title: book.title,
      author: book.author,
      genre: book.genre,
      yearPublished: book.yearPublished,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    }));

    return res.status(200).json({
      hasError: false,
      message: "Books retrieved successfully",
      data: booksWithDetails,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = getAll;

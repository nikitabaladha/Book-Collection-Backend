// controllers/Book/search.js

const Book = require("../../models/Book");

async function search(req, res) {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        hasError: true,
        message: "Search query is required",
      });
    }

    const searchCriteria = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
        ...(isNaN(query) ? [] : [{ yearPublished: Number(query) }]),
      ],
    };

    const books = await Book.find(searchCriteria);

    if (!books.length) {
      return res.status(404).json({
        hasError: true,
        message: "No books found",
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

module.exports = search;

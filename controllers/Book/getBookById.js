const Book = require("../../models/Book");

async function getBookById(req, res) {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        hasError: true,
        message: "Book not found",
      });
    }

    if (book.userId.toString() !== userId) {
      return res.status(403).json({
        hasError: true,
        message: "Unauthorized: You do not have permission to access this book",
      });
    }

    const bookDetails = {
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
    };

    return res.status(200).json({
      hasError: false,
      message: "Book retrieved successfully",
      data: bookDetails,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = getBookById;

// controllers/Book/create.js
const Book = require("../../models/Book");

async function create(req, res) {
  try {
    const { title, author, genre, yearPublished } = req.body;

    if (!title || !author || !genre || !yearPublished) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingBook = await Book.findOne({ title, author });

    if (existingBook) {
      return res
        .status(400)
        .json({ hasError: true, message: "This book already exists" });
    }

    const book = new Book({
      title,
      author,
      genre,
      yearPublished,
    });

    await book.save();

    res.status(200).json({
      hasError: false,
      message: "Book stored successfully",
      data: book,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = create;

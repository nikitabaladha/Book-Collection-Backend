// controllers/Book/create.js
const Book = require("../../models/Book");
const bookValidationSchema = require("../Validators/bookValidationSchema.js");

async function create(req, res) {
  try {
    const userId = req.user.id;

    const { error } = bookValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error?.details?.length) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: errorMessages });
    }

    const { title, author, genre, yearPublished } = req.body;

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
      userId: req.user.id,
    });

    await book.save();

    return res.status(200).json({
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

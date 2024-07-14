// controllers/Book/create.js

const path = require("path");
const Book = require("../../models/Book");
const bookValidationSchema = require("../Validators/bookValidationSchema.js");

async function create(req, res) {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(403).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can create Book",
      });
    }

    const { error } = bookValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error?.details?.length) {
      const errorMessages = error.details[0].message;
      return res.status(400).json({ message: errorMessages });
    }

    if (!req.file) {
      return res.status(400).json({
        hasError: true,
        message: "Cover image is required",
      });
    }

    const coverPath = "/coverImage/images";

    const coverImage = coverPath + "/" + req.file.filename;

    const { title, author, genre, yearPublished } = req.body;

    const existingBook = await Book.findOne({ title, author });

    if (existingBook) {
      return res
        .status(400)
        .json({ hasError: true, message: "This book already exists" });
    }

    const book = new Book({
      coverImage,
      title,
      author,
      genre,
      yearPublished,
      userId,
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

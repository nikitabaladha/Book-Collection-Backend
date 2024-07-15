// controllers/Book/update.js

const Book = require("../../models/Book");
const bookValidationSchema = require("../Validators/bookValidationSchema.js");

async function update(req, res) {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        hasError: true,
        message: "Unauthorized access. Please log in.",
      });
    }

    const { error } = bookValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error?.details?.length) {
      const errorMessages = error.details[0].message;
      return res.status(400).json({ message: errorMessages });
    }

    const { title, author, genre, yearPublished } = req.body;

    const bookId = req.params.id;

    const existingBook = await Book.findById(bookId);

    if (!existingBook) {
      return res
        .status(400)
        .json({ hasError: true, message: "Book not found" });
    }

    existingBook.title = title;
    existingBook.author = author;
    existingBook.genre = genre;
    existingBook.yearPublished = yearPublished;

    if (req.file) {
      const coverPath = "/coverImage/images";
      const coverImage = coverPath + "/" + req.file.filename;
      existingBook.coverImage = coverImage;
    } else {
      existingBook.coverImage = existingBook.coverImage;
    }

    await existingBook.save();

    existingBook.coverImage = `${req.protocol}://${req.get("host")}${
      existingBook.coverImage
    }`;

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

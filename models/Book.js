// models/Book.js

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  coverImage: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  yearPublished: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
});

bookSchema.index({ title: 1, author: 1 }, { unique: true });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

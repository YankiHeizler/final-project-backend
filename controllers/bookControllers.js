const Book = require("./../models/bookModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs"); //מש זה?????

exports.getBook = asyncHandler(async (req, res) => {
  const { filter } = req.query;
  const books = await Book.find(filter);
  res.status(200).json({
    status: "success",
    books,
  });
});

exports.createBook = asyncHandler(async (req, res) => {
  const book = req.body;
  const newBook = await Book.create(book);
  res.status(200).json({
    status: "success",
    newBook,

  });
});

exports.updateBook = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const updatedDetails = req.body
  const updateBook = await Book.findByIdAndUpdate(_id, updatedDetails, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    updateBook,
  });
});

exports.deleteBook = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const deleteBook = await Book.findByIdAndDelete(_id);
  res.status(200).json({
    status: "duccess",
    deleteBook,
  });
});




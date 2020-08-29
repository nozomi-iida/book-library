const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    // },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    affiliateUrl: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    review: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

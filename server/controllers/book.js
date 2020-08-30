const Book = require('../models/book');

exports.AddApply = (req, res) => {
  const {
    username,
    title,
    description,
    reason,
    url,
    status,
    review,
  } = req.body;
  const newApply = new Book({
    username,
    title,
    description,
    reason,
    url,
    status,
    review,
  });
  newApply
    .save()
    .then(() => {
      res.json('add Apply!');
    })
    .catch(error => {
      return res.status(422).send(error.message);
    });
};

exports.GetApply = (req, res) => {
  Book.find()
    .then(applyBooks => res.json(applyBooks))
    .catch(error => res.ststus(400).json('Error: ' + error));
};

exports.DetailBook = (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(error => res.ststus(400).json('Error: ' + error));
};

exports.DeleteBook = (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book Deleted!'))
    .catch(error => res.ststus(400).json('Error: ' + error));
};

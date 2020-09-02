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
    affiliateUrl,
  } = req.body;
  const newApply = new Book({
    username,
    title,
    description,
    reason,
    url,
    status,
    review,
    affiliateUrl,
  });
  newApply
    .save()
    .then(() => {
      Book.find()
        .then(books => res.json(books))
        .catch(error => res.ststus(400).json('Error: ' + error));
    })
    .catch(error => {
      return res.status(400).send(error.message);
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
    .then(() => {
      Book.find()
        .then(books => res.json(books))
        .catch(error => res.ststus(400).json('Error: ' + error));
    })
    .catch(error => {
      return res.status(400).send(error.message);
    });
};

exports.UpdateBook = (req, res) => {
  Book.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => {
      Book.find()
        .then(books => res.json(books))
        .catch(error => res.ststus(400).json('Error: ' + error));
    })
    .catch(error => {
      return res.status(400).send(error.message);
    });
};

exports.PermitBook = (req, res) => {
  Book.findByIdAndUpdate(req.params.id, { $set: req.body})
    .then(() => {
      Book.find()
        .then(books => res.json(books))
        .catch(error => res.ststus(400).json('Error: ' + error));
    })
    .catch(error => {
      return res.status(400).send(error.message);
    });
};

const Book = require('../models/book');

exports.AddApply = (req, res) => {
  const { username, title, description, reason, url, status, review } = req.body;
  const newApply = new Book({ username, title, description, reason, url, status, review });
  newApply
    .save()
    .then(() => {
      res.json('add Apply!');
    })
    .catch(error => {return res.status(422).send(error.message)});
};

const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.SingUpAuth = (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  user.save()
    .then(() => res.json('User added!'))
    .catch((error) => res.status(422).send(error.message));
};

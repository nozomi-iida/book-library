const mongoose = require('mongoose');
const { SingUpAuth } = require('../controllers/user');

const router = require('express').Router();

router.post('/signup', SingUpAuth)

module.exports = router
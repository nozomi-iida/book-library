const mongoose = require('mongoose');
const { SignUpAuth, SignInAuth } = require('../controllers/user');

const router = require('express').Router();

router.post('/signup', SignUpAuth)
router.post('/signin', SignInAuth)

module.exports = router
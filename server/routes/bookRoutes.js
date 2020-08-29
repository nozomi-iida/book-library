const { AddApply } = require('../controllers/book');
const router = require('express').Router();

router.post('/addApply', AddApply);

module.exports = router
const { AddApply, GetApply, DetailBook } = require('../controllers/book');
const router = require('express').Router();

router.post('/addApply', AddApply);
router.get('/getApply', GetApply);
router.get('/detailBook/:id', DetailBook);

module.exports = router
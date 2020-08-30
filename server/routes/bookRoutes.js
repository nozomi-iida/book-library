const { AddApply, GetApply, DetailBook, DeleteBook } = require('../controllers/book');
const router = require('express').Router();

router.post('/addApply', AddApply);
router.get('/getApply', GetApply);
router.get('/detailBook/:id', DetailBook);
router.delete('/deleteBook/:id', DeleteBook);

module.exports = router
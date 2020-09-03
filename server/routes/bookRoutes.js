const { AddApply, GetApply, DetailBook, DeleteBook, UpdateBook, PermitBook, ReadBook } = require('../controllers/book');
const router = require('express').Router();

router.post('/addApply', AddApply);
router.get('/getApply', GetApply);
router.get('/detailBook/:id', DetailBook);
router.delete('/deleteBook/:id', DeleteBook);
router.post('/updateBook/:id', UpdateBook);
router.post('/permitBook/:id', PermitBook)
router.post('/readBook/:id', ReadBook)

module.exports = router
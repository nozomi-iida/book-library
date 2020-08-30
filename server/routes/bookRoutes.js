const { AddApply, GetApply } = require('../controllers/book');
const router = require('express').Router();

router.post('/addApply', AddApply);
router.get('/getApply', GetApply)

module.exports = router
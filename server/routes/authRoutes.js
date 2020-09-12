const { SignUpAuth, SignInAuth } = require('../controllers/user');
const requireToken = require('../middleware/requireToken');

const router = require('express').Router();

router.get('/', requireToken, (req, res) => {
  res.send({ email: req.user.email, username: req.user.username });
})
router.post('/signup', SignUpAuth)
router.post('/signin', SignInAuth)

module.exports = router
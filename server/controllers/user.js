const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.SignUpAuth = (req, res) => {
  const { username, image, email, password } = req.body;
  const user = new User({ username, image, email, password });
  user
    .save()
    .then(() => {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.send({ token });
      res.json('User added!');
    })
    .catch(error => {
      return res.status(422).send(error.message);
    });
};

exports.SignInAuth = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'must provide email or password 1' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'must provide email or password 2' });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET); //クライアントから送られたIDとパスワード確認してtoken（jwt）発行
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'must provide email or password 3' });
  }
};

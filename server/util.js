const jwt = require('jsonwebtoken');

export const getToken = user => {
  return jwt.sign(user, config.process.env.JWT_SECRET, {
    expiresIn: '48th', //有効時間
  });
};
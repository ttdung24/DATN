const User = require('../model/User');
const jwt = require('jsonwebtoken');

const signAccessToken = async (user) => {
  const accessToken = jwt.sign(
    { _id: user._id },
    process.env.SECRET_KEY_ACCESS,
    { expiresIn: 1000 * 60 * 60 }
  );
  return accessToken;
};

const signRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.SECRET_KEY_REFRESH,
    { expiresIn: '1y' }
  );
  return refreshToken;
};

module.exports = {
  signAccessToken,
  signRefreshToken,
};

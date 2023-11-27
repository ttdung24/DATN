const jwt = require('jsonwebtoken');
const {
  signAccessToken,
  signRefreshToken,
} = require('../service/auth.service');

const authMiddleware = {
  verifyAccessToken: async (req, res, next) => {
    const auth = req.headers.authorization;
    const accessToken = auth.split(' ')[1];
    try {
      const payload = jwt.verify(accessToken, process.env.SECRET_KEY_ACCESS);
      req.body._id = payload._id;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(403).json({
          message: 'Access token hết hạn',
          error: error,
        });
      }

      return res.status(403).json({
        message: 'Access token không hợp lệ',
        error: error,
      });
    }
  },

  verifyRefreshToken: async (req, res, next) => {
    const auth = req.headers.authorization;
    const refreshToken = auth.split(' ')[1];
    try {
      const payload = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH);
      req.body._id = payload._id;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(403).json({
          message: 'Refresh token hết hạn',
          error: error,
        });
      }
      return res.status(403).json({
        message: 'Refresh token không hợp lệ',
        error: error,
      });
    }
  },

  checkRequired: (req, res, next) => {
    if (!('authorization' in req.headers)) {
      return res.status(401).json({
        message: 'Request thiếu token - headers không có trường authorization',
      });
    }
    next();
  },
};

module.exports = authMiddleware;

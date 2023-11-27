const express = require('express');
const authRouter = express.Router();
const authController = require('../controller/AuthController');
const authMiddleware = require('../middleware/auth.middleware');

authRouter.post('/login', authController.login);
authRouter.post(
  '/refreshtoken',
  authMiddleware.checkRequired,
  authMiddleware.verifyRefreshToken,
  authController.refreshToken
);

module.exports = authRouter;

const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/UserController');
const authMiddleware = require('../middleware/auth.middleware');

userRouter.post('/create', userController.create);
userRouter.get(
  '/',
  authMiddleware.checkRequired,
  authMiddleware.verifyAccessToken,
  userController.getInfomationOfUser
);

userRouter.put(
  '/update',
  authMiddleware.checkRequired,
  authMiddleware.verifyAccessToken,
  userController.updateInfomationOfUser
);

userRouter.put(
  '/updatePassword',
  authMiddleware.checkRequired,
  authMiddleware.verifyAccessToken,
  userController.updatePassword
);

module.exports = userRouter;
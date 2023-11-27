const express = require('express');
const shopRouter = express.Router();
const shopController = require('../controller/ShopController');
const authMiddleware = require('../middleware/auth.middleware');

shopRouter.post(
  '/create',
  authMiddleware.checkRequired,
  authMiddleware.verifyAccessToken,
  shopController.create
);

shopRouter.get(
  '/',
  authMiddleware.checkRequired,
  authMiddleware.verifyAccessToken,
  shopController.getShopOfUser
);

module.exports = shopRouter;

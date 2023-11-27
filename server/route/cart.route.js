const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controller/CartController');
const authMiddleware = require('../middleware/auth.middleware');

cartRouter.post(
  '/',
  authMiddleware.checkRequired,
  authMiddleware.verifyAccessToken,
  cartController.createCartByUser
);

cartRouter.patch('/addProduct', cartController.addProductToCart);
cartRouter.patch('/updateProduct', cartController.updateQuantityProduct);
cartRouter.patch('/deleteProduct', cartController.deleteProduct);

module.exports = cartRouter;

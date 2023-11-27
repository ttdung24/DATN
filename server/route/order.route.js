const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controller/OrderController');
const authMiddleware = require('../middleware/auth.middleware');

orderRouter.post('/', orderController.createOrder);
orderRouter.post(
  '/my-order',
  authMiddleware.checkRequired,
  authMiddleware.verifyAccessToken,
  orderController.getOrderByUser
);

orderRouter.get('/:id', orderController.getOrderById);

orderRouter.get('/shop/:id', orderController.getAllOrdersOfShop);
orderRouter.get('/shop/statistic/:id', orderController.getDailySalesStatistics);

module.exports = orderRouter;

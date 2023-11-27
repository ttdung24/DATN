const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../controller/ReviewController');
const authMiddleware = require('../middleware/auth.middleware');

reviewRouter.post(
  '/create',
  authMiddleware.checkRequired,
  authMiddleware.verifyAccessToken,
  reviewController.create
);

reviewRouter.get('/product/:id', reviewController.getReviewOfProduct);

module.exports = reviewRouter;

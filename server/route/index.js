const express = require('express');
const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const shopRouter = require('./shop.route');
const categoryRouter = require('./category.route');
const productRouter = require('./product.route');
const cartRouter = require('./cart.route');
const orderRouter = require('./order.route');
const reviewRouter = require('./review.route');

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/shop', shopRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.use('/review', reviewRouter);
module.exports = router;

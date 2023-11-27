const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/ProductController');

productRouter.post('/create', productController.create);

productRouter.get('/shop/:id', productController.getProductOfShop);

productRouter.get('/:id', productController.getProduct);

productRouter.put('/:id', productController.updateProduct);

productRouter.get('/', productController.getProducts);

module.exports = productRouter;

const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controller/CategoryController');

categoryRouter.get(
  '/',
  categoryController.getAllCategory
);

module.exports = categoryRouter;

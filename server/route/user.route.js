const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/UserController');

userRouter.post('/create', userController.create);

module.exports = userRouter;
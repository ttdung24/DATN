const Cart = require('../model/Cart');
const mongoose = require('mongoose');
const { createCart } = require('../service/cart.service');

const CartController = {
  createCartByUser: async (req, res) => {
    try {
      const _id = req.body._id;
      const cart = await createCart(_id);
      if (!cart) {
        return res.status(500).json({
          message: 'Server error',
        });
      }
      return res.status(200).json({
        message: 'Get cart thành công',
        cart,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
  addProductToCart: async (req, res) => {
    try {
      const { _id, product, quantity } = req.body;
      if (!mongoose.Types.ObjectId.isValid(product)) {
        return res.status(400).json({
          message: 'product id không hợp lệ',
        });
      }
      const cart = await Cart.findById(_id);
      let check = true;
      for (let i = 0; i < cart.list.length; i++) {
        if (cart.list[i].product == product) {
          cart.list[i].quantity += quantity;
          check = false;
          break;
        }
      }
      if (check) {
        cart.list.push({
          product: new mongoose.Types.ObjectId(product),
          quantity: quantity,
        });
      }
      const saveCart = await (
        await cart.save()
      ).populate({
        path: 'list',
        populate: 'product',
      });
      return res.status(200).json({
        message: 'Thêm product vào cart thành công',
        cart: saveCart,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
  updateQuantityProduct: async (req, res) => {
    try {
      const { _id, product, quantity } = req.body;
      const cart = await Cart.findById(_id);
      for (let i = 0; i < cart.list.length; i++) {
        if (cart.list[i].product == product) {
          cart.list[i].quantity = quantity;
          break;
        }
      }
      const saveCart = await (
        await cart.save()
      ).populate({
        path: 'list',
        populate: 'product',
      });
      return res.status(200).json({
        message: 'Sửa quantity product vào cart thành công',
        cart: saveCart,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { _id, product } = req.body;
      const cart = await Cart.findById(_id);
      const newList = cart.list.filter((item) => {
        return item.product != product;
      });
      cart.list = newList;
      const saveCart = await (
        await cart.save()
      ).populate({
        path: 'list',
        populate: 'product',
      });
      return res.status(200).json({
        message: 'Xóa product ở cart thành công',
        cart: saveCart,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
};

module.exports = CartController;

const Cart = require('../model/Cart');
const mongoose = require('mongoose');

const createCart = async (user) => {
  try {
    const check = await Cart.findOne({
      user: new mongoose.Types.ObjectId(user),
    }).populate({
      path: 'list',
      populate: 'product',
    });
    if (check) {
      return check;
    }
    const newCart = await Cart.create({
      user: new mongoose.Types.ObjectId(user),
      list: [],
      total: 0,
    });
    return newCart;
  } catch (error) {
    console.log('Lỗi ở hàm createCart:');
    console.log(error);
    return false;
  }
};

module.exports = { createCart };

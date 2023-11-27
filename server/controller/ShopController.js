const Shop = require('../model/Shop');
const mongoose = require('mongoose');

const ShopController = {
  create: async (req, res) => {
    try {
      const newReq = {
        ...req.body,
        user: new mongoose.Types.ObjectId(req.body._id),
      };
      delete newReq._id;
      const newShop = await Shop.create(newReq);
      return res.status(200).json({
        message: 'Tạo shop thành công',
        shop: newShop,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
  getShopOfUser: async (req, res) => {
    try {
      const shop = await Shop.findOne({ user: req.body._id });
      return res.status(200).json({
        message: 'Tìm shop thành công',
        shop,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
  
};

module.exports = ShopController;

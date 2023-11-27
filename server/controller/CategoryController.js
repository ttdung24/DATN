const Category = require('../model/Category');
const mongoose = require('mongoose');

const CategoryController = {
  getAllCategory: async (req, res) => {
    try {
      const category = await Category.find();
      return res.status(200).json({
        message: 'Tìm category thành công',
        category,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
};

module.exports = CategoryController;

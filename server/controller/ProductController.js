const Product = require('../model/Product');
const mongoose = require('mongoose');

const ProductController = {
  create: async (req, res) => {
    try {
      const newReq = {
        ...req.body,
        category: new mongoose.Types.ObjectId(req.body.category),
        shop: new mongoose.Types.ObjectId(req.body.shop),
      };
      const newProduct = await Product.create(newReq);
      return res.status(200).json({
        message: 'Tạo product thành công',
        product: newProduct,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
  getProductOfShop: async (req, res) => {
    try {
      const product = await Product.aggregate([
        {
          $match: {
            $and: [
              { shop: new mongoose.Types.ObjectId(req.params.id) },
              { status: req.query.status === 'true' ? true : false },
            ],
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
          },
        },
        { $unwind: '$category' },
      ]);
      return res.status(200).json({
        message: 'Tìm product thành công',
        product,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
  getProducts: async (req, res) => {
    try {
      const { page, limit, category, search } = req.query;
      const pipeline = [];

      if (category) {
        pipeline.push({
          $match: { category: new mongoose.Types.ObjectId(category) },
        });
      }

      if (search) {
        pipeline.push({
          $match: { name: { $regex: new RegExp(search, 'i') } },
        });
      }

      pipeline.push(
        {
          $skip: (Number(page) - 1) * Number(limit),
        },
        { $limit: Number(limit) }
      );
      const product = await Product.aggregate(pipeline).allowDiskUse(true);
      return res.status(200).json({
        message: 'Tìm product thành công',
        product,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
  getProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      return res.status(200).json({
        message: 'Tìm product thành công',
        product,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);
      return res.status(200).json({
        message: 'Chỉnh sửa product thành công',
        product,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
};

module.exports = ProductController;

const Review = require('../model/Review');
const mongoose = require('mongoose');

const ReviewController = {
  create: async (req, res) => {
    try {
      const newReq = {
        ...req.body,
        user: new mongoose.Types.ObjectId(req.body._id),
        product: new mongoose.Types.ObjectId(req.body.product),
      };
      delete newReq._id;
      const newReview = await Review.create(newReq);
      return res.status(200).json({
        message: 'Tạo review thành công',
        review: newReview,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
  getReviewOfProduct: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const pipeline = [
        {
          $match: { product: new mongoose.Types.ObjectId(req.params.id) },
        },
        {
          $skip: (Number(page) - 1) * Number(limit),
        },
        { $limit: Number(limit) },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },
      ];
      const review = await Review.aggregate(pipeline).allowDiskUse(true);

      return res.status(200).json({
        message: 'Tạo review thành công',
        review,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
  deleteReview: async (req, res) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        message: 'Xóa review thành công',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
};

module.exports = ReviewController;

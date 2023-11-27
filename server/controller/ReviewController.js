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
      const review = await Review.find({
        product: new mongoose.Types.ObjectId(req.params.id),
      })
        .populate('user')
        .populate('product');
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
};

module.exports = ReviewController;

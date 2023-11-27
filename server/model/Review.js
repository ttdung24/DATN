const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewSchema = new Schema(
  {
    comment: { type: String, require: true, default: '' },
    rating: { type: Number, require: true, default: 0 },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;

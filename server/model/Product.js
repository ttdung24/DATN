const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    name: { type: String, require: true, default: '' },
    description: { type: String, require: true, default: '' },
    price: { type: Number, require: true, default: 0 },
    quantity: { type: Number, require: true, default: 0 },
    image: { type: String, require: true, default: '' },
    category: { type: Schema.Types.ObjectId },
    shop: { type: Schema.Types.ObjectId },
    status: { type: Boolean, require: true, default: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

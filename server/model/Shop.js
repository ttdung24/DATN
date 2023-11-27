const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shopSchema = new Schema(
  {
    fullname: { type: String, require: true, default: '' },
    address: { type: String, require: true, default: '' },
    name: { type: String, require: true, default: '' },
    phone: { type: String, require: true, default: '' },
    user: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;

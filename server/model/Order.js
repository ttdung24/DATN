const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId },
    fullname: { type: String, require: true, default: '' },
    address: { type: String, require: true, default: '' },
    phone: { type: String, require: true, default: '' },
    note: { type: String, require: true, default: '' },
    list: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
      },
    ],
    number: { type: Number },
    total: { type: Number },
    statusShipping: { type: Boolean, default: false },
    statusPayment: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

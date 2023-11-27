const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema(
  {
    name: { type: String, require: true, default: '' },
    image: { type: String, require: true, default: '' },
    slug: { type: String, require: true, default: ''},
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;

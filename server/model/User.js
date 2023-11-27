const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    fullname: { type: String, require: true, default: '' },
    username: { type: String, require: true, default: '' },
    email: { type: String, require: true, default: '' },
    password: { type: String, require: true, default: '' },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

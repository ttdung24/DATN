const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    fullname: { type: String, require: true, default: '' },
    username: { type: String, require: true, default: '' },
    email: { type: String, require: true, default: '' },
    password: { type: String, require: true, default: '' },
    gender: { type: String, require: true, default: 'nam' },
    birth: { type: String, require: true, default: '' },
    image: {
      type: String,
      require: true,
      default:
        'https://firebasestorage.googleapis.com/v0/b/datn-d800f.appspot.com/o/832.jpg?alt=media&token=9c9d6190-39d9-48a6-aef3-505be307f387',
    },
    role: { type: String, require: true, default: 'user' },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;

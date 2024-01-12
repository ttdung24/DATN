const User = require('../model/User');

const UserController = {
  create: async (req, res) => {
    try {
      const checkUser = await User.findOne({ username: req.body.username });
      if (checkUser) {
        return res.status(500).json({
          message: 'Username đã có người sử dụng',
        });
      }
      const newUser = await User.create(req.body);
      return res.status(200).json({
        message: 'Tạo tài khoản thành công',
        user: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Tạo tài khoản thất bại',
        error: error,
      });
    }
  },
  getInfomationOfUser: async (req, res) => {
    try {
      const user = await User.findById(req.body._id);
      return res.status(200).json({
        message: 'Lấy user thành công',
        user,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
  updateInfomationOfUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.body._id,
        { ...req.body },
        {
          new: true,
        }
      );
      return res.status(200).json({
        message: 'Cập nhật thông tin người dùng thành công',
        user,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(req.body._id);
      if (user.password != oldPassword) {
        return res.status(500).json({
          message: 'Mật khẩu cũ không đúng',
        });
      }
      user.password = newPassword;
      const saveUser = await user.save();
      return res.status(200).json({
        message: 'Cập nhật mật khẩu thành công',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
};

module.exports = UserController;

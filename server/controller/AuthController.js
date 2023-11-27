const User = require('../model/User');
const {
  signAccessToken,
  signRefreshToken,
} = require('../service/auth.service');

const AuthController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const checkUser = await User.findOne({ username: username });
      if (!checkUser) {
        return res.status(404).json({
          message: 'Người dùng không tồn tại',
        });
      }
      if (password != checkUser.password) {
        return res.status(400).json({
          message: 'Wrong password',
        });
      }

      const accessToken = await signAccessToken(checkUser);
      const refreshToken = await signRefreshToken(checkUser);

      return res.status(200).json({
        message: 'Đăng nhập thành công',
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const { _id } = req.body;
      const user = await User.findOne({ _id: _id });
      const accessToken = await signAccessToken(user);
      const refreshToken = await signRefreshToken(user);
      return res.status(200).json({
        message: 'Refresh token thành công',
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
};

module.exports = AuthController;

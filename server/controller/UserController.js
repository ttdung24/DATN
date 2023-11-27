const User = require('../model/User');

const UserController =  {
    create: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            return res.status(200).json({
                message: 'Tạo tài khoản thành công',
                user: newUser,
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            })
        }
    }
}

module.exports = UserController;
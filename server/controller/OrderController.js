const Order = require('../model/Order');
const Cart = require('../model/Cart');
const mongoose = require('mongoose');
const { getAllProductIdsForShop } = require('../helper/product/product.helper');
const {
  fillMissingDates,
  createDateRange,
} = require('../helper/product/order.helper');

const OrderController = {
  createOrder: async (req, res) => {
    try {
      const cart = await Cart.findByIdAndUpdate(
        req.body._id,
        {
          list: [],
        },
        {
          new: true,
        }
      );
      delete req.body._id;
      delete req.body.createdAt;
      delete req.body.updatedAt;
      const newOrder = await Order.create(req.body);
      return res.status(200).json({
        message: 'Đặt hàng thành công',
        order: newOrder,
        cart,
      });
    } catch (error) {
      console.log('Lỗi ở hàm createOrder:', error);
      return res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
  getOrderByUser: async (req, res) => {
    try {
      const { _id } = req.body;
      const order = await Order.find({
        user: new mongoose.Types.ObjectId(_id),
      })
        .populate({
          path: 'list',
          populate: 'product',
        })
        .sort({ createdAt: -1 });
      return res.status(200).json({
        message: 'Lấy đơn hàng thành công',
        order: order,
      });
    } catch (error) {
      console.log('Lỗi ở hàm getOrderByUser:', error);
      return res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id).populate({
        path: 'list',
        populate: 'product',
      });
      return res.status(200).json({
        message: 'Lấy đơn hàng thành công',
        order: order,
      });
    } catch (error) {
      console.log('Lỗi ở hàm getOrderById:', error);
      return res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
  getAllOrdersOfShop: async (req, res) => {
    try {
      const { id } = req.params;

      let startTime = req.query.start ? new Date(req.query.start) : null;
      let endTime = req.query.end ? new Date(req.query.end) : null;
      if (!startTime) {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 30);
        startTime = currentDate;
      }

      if (!endTime) {
        endTime = new Date();
      }

      const ids = await getAllProductIdsForShop(id);
      const groupedOrders = await Order.aggregate([
        { $unwind: '$list' },
        {
          $match: {
            'list.product': { $in: ids },
            createdAt: { $gte: startTime, $lte: endTime },
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'list.product',
            foreignField: '_id',
            as: 'productInfo',
          },
        },
        { $unwind: '$productInfo' },
        { $sort: { createdAt: -1 } },
      ]);
      return res.status(200).json({
        message: 'Lấy đơn hàng thành công',
        order: groupedOrders,
      });
    } catch (error) {
      console.log('Lỗi ở hàm getAllOrdersOfShop:', error);
      return res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  getDailySalesStatistics: async (req, res) => {
    try {
      const { id } = req.params;

      let startTime = req.query.start ? new Date(req.query.start) : null;
      let endTime = req.query.end ? new Date(req.query.end) : null;
      if (!startTime) {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 30);
        startTime = currentDate;
      }

      if (!endTime) {
        endTime = new Date();
      }

      const ids = await getAllProductIdsForShop(id);
      const salesStatistics = await Order.aggregate([
        { $unwind: '$list' },
        {
          $match: {
            'list.product': { $in: ids },
            createdAt: { $gte: startTime, $lte: endTime },
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'list.product',
            foreignField: '_id',
            as: 'productInfo',
          },
        },
        {
          $group: {
            _id: {
              $dateTrunc: {
                date: '$createdAt',
                unit: 'day',
              },
            },
            totalQuantity: { $sum: '$list.quantity' },
            totalSales: {
              $sum: {
                $multiply: [
                  '$list.quantity',
                  { $arrayElemAt: ['$productInfo.price', 0] },
                ],
              },
            },
          },
        },
      ]);
      const finalStatistics = fillMissingDates(
        createDateRange(startTime, endTime),
        salesStatistics
      );
      return res.status(200).json({
        message: 'Lấy thống kê thành công',
        finalStatistics,
      });
    } catch (error) {
      console.log('Lỗi ở hàm getDailySalesStatistics:', error);
      return res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
  updateStatusOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByIdAndUpdate(
        id,
        { ...req.body },
        {
          new: true,
        }
      ).populate({
        path: 'list',
        populate: 'product',
      });
      return res.status(200).json({
        message: 'Cập nhật trạng thái thành công',
        order: order,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error,
      });
    }
  },
};

module.exports = OrderController;

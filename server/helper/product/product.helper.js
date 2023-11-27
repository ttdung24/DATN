const Product = require('../../model/Product');

const getAllProductIdsForShop = async (shopId) => {
  try {
    const products = await Product.find({ shop: shopId });
    const productIds = products.map((product) => product._id);
    return productIds;
  } catch (error) {
    console.log('Lỗi ở getAllProductIdsForShop', error);
  }
};

module.exports = { getAllProductIdsForShop };

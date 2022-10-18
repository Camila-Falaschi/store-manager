const model = require('../../models');

const { productsModel } = model;

const validateId = async (id) => {
  const productDetail = await productsModel.productDetail(id);
  if (!productDetail) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
};
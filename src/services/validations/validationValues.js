const schemas = require('./schemas');
const model = require('../../models');

const { productsSchema } = schemas;
const { productsModel } = model;

const validateId = async (productId) => {
  const { error } = productsSchema.validate({ productId });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  const productDetail = await productsModel.productDetail(productId);
  if (!productDetail) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
};
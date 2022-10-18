const schemas = require('./schemas');
const model = require('../../models');

const { productIdSchema, newProductSchema } = schemas;
const { productsModel } = model;

const validateId = async (id) => {
  const { error } = productIdSchema.validate({ id });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  const productDetail = await productsModel.productDetail(id);
  if (!productDetail) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

const validateProduct = async (name) => {
  if (!name || name === '') return { type: 'EMPTY_VALUE', message: '"name" is required' };
  const { error } = newProductSchema.validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateProduct,
};
const model = require('../../models');

const { productsModel, salesModel } = model;

const validateProductId = async (id) => {
  const productDetail = await productsModel.productDetail(id);
  if (!productDetail) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

const validateSaleId = async (id) => {
  const saleDetail = await salesModel.getSaleDate(id);
  if (!saleDetail || saleDetail.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateProductId,
  validateSaleId,
};
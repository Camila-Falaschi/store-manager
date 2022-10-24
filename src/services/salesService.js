const salesModel = require('../models/salesModel');

const {
  validateProductId,
  validateSaleId,
} = require('./validations/valuesValidations');

const newSalesRegistration = async (sales) => {
  const validateIds = sales.map((item) => {
    const error = validateProductId(item.productId);
    return error;
  });

  const resultValidateIds = await Promise.all(validateIds);

  if (resultValidateIds.every((error) => error.type === null)) {
    const saleId = await salesModel.insertNewSaleDate();

    const registration = sales.map((item) => {
      const { productId, quantity } = item;
      return salesModel.insertSaleDetails(saleId, productId, quantity);
    });
    await Promise.all(registration);
    const data = await salesModel.findBySaleId(saleId);
    const result = { id: saleId, itemsSold: data };
    return { type: null, message: result };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const getAllSales = async () => {
  const result = await salesModel.getAllSalesDetails();
  return { type: null, message: result };
};

const getSalesById = async (id) => {
  const error = await validateSaleId(id);
  if (error.type) return error;

  const result = await salesModel.getSalesDetailsById(id);
  return { type: null, message: result };
};

module.exports = {
  newSalesRegistration,
  getAllSales,
  getSalesById,
};
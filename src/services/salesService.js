const salesModel = require('../models/salesModel');

const { validateProductId } = require('./validations/valuesValidations');

const newSalesRegistration = async (sales) => {
  const validateIds = sales.map((item) => {
    const error = validateProductId(item.productId);
    return error;
  });

  const resultValidateIds = await Promise.all(validateIds);

  const checkResult = resultValidateIds.every((error) => error.type === null);
  if (!checkResult) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const saleId = await salesModel.insertNewSaleDate();

  const registration = sales.map((item) => {
    const { productId, quantity } = item;
    return salesModel.insertSaleDetails(saleId, productId, quantity);
  });
  await Promise.all(registration);

  const data = await salesModel.findBySaleId(saleId);

  return { type: null, message: data };
};

module.exports = {
  newSalesRegistration,
};
const productsModel = require('../models/productsModel');
const validations = require('./validations/validationValues');

const { validateId, validateProduct } = validations;

const getAllProducts = async () => {
  const result = await productsModel.listOfProducts();
  return { type: null, message: result };
};

const getProductById = async (id) => {
  const error = await validateId(id);
  if (error.type) return error;

  const result = await productsModel.productDetail(id);
  return { type: null, message: result };
};

const newProductRegistration = async (name) => {
  const error = await validateProduct(name);
  if (error.type) return error;

  const newProductId = await productsModel.insert({ name });
  const result = await productsModel.productDetail(newProductId);
  return { type: null, message: result };
};

module.exports = {
  getAllProducts,
  getProductById,
  newProductRegistration,
};

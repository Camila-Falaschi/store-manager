const productsModel = require('../models/productsModel');
const validations = require('./validations/valuesValidations');

const { validateProductId } = validations;

const getAllProducts = async () => {
  const result = await productsModel.listOfProducts();
  return { type: null, message: result };
};

const getProductById = async (id) => {
  const error = await validateProductId(id);
  if (error.type) return error;

  const result = await productsModel.productDetail(id);
  return { type: null, message: result };
};

const newProductRegistration = async (name) => {
  const newProductId = await productsModel.insert({ name });
  const result = await productsModel.productDetail(newProductId);
  return { type: null, message: result };
};

const updateProductDetail = async (name, id) => {
  const error = await validateProductId(id);
  if (error.type) return error;

  await productsModel.update(name, id);

  const result = await productsModel.productDetail(id);

  return { type: null, message: result };
};

module.exports = {
  getAllProducts,
  getProductById,
  newProductRegistration,
  updateProductDetail,
};

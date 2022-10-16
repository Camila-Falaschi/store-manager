const errorTypes = require('../utils/errorTypes');
const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productsService.getAllProducts();
  if (type) return res.status(errorTypes.errorStatus(type)).json({ message });

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(Number(id));

  if (type) return res.status(errorTypes.errorStatus(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
};
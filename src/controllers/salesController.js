const salesService = require('../services/salesService');
const { errorStatus } = require('../utils/errorTypes');

const newSalesRegistration = async (req, res) => {
  const array = req.body;

  const { type, message } = await salesService.newSalesRegistration(array);
  if (type) return res.status(errorStatus(type)).json({ message });

  return res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
  const { type, message } = await salesService.getAllSales();
  if (type) return res.status(errorStatus(type)).json({ message });

  return res.status(200).json(message);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.getSalesById(id);
  if (type) return res.status(errorStatus(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  newSalesRegistration,
  getAllSales,
  getSalesById,
};
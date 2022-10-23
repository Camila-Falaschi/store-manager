const salesService = require('../services/salesService');
const { errorStatus } = require('../utils/errorTypes');

const newSalesRegistration = async (req, res) => {
  const array = req.body;

  const { type, message } = await salesService.newSalesRegistration(array);
  if (type) return res.status(errorStatus(type)).json({ message: 'Product not found' });

  return res.status(201).json(message);
};

module.exports = {
  newSalesRegistration,
};
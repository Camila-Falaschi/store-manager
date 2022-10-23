const salesService = require('../services/salesService');
const { errorTypes } = require('../utils/errorTypes');

const newSalesRegistration = async (req, res) => {
  const array = req.body;

  const { type, message } = await salesService.newSalesRegistration(array);
  if (type) return res.status(errorTypes.errorStatus(type)).json(message);

  res.status(201).json(message);
};

module.exports = {
  newSalesRegistration,
};
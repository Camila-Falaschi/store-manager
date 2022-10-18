const { newProductSchema, productIdSchema } = require('../utils/schemas');

const validateId = (req, res, next) => {
  const { id } = req.params;

  const { error } = productIdSchema.validate({ id });
  if (error) return res.status(422).json({ message: error.message });

  next();
};

const validateProduct = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '' || name === undefined) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const { error } = newProductSchema.validate({ name });
  if (error) {
    return res.status(422).json({ message: error.message });
  }

  next();
};

module.exports = {
  validateId,
  validateProduct,
};

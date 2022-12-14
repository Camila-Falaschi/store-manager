const {
  newProductSchema,
  productIdSchema,
  newSale,
} = require('../utils/schemas');

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

const validateSale = (req, res, next) => {
  const array = req.body;

  const validation = array.map((item) => newSale.validate(item));

  const result = validation.find((element) => Object.keys(element).includes('error'));

  if (result) {
    const status = result.error.message.includes('greater') ? 422 : 400;
    return res.status(status).json({ message: result.error.message });
  }

  next();
};

module.exports = {
  validateId,
  validateProduct,
  validateSale,
};

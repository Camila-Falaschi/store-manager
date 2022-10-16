const Joi = require('joi');

const productsSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
});

module.exports = {
  productsSchema,
};

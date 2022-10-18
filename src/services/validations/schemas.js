const Joi = require('joi');

const productIdSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

const newProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  productIdSchema,
  newProductSchema,
};

const Joi = require('joi');

const number = Joi.number().integer().min(1).required();

const productIdSchema = Joi.object({
  id: number,
});

const newProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const newSale = Joi.object({
  productId: number,
  quantity: number,
});

module.exports = {
  productIdSchema,
  newProductSchema,
  newSale,
  // quantitySchema,
};

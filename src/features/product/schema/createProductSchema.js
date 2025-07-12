const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Product name is required',
  }),
  code: Joi.string().min(3).required().messages({
    'string.empty': 'Product code is required',
    'string.min': 'Product code must be at least 3 characters',
  }),
  size: Joi.string().required().messages({
    'string.empty': 'Size is required',
  }),
  price: Joi.number().integer().min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be a non-negative number',
  }),
  stock: Joi.number().integer().min(0).required().messages({
    'number.base': 'Stock must be a number',
    'number.min': 'Stock must be a non-negative number',
  }),
  imageUrl: Joi.string().uri().optional().messages({
    'string.uri': 'Image URL must be a valid URL',
  })
});

module.exports = { productSchema };
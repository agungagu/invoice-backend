const Joi = require('joi');

const createInvoiceSchema = Joi.object({
  customerId: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required(),
  date: Joi.date().required(),
  discount: Joi.number().min(0).default(0),
  tax: Joi.number().min(0).default(0),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().uuid().required(),
        quantity: Joi.number().min(1).required(),
        price: Joi.number().min(0).required(),
      })
    )
    .required(),
});

module.exports = { createInvoiceSchema };

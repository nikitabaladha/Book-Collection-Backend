const Joi = require("@hapi/joi");

const bookValidationSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  yearPublished: Joi.number()
    .integer()
    .min(1440)
    .max(new Date().getFullYear())
    .required(),
});

module.exports = bookValidationSchema;

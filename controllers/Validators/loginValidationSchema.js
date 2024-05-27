const Joi = require("@hapi/joi");

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = loginValidationSchema;

// const Joi = require("@hapi/joi");

// const loginValidationSchema = Joi.object({
//   email: Joi.string().email().required().messages({
//     "string.email": "Email must be a valid email address",
//     "any.required": "Email is required",
//   }),
//   password: Joi.string().min(6).required().messages({
//     "string.min": "Password length must be at least 6 characters long",
//     "any.required": "Password is required",
//   }),
// });

// module.exports = loginValidationSchema;

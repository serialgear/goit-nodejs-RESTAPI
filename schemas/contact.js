const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = contactSchema;
module.exports = favoriteSchema;

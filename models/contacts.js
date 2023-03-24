const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});
const joiContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.bool(),
});

const joiFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const joiUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
  favorite: Joi.bool(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiContactSchema,
  joiFavoriteSchema,
  joiUpdateSchema,
};

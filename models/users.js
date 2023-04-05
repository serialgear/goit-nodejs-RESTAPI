const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default:
        "https://www.gravatar.com/avatar/069c9ab958ccd1b5881fb39c3d9c01ba",
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
      //  required: [true, "V erify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .allow("")
    .optional(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().allow("starter", "pro", "business"),
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = { User, joiSchema, joiSubscriptionSchema, emailSchema };

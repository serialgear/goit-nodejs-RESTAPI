const createError = require("http-errors");
const validation = (schema, message) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(createError(400, message));
    }
    return next();
  };
};

module.exports = validation;

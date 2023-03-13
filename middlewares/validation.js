// const createError = require("http-errors");
// const validation = (schema, message) => {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       return next(createError(400, message));
//     }
//     return next();
//   };
// };

// module.exports = validation;

const createError = require("http-errors");
const validation = (schema, message) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details.map((detail) => {
        return detail.context.label;
      });
      return next(createError(400, `${message}: ${errorMessage}`));
    }
    return next();
  };
};

module.exports = validation;

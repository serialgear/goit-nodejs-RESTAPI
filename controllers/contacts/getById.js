const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.getContactById(contactId);
  if (!result) {
    throw createError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = getById;

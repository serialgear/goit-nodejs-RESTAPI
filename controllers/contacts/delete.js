const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw createError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = remove;

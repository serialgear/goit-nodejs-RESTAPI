const express = require("express");

const router = express.Router();

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const { contacts: ctrl } = require("../../controllers");

// const validateMiddleware = validation(contactSchema);

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post(
  "/",
  validation(contactSchema, "missing required name field"),
  ctrlWrapper(ctrl.add)
);

router.delete("/:contactId", ctrlWrapper(ctrl.remove));

router.put(
  "/:contactId",
  validation(contactSchema, "missing fields"),
  ctrlWrapper(ctrl.updateById)
);
module.exports = router;

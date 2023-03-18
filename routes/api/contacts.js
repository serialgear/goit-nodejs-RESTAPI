const express = require("express");

const router = express.Router();

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema, favoriteSchema } = require("../../schemas");

const { contacts: ctrl } = require("../../controllers");

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

router.patch(
  "/:contactId/favorite",
  validation(favoriteSchema, "missing field"),
  ctrlWrapper(ctrl.updateStatusContact)
);
module.exports = router;

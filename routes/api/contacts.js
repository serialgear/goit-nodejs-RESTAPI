const express = require("express");

const router = express.Router();

const { validation, ctrlWrapper, auth } = require("../../middlewares");
const {
  joiContactSchema,
  joiFavoriteSchema,
  joiUpdateSchema,
} = require("../../models/contacts");

const { contacts: ctrl } = require("../../controllers");

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post(
  "/",
  auth,
  validation(joiContactSchema, "missing required field"),
  ctrlWrapper(ctrl.add)
);

router.delete("/:contactId", ctrlWrapper(ctrl.remove));

router.put(
  "/:contactId",
  validation(joiUpdateSchema, "missing fields"),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validation(joiFavoriteSchema, "missing field"),
  ctrlWrapper(ctrl.updateStatusContact)
);
module.exports = router;

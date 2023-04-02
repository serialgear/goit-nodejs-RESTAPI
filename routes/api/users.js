const express = require("express");

const router = express.Router();

const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");
const { joiSchema, joiSubscriptionSchema } = require("../../models/users");

router.post("/register", validation(joiSchema), ctrlWrapper(ctrl.register));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrl.getCurrent);
router.post("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch(
  "/",
  auth,
  validation(joiSubscriptionSchema, "incorrect input"),
  ctrlWrapper(ctrl.updateSubscriptionUser)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;

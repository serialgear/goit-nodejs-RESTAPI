const express = require("express");

const router = express.Router();

const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");
const {
  joiSchema,
  joiSubscriptionSchema,
  emailSchema,
} = require("../../models/users");

router.post("/register", validation(joiSchema), ctrlWrapper(ctrl.register));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.post("/logout", auth, ctrlWrapper(ctrl.logout));
router.post(
  "/verify",
  validation(emailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);
router.get("/current", auth, ctrl.getCurrent);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

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
